import type { CMSPage } from '../pages.service';

export function mapPageToDomain(data: any): CMSPage {
  return {
    id: data.id || data.slug,
    title: data.title || '',
    slug: data.slug || '',
    content: data.content || '',
    seo: data.seo ? {
      metaTitle: data.seo.metaTitle,
      metaDescription: data.seo.metaDescription,
      canonicalUrl: data.seo.canonicalUrl,
    } : undefined,
  };
}
