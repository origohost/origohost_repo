import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Building, Calendar, Award, Shield } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { Contact } from '@/types/crm';

interface ContactDetailViewProps {
  contact: Contact;
}

export function ContactDetailView({ contact }: ContactDetailViewProps) {
  const fn = contact.firstName || (contact as any).personalInfo?.firstName || 'Contact';
  const ln = contact.lastName || (contact as any).personalInfo?.lastName || '';
  const em = contact.email || (contact as any).personalInfo?.email || '—';
  const ph = contact.phone || (contact as any).personalInfo?.phone || '—';

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/crm/contacts" className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Contacts Directory
      </Link>

      <div className="p-6 rounded-card bg-surface border border-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Heading as="h1" size="xl" className="text-ink">{fn} {ln}</Heading>
            <Badge variant="primary" size="sm">{contact.status}</Badge>
          </div>
          <Text size="xs" variant="muted" className="mt-1">{contact.jobTitle || 'Ecosystem Member'} • Source: {contact.source}</Text>
        </div>
        <Link href={`/crm/contacts/${contact.id}/edit`} className="px-3.5 py-1.5 rounded-btn bg-primary text-white text-body-xs font-semibold">
          Edit Profile
        </Link>
      </div>

      <div className="p-6 rounded-card bg-surface border border-border space-y-4">
        <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Contact Details</Heading>
        <div className="grid grid-cols-2 gap-4 text-body-sm">
          <div>
            <span className="text-body-xs text-ink-muted block">Email</span>
            <span className="text-ink font-medium flex items-center gap-1 mt-0.5"><Mail className="h-3.5 w-3.5 text-primary" /> {em}</span>
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block">Phone</span>
            <span className="text-ink font-medium flex items-center gap-1 mt-0.5"><Phone className="h-3.5 w-3.5 text-primary" /> {ph}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
