import React from 'react';
import type { Metadata } from 'next';
import { getLeads } from '@/services/crm/leads.service';
import { LeadsView } from '@/features/crm/leads/LeadsView';
import type { Lead } from '@/types/crm';

export const metadata: Metadata = {
  title: 'Inbound Leads Pipeline — CRM | OrigoHOST',
  description: 'Track website intake inquiries, campus chapter applications, event leads, and partnership prospects.',
};

export default async function LeadsPage() {
  const result = await getLeads();
  const leads: Lead[] = result.success && result.data ? (result.data as Lead[]) : [];

  return <LeadsView initialLeads={leads} />;
}
