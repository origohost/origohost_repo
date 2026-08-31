'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CrmPageHeader, LoadingState, ErrorState } from '@/features/crm/components';
import { ContactForm } from '@/features/crm/contacts/components/ContactForm';
import { getContactById, updateContact } from '@/services/crm/contacts.service';
import type { Contact } from '@/types/crm';

export default function EditContactPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [contact, setContact] = React.useState<Contact | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (id) {
      getContactById(id).then((res) => {
        if (res.data) {
          setContact(res.data);
        } else {
          setError('Contact record not found.');
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (values: Partial<Contact>) => {
    if (id) {
      const res = await updateContact(id, values);
      if (res.success) {
        router.push(`/crm/contacts/${id}`);
      }
    }
  };

  if (loading) return <LoadingState />;
  if (error || !contact) return <ErrorState title="Contact Not Found" message={error || undefined} />;

  const fn = contact.firstName || (contact as any).personalInfo?.firstName || 'Contact';
  const ln = contact.lastName || (contact as any).personalInfo?.lastName || '';

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/crm/contacts/${contact.id}`}
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Contact Profile
        </Link>
        <CrmPageHeader
          title={`Edit Profile — ${fn} ${ln}`}
          subtitle="Update personal information, organization linkages, and assigned roles."
        />
      </div>

      <ContactForm initialValues={contact} onSubmit={handleSubmit} isEdit />
    </div>
  );
}
