export type ApplicationStatus = 'PENDING' | 'REVIEW' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN';

export type ApplicationPathway = 'INFRASTRUCTURE_PARTNER' | 'COMMUNITY_MEMBER' | 'ECOSYSTEM_DEVELOPER' | 'SPONSORSHIP' | 'VENTURE_STUDIO';

export interface CrmApplication {
  id: string;
  contactId?: string;
  applicantName: string;
  email: string;
  phone?: string;
  organizationName?: string;
  pathway: ApplicationPathway;
  status: ApplicationStatus;
  notes?: string;
  submittedAt: string;
  reviewedBy?: string;
  decisionDate?: string;
  tags: string[];
}
