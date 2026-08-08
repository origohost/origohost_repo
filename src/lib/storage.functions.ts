import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAnyPermission, audit, PERMISSIONS } from "@/lib/authz.server";

/**
 * File upload pipeline for the private `media` bucket.
 *
 * The browser never receives a service key. Instead it asks for a signed upload
 * URL scoped to one exact path, uploads directly to storage (so large files
 * never pass through the server), then registers the asset. Storage RLS is
 * evaluated against the caller's own token, so folder ownership is enforced by
 * Postgres, not by this code alone.
 */

const BUCKET = "media";
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/svg+xml"] as const;
const DOC_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
  "text/csv",
] as const;

/** Where a file may be written, and what may be written there. */
const FOLDERS = {
  /** Own avatar — any signed-in member, own folder only. */
  profile: { prefix: "profiles", types: IMAGE_TYPES, maxBytes: 5 * 1024 * 1024, ownFolder: true },
  /** Editorial imagery: event covers, program/blog images, partner + chapter logos. */
  content: {
    prefix: "content",
    types: IMAGE_TYPES,
    maxBytes: 10 * 1024 * 1024,
    ownFolder: false,
    permissions: [
      PERMISSIONS.mediaWrite,
      PERMISSIONS.cmsWrite,
      PERMISSIONS.eventsWrite,
      PERMISSIONS.chaptersWrite,
      PERMISSIONS.partnershipsWrite,
    ],
  },
  /** Library files attached to resources. */
  resource: {
    prefix: "resources",
    types: [...IMAGE_TYPES, ...DOC_TYPES],
    maxBytes: MAX_BYTES,
    ownFolder: false,
    permissions: [PERMISSIONS.cmsWrite],
  },
} as const;

type FolderKey = keyof typeof FOLDERS;

const UploadRequest = z.object({
  folder: z.enum(["profile", "content", "resource"]),
  filename: z.string().trim().min(1).max(200),
  contentType: z.string().trim().min(3).max(120),
  sizeBytes: z.number().int().positive().max(MAX_BYTES),
  /** Optional sub-folder for editorial assets, e.g. "events" or "partners". */
  scope: z
    .string()
    .trim()
    .max(40)
    .regex(/^[a-z0-9-]*$/, "Scope may only contain lowercase letters, numbers and dashes")
    .optional()
    .default(""),
});

function safeFilename(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "";
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  const stem = base || "file";
  return ext ? `${stem}.${ext}` : stem;
}

/**
 * Step 1 — authorize the upload and return a one-shot signed upload URL plus
 * the storage path the caller must record once the upload succeeds.
 */
export const createUploadTicket = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UploadRequest.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const folder = FOLDERS[data.folder as FolderKey];

    if (!(folder.types as readonly string[]).includes(data.contentType)) {
      throw new Error(`Files of type ${data.contentType} are not accepted here.`);
    }
    if (data.sizeBytes > folder.maxBytes) {
      throw new Error(`Files must be ${Math.round(folder.maxBytes / (1024 * 1024))} MB or smaller.`);
    }
    if (!folder.ownFolder && "permissions" in folder) {
      await assertAnyPermission(supabase, userId, folder.permissions);
    }

    const segments = [folder.prefix];
    if (folder.ownFolder) segments.push(userId);
    else if (data.scope) segments.push(data.scope);
    segments.push(`${Date.now()}-${safeFilename(data.filename)}`);
    const path = segments.join("/");

    // Signed with the CALLER's client, so storage RLS decides if it is allowed.
    const { data: ticket, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
    if (error || !ticket) {
      throw new Error(error?.message ?? "Could not start the upload. Please try again.");
    }

    return { path, token: ticket.token, signedUrl: ticket.signedUrl, bucket: BUCKET };
  });

/**
 * Step 2 — record the uploaded object in the media library and hand back a
 * signed URL for immediate preview.
 */
