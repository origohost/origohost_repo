'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookPlus } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { createProgram } from '@/services/crm/programs.service';

export default function NewProgramPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Active' | 'Upcoming' | 'Completed'>('Active');
  const [focusAreasInput, setFocusAreasInput] = useState('');
  const [audienceInput, setAudienceInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const focusAreas = focusAreasInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const audience = audienceInput
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const res = await createProgram({
      name: name.trim(),
      slug,
      purpose: purpose.trim(),
      description: description.trim(),
      status,
      focusAreas,
      audience: audience.length > 0 ? audience : ['Students', 'Developers'],
    });

    if (res.success) {
      router.push('/crm/programs');
    } else {
      alert('Failed to create program.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/crm/programs"
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Programs Track Roster
        </Link>
        <CrmPageHeader
          title="Create Educational Track"
          subtitle="Establish a new knowledge series, AI foundation program, or technical workshop track."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Program Track Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g. Open Source Architecture Masterclass 2026"
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Core Purpose / Mission</label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="One-line mission statement of the track..."
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Detailed Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="Comprehensive description of curriculum, series structure, and learning outcomes..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Active' | 'Upcoming' | 'Completed')}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Active" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Active</option>
              <option value="Upcoming" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Upcoming</option>
              <option value="Completed" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Target Audience (comma-separated)</label>
            <input
              type="text"
              value={audienceInput}
              onChange={(e) => setAudienceInput(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Students, Developers, Researchers"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Focus Areas (comma-separated)</label>
          <input
            type="text"
            value={focusAreasInput}
            onChange={(e) => setFocusAreasInput(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Cybersecurity, AI/ML, Cloud Infrastructure"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <BookPlus className="h-4 w-4" />
          {isSubmitting ? 'Creating Track...' : 'Create Program Track'}
        </button>
      </form>
    </div>
  );
}
