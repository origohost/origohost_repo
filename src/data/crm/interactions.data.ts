import type { CrmInteraction } from '@/types/crm';

export const mockInteractions: CrmInteraction[] = [
  {
    id: 'act-01',
    contactId: 'cnt-01',
    contactName: 'Rahul Sharma',
    type: 'Meeting Held',
    title: 'KSS2026 Keynote Planning',
    description: 'Discussed session architecture and slide review for Episode 05: System Design for Scale.',
    recordedBy: 'Community Ops Lead',
    timestamp: '2026-08-27T10:30:00Z',
  },
  {
    id: 'act-02',
    contactId: 'cnt-02',
    contactName: 'Priya Verma',
    type: 'Event Registered',
    title: 'Registered for CyberForge 2026',
    description: 'Confirmed venue booking and student chapter volunteer roster for GL Bajaj campus.',
    recordedBy: 'Event Coordinator',
    timestamp: '2026-08-28T15:45:00Z',
  },
  {
    id: 'act-03',
    contactId: 'cnt-03',
    contactName: 'Ankit Mehta',
    type: 'Email Sent',
    title: 'DevCloud Q3 Sponsorship Invoice & Agreement',
    description: 'Sent signed MoU copy for cloud credits distribution across campus hackathons.',
    recordedBy: 'Partnerships Lead',
    timestamp: '2026-08-25T09:15:00Z',
  },
  {
    id: 'act-04',
    contactId: 'cnt-04',
    contactName: 'Sneha Rao',
    type: 'Form Submitted',
    title: 'Submitted AI Foundation Application',
    description: 'Submitted application form detailing past research projects in embedded ML.',
    recordedBy: 'System Automation',
    timestamp: '2026-08-29T11:20:00Z',
  },
];
