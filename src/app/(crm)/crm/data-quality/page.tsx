import React from 'react';
import type { Metadata } from 'next';
import { DataQualityView } from '@/features/crm/dataquality/DataQualityView';

export const metadata: Metadata = {
  title: 'Data Quality & Duplicates — CRM | OrigoHOST',
  description: 'Detect duplicate records, resolve matching contacts, and manage data governance.',
};

export default function DataQualityPage() {
  return <DataQualityView />;
}
