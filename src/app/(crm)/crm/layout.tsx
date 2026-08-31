import React from 'react';
import type { Metadata } from 'next';
import { getCRMSession } from '@/lib/security/auth.boundary';
import { CrmHeader } from '@/features/crm/components/CrmHeader';
import { CrmSidebar } from '@/features/crm/components/CrmSidebar';
import { CrmBreadcrumbs } from '@/features/crm/components/CrmBreadcrumbs';

export const metadata: Metadata = {
  title: 'CRM Operations Command Center — OrigoHOST',
  description: 'Operational software for OrigoHOST community members, leads, contacts, and registration pipelines.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const session = await getCRMSession();

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col font-sans">
      {/* Top Application Header */}
      <CrmHeader session={session} />

      {/* Main Workspace Area */}
      <div className="flex flex-1">
        {/* Navigation Sidebar */}
        <CrmSidebar userRoles={session.user.roles} />

        {/* Content Workspace */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <CrmBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
