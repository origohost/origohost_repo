import React from 'react';
import type { Metadata } from 'next';
import { ExportsView } from '@/features/crm/exports/ExportsView';

export const metadata: Metadata = {
  title: 'Data Export — CRM | OrigoHOST',
  description: 'Export CRM datasets safely to CSV format with audit trail logging.',
};

export default function ExportsPage() {
  return <ExportsView />;
}
