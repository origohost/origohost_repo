'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { createActivity } from '@/services/crm/activities.service';
import type { ActivityType } from '@/types/crm';

export default function NewActivityPage() {
  const router = useRouter();
  const [subject, setSubject] = React.useState('');
  const [type, setType] = React.useState<ActivityType>('Meeting');
  const [description, setDescription] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createActivity({ subject, type, description });
    if (res.success && res.data) {
      router.push(`/crm/activities/${res.data.id}`);
    } else {
      router.push('/crm/activities');
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <Link href="/crm/activities" className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Activity Log
      </Link>
      <CrmPageHeader title="Log New Activity" subtitle="Record a meeting, call, email, or task item." />

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-4">
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Activity Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ActivityType)}
            className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
          >
            <option value="Meeting" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Meeting</option>
            <option value="Call" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Call</option>
            <option value="Email" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Email</option>
            <option value="Note" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Note</option>
            <option value="Task" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Task</option>
          </select>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Subject *</label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
            placeholder="Keynote Speaker Briefing Call"
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Detailed Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
            placeholder="Summary of discussion points and action items..."
          />
        </div>

        <button type="submit" className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm shadow-xs">
          Record Activity
        </button>
      </form>
    </div>
  );
}
