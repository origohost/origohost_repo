export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'CONVERTED' | 'LOST';
export type LeadPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Lead {
  id: string;
  contactId?: string;
  organizationId?: string;
  title: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  source: string;
  status: LeadStatus;
  priority: LeadPriority;
  ownerId?: string;
  estimatedValue?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}


// Backward compatibility alias
export type CrmLead = Lead;
