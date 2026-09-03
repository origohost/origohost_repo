import type { PageContentMap } from "./types";
import { aboutContent } from "./content/about";
import { eventsContent } from "./content/events";
import { galleryContent } from "./content/gallery";
import { partnersContent } from "./content/partners";
import { faqContent } from "./content/faq";
import { privacyContent, termsContent, refundContent, cookiesContent } from "./content/legal";
import { contactContent } from "./content/contact";
import { foundersContent } from "./content/founders";

/**
 * Minimal loader interface. Every page calls `loader.get("<slug>")` — no direct
 * imports of static data from page components. Swap `StaticContentLoader` for
 * a CMS-backed implementation without touching pages.
 *
 *   const loader: ContentLoader = new SanityContentLoader(client);
 *   const about = await loader.get("about");
 */
export interface ContentLoader {
  get<K extends keyof PageContentMap>(slug: K): Promise<PageContentMap[K]>;
  /** Sync variant for SSR + static content; may throw if the backend is async. */
  getSync<K extends keyof PageContentMap>(slug: K): PageContentMap[K];
}

const STATIC_MAP: PageContentMap = {
  about: aboutContent,
  events: eventsContent,
  gallery: galleryContent,
  partners: partnersContent,
  faq: faqContent,
  privacy: privacyContent,
  terms: termsContent,
  refund: refundContent,
  cookies: cookiesContent,
  contact: contactContent,
  founders: foundersContent,
};

export class StaticContentLoader implements ContentLoader {
  async get<K extends keyof PageContentMap>(slug: K): Promise<PageContentMap[K]> {
    return STATIC_MAP[slug];
  }
  getSync<K extends keyof PageContentMap>(slug: K): PageContentMap[K] {
    return STATIC_MAP[slug];
  }
}

import { supabase } from "@/integrations/supabase/client";

/**
 * Active Supabase Integration
 * Fetches the CMS blocks directly from Postgres tables, falling back to STATIC_MAP if missing.
 */
export class SupabaseContentLoader implements ContentLoader {
  async get<K extends keyof PageContentMap>(slug: K): Promise<PageContentMap[K]> {
    try {
      // 1. Try to fetch from Supabase
      const { data, error } = await supabase
        .from("pages")
        .select(
          `
          seo_metadata,
          page_blocks (
            block_type,
            content_jsonb
          )
        `,
        )
        .eq("slug", slug)
        .single();

      if (!error && data && data.page_blocks && data.page_blocks.length > 0) {
        // Reconstruct the page payload
        // This assumes your JSON matches the exact types for the frontend.
        // E.g., data.page_blocks is mapped to the PageContentMap.
        const payload: Record<string, unknown> = { meta: data.seo_metadata };
        data.page_blocks.forEach((block: { block_type: string; content_jsonb: unknown }) => {
          payload[block.block_type] = block.content_jsonb;
        });
        return payload as PageContentMap[K];
      }
    } catch (err) {
      // Logging removed for production
    }

    // Fallback to static JSON
    return STATIC_MAP[slug];
  }

  getSync<K extends keyof PageContentMap>(slug: K): PageContentMap[K] {
    // getSync cannot fetch from DB. Returns static data.
    return STATIC_MAP[slug];
  }
}

/** Default singleton. */
export const contentLoader: ContentLoader = new SupabaseContentLoader();
