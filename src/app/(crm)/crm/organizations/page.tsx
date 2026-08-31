import React from 'react';
import type { Metadata } from 'next';
import { getOrganizations } from '@/services/crm/organizations.service';
import { OrganizationsView } from '@/features/crm/organizations/OrganizationsView';
import type { Organization } from '@/types/crm';

export const metadata: Metadata = {
  title: 'Organizations — CRM | OrigoHOST',
  description: 'Manage institutional partner accounts, university chapters, enterprise sponsors, and community hubs.',
};

export default async function OrganizationsPage() {
  const result = await getOrganizations();
  const organizations: Organization[] = result.success && result.data ? (result.data as Organization[]) : [];

  return <OrganizationsView initialOrganizations={organizations} />;
}
