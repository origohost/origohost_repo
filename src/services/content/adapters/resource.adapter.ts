import type { Resource } from '@/types';

export function mapResourceToDomain(data: any): Resource {
  return {
    id: data.id || data.slug,
    title: data.title || '',
    slug: data.slug || '',
    description: data.description || '',
    category: data.category || 'Guide',
    type: data.type || 'Internal',
    url: data.url || `/resources/${data.slug}`,
    focusAreas: data.focusAreas || [],
    tags: data.tags || [],
    featured: Boolean(data.featured),
    createdAt: data.createdAt || new Date().toISOString(),
  };
}
