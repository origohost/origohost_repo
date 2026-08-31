import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getContactById } from '@/services/crm/contacts.service';
import { ContactDetails } from '@/features/crm/contacts/components/ContactDetails';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await getContactById(id);
  if (!res.data) return { title: 'Contact Not Found — CRM' };
  const fn = res.data.firstName || (res.data as any).personalInfo?.firstName || 'Contact';
  const ln = res.data.lastName || (res.data as any).personalInfo?.lastName || '';
  return {
    title: `${fn} ${ln} — Contact Profile`,
  };
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getContactById(id);
  if (!res.data) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/crm/contacts"
        className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Contacts Directory
      </Link>
      <ContactDetails contact={res.data} />
    </div>
  );
}
