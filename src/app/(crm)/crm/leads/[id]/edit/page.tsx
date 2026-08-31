'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { CrmPageHeader, LoadingState } from '@/features/crm/components';
import { getLeadById, updateLead } from '@/services/crm/leads.service';
import type { LeadStatus, LeadPriority } from '@/types/crm';

export default function EditLeadPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState('');
  const [source, setSource] = useState('Website Intake');
  const [status, setStatus] = useState<LeadStatus>('NEW');
  const [priority, setPriority] = useState<LeadPriority>('Medium');
  const [estimatedValue, setEstimatedValue] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      getLeadById(id).then((res) => {
        if (res.data) {
          setTitle(res.data.title);
          setSource(res.data.source || 'Website Intake');
          setStatus(res.data.status || 'NEW');
          setPriority(res.data.priority || 'Medium');
          setEstimatedValue(res.data.estimatedValue || '');
          setNotes(res.data.notes || '');
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !title.trim()) return;
    setIsSubmitting(true);

    await updateLead(id, {
      title: title.trim(),
      source,
      status,
      priority,
      estimatedValue: Number(estimatedValue) || 0,
      notes: notes.trim(),
    });

    router.push(`/crm/leads/${id}`);
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href={`/crm/leads/${id}`}
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Lead Profile
        </Link>
        <CrmPageHeader
          title={`Edit Lead — ${title}`}
          subtitle="Update inquiry stage, priority level, estimated deal value, or notes."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Lead Inquiry Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Intake Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Website Intake" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Website Intake</option>
              <option value="Event Registration" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Event Registration</option>
              <option value="Campus Chapter Form" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Campus Chapter Form</option>
              <option value="Partnership Inquiry" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Partnership Inquiry</option>
              <option value="Direct Inquiry" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Direct Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Pipeline Stage Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="NEW" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">NEW</option>
              <option value="CONTACTED" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">CONTACTED</option>
              <option value="QUALIFIED" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">QUALIFIED</option>
              <option value="PROPOSAL" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">PROPOSAL</option>
              <option value="CONVERTED" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">CONVERTED</option>
              <option value="LOST" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">LOST</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as LeadPriority)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Low" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Low</option>
              <option value="Medium" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Medium</option>
              <option value="High" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">High</option>
              <option value="Urgent" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Estimated Value (₹ INR)</label>
            <input
              type="number"
              min="0"
              step="1000"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Inquiry Details / Notes</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? 'Saving Changes...' : 'Save Lead Changes'}
        </button>
      </form>
    </div>
  );
}
