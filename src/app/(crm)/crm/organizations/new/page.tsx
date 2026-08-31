'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, Plus } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { createOrganization } from '@/services/crm/organizations.service';
import type { OrganizationType, OrganizationStatus } from '@/types/crm';

export default function NewOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState<OrganizationType>('University');
  const [status, setStatus] = useState<OrganizationStatus>('Active');
  const [industry, setIndustry] = useState('Technology & Engineering');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);

    const res = await createOrganization({
      name: name.trim(),
      type,
      status,
      industry: industry.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: website.trim(),
      notes: notes.trim(),
    });

    if (res.success && res.data) {
      router.push(`/crm/organizations/${res.data.id}`);
    } else {
      router.push('/crm/organizations');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/crm/organizations"
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Organizations
        </Link>
        <CrmPageHeader
          title="Add New Organization"
          subtitle="Register a partner university, corporate sponsor, startup, or community chapter."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Organization Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g. Delhi Technological University"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Organization Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as OrganizationType)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="University" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">University</option>
              <option value="Enterprise" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Enterprise</option>
              <option value="Startup" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Startup</option>
              <option value="Community" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Community</option>
              <option value="Sponsor" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Sponsor</option>
              <option value="Partner" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Partner</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Relationship Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrganizationStatus)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Active" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Active</option>
              <option value="Partner" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Partner</option>
              <option value="Prospect" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Prospect</option>
              <option value="Inactive" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Inactive</option>
              <option value="Archived" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Industry / Focus Area</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g. Cybersecurity, Higher Education, Cloud Compute"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Institutional Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="chapters@university.edu"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Contact Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="+91 11 2787 1018"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Website URL</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="https://university.edu"
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Operational Notes / Chapter History</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="Key contact persons, sponsorship terms, hackathon commitments, or campus chapter lead details..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {isSubmitting ? 'Creating Organization...' : 'Create Organization'}
        </button>
      </form>
    </div>
  );
}
