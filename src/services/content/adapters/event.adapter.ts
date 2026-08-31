import type { Event } from '@/types';

export function mapEventToDomain(data: any): Event {
  return {
    id: data.id || data.slug,
    title: data.title || '',
    slug: data.slug || '',
    summary: data.summary || data.description || '',
    description: data.description || '',
    type: data.type || 'Open Community',
    format: data.format || 'Meetup',
    purpose: data.purpose || ['Learn'],
    delivery: data.eventType === 'IN_PERSON' ? 'Offline' : data.eventType === 'HYBRID' ? 'Hybrid' : 'Online',
    status: data.status || 'Upcoming',
    startDate: data.date || data.startDate || new Date().toISOString(),
    endDate: data.endDate,
    location: {
      name: data.location || 'Online Platform',
      country: 'India',
    },
    audience: data.audience || [],
    focusAreas: data.focusAreas || [],
    registrationUrl: `/events/${data.slug}`,
    coverImage: typeof data.featuredImage === 'object' ? data.featuredImage?.url : data.featuredImage || '/images/events/default.webp',
    tags: data.tags || [],
    featured: Boolean(data.featured),
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}
