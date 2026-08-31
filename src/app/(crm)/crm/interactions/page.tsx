import React from 'react';
import type { Metadata } from 'next';
import { CrmPageHeader, FilterBar, EmptyState } from '@/features/crm/components';

export const metadata: Metadata = {
  title: 'Interactions Log — CRM | OrigoHOST',
};

export default function InteractionsPage() {
  return (
    <div className="space-y-6">
      <CrmPageHeader
        title="Interactions & Activity Log"
        subtitle="Unified timeline of meetings, emails, calls, form submissions, and check-ins."
        badgeText="Module Shell"
      />
      <FilterBar searchPlaceholder="Search interaction history..." />
      <EmptyState
        title="Interactions Log Shell"
        description="Unified relationship activity and interaction notes will populate here."
      />
    </div>
  );
}
