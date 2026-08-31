import React from 'react';
import type { Metadata } from 'next';
import { ScheduledActionsView } from '@/features/crm/scheduled/ScheduledActionsView';

export const metadata: Metadata = {
  title: 'Scheduled Actions — CRM | OrigoHOST',
  description: 'Queue of automated follow-up reminders and scheduled outreach workflows.',
};

export default function ScheduledActionsPage() {
  return <ScheduledActionsView />;
}
