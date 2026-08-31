import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Plus, MapPin, Users, ArrowRight } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Events Control — Admin Control Center | OrigoHOST',
};

const mockAdminEvents = [
  { id: 'evt-01', title: 'KSS2026 — Episode 04: Cloud Infrastructure', format: 'Webinar', status: 'Upcoming', registrations: 412, location: 'Online — Zoom' },
  { id: 'evt-02', title: 'CyberForge 2026 — Cybersecurity Hackathon', format: 'Hackathon', status: 'Past', registrations: 248, location: 'GL Bajaj Institute' },
  { id: 'evt-03', title: 'Generative AI Workshop 2026', format: 'Workshop', status: 'Upcoming', registrations: 189, location: 'Bengaluru Hub' },
];

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-border/60 pb-5">
        <div>
          <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
            Platform Events & Master Roster
          </Heading>
          <Text size="md" variant="secondary" className="mt-1">
            Global management for webinars, campus hackathons, attendee capacity, and platform publishing.
          </Text>
        </div>
        <Link
          href="/crm/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-body-sm shadow-xs hover:bg-brand-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" /> Create Platform Event
        </Link>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#0B1628] border-b border-[#E2E8F0] dark:border-border/60 text-[11px] font-mono font-bold text-foreground-muted uppercase tracking-wider">
                <th className="py-3.5 px-4">Event Title</th>
                <th className="py-3.5 px-4">Format</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Location / Venue</th>
                <th className="py-3.5 px-4">Registrations</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-border/60 text-body-sm">
              {mockAdminEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0B1628]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{evt.title}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="primary" size="sm">
                      {evt.format}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={evt.status === 'Upcoming' ? 'success' : 'info'} size="sm">
                      {evt.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-body-xs text-foreground-muted">{evt.location}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{evt.registrations} Attendees</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/crm/events"
                      className="px-3 py-1 rounded-lg text-body-xs font-semibold bg-surface-elevated text-foreground hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      Manage Logistics
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
