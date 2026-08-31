import React from 'react';
import type { Metadata } from 'next';
import { TemplatesView } from '@/features/crm/templates/TemplatesView';

export const metadata: Metadata = {
  title: 'Communication Templates — CRM | OrigoHOST',
  description: 'Manage reusable email and notification templates for outreach workflows.',
};

export default function TemplatesPage() {
  return <TemplatesView />;
}
