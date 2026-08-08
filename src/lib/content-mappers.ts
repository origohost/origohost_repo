import type { BlogPost, OrigoEvent, EventReport } from "@/content/types";

/**
 * Adapters that map database rows onto the public content models used by the
 * existing website components. The presentation layer stays unchanged; only
 * the source of truth moved from `src/content/*` to the database.
 */

const IST = "Asia/Kolkata";

export function isoDateInIst(value: string | null | undefined): string {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(value));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function timeInIst(value: string | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export type EventRow = {
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  category: string | null;
  starts_at: string;
  ends_at: string | null;
  time_label: string | null;
  mode: string;
  venue: string | null;
  registration_url: string | null;
  registration_status: string;
  status: string;
  organizer: string | null;
  audience: string[] | null;
  topics: string[] | null;
  who_should_attend: string[] | null;
  learning_outcomes: string[] | null;
  tags: string[] | null;
  speakers: unknown;
  partners: unknown;
  faqs: unknown;
  agenda: unknown;
  report: unknown;
  certificate_note: string | null;
};

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function publicEventStatus(row: { status: string; starts_at: string }): OrigoEvent["status"] {
  if (row.status === "live") return "live";
  if (row.status === "completed" || row.status === "archived") return "past";
  return new Date(row.starts_at).getTime() >= Date.now() ? "upcoming" : "past";
}

export function mapEvent(row: EventRow): OrigoEvent {
  const timeLabel =
    row.time_label ??
    [timeInIst(row.starts_at), row.ends_at ? timeInIst(row.ends_at) : null].filter(Boolean).join(" – ");

  return {
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? "",
    description: row.description ?? row.summary ?? "",
    category: row.category ?? "Community",
    audience: row.audience ?? [],
    date: isoDateInIst(row.starts_at),
    time: timeLabel,
    mode: (row.mode as OrigoEvent["mode"]) ?? "online",
    location: row.venue ?? "To be announced",
    speakers: asArray(row.speakers),
    agenda: asArray(row.agenda),
    topics: row.topics ?? [],
    whoShouldAttend: row.who_should_attend ?? [],
    learningOutcomes: row.learning_outcomes ?? [],
    partners: asArray<string>(row.partners),
    organizer: row.organizer ?? "OrigoHOST",
    registrationUrl: row.registration_url ?? undefined,
    registrationStatus:
      row.registration_status === "not_open"
        ? "not-open"
        : (row.registration_status as OrigoEvent["registrationStatus"]),
    status: publicEventStatus(row),
    certificate: row.certificate_note ?? undefined,
    faqs: asArray(row.faqs),
    tags: row.tags ?? [],
    report: (row.report as EventReport | null) ?? undefined,
  };
}

export type BlogRow = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  tags: string[] | null;
  author_name: string;
  author_role: string | null;
  reading_time: string | null;
  published_at: string | null;
  created_at: string;
  cover_image_url: string | null;
};

export function mapPost(row: BlogRow): BlogPost & { coverImage?: string } {
  return {
    title: row.title,
    slug: row.slug,
    category: row.category ?? "Editorial",
    excerpt: row.excerpt ?? "",
    author: row.author_name,
    authorRole: row.author_role ?? "OrigoHOST",
    date: isoDateInIst(row.published_at ?? row.created_at),
    readingTime: row.reading_time ?? estimateReadingTime(row.content),
    tags: row.tags ?? [],
    body: row.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    coverImage: row.cover_image_url ?? undefined,
  };
}

export function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
