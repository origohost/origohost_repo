'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CrmPageHeader } from '@/features/crm/components';
import { ContactForm } from '@/features/crm/contacts/components/ContactForm';
import { createContact } from '@/services/crm/contacts.service';
import type { CrmContact } from '@/types/crm';

export default function NewContactPage() {
  const router = useRouter();

  const handleSubmit = async (values: Partial<CrmContact>) => {
    const res = await createContact(values);
    if (res.success && res.data) {
      router.push(`/crm/contacts/${res.data.id}`);
    } else {
      router.push('/crm/contacts');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/crm/contacts"
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Contacts Directory
        </Link>
        <CrmPageHeader title="New Ecosystem Contact" subtitle="Add a new participant, speaker, mentor, or partner record." />
      </div>

      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
}
