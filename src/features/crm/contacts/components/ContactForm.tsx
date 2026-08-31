'use client';

import React from 'react';
import type { Contact } from '@/types/crm';

interface ContactFormProps {
  initialValues?: Partial<Contact>;
  onSubmit: (values: Partial<Contact>) => void;
  isEdit?: boolean;
}

export function ContactForm({ initialValues, onSubmit, isEdit }: ContactFormProps) {
  const [firstName, setFirstName] = React.useState(
    initialValues?.firstName || (initialValues as any)?.personalInfo?.firstName || ''
  );
  const [lastName, setLastName] = React.useState(
    initialValues?.lastName || (initialValues as any)?.personalInfo?.lastName || ''
  );
  const [email, setEmail] = React.useState(
    initialValues?.email || (initialValues as any)?.personalInfo?.email || ''
  );
  const [phone, setPhone] = React.useState(
    initialValues?.phone || (initialValues as any)?.personalInfo?.phone || ''
  );
  const [jobTitle, setJobTitle] = React.useState(
    initialValues?.jobTitle || (initialValues as any)?.professionalInfo?.roleTitle || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      status: initialValues?.status || 'Active',
      source: initialValues?.source || 'Direct Intake',
      tags: initialValues?.tags || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">First Name *</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
            placeholder="Arjun"
          />
        </div>
        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Last Name *</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
            placeholder="Mehta"
          />
        </div>
      </div>

      <div>
        <label className="block text-body-xs font-semibold text-ink mb-1">Email Address *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
          placeholder="arjun.mehta@example.com"
        />
      </div>

      <div>
        <label className="block text-body-xs font-semibold text-ink mb-1">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
          placeholder="+91 98765 43210"
        />
      </div>

      <div>
        <label className="block text-body-xs font-semibold text-ink mb-1">Job Title / Role</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink"
          placeholder="Campus Lead"
        />
      </div>

      <button type="submit" className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm shadow-xs">
        {isEdit ? 'Update Contact' : 'Create Contact'}
      </button>
    </form>
  );
}
