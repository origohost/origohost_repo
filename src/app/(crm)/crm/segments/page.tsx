import React from 'react';
import type { Metadata } from 'next';
import { SegmentsView } from '@/features/crm/segments/SegmentsView';

export const metadata: Metadata = {
  title: 'Contact Segmentation — CRM | OrigoHOST',
  description: 'Query-driven contact segmentation, tags, and saved operational views.',
};

export default function SegmentsPage() {
  return <SegmentsView />;
}
