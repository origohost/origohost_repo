import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { mapEvent, mapPost } from "@/lib/content-mappers";
import type { BlogRow, EventRow } from "@/lib/content-mappers";

/**
 * PUBLIC data API. Every read here goes through the publishable-key client,
 * so Postgres row-level security decides what is visible to anonymous
 * visitors. No private column is ever selected.
 */

const EVENT_COLUMNS =
  "title, slug, summary, description, category, starts_at, ends_at, time_label, mode, venue, registration_url, registration_status, status, organizer, audience, topics, who_should_attend, learning_outcomes, tags, speakers, partners, faqs, agenda, report, certificate_note";

const POST_COLUMNS =
  "title, slug, excerpt, content, category, tags, author_name, author_role, reading_time, published_at, created_at, cover_image_url";

const MEMBER_COLUMNS =
  "id, full_name, headline, designation, organization_name, location, bio, skills, technology_interests, professional_interests, photo_url, links";

export const listPublicEvents = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data, error } = await getPublicSupabase()
    .from("events")
    .select(EVENT_COLUMNS)
    .order("starts_at", { ascending: false })
    .limit(200);
  if (error) throw new Error("Events are temporarily unavailable.");
  return (data ?? []).map((row) => mapEvent(row as unknown as EventRow));
});

export const getPublicEvent = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(1).max(120) }).parse(input))
  .handler(async ({ data: input }) => {
    const { getPublicSupabase } = await import("@/lib/supabase-public.server");
    const { data, error } = await getPublicSupabase()
      .from("events")
      .select(EVENT_COLUMNS)
      .eq("slug", input.slug)
      .maybeSingle();
    if (error) throw new Error("This event is temporarily unavailable.");
    return data ? mapEvent(data as unknown as EventRow) : null;
  });

export const listPublicPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data, error } = await getPublicSupabase()
    .from("blog_posts")
    .select(POST_COLUMNS)
    .order("published_at", { ascending: false })
    .limit(200);
  if (error) throw new Error("The blog is temporarily unavailable.");
  return (data ?? []).map((row) => mapPost(row as unknown as BlogRow));
});

export const getPublicPost = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(1).max(120) }).parse(input))
  .handler(async ({ data: input }) => {
    const { getPublicSupabase } = await import("@/lib/supabase-public.server");
    const supabase = getPublicSupabase();
    const [postRes, relatedRes] = await Promise.all([
      supabase.from("blog_posts").select(POST_COLUMNS).eq("slug", input.slug).maybeSingle(),
      supabase.from("blog_posts").select(POST_COLUMNS).order("published_at", { ascending: false }).limit(20),
    ]);
    if (postRes.error) throw new Error("This article is temporarily unavailable.");
    if (!postRes.data) return null;
    const post = mapPost(postRes.data as unknown as BlogRow);
    const related = (relatedRes.data ?? [])
      .map((row) => mapPost(row as unknown as BlogRow))
      .filter((item) => item.slug !== post.slug && item.category === post.category)
      .slice(0, 3);
    return { post, related };
  });

/* --------------------------- Public member directory --------------------------- */

export type PublicMember = {
  id: string;
  full_name: string;
  headline: string | null;
  designation: string | null;
  organization_name: string | null;
  location: string | null;
  bio: string | null;
  skills: string[];
  technology_interests: string[];
  professional_interests: string[];
  photo_url: string | null;
  links: { label?: string; url?: string }[];
};

const DirectoryQuery = z.object({
  q: z.string().trim().max(80).default(""),
  skill: z.string().trim().max(48).default(""),
  organization: z.string().trim().max(80).default(""),
  interest: z.string().trim().max(48).default(""),
  page: z.number().int().min(1).max(500).default(1),
});

const PAGE_SIZE = 12;

/** Server-side, paginated, index-backed directory search over PUBLIC profiles only. */
export const searchPublicMembers = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => DirectoryQuery.parse(input ?? {}))
  .handler(async ({ data: input }) => {
    const { getPublicSupabase } = await import("@/lib/supabase-public.server");
    let query = getPublicSupabase()
      .from("profiles")
      .select(MEMBER_COLUMNS, { count: "exact" })
      .eq("visibility", "public");

    if (input.q) {
      const term = input.q.replace(/[%,()]/g, " ").trim();
      if (term) {
        query = query.or(
          `full_name.ilike.%${term}%,headline.ilike.%${term}%,designation.ilike.%${term}%,organization_name.ilike.%${term}%`,
        );
      }
    }
    if (input.skill) query = query.contains("skills", [input.skill]);
    if (input.interest) query = query.contains("technology_interests", [input.interest]);
    if (input.organization) query = query.ilike("organization_name", `%${input.organization}%`);

    const from = (input.page - 1) * PAGE_SIZE;
    const { data, error, count } = await query
      .order("full_name", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw new Error("The member directory is temporarily unavailable.");
    return {
      members: (data ?? []) as unknown as PublicMember[],
      total: count ?? 0,
      page: input.page,
      pageSize: PAGE_SIZE,
    };
  });

/** Facets for the directory filters, derived from public profiles only. */
export const getDirectoryFacets = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data } = await getPublicSupabase()
    .from("profiles")
    .select("skills, technology_interests, organization_name")
    .eq("visibility", "public")
    .limit(500);

  const skills = new Set<string>();
  const interests = new Set<string>();
  const organizations = new Set<string>();
  for (const row of data ?? []) {
    (row.skills ?? []).forEach((s) => s && skills.add(s));
    (row.technology_interests ?? []).forEach((s) => s && interests.add(s));
    if (row.organization_name) organizations.add(row.organization_name);
  }
  const sort = (set: Set<string>) => [...set].sort((a, b) => a.localeCompare(b)).slice(0, 40);
  return { skills: sort(skills), interests: sort(interests), organizations: sort(organizations) };
});

export const getPublicMember = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data: input }) => {
    const { getPublicSupabase } = await import("@/lib/supabase-public.server");
    const { data } = await getPublicSupabase()
      .from("profiles")
      .select(MEMBER_COLUMNS)
      .eq("id", input.id)
      .eq("visibility", "public")
      .maybeSingle();
    return (data as unknown as PublicMember | null) ?? null;
  });

/* ----------------------------- Certificate verify ----------------------------- */

export const verifyCertificate = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ number: z.string().trim().min(3).max(64) }).parse(input),
  )
  .handler(async ({ data: input }) => {
    const { getPublicSupabase } = await import("@/lib/supabase-public.server");
    const { data } = await getPublicSupabase()
      .from("certificates")
      .select("certificate_number, recipient_name, type, event_title, issued_on, revoked_at")
      .eq("certificate_number", input.number.toUpperCase())
      .maybeSingle();
    if (!data) return { found: false as const };
    return {
      found: true as const,
      certificate: {
        number: data.certificate_number,
        recipientName: data.recipient_name,
        type: data.type,
        eventTitle: data.event_title,
        issuedOn: data.issued_on,
        revoked: Boolean(data.revoked_at),
      },
    };
  });
