import React from 'react';
import type { Metadata } from 'next';
import { getCrmMetricSummary, getCrmFunnelStages } from '@/services/crm/reports.service';
import { ReportsView } from '@/features/crm/reports/ReportsView';

export const metadata: Metadata = {
  title: 'CRM Reports & Ecosystem Analytics — CRM | OrigoHOST',
  description: 'Ecosystem conversion funnels, event attendance rates, and organization breakdowns.',
};

export default async function ReportsPage() {
  const [metrics, funnel] = await Promise.all([getCrmMetricSummary(), getCrmFunnelStages()]);

  return <ReportsView metrics={metrics} funnel={funnel} />;
}
