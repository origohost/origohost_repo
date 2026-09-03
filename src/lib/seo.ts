import { SITE_CONFIG } from "@/config/site";
import { buildOrganizationSchema } from "./structured-data";

export interface SeoInput {
  title?: string;
  description?: string;
  /** Route path (e.g. "/about"). Used to build canonical + og:url. */
  path?: string;
  /** Absolute or relative URL for the share image. */
  image?: string;
  /** Image URL to preload for LCP optimization (e.g. Hero background). */
  preloadImage?: string;
  /** OpenGraph type — "website" (default) or "article" for blog posts. */
  ogType?: "website" | "article" | "profile";
  /** Set true to emit `noindex, nofollow` — for auth/legal utility pages. */
  noindex?: boolean;
  /** JSON-LD structured data objects. */
  schemas?: Record<string, unknown>[];
}

const SITE_NAME = SITE_CONFIG.name;
const DEFAULT_DESCRIPTION = SITE_CONFIG.description;

/**
 * Build a consistent set of head() meta tags for a route.
 * Every CMS-driven page should call this to keep OG/Twitter/canonical/robots aligned.
 */
export function buildSeo({
  title,
  description,
  path,
  image,
  preloadImage,
  ogType = "website",
  noindex = false,
  schemas = [],
}: SeoInput = {}) {
  const fullTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title} — ${SITE_NAME}`
    : SITE_CONFIG.title;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const base = SITE_CONFIG.url ?? "";
  const url = path ? `${base}${path}` : base || path || "/";

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: desc },
    {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: desc },
    { property: "og:type", content: ogType },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: desc },
  ];

  if (image) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }

  // Phase 5: Automatically inject the full Organization entity on the root page
  // This ensures Google's Knowledge Graph can verify the sameAs links immediately.
  const finalSchemas = [...schemas];
  if (!path || path === "/") {
    finalSchemas.push(buildOrganizationSchema());
  }

  const scripts = finalSchemas.map((schema) => ({
    type: "application/ld+json",
    children: JSON.stringify(schema),
  }));

  const linkTags = [{ rel: "canonical", href: url }];
  if (preloadImage) {
    linkTags.push({ rel: "preload", href: preloadImage, as: "image", fetchPriority: "high" } as any);
  }

  return { meta, links: linkTags, scripts };
}
