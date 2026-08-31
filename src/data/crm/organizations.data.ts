import type { Organization } from '@/types/crm';

export const mockOrganizations: Organization[] = [
  {
    id: 'org-01',
    name: 'Delhi Technological University',
    website: 'https://dtu.ac.in',
    email: 'info@dtu.ac.in',
    phone: '+91 11 2787 1018',
    industry: 'Education',
    type: 'University',
    status: 'Active',
    notes: 'Primary campus chapter in New Delhi.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-02-01T12:00:00Z',
  },
  {
    id: 'org-02',
    name: 'GL Bajaj Group of Institutions',
    website: 'https://glbitm.org',
    email: 'contact@glbitm.org',
    phone: '+91 120 232 3888',
    industry: 'Education',
    type: 'University',
    status: 'Active',
    notes: 'Active developer community chapter.',
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-10T11:30:00Z',
  },
];
