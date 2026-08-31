import type { Event } from '@/types';
import { events as seedEvents } from '@/data/events/events.data';
import type { BaseRepositoryContract } from './base.repository';

class EventsRepositoryImpl implements BaseRepositoryContract<Event> {
  private eventsStore: Event[] = [...seedEvents];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<Event[]> {
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
    return this.eventsStore.find((e) => e.id === id || e.slug === id) || null;
  }

  async create(data: Partial<Event>): Promise<Event> {
    const newEvent: Event = {
      id: data.id || `evt-${Date.now()}`,
      slug: data.slug || `event-${Date.now()}`,
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
