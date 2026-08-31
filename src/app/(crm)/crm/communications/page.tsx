import React from 'react';
import type { Metadata } from 'next';
import { getCrmCommunications, getEmailTemplates } from '@/services/crm/communications.service';
import { CommunicationsView } from '@/features/crm/communications/CommunicationsView';
import type { CrmCommunicationItem, EmailTemplate } from '@/types/crm';

export const metadata: Metadata = {
  title: 'Communications & Email Hub — CRM | OrigoHOST',
  description: 'Outreach campaigns, email template management, and broadcast logging.',
};

export default async function CommunicationsPage() {
  const [commsRes, tplRes] = await Promise.all([getCrmCommunications(), getEmailTemplates()]);

  const commsList: CrmCommunicationItem[] = commsRes.success && commsRes.data ? (commsRes.data as CrmCommunicationItem[]) : [];
  const tplList: EmailTemplate[] = tplRes.success && tplRes.data ? (tplRes.data as EmailTemplate[]) : [];

  return <CommunicationsView initialComms={commsList} initialTemplates={tplList} />;
}