export const registerUploadedAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        path: z.string().trim().min(1).max(400),
        filename: z.string().trim().min(1).max(200),
        contentType: z.string().trim().max(120).optional().default(""),
        sizeBytes: z.number().int().nonnegative().max(MAX_BYTES).optional().default(0),
        usage: z.string().trim().max(60).optional().default(""),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const prefix = data.path.split("/")[0] ?? "";
    if (!["profiles", "content", "resources"].includes(prefix)) {
      throw new Error("That storage location is not allowed.");
    }
    if (prefix === "profiles" && data.path.split("/")[1] !== userId) {
      throw new Error("You can only register files in your own folder.");
    }
    if (prefix !== "profiles") {
      await assertAnyPermission(supabase, userId, [
        PERMISSIONS.mediaWrite,
        PERMISSIONS.cmsWrite,
        PERMISSIONS.eventsWrite,
        PERMISSIONS.chaptersWrite,
        PERMISSIONS.partnershipsWrite,
      ]);
    }

    // Confirm the object really exists before recording it.
    const { signMediaPath } = await import("@/lib/media.server");
    const signedUrl = await signMediaPath(data.path, 3600);
    if (!signedUrl) throw new Error("The upload could not be verified. Please try again.");

    const { data: asset, error } = await supabase
      .from("media_assets")
      .insert({
        bucket: BUCKET,
        path: data.path,
        url: data.path, // canonical reference is the path; URLs are signed on read
        filename: data.filename,
        content_type: data.contentType || null,
        size_bytes: data.sizeBytes || null,
        kind: prefix,
        usage: data.usage || null,
        uploaded_by: userId,
      })
      .select("id, path, filename")
      .maybeSingle();
    if (error) throw new Error(error.message);

    if (prefix !== "profiles") {
      await audit(supabase, "media.upload", "media_asset", asset?.id ?? null, {
        path: data.path,
        usage: data.usage || null,
      });
    }

    return { id: asset?.id ?? null, path: data.path, signedUrl };
  });

/** Fresh signed URL for a path the caller is allowed to read. */
export const getSignedMediaUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        path: z.string().trim().min(1).max(400),
        expiresIn: z.number().int().min(60).max(60 * 60 * 24).optional().default(3600),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    // Signed with the caller's client so storage RLS decides visibility.
    const { data: signed, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(data.path, data.expiresIn);
    if (error || !signed?.signedUrl) throw new Error("That file is not available to you.");
    return { signedUrl: signed.signedUrl };
  });

/** Media library listing for the admin CMS. */
export const listMediaAssets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        kind: z.enum(["all", "profiles", "content", "resources"]).optional().default("all"),
        search: z.string().trim().max(120).optional().default(""),
        page: z.number().int().min(1).max(500).optional().default(1),
        pageSize: z.number().int().min(6).max(60).optional().default(24),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAnyPermission(supabase, userId, [PERMISSIONS.mediaWrite, PERMISSIONS.cmsRead]);

    const from = (data.page - 1) * data.pageSize;
    let query = supabase
      .from("media_assets")
      .select("id, path, filename, content_type, size_bytes, kind, usage, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, from + data.pageSize - 1);

    if (data.kind !== "all") query = query.eq("kind", data.kind);
    if (data.search) query = query.ilike("filename", `%${data.search}%`);

    const { data: rows, count, error } = await query;
    if (error) throw new Error(error.message);

    const { signMediaPaths } = await import("@/lib/media.server");
    const urls = await signMediaPaths((rows ?? []).map((row) => row.path), 3600);

    return {
      items: (rows ?? []).map((row, index) => ({ ...row, signedUrl: urls[index] ?? null })),
      total: count ?? 0,
      page: data.page,
      pageSize: data.pageSize,
    };
  });

/** Removes an asset from storage and the library. */
export const deleteMediaAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: asset } = await supabase
      .from("media_assets")
      .select("id, path, uploaded_by, kind")
      .eq("id", data.id)
      .maybeSingle();
    if (!asset) throw new Error("That file no longer exists.");

    const ownsIt = asset.uploaded_by === userId && asset.kind === "profiles";
    if (!ownsIt) {
      await assertAnyPermission(supabase, userId, [PERMISSIONS.mediaWrite, PERMISSIONS.cmsWrite]);
    }

    // Storage RLS re-checks the delete; a failure here is authoritative.
    const { error: storageError } = await supabase.storage.from(BUCKET).remove([asset.path]);
    if (storageError) throw new Error(storageError.message);

    const { error } = await supabase.from("media_assets").delete().eq("id", asset.id);
    if (error) throw new Error(error.message);

    if (!ownsIt) await audit(supabase, "media.delete", "media_asset", asset.id, { path: asset.path });
    return { ok: true as const };
  });
