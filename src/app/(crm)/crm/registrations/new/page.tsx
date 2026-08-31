'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TicketPlus } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { createCrmRegistration } from '@/services/crm/registrations.service';
import type { RegistrationStatus } from '@/types/crm';

export default function NewRegistrationPage() {
  const router = useRouter();
  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [eventTitle, setEventTitle] = useState('KSS2026 — Episode 04: Cloud Infrastructure & DevOps Practices');
  const [ticketCategory, setTicketCategory] = useState('General Access');
  const [status, setStatus] = useState<RegistrationStatus>('Confirmed');
  const [checkedIn, setCheckedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantName.trim() || !participantEmail.trim()) return;
    setIsSubmitting(true);

    const res = await createCrmRegistration({
      participantName: participantName.trim(),
      participantEmail: participantEmail.trim(),
      organizationName: organizationName.trim(),
      eventTitle: eventTitle.trim(),
      ticketCategory: ticketCategory.trim(),
      status,
      checkedIn,
    });

    if (res.success) {
      router.push('/crm/registrations');
    } else {
      alert('Failed to create registration record.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/crm/registrations"
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Registrations Roster
        </Link>
        <CrmPageHeader
          title="Add Registration Record"
          subtitle="Issue an event pass or register an attendee for an upcoming webinar or hackathon."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Participant Name *</label>
            <input
              type="text"
              required
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Participant Email *</label>
            <input
              type="email"
              required
              value={participantEmail}
              onChange={(e) => setParticipantEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="rahul.sharma@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Organization / University</label>
          <input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g. IIT Delhi"
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Target Event</label>
          <input
            type="text"
            required
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Ticket Category / Tier</label>
            <input
              type="text"
              value={ticketCategory}
              onChange={(e) => setTicketCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="General Access, VIP Pass, Student Pass"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as RegistrationStatus)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Confirmed" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Confirmed</option>
              <option value="Attended" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Attended</option>
              <option value="Waitlisted" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Waitlisted</option>
              <option value="Cancelled" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="checkInCheck"
            checked={checkedIn}
            onChange={(e) => setCheckedIn(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="checkInCheck" className="text-body-xs font-semibold text-ink cursor-pointer">
            Mark as immediately checked-in upon creation
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <TicketPlus className="h-4 w-4" />
          {isSubmitting ? 'Issuing Ticket...' : 'Issue Event Registration'}
        </button>
      </form>
    </div>
  );
}
