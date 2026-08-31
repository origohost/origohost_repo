import type { Event, EventFormat, EventStatus, EventDelivery } from '@/types';
import { events as seedEvents } from '@/data/events/events.data';
import type { BaseRepositoryContract } from './base.repository';
import { SupabaseAdapter } from './adapters/supabase.adapter';
import type { Database } from '@/types/database.types';

type EventRow = Database['public']['Tables']['events']['Row'];

function mapRowToEvent(row: EventRow): Event {
  const formatMap: Record<string, EventFormat> = {
    Virtual: 'Webinar',
    'In-Person': 'Meetup',
    Hybrid: 'Hackathon',
    Webinar: 'Webinar',
    Meetup: 'Meetup',
    Workshop: 'Workshop',
    Hackathon: 'Hackathon',
  };

  const statusMap: Record<string, EventStatus> = {
    Upcoming: 'Upcoming',
    Live: 'Ongoing',
    Ongoing: 'Ongoing',
    Completed: 'Past',
    Past: 'Past',
    Cancelled: 'Cancelled',
    Draft: 'Upcoming',
  };

  const deliveryMap: Record<string, EventDelivery> = {
    Virtual: 'Online',
    'In-Person': 'Offline',
    Hybrid: 'Hybrid',
  };

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description || '',
    type: 'Open Community',
    format: formatMap[row.format] || 'Webinar',
    purpose: ['Learn'],
    delivery: deliveryMap[row.format] || 'Online',
    status: statusMap[row.status] || 'Upcoming',
    startDate: row.start_date,
    endDate: row.end_date,
    location: { name: row.location || 'Online' },
    registrationUrl: row.registration_url || undefined,
    audience: ['Developers'],
    focusAreas: ['Technology'],
    tags: row.tags || ['event'],
    coverImage: '/images/events/kss2026-ep03.webp',
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class EventsRepositoryImpl implements BaseRepositoryContract<Event> {
  private eventsStore: Event[] = [...seedEvents];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<Event[]> {
    if (SupabaseAdapter.isConfigured()) {
      const res = await SupabaseAdapter.queryTable<EventRow>('events');
      if (res.data && res.data.length > 0) {
        let events = res.data.map(mapRowToEvent);
        if (filter?.status && filter.status !== 'All Statuses' && filter.status !== 'All') {
          events = events.filter((e) => e.status === filter.status);
        }
        if (filter?.format && filter.format !== 'All Formats' && filter.format !== 'All') {
          events = events.filter((e) => e.format === filter.format);
        }
        if (query) {
          const q = query.toLowerCase();
          events = events.filter(
            (e) =>
              e.title.toLowerCase().includes(q) ||
              e.summary.toLowerCase().includes(q) ||
              e.tags.some((t) => t.toLowerCase().includes(q))
          );
        }
        return events;
      }
    }

    // Fallback to memory store if Supabase is offline or empty
    let result = [...this.eventsStore];
    if (filter?.status && filter.status !== 'All Statuses' && filter.status !== 'All') {
      result = result.filter((e) => e.status === filter.status);
    }
    if (filter?.format && filter.format !== 'All Formats' && filter.format !== 'All') {
      result = result.filter((e) => e.format === filter.format);
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<Event | null> {
    if (SupabaseAdapter.isConfigured()) {
      const res = await SupabaseAdapter.queryTable<EventRow>('events', '*', { id: `eq.${id}` });
      if (res.data && res.data[0]) {
        return mapRowToEvent(res.data[0]);
      }
    }

    return this.eventsStore.find((e) => e.id === id || e.slug === id) || null;
  }

  async create(data: Partial<Event>): Promise<Event> {
    const eventId = data.id || `evt-${Date.now()}`;
    const slug = data.slug || `event-${Date.now()}`;

    if (SupabaseAdapter.isConfigured()) {
      const row = {
        id: eventId,
        slug,
        title: data.title || 'New Event',
        summary: data.summary || '',
        description: data.description || '',
        start_date: data.startDate || new Date().toISOString(),
        end_date: data.endDate || new Date().toISOString(),
        format: data.format || 'Virtual',
        status: data.status || 'Upcoming',
        location: typeof data.location === 'object' ? data.location?.name : (data.location || 'Online'),
        registration_url: data.registrationUrl || null,
        capacity: 100,
        featured: Boolean(data.featured),
        tags: data.tags || ['event'],
      };

      const res = await SupabaseAdapter.insertRow<EventRow>('events', row);
      if (res.data) {
        const created = mapRowToEvent(res.data);
        this.eventsStore.unshift(created);
        return created;
      }
    }

    const newEvent: Event = {
      id: eventId,
      slug,
      title: data.title || 'New Community Event',
      summary: data.summary || '',
      type: data.type || 'Open Community',
      format: data.format || 'Webinar',
      purpose: data.purpose || ['Learn'],
      delivery: data.delivery || 'Online',
      status: data.status || 'Upcoming',
      startDate: data.startDate || new Date().toISOString().slice(0, 10),
      location: data.location || { name: 'Online' },
      audience: data.audience || ['Developers'],
      focusAreas: data.focusAreas || ['Technology'],
      tags: data.tags || ['event'],
      coverImage: data.coverImage || '/images/events/kss2026-ep03.webp',
      featured: Boolean(data.featured),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.eventsStore.unshift(newEvent);
    return newEvent;
  }

  async update(id: string, data: Partial<Event>): Promise<Event> {
    if (SupabaseAdapter.isConfigured()) {
      const updates: Record<string, unknown> = {};
      if (data.title !== undefined) updates.title = data.title;
      if (data.summary !== undefined) updates.summary = data.summary;
      if (data.description !== undefined) updates.description = data.description;
      if (data.format !== undefined) updates.format = data.format;
      if (data.status !== undefined) updates.status = data.status;
      if (data.featured !== undefined) updates.featured = data.featured;
      if (data.tags !== undefined) updates.tags = data.tags;

      const res = await SupabaseAdapter.updateRow<EventRow>('events', id, updates);
      if (res.data) {
        const updated = mapRowToEvent(res.data);
        const idx = this.eventsStore.findIndex((e) => e.id === id || e.slug === id);
        if (idx !== -1) this.eventsStore[idx] = updated;
        return updated;
      }
    }

    const idx = this.eventsStore.findIndex((e) => e.id === id || e.slug === id);
    if (idx === -1) throw new Error(`Event ${id} not found`);

    const updated = {
      ...this.eventsStore[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.eventsStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    if (SupabaseAdapter.isConfigured()) {
      await SupabaseAdapter.deleteRow('events', id);
    }
    const idx = this.eventsStore.findIndex((e) => e.id === id || e.slug === id);
    if (idx === -1) return false;
    this.eventsStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const EventsRepository = new EventsRepositoryImpl();
