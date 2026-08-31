'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Calendar,
  Plus,
  Trash2,
  Edit3,
  Filter,
  MapPin,
  Clock,
  Video,
  Award,
  Users,
  ArrowRight,
  Tag,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { Event } from '@/types';
import { deleteEvent } from '@/services/crm/events.service';

interface EventsViewProps {
  initialEvents: Event[];
}

const statusOptions = ['All Statuses', 'Upcoming', 'Past', 'Ongoing'];
const formatOptions = ['All Formats', 'Webinar', 'Hackathon', 'Workshop', 'Conference'];

export function EventsView({ initialEvents }: EventsViewProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [formatFilter, setFormatFilter] = useState('All Formats');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => {
    const matchesStatus = statusFilter === 'All Statuses' || e.status === statusFilter;
    const matchesFormat = formatFilter === 'All Formats' || e.format === formatFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      e.title.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q));

    return matchesStatus && matchesFormat && matchesSearch;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete event "${title}"?`)) return;
    setDeletingId(id);
    const res = await deleteEvent(id);
    if (res.success) {
      setEvents((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert('Failed to delete event.');
    }
    setDeletingId(null);
  };

  const totalEvents = events.length;
  const upcomingCount = events.filter((e) => e.status === 'Upcoming').length;
  const hackathonsCount = events.filter((e) => e.format === 'Hackathon').length;
  const webinarsCount = events.filter((e) => e.format === 'Webinar').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// EVENTS MANAGEMENT'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Events Operations & Logistics
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Manage institutional webinars, developer hackathons, campus workshops, and summits.
          </Text>
        </div>
        <Link
          href="/crm/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </Link>
      </div>

      {/* Metrics Cards Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Events</span>
            <span className="text-heading-sm font-bold text-ink">{totalEvents} Events</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Upcoming Sessions</span>
            <span className="text-heading-sm font-bold text-ink">{upcomingCount} Events</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-amber/10 text-accent-amber">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Hackathons</span>
            <span className="text-heading-sm font-bold text-ink">{hackathonsCount} Competitions</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-blue/10 text-accent-blue">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">KSS Webinars</span>
            <span className="text-heading-sm font-bold text-ink">{webinarsCount} Webinars</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by event title, summary, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-ink-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {formatOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
          <Calendar className="h-10 w-10 text-ink-muted mx-auto" />
          <Heading as="h3" size="sm" className="text-ink">
            No Operational Events Found
          </Heading>
          <Text size="xs" variant="muted">
            Try adjusting your search query or filters.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-card bg-surface border border-border shadow-xs space-y-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <Heading as="h3" size="sm" className="text-ink font-bold leading-snug">
                      {event.title}
                    </Heading>
                    <span className="text-body-xs text-ink-muted block mt-0.5 font-mono">
                      {event.startDate} • {event.delivery}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={event.format === 'Hackathon' ? 'warning' : 'primary'} size="sm">
                      {event.format}
                    </Badge>
                    <Badge variant={event.status === 'Upcoming' ? 'success' : 'info'} size="sm">
                      {event.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-body-xs text-ink-secondary leading-relaxed line-clamp-2 my-3">
                  {event.summary}
                </p>

                <div className="space-y-1.5 text-body-xs text-ink-muted bg-surface-elevated p-3 rounded-lg border border-border/60">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> {event.location.name}
                  </span>
                  {event.focusAreas && event.focusAreas.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-primary shrink-0" /> {event.focusAreas.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <span className="text-body-xs font-mono text-ink-muted">
                  ID: {event.id}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(event.id, event.title)}
                    disabled={deletingId === event.id}
                    className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors disabled:opacity-50"
                    title="Delete Event"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/events/${event.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-primary font-semibold text-body-xs hover:underline ml-1"
                  >
                    Public Page <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
