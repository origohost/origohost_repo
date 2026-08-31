import { EventsRepository } from '@/repositories/crm/events.repository';
import type { Event, EventDelivery, EventFormat, EventStatus } from '@/types';

export interface EventFilterOptions {
  status?: EventStatus | 'All';
  delivery?: EventDelivery | 'All';
  format?: EventFormat | 'All';
  search?: string;
  limit?: number;
}

/**
 * Retrieves all events matching optional filter criteria from authoritative EventsRepository.
 */
export async function getEvents(options: EventFilterOptions = {}): Promise<Event[]> {
  const allEvents = await EventsRepository.findAll(options.search, {
    status: options.status,
    format: options.format,
  });

  let filtered = [...allEvents];

  if (options.delivery && options.delivery !== 'All') {
    filtered = filtered.filter((e) => e.delivery === options.delivery);
  }

  if (options.limit && options.limit > 0) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

/**
 * Retrieves a single event by its unique URL slug or ID from EventsRepository.
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  return EventsRepository.findById(slug);
}

/**
 * Retrieves featured events for home and discovery highlights from EventsRepository.
 */
export async function getFeaturedEvents(limit = 3): Promise<Event[]> {
  const allEvents = await EventsRepository.findAll();
  const featured = allEvents.filter((e) => e.featured);
  return featured.slice(0, limit);
}


/**
 * Retrieves upcoming events sorted by date.
 */
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  return getEvents({ status: 'Upcoming', limit });
}

/**
 * Retrieves past completed events.
 */
export async function getPastEvents(limit?: number): Promise<Event[]> {
  return getEvents({ status: 'Past', limit });
}
