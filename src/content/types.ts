/**
 * OrigoHOST content models.
 *
 * These types define the shape of every piece of editorial content on the
 * public website. They are intentionally CMS-shaped: each collection in
 * `src/content/*` can be replaced by an API/CMS response without touching
 * any presentation code.
 */

export type EventStatus = "upcoming" | "live" | "past";
export type EventMode = "online" | "offline" | "hybrid";
export type RegistrationStatus = "open" | "closed" | "waitlist" | "full" | "not-open";

export interface Speaker {
  name: string;
  role: string;
  organization?: string;
  photo?: string;
  bio?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  detail?: string;
}

export interface EventReport {
  overview: string;
  participants?: string | null;
  keyDiscussions: string[];
  outcomes: string[];
  gallery: { caption: string; image?: string }[];
  recordings: { label: string; url?: string }[];
  presentations: { label: string; url?: string }[];
  certificates?: string;
}

export interface OrigoEvent {
  title: string;
  slug: string;
  description: string;
  summary: string;
  category: string;
  audience: string[];
  date: string; // ISO date
  time: string;
  mode: EventMode;
  location: string;
  speakers: Speaker[];
  agenda: AgendaItem[];
  topics: string[];
  whoShouldAttend: string[];
  learningOutcomes: string[];
  partners: string[];
  organizer: string;
  registrationUrl?: string;
  registrationStatus: RegistrationStatus;
  status: EventStatus;
  certificate?: string;
  faqs: { question: string; answer: string }[];
  tags: string[];
  report?: EventReport;
}

export interface Program {
  title: string;
  slug: string;
  description: string;
  category: string;
  audience: string[];
  format: string;
  status: "active" | "planning" | "recurring" | "open";
  outcomes: string[];
}

export interface Person {
  name: string;
  role: string;
  organization?: string;
  photo?: string;
  bio: string;
  socialLinks?: { label: string; url: string }[];
}

export interface Partner {
  name: string;
  type: "Academic" | "Industry" | "Community" | "Knowledge" | "Technology" | "Hiring";
  description: string;
  status: "confirmed" | "placeholder";
}

export interface Resource {
  title: string;
  slug: string;
  type: "Article" | "Guide" | "Presentation" | "Recording" | "Research" | "Project" | "Template";
  category: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  url?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  body: string[];
  tags: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  context: string;
}

export interface Statistic {
  label: string;
  /** `null` means the metric is not yet verified — never fabricate a number. */
  value: string | null;
  note?: string;
}

export interface Chapter {
  name: string;
  level: "National" | "State" | "Campus" | "Local";
  region: string;
  status: "active" | "forming" | "applications-open";
}
