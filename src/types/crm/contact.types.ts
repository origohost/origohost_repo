export type ContactStatus = 'Active' | 'Lead' | 'Engaged' | 'Inactive' | 'Archived' | 'Deleted';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organizationId?: string;
  jobTitle?: string;
  role?: string;
  source: string;
  status: ContactStatus;
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}


// Backward compatibility alias
export type CrmContact = Contact;
