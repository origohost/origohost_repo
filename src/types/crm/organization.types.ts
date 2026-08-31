export type OrganizationType = 'University' | 'Enterprise' | 'Startup' | 'Community' | 'Sponsor' | 'Partner';
export type OrganizationStatus = 'Active' | 'Prospect' | 'Partner' | 'Archived' | 'Inactive';

export interface Organization {
  id: string;
  name: string;
  website?: string;
  email?: string;
  phone?: string;
  industry?: string;
  type: OrganizationType;
  status: OrganizationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Backward compatibility alias
export type CrmOrganization = Organization;
