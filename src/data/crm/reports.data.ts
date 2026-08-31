import type { CrmMetricSummary, FunnelStage } from '@/types/crm';

export const mockMetricSummary: CrmMetricSummary = {
  totalContacts: 1420,
  newLeads: 86,
  activeMembers: 654,
  eventRegistrations: 2890,
  upcomingEventsCount: 4,
  activeProgramsCount: 2,
  totalOrganizations: 48,
  pendingFollowUps: 14,
};

export const mockFunnelStages: FunnelStage[] = [
  { stage: 'New Leads', count: 86, percentage: 100 },
  { stage: 'Contacted', count: 68, percentage: 79 },
  { stage: 'Engaged', count: 52, percentage: 60 },
  { stage: 'Qualified', count: 38, percentage: 44 },
  { stage: 'Registered / Converted', count: 31, percentage: 36 },
];
