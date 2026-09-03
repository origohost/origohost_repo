/**
 * CMS content types.
 *
 * These are the typed content blocks each page consumes. They are intentionally
 * generic so a real CMS (Sanity, Contentful, Strapi, Payload) can back them
 * later without touching page components.
 *
 * A page pulls its content via the `ContentLoader` interface (see loader.ts).
 * Today it's served from static objects under `./content/*`. Tomorrow, swap
 * `StaticContentLoader` for a CMS-backed implementation.
 */

export interface RichText {
  /** Plain text; MD/portable-text can be added later without breaking pages. */
  text: string;
}

export interface CtaBlock {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface StatBlock {
  value: string;
  label: string;
  caption?: string;
}

export interface FeatureBlock {
  /** Lucide icon name (e.g. "Rocket"). Resolved at render time. */
  icon: string;
  title: string;
  body: string;
  accent?: "orange" | "green" | "yellow" | "blue" | "purple";
}

export interface TimelineBlock {
  year: string;
  title: string;
  body: string;
  icon?: string;
  accent?: "orange" | "green" | "yellow" | "blue" | "purple";
}

export interface PersonBlock {
  name: string;
  role: string;
  bio?: string;
  quote?: string;
  avatarUrl?: string;
  links?: { label: string; href: string; icon?: string }[];
  badge?: string;
  slug?: string; // Used to link to full profile
  communitySince?: string;
  expertiseChips?: string[];
  achievementsCount?: string;
  projectsCount?: string;
  eventsLed?: string;
  communityImpact?: string;
}

export interface FounderProfileBlock extends PersonBlock {
  organization: string;
  location: string;
  coverImage?: string;

  biography: string;
  vision: string;
  mission: string;
  leadershipPhilosophy: string;

  currentRoles?: { title: string; icon: string; accent?: string }[];

  timeline: { title: string; subtitle: string; icon: string }[];
  expertise: { label: string; icon: string }[];
  contributions: string[];
  impactStats: { label: string; value: string }[];
  coreResponsibilities: { title: string; icon: string }[];
  skills: string[];
  techStack: { label: string; icon: string }[];
  currentFocus: string[];
  media: string[];
  awards: string[];
  education: string[];
  certifications: string[];
  gallery: string[];
  faqs: { question: string; answer: string }[];
}

export interface FaqBlock {
  question: string;
  answer: string;
}

export interface JobBlock {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
}

export interface EventBlock {
  id: string;
  title: string;
  city: string;
  time: string;
  month: string;
  day: string;
  mode: "ONLINE" | "OFFLINE";
  category: string;
  description?: string;
}

export interface GalleryAlbumBlock {
  id: string;
  title: string;
  category: string;
  count: number;
  tone: string;
}

export interface PartnerTrackBlock {
  icon: string;
  title: string;
  body: string;
}

export interface LegalSectionBlock {
  title: string;
  body: string;
}

/** Meta wrapped around every page's content — drives head() + hero copy. */
export interface PageMeta {
  slug: string;
  title: string;
  description: string;
  eyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
}

/* ─── Per-page content shapes ─────────────────────────────────────────── */

export interface AboutContent {
  meta: PageMeta;
  storyEyebrow: string;
  storyTitle: string;
  storyBody: string;
  purpose: {
    mission: { title: string; body: string; stats: StatBlock[] };
    vision: { title: string; body: string; stats: StatBlock[] };
  };
  timeline: TimelineBlock[];
  values: FeatureBlock[];
  numbers: StatBlock[];
  ctas: CtaBlock[];
}

export interface EventsContent {
  meta: PageMeta;
  categories: string[];
  events: EventBlock[];
}

export interface GalleryContent {
  meta: PageMeta;
  albums: GalleryAlbumBlock[];
}

// PartnerLogoEntry and PartnersContent are inferred from the Zod schema in
// ./schema.ts — re-exported here so existing `from "./types"` imports keep
// working while the schema stays the single source of truth.
import type { PartnerLogoEntry, PartnersContent } from "./schema";
export type { PartnerLogoEntry, PartnersContent };

export interface FaqContent {
  meta: PageMeta;
  items: FaqBlock[];
}

export interface LegalContent {
  meta: PageMeta;
  updated: string;
  sections: LegalSectionBlock[];
}

export interface ContactChannelBlock {
  icon: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  accent: "orange" | "blue" | "green" | "purple";
}

export interface ContactSocialBlock {
  icon: string;
  label: string;
  handle: string;
  href: string;
}

export interface ContactOfficeBlock {
  id: string;
  kind: string;
  city: string;
  country: string;
  address: string;
  email: string;
  phone: string;
  mapsUrl: string;
}

export interface ContactContent {
  meta: PageMeta;
  responseTime: string;
  channels: ContactChannelBlock[];
  offices: ContactOfficeBlock[];
  formTitle: string;
  formAccentWord: string;
  formDescription: string;
  formNote: string;
  socials: ContactSocialBlock[];
}

export interface FoundersContent {
  meta: PageMeta;
  profiles: FounderProfileBlock[];
}

export type PageContentMap = {
  about: AboutContent;
  events: EventsContent;
  gallery: GalleryContent;
  partners: PartnersContent;
  faq: FaqContent;
  privacy: LegalContent;
  terms: LegalContent;
  refund: LegalContent;
  cookies: LegalContent;
  contact: ContactContent;
  founders: FoundersContent;
};
