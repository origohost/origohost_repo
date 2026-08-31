import React from 'react';
import type { Metadata } from 'next';
import { SearchView } from '@/features/crm/search/SearchView';

export const metadata: Metadata = {
  title: 'Global Search — CRM | OrigoHOST',
  description: 'Fast cross-CRM indexing search across contacts, organizations, events, leads, and tasks.',
};

export default function SearchPage() {
  return <SearchView />;
}
