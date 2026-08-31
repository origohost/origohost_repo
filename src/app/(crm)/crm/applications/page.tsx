import React from 'react';
import type { Metadata } from 'next';
import { getApplications } from '@/services/crm/applications.service';
import { ApplicationsView } from '@/features/crm/applications/ApplicationsView';

export const metadata: Metadata = {
  title: 'Applications Intake Pipeline — CRM | OrigoHOST',
  description: 'Manage and evaluate ecosystem intake applications, developer grants, node co-location, and incubator submissions.',
};

export default async function ApplicationsPage() {
  const result = await getApplications();
  const applications = result.success && result.data ? result.data : [];

  return <ApplicationsView initialApplications={applications} />;
}
