import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { getEventBySlug, getEvents } from '@/services/events/events.service';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const events = await getEvents();
  const event = events.find((e) => e.id === id || e.slug === id);
  if (!event) return { title: 'Event Not Found — CRM' };
  return { title: `CRM Event Ops: ${event.title}` };
}

export default async function CrmEventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const events = await getEvents();
  const event = events.find((e) => e.id === id || e.slug === id);
  if (!event) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link href="/crm/events" className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Events Operations
        </Link>
        <Heading as="h1" size="xl">
          {event.title}
        </Heading>
      </div>

      <div className="p-6 rounded-card bg-surface border border-border space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <Badge variant="primary">{event.format}</Badge>
          <span className="text-body-xs text-ink-muted">Date: {event.startDate}</span>
        </div>
        <p className="text-body-sm text-ink-secondary leading-relaxed">{event.summary}</p>
        <div className="flex gap-4 pt-3">
          <Link href={`/crm/events/${event.id}/attendees`} className="px-4 py-2 rounded-btn bg-primary text-white font-semibold text-body-xs shadow-xs">
            View Attendee Manifest
          </Link>
        </div>
      </div>
    </div>
  );
}
