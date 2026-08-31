import React from 'react';
import type { Metadata } from 'next';
import { SettingsView } from '@/features/crm/settings/SettingsView';

export const metadata: Metadata = {
  title: 'CRM Settings & Administration — CRM | OrigoHOST',
  description: 'Configure operator permissions, audit logging thresholds, lead intake defaults, and security boundaries.',
};

export default function SettingsPage() {
  return <SettingsView />;
}
