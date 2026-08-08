import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAnyPermission, PERMISSIONS } from "@/lib/authz.server";

/**
 * Platform analytics.
 *
 * Deliberately privacy-conscious: no IP address, no user agent string, no
 * cookie or fingerprint is stored. A visit records the path, an optional
 * coarse device class and referrer HOST only (never the full referring URL,
 * which can carry search terms). The member id is attached only when the
 * visitor is signed in, so aggregate reporting never requires reading PII.
 */

const TrackInput = z.object({
  event: z
    .string()
    .trim()
    .min(1)
    .max(60)
    .regex(/^[a-z0-9_.]+$/, "Invalid event name"),
  path: z.string().trim().max(300).optional().default(""),
  entityType: z.string().trim().max(40).optional().default(""),
  entityId: z.string().trim().max(120).optional().default(""),
  referrerHost: z.string().trim().max(120).optional().default(""),
  device: z.enum(["mobile", "tablet", "desktop", "unknown"]).optional().default("unknown"),
});

/** Names the client is allowed to report. Anything else is rejected. */
const ALLOWED_EVENTS = new Set([
  "page.view",
  "event.view",
  "event.register_click",
  "program.view",
  "blog.view",
  "resource.view",
  "resource.download",
  "member.view",
  "certificate.verify",
  "form.contact_submit",
  "form.hosting_submit",
  "membership.apply_start",
]);

/**
 * Public write endpoint. Anonymous visitors may record events (the table's
 * insert policy allows it) but nobody except admins can read them back.
 */
export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TrackInput.parse(input))
  .handler(async ({ data }) => {
    if (!ALLOWED_EVENTS.has(data.event)) return { ok: false as const };

    try {
      const { getPublicSupabase } = await import("@/lib/supabase-public.server");
      await getPublicSupabase()
        .from("analytics_events")
        .insert({
          event_name: data.event,
          path: data.path ? data.path.slice(0, 300) : null,
          entity_type: data.entityType || null,
          entity_id: data.entityId || null,
          // Host only — never the full referrer, which may contain query terms.
          referrer_host: data.referrerHost ? data.referrerHost.slice(0, 120) : null,
          device: data.device,
          user_id: null,
        });
      return { ok: true as const };
    } catch (error) {
      // Analytics must never break a page render.
      console.error("[analytics] track failed", error);
      return { ok: false as const };
    }
  });

const RangeInput = z.object({
  days: z.number().int().min(1).max(365).optional().default(30),
});

type Bucket = { key: string; count: number };

function toBuckets(rows: { k: string | null }[], limit = 10): Bucket[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = row.k ?? "—";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Aggregate dashboard for the admin portal. Returns counts only — never rows
 * that could identify an individual visitor.
 */
export const getAnalyticsOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => RangeInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAnyPermission(supabase, userId, [
      PERMISSIONS.cmsRead,
      PERMISSIONS.eventsRead,
      PERMISSIONS.crmRead,
      PERMISSIONS.communityRead,
      PERMISSIONS.partnershipsRead,
    ]);

    const since = new Date(Date.now() - data.days * 86_400_000).toISOString();

    const countSince = async (table: string, column = "created_at", apply?: (q: any) => any) => {
      let query = (supabase.from(table as never) as any)
        .select("*", { count: "exact", head: true })
        .gte(column, since);
      if (apply) query = apply(query);
      const { count } = await query;
      return (count as number | null) ?? 0;
    };

    const [
      { data: traffic },
      pageViews,
      registrations,
      applications,
      enquiries,
      certificatesIssued,
      newMembers,
      leads,
    ] = await Promise.all([
      supabase
        .from("analytics_events")
        .select("event_name, path, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000),
      countSince("analytics_events", "created_at", (q: any) => q.eq("event_name", "page.view")),
      countSince("event_registrations", "registered_at"),
      countSince("membership_applications"),
      countSince("contact_enquiries"),
      countSince("certificates", "created_at", (q: any) => q.is("revoked_at", null)),
      countSince("profiles"),
      countSince("partnership_leads"),
    ]);

    const rows = traffic ?? [];

    // Daily page-view series for the chart.
    const byDay = new Map<string, number>();
    for (const row of rows) {
      if (row.event_name !== "page.view") continue;
      const day = String(row.created_at).slice(0, 10);
      byDay.set(day, (byDay.get(day) ?? 0) + 1);
    }
    const series = [...byDay.entries()]
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => a.day.localeCompare(b.day));

    return {
      rangeDays: data.days,
      totals: {
        pageViews,
        registrations,
        applications,
        enquiries,
        certificatesIssued,
        newMembers,
        leads,
        trackedEvents: rows.length,
      },
      series,
      topPages: toBuckets(rows.filter((r) => r.event_name === "page.view").map((r) => ({ k: r.path }))),
      topEvents: toBuckets(rows.map((r) => ({ k: r.event_name }))),
    };
  });
