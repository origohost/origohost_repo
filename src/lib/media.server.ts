/**
 * Signed-URL helper for the private `media` bucket.
 *
 * Nothing in storage is world-readable. Public pages therefore never embed a
 * raw storage path — they embed a short-lived signed URL minted here, on the
 * server, for a path that is already attached to a published/public row. This
 * keeps private documents (certificates, unpublished drafts) unreachable even
 * if a path is guessed.
 */

const BUCKET = "media";

/** External URLs and already-signed URLs pass through untouched. */
function isAbsolute(value: string): boolean {
  return /^(https?:)?\/\//i.test(value) || value.startsWith("data:");
}

/** Mints a signed URL for one storage path. Returns null when unavailable. */
export async function signMediaPath(path: string | null, expiresInSeconds = 3600): Promise<string | null> {
  if (!path) return null;
  if (isAbsolute(path)) return path;

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(path.replace(/^\/+/, ""), expiresInSeconds);
    if (error) {
      console.error("[media] failed to sign", path, error.message);
      return null;
    }
    return data?.signedUrl ?? null;
  } catch (error) {
    console.error("[media] sign threw", path, error);
    return null;
  }
}

/** Signs many paths in one round trip; preserves order and nulls. */
export async function signMediaPaths(
  paths: (string | null)[],
  expiresInSeconds = 3600,
): Promise<(string | null)[]> {
  const relative = paths.filter((p): p is string => !!p && !isAbsolute(p)).map((p) => p.replace(/^\/+/, ""));
  if (relative.length === 0) return paths.map((p) => (p && isAbsolute(p) ? p : null));

  let signedByPath = new Map<string, string>();
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrls(relative, expiresInSeconds);
    if (error) console.error("[media] batch sign failed", error.message);
    for (const entry of data ?? []) {
      if (entry.path && entry.signedUrl) signedByPath.set(entry.path, entry.signedUrl);
    }
  } catch (error) {
    console.error("[media] batch sign threw", error);
    signedByPath = new Map();
  }

  return paths.map((path) => {
    if (!path) return null;
    if (isAbsolute(path)) return path;
    return signedByPath.get(path.replace(/^\/+/, "")) ?? null;
  });
}

/**
 * Replaces storage paths with signed URLs on a list of records, in place of the
 * named keys. Convenience for list endpoints that carry image columns.
 */
export async function signRecordMedia<T extends Record<string, unknown>>(
  records: T[],
  keys: (keyof T)[],
  expiresInSeconds = 3600,
): Promise<T[]> {
  if (records.length === 0) return records;

  const flat: (string | null)[] = [];
  for (const record of records) {
    for (const key of keys) {
      const value = record[key];
      flat.push(typeof value === "string" && value.length > 0 ? value : null);
    }
  }

  const signed = await signMediaPaths(flat, expiresInSeconds);

  let cursor = 0;
  return records.map((record) => {
    const next = { ...record };
    for (const key of keys) {
      next[key] = signed[cursor] as T[keyof T];
      cursor += 1;
    }
    return next;
  });
}
