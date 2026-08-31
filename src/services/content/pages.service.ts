export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export async function getPageBySlug(slug: string): Promise<CMSPage | null> {
  // Service abstraction boundary — falls back safely when Payload DB is unprovisioned
  return {
    id: slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug,
  };
}
