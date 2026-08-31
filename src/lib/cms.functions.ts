import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * PUBLIC CMS reads. Every query runs through the publishable-key client, so
 * Postgres row-level security decides visibility. Nothing private is selected.
 */

export type ProgramRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  category: string | null;
  format: string | null;
  audience: string[];
  objectives: string[];
  eligibility: string[];
  activities: string[];
  outcomes: string[];
  image_url: string | null;
  contact_email: string | null;
  status: "planning" | "upcoming" | "active" | "archived";
  seo_title: string | null;
  seo_description: string | null;
};

const PROGRAM_COLUMNS =
  "id, title, slug, summary, description, category, format, audience, objectives, eligibility, activities, outcomes, image_url, contact_email, status, seo_title, seo_description";

export const listPublicPrograms = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data, error } = await getPublicSupabase()
    .from("programs")
    .select(PROGRAM_COLUMNS)
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .limit(200);
  if (error) throw new Error("Programs are temporarily unavailable.");
  return (data ?? []) as unknown as ProgramRecord[];
});

export const getPublicProgram = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(1).max(120) }).parse(input))
  .handler(async ({ data: input }) => {
    const { getPublicSupabase } = await import("@/lib/supabase-public.server");
    const supabase = getPublicSupabase();
    const { data } = await supabase
      .from("programs")
      .select(PROGRAM_COLUMNS)
      .eq("slug", input.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!data) return null;
    const program = data as unknown as ProgramRecord;

    const [{ data: events }, { data: resources }] = await Promise.all([
      supabase
        .from("events")
        .select("title, slug, starts_at, mode, venue, registration_status")
        .eq("status", "published")
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(6),
      supabase
        .from("resources")
        .select("title, slug, type, description")
        .eq("program_id", program.id)
        .eq("status", "published")
        .eq("is_public", true)
        .limit(6),
    ]);

    return { program, events: events ?? [], resources: resources ?? [] };
  });

export type ResourceRecord = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  type: string;
  thumbnail_url: string | null;
  file_url: string | null;
  external_url: string | null;
  author: string | null;
  reading_time: string | null;
  tags: string[];
  published_at: string | null;
};

export const listPublicResources = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data, error } = await getPublicSupabase()
    .from("resources")
    .select(
      "id, title, slug, description, category, type, thumbnail_url, file_url, external_url, author, reading_time, tags, published_at",
    )
    .eq("status", "published")
    .eq("is_public", true)
    .order("published_at", { ascending: false })
    .limit(200);
  if (error) throw new Error("The resource library is temporarily unavailable.");
  return (data ?? []) as unknown as ResourceRecord[];
});

export type LeadershipRecord = {
  id: string;
  name: string;
  role: string;
  organization: string | null;
  photo_url: string | null;
  short_bio: string | null;
  full_bio: string | null;
  skills: string[];
  responsibilities: string[];
  links: { label?: string; url?: string }[];
};

export const listLeadership = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data } = await getPublicSupabase()
    .from("leadership_profiles")
    .select("id, name, role, organization, photo_url, short_bio, full_bio, skills, responsibilities, links")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  return (data ?? []) as unknown as LeadershipRecord[];
});

export type StoryRecord = {
  id: string;
  name: string;
  role: string | null;
  organization: string | null;
  photo_url: string | null;
  quote: string;
  story: string | null;
};

export const listCommunityStories = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data } = await getPublicSupabase()
    .from("community_stories")
    .select("id, name, role, organization, photo_url, quote, story")
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .limit(24);
  return (data ?? []) as unknown as StoryRecord[];
});

export type MetricRecord = { id: string; key: string; label: string; value: string | null; description: string | null };

/** Only verified metrics are returned — unverified values are never published. */
export const listImpactMetrics = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data } = await getPublicSupabase()
    .from("impact_metrics")
    .select("id, key, label, value, description")
    .eq("is_verified", true)
    .order("display_order", { ascending: true });
  return (data ?? []) as unknown as MetricRecord[];
});

export type PartnerRecord = {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  partnership_category: string | null;
};

/** Only ACTIVE, publicly visible partners are ever shown. */
export const listPublicPartners = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data } = await getPublicSupabase()
    .from("organizations")
    .select("id, name, slug, type, description, website, logo_url, partnership_category")
    .eq("partner_status", "active")
    .eq("is_public", true)
    .order("display_order", { ascending: true })
    .limit(60);
  return (data ?? []) as unknown as PartnerRecord[];
});

export const listPublicCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data } = await getPublicSupabase()
    .from("partner_case_studies")
    .select("id, title, slug, summary, challenge, collaboration, outcome, organizations(name, logo_url)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(24);
  return data ?? [];
});

export type PublicChapter = {
  id: string;
  name: string;
  slug: string;
  type: string;
  institution: string | null;
  city: string | null;
  region: string | null;
  summary: string | null;
  logo_url: string | null;
  contact_email: string | null;
  status: string;
};

export const listPublicChapters = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("@/lib/supabase-public.server");
  const { data } = await getPublicSupabase()
    .from("chapters")
    .select("id, name, slug, type, institution, city, region, summary, logo_url, contact_email, status")
    .in("status", ["active", "forming", "approved"])
    .order("name", { ascending: true })
    .limit(200);
  return (data ?? []) as unknown as PublicChapter[];
});

export const getPublicChapter = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(1).max(120) }).parse(input))
  .handler(async ({ data: input }) => {
    const { getPublicSupabase } = await import("@/lib/supabase-public.server");
    const supabase = getPublicSupabase();
    const { data } = await supabase
      .from("chapters")
      .select("id, name, slug, type, institution, city, region, summary, logo_url, contact_email, status, links")
      .eq("slug", input.slug)
      .maybeSingle();
    if (!data) return null;
    const { data: events } = await supabase
      .from("events")
      .select("title, slug, starts_at, mode, venue")
      .eq("chapter_id", (data as { id: string }).id)
      .eq("status", "published")
      .order("starts_at", { ascending: false })
      .limit(10);
    return { chapter: data as unknown as PublicChapter, events: events ?? [] };
  });
