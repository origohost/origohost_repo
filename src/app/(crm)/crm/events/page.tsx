import React from 'react';
import type { Metadata } from 'next';
import { getEvents } from '@/services/crm/events.service';
import { EventsView } from '@/features/crm/events/EventsView';
import type { Event } from '@/types';

export const metadata: Metadata = {
  title: 'Events Operations Roster — CRM | OrigoHOST',
  description: 'Manage institutional webinars, hackathons, campus workshops, speaker logistics, and attendee counts.',
};

export default async function EventsPage() {
  const result = await getEvents();
  const eventsList: Event[] = result.success && result.data ? (result.data as Event[]) : [];

  return <EventsView initialEvents={eventsList} />;
}
