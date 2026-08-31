import React from 'react';
import type { Metadata } from 'next';
import { CrmDashboardShell } from '@/features/crm/dashboard/CrmDashboardShell';

export const metadata: Metadata = {
  title: 'Dashboard — CRM Operations | OrigoHOST',
};

export default function CrmDashboardPage() {
  return <CrmDashboardShell />;
}
