import React from 'react';
import type { Metadata } from 'next';
import { ImportsView } from '@/features/crm/imports/ImportsView';

export const metadata: Metadata = {
  title: 'Data Import — CRM | OrigoHOST',
  description: 'Ingest contacts, leads, and organizations via CSV file upload.',
};

export default function ImportsPage() {
  return <ImportsView />;
}
