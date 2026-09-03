import { SITE_CONFIG } from "@/config/site";

export interface SyndicationParams {
  title: string;
  slug: string; // The URL slug of the original OrigoHOST article
  tags: string[]; // e.g., ["kubernetes", "devops"]
  coverImage?: string;
}

/**
 * Generates the Markdown frontmatter required for publishing an OrigoHOST article to Dev.to.
 * Crucially, it injects the canonical_url pointing back to OrigoHOST to prevent SEO cannibalization.
 */
export function generateDevToFrontmatter({ title, slug, tags, coverImage }: SyndicationParams) {
  const canonicalUrl = `${SITE_CONFIG.url}/blog/${slug}`;
  const formattedTags = tags
    .slice(0, 4)
    .map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .join(", ");

  return `---
title: "${title}"
published: true
description: "Cross-posted from the OrigoHOST Engineering Blog."
tags: ${formattedTags}
canonical_url: ${canonicalUrl}
${coverImage ? `cover_image: ${coverImage}` : ""}
---

> **Note:** This article was originally published on the [OrigoHOST Engineering Blog](${canonicalUrl}).

`;
}

/**
 * Generates the Markdown frontmatter for Hashnode.
 * Hashnode automatically respects canonical URLs if set in the frontmatter.
 */
export function generateHashnodeFrontmatter({ title, slug, tags, coverImage }: SyndicationParams) {
  const canonicalUrl = `${SITE_CONFIG.url}/blog/${slug}`;

  return `---
title: "${title}"
slug: "${slug}"
tags: ${tags.join(", ")}
canonical_url: "${canonicalUrl}"
${coverImage ? `cover_image: "${coverImage}"` : ""}
---

> **Note:** This article was originally published on the [OrigoHOST Engineering Blog](${canonicalUrl}).

`;
}
