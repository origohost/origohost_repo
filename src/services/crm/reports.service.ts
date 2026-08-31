import { mockMetricSummary, mockFunnelStages } from '@/data/crm/reports.data';
import type { CrmMetricSummary, FunnelStage } from '@/types/crm';

export async function getCrmMetricSummary(): Promise<CrmMetricSummary> {
  return mockMetricSummary;
}

export async function getCrmFunnelStages(): Promise<FunnelStage[]> {
  return mockFunnelStages;
}
