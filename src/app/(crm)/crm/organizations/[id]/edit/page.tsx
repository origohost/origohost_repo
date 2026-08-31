'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { CrmPageHeader, LoadingState } from '@/features/crm/components';
import { getOrganizationById, updateOrganization } from '@/services/crm/organizations.service';
import type { OrganizationType, OrganizationStatus } from '@/types/crm';

export default function EditOrganizationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [name, setName] = useState('');
  const [type, setType] = useState<OrganizationType>('University');
  const [status, setStatus] = useState<OrganizationStatus>('Active');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      getOrganizationById(id).then((res) => {
        if (res.data) {
          setName(res.data.name);
          setType(res.data.type || 'University');
          setStatus(res.data.status || 'Active');
          setIndustry(res.data.industry || '');
          setEmail(res.data.email || '');
          setPhone(res.data.phone || '');
          setWebsite(res.data.website || '');
          setNotes(res.data.notes || '');
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name.trim()) return;
    setIsSubmitting(true);

    await updateOrganization(id, {
      name: name.trim(),
      type,
      status,
      industry: industry.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: website.trim(),
      notes: notes.trim(),
    });

    router.push(`/crm/organizations/${id}`);
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href={`/crm/organizations/${id}`}
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Profile
        </Link>
        <CrmPageHeader
          title={`Edit Organization — ${name}`}
          subtitle="Update institutional parameters, contact details, and partnership notes."
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
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Contact Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
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
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Operational Notes / History</label>
          <textarea
            rows={3}
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
          {isSubmitting ? 'Saving Changes...' : 'Save Organization Changes'}
        </button>
      </form>
    </div>
  );
}
