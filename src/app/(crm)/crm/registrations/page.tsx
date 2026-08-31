import React from 'react';
import type { Metadata } from 'next';
import { getCrmRegistrations } from '@/services/crm/registrations.service';
import { RegistrationsView } from '@/features/crm/registrations/RegistrationsView';
import type { CrmRegistrationItem } from '@/types/crm';

export const metadata: Metadata = {
  title: 'Event Registrations & Live Check-ins — CRM | OrigoHOST',
  description: 'Manage event registration rosters, live check-ins, and ticket tier confirmations.',
};

export default async function RegistrationsPage() {
  const result = await getCrmRegistrations();
  const list: CrmRegistrationItem[] = result.success && result.data ? (result.data as CrmRegistrationItem[]) : [];

  return <RegistrationsView initialRegistrations={list} />;
}
