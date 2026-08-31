export interface CrmMetricSummary {
  totalContacts: number;
  newLeads: number;
  activeMembers: number;
  eventRegistrations: number;
  upcomingEventsCount: number;
  activeProgramsCount: number;
  totalOrganizations: number;
  pendingFollowUps: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
}
