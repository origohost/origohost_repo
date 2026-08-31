import React from 'react';
import type { Metadata } from 'next';
import { Heading, Text } from '@/components/ui';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Admin Dashboard — OrigoHOST Platform',
};

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Members', value: '3,420' },
    { label: 'Active Events', value: '12' },
    { label: 'Registrations (This Month)', value: '1,280' },
    { label: 'Partner Institutions', value: '24' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
          Platform Admin Overview
        </Heading>
        <Text size="md" variant="secondary" className="mt-1">
          Central control plane for OrigoHOST public content, CRM workflows, and platform settings.
        </Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 shadow-xs">
            <span className="block text-body-xs font-mono font-bold text-brand-primary uppercase mb-1">
              {s.label}
            </span>
            <span className="block text-display-sm font-bold text-foreground tabular-nums">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
