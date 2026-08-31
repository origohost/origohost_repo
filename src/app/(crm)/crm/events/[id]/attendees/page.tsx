import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { getCrmRegistrations } from '@/services/crm';

export const metadata: Metadata = {
  title: 'Event Attendees Manifest — CRM',
};

export default async function EventAttendeesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getCrmRegistrations(undefined, undefined, id);
  const registrations = res.success && res.data ? res.data : [];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link href="/crm/events" className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Events
        </Link>
        <Heading as="h1" size="xl">
          Event Attendee Manifest
        </Heading>
      </div>

      <div className="p-6 rounded-card bg-surface border border-border">
        <div className="divide-y divide-border/60">
          {registrations.map((reg) => (
            <div key={reg.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-body-sm text-ink">{reg.participantName}</span>
                <span className="text-body-xs text-ink-muted block">{reg.participantEmail}</span>
              </div>
              <Badge variant={reg.checkedIn ? 'success' : 'info'} size="sm">
                {reg.checkedIn ? 'Checked In' : 'Registered'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
