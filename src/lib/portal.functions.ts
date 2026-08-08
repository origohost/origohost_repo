import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ProfileInput = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(120),
  headline: z.string().trim().max(160).nullable().default(null),
  bio: z.string().trim().max(2000).nullable().default(null),
  location: z.string().trim().max(120).nullable().default(null),
  organization_name: z.string().trim().max(160).nullable().default(null),
  designation: z.string().trim().max(160).nullable().default(null),
  education: z.string().trim().max(240).nullable().default(null),
  phone: z.string().trim().max(32).nullable().default(null),
  skills: z.array(z.string().trim().min(1).max(48)).max(40).default([]),
  technology_interests: z.array(z.string().trim().min(1).max(48)).max(40).default([]),
  professional_interests: z.array(z.string().trim().min(1).max(48)).max(40).default([]),
  is_public: z.boolean().default(false),
});

export type ProfileInputValues = z.infer<typeof ProfileInput>;

const ADMIN_ROLES = [
  "super_admin",
  "platform_admin",
  "content_admin",
  "crm_admin",
  "events_admin",
  "community_admin",
  "chapter_admin",
  "partnership_admin",
  "certificate_admin",
] as const;

/** Profile, roles, registrations and certificates for the signed-in member. */
export const getMyPortal = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [profileRes, rolesRes, regsRes, certsRes, chaptersRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase
        .from("event_registrations")
        .select("id, registered_at, attended, events(id, title, slug, starts_at, mode, venue, status)")
        .eq("user_id", userId)
        .order("registered_at", { ascending: false }),
      supabase
        .from("certificates")
        .select("id, certificate_number, type, event_title, issued_on, revoked_at")
        .eq("user_id", userId)
        .order("issued_on", { ascending: false }),
      supabase
        .from("chapter_members")
        .select("id, chapter_role, joined_at, chapters(id, name, slug, type, city, region, status)")
        .eq("user_id", userId),
    ]);

    return {
      userId,
      profile: profileRes.data ?? null,
      roles: (rolesRes.data ?? []).map((r) => r.role as string),
      registrations: regsRes.data ?? [],
      certificates: certsRes.data ?? [],
      chapters: chaptersRes.data ?? [],
    };
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ProfileInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("profiles")
      .update({ ...data, onboarded_at: new Date().toISOString() })
      .eq("id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Real platform counters for the admin overview. Admin roles only. */
export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const roles = (roleRows ?? []).map((r) => r.role as string);
    const isAdmin = roles.some((r) => (ADMIN_ROLES as readonly string[]).includes(r));
    if (!isAdmin) throw new Error("Forbidden");

    const count = async (
      table: "profiles" | "events" | "event_registrations" | "certificates" | "chapters" | "partnership_leads",
      apply?: (q: any) => any,
    ) => {
      let q = supabase.from(table).select("*", { count: "exact", head: true });
      if (apply) q = apply(q);
      const { count: n } = await q;
      return n ?? 0;
    };

    const nowIso = new Date().toISOString();

    const [
      members,
      events,
      upcomingEvents,
      registrations,
      attended,
      certificates,
      activeChapters,
      openLeads,
    ] = await Promise.all([
      count("profiles"),
      count("events"),
      count("events", (q) => q.gte("starts_at", nowIso).eq("status", "published")),
      count("event_registrations"),
      count("event_registrations", (q) => q.eq("attended", true)),
      count("certificates", (q) => q.is("revoked_at", null)),
      count("chapters", (q) => q.eq("status", "active")),
      count("partnership_leads", (q) => q.in("stage", ["lead", "qualified", "discussion", "proposal"])),
    ]);

    const { data: recentAudit } = await supabase
      .from("audit_logs")
      .select("id, action, entity_type, entity_id, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    return {
      roles,
      metrics: {
        members,
        events,
        upcomingEvents,
        registrations,
        attended,
        certificates,
        activeChapters,
        openLeads,
      },
      recentAudit: recentAudit ?? [],
    };
  });
