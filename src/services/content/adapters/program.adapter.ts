import type { Program } from '@/types';

export function mapProgramToDomain(data: any): Program {
  return {
    id: data.id || data.slug,
    name: data.title || data.name || '',
    slug: data.slug || '',
    purpose: data.summary || data.purpose || '',
    description: data.description || '',
    audience: data.audience || [],
    focusAreas: data.focusAreas || [],
    status: data.status || 'Active',
    relatedEvents: data.relatedEvents || [],
    coverImage: typeof data.featuredImage === 'object' ? data.featuredImage?.url : data.featuredImage || '/images/programs/default.webp',
    tags: data.tags || [],
    featured: Boolean(data.featured),
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}
