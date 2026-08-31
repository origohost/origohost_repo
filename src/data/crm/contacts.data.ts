import type { Contact } from '@/types/crm';

export const mockContacts: Contact[] = [
  {
    id: 'cnt-01',
    firstName: 'Arjun',
    lastName: 'Mehta',
    email: 'arjun.mehta@example.com',
    phone: '+91 98765 43210',
    organizationId: 'org-01',
    jobTitle: 'Campus Ambassador',
    source: 'Website Intake',
    status: 'Active',
    tags: ['Campus Lead', 'Speaker'],
    notes: 'Key contact for DTU chapter.',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-01T14:30:00Z',
  },
  {
    id: 'cnt-02',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98123 45678',
    organizationId: 'org-02',
    jobTitle: 'Chapter Coordinator',
    source: 'Event Registration',
    status: 'Engaged',
    tags: ['Mentor', 'AI Foundation'],
    notes: 'GL Bajaj chapter lead.',
    createdAt: '2026-01-20T11:00:00Z',
    updatedAt: '2026-02-10T09:15:00Z',
  },
];
