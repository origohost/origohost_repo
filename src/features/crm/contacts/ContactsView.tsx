'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Mail, ArrowRight } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { Contact } from '@/types/crm';

interface ContactsViewProps {
  initialContacts: Contact[];
}

export function ContactsView({ initialContacts }: ContactsViewProps) {
  const [search, setSearch] = useState('');

  const filteredContacts = initialContacts.filter((c) => {
    const q = search.toLowerCase();
    const fn = c.firstName || (c as any).personalInfo?.firstName || '';
    const ln = c.lastName || (c as any).personalInfo?.lastName || '';
    const em = c.email || (c as any).personalInfo?.email || '';

    return !search || fn.toLowerCase().includes(q) || ln.toLowerCase().includes(q) || em.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <Heading as="h1" size="xl" className="tracking-tight">
            Contacts & Ecosystem Directory
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Directory of participants, volunteers, speakers, mentors, partners, and sponsors.
          </Text>
        </div>
        <Link
          href="/crm/contacts/new"
          className="px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          + Add New Contact
        </Link>
      </div>

      <div className="flex items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="rounded-card bg-surface border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-elevated border-b border-border text-body-xs font-bold text-ink-muted uppercase tracking-wider">
                <th className="py-3.5 px-5">Name & Email</th>
                <th className="py-3.5 px-5">Job Title / Role</th>
                <th className="py-3.5 px-5">Source</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-body-sm">
              {filteredContacts.map((contact) => {
                const fn = contact.firstName || (contact as any).personalInfo?.firstName || 'Contact';
                const ln = contact.lastName || (contact as any).personalInfo?.lastName || '';
                const em = contact.email || (contact as any).personalInfo?.email || '—';

                return (
                  <tr key={contact.id} className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="py-4 px-5">
                      <Link href={`/crm/contacts/${contact.id}`} className="font-bold text-ink hover:text-primary transition-colors block">
                        {fn} {ln}
                      </Link>
                      <span className="text-body-xs text-ink-muted flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3 shrink-0" /> {em}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-medium text-ink">
                      {contact.jobTitle || 'Member'}
                    </td>
                    <td className="py-4 px-5 text-body-xs text-ink-muted">
                      {contact.source || 'Direct Intake'}
                    </td>
                    <td className="py-4 px-5">
                      <Badge variant={contact.status === 'Active' ? 'success' : 'info'} size="sm">
                        {contact.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link href={`/crm/contacts/${contact.id}`} className="inline-flex items-center gap-1 text-primary font-semibold text-body-xs hover:underline">
                        View Profile <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
