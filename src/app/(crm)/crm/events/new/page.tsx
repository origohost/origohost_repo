'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CalendarPlus } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { createEvent } from '@/services/crm/events.service';
import type { EventType, EventFormat, EventDelivery, EventStatus } from '@/types';

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [type, setType] = useState<EventType>('Open Community');
  const [format, setFormat] = useState<EventFormat>('Webinar');
  const [delivery, setDelivery] = useState<EventDelivery>('Online');
  const [status, setStatus] = useState<EventStatus>('Upcoming');
  const [startDate, setStartDate] = useState('');
  const [locationName, setLocationName] = useState('Online — Zoom');
  const [tagsInput, setTagsInput] = useState('');
  const [focusAreasInput, setFocusAreasInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate) return;
    setIsSubmitting(true);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const focusAreas = focusAreasInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const res = await createEvent({
      title: title.trim(),
      slug,
      summary: summary.trim(),
      type,
      format,
      delivery,
      status,
      startDate,
      location: { name: locationName.trim() },
      tags,
      focusAreas,
      purpose: ['Learn', 'Build'],
    });

    if (res.success) {
      router.push('/crm/events');
    } else {
      alert('Failed to create event.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/crm/events"
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Events Roster
        </Link>
        <CrmPageHeader
          title="Create Operational Event"
          subtitle="Schedule a webinar, hackathon, workshop, or campus chapter meetup."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Event Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g. KSS2026 — Episode 06: Distributed Microservices"
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Event Summary / Overview</label>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="Brief operational description of session content, target audience, and goals..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as EventFormat)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Webinar" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Webinar</option>
              <option value="Hackathon" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Hackathon</option>
              <option value="Workshop" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Workshop</option>
              <option value="Conference" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Conference</option>
              <option value="Meetup" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Meetup</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Delivery Mode</label>
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value as EventDelivery)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Online" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Online</option>
              <option value="Offline" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Offline</option>
              <option value="Hybrid" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as EventStatus)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Upcoming" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Upcoming</option>
              <option value="Past" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Past</option>
              <option value="Ongoing" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Ongoing</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Start Date *</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Location / Platform Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Online — Zoom or GL Bajaj Auditorium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Focus Areas (comma-separated)</label>
            <input
              type="text"
              value={focusAreasInput}
              onChange={(e) => setFocusAreasInput(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="System Design, Microservices, Cloud"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="kss2026, backend, webinar"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <CalendarPlus className="h-4 w-4" />
          {isSubmitting ? 'Creating Event...' : 'Create Operational Event'}
        </button>
      </form>
    </div>
  );
}
