import React from 'react';
import type { Metadata } from 'next';
import { AutomationsView } from '@/features/crm/automations/AutomationsView';

export const metadata: Metadata = {
  title: 'CRM Automations — CRM | OrigoHOST',
  description: 'Manage automated workflow rules, triggers, and contact pipeline actions.',
};

export default function AutomationsPage() {
  return <AutomationsView />;
}
