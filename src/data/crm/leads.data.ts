import type { Lead } from '@/types/crm';

export const mockLeads: Lead[] = [
  {
    id: 'lead-01',
    title: 'Enterprise Sponsorship Inquiry',
    source: 'Website Intake',
    status: 'QUALIFIED',
    priority: 'High',
    estimatedValue: 250000,
    notes: 'Sponsorship for AI Foundation Program.',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-15T14:30:00Z',
  },
  {
    id: 'lead-02',
    title: 'Campus Chapter Setup Inquiry',
    source: 'Event Registration',
    status: 'NEW',
    priority: 'Medium',
    estimatedValue: 50000,
    notes: 'GL Bajaj chapter application.',
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-02-10T11:00:00Z',
  },
];
