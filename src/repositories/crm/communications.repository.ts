import type { CrmCommunicationItem, EmailTemplate } from '@/types/crm';
import type { BaseRepositoryContract } from './base.repository';

const seedCommunications: CrmCommunicationItem[] = [
  {
    id: 'comm-01',
    recipientId: 'cnt-01',
    recipientName: 'Rahul Sharma',
    recipientEmail: 'rahul.sharma@example.com',
    channel: 'Email',
    subject: 'Confirmation: Speaker Keynote for KSS2026 Episode 05',
    snippet: 'Hi Rahul, we have finalized the agenda for Episode 05: System Design for Scale...',
    status: 'Sent',
    sentAt: '2026-08-27T10:00:00Z',
    templateId: 'tpl-01',
  },
  {
    id: 'comm-02',
    recipientId: 'cnt-02',
    recipientName: 'Priya Verma',
    recipientEmail: 'priya.v@glbajaj.ac.in',
    channel: 'Email',
    subject: 'CyberForge 2026 Event Checklist & Logistics Briefing',
    snippet: 'Hi Priya, here is the final checklist for venue setup and student volunteer badges...',
    status: 'Delivered',
    sentAt: '2026-08-28T14:30:00Z',
    templateId: 'tpl-02',
  },
];

const seedTemplates: EmailTemplate[] = [
  {
    id: 'tpl-01',
    name: 'Speaker Confirmation & Agenda',
    category: 'Events',
    subject: 'Confirmation: Speaker Keynote for {{event_name}}',
    bodyPreview: 'Dear {{first_name}}, thank you for accepting our invitation to present at {{event_name}}...',
    variables: ['first_name', 'event_name', 'event_date', 'zoom_link'],
  },
  {
    id: 'tpl-02',
    name: 'Event Registration Confirmation',
    category: 'Registrations',
    subject: 'Registration Confirmed: {{event_name}}',
    bodyPreview: 'Hi {{first_name}}, your seat for {{event_name}} has been confirmed...',
    variables: ['first_name', 'event_name', 'ticket_category', 'date'],
  },
];

class CommunicationsRepositoryImpl implements BaseRepositoryContract<CrmCommunicationItem> {
  private commsStore: CrmCommunicationItem[] = [...seedCommunications];
  private templatesStore: EmailTemplate[] = [...seedTemplates];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<CrmCommunicationItem[]> {
    let result = [...this.commsStore];

    if (filter?.status && filter.status !== 'All Statuses') {
      result = result.filter((c) => c.status === filter.status);
    }
    if (filter?.channel && filter.channel !== 'All Channels') {
      result = result.filter((c) => c.channel === filter.channel);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.recipientName.toLowerCase().includes(q) ||
          c.recipientEmail.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async findById(id: string): Promise<CrmCommunicationItem | null> {
    return this.commsStore.find((c) => c.id === id) || null;
  }

  async findTemplates(): Promise<EmailTemplate[]> {
    return [...this.templatesStore];
  }

  async create(data: Partial<CrmCommunicationItem>): Promise<CrmCommunicationItem> {
    const newComm: CrmCommunicationItem = {
      id: `comm-${Date.now()}`,
      recipientId: data.recipientId || 'cnt-01',
      recipientName: data.recipientName || 'Recipient',
      recipientEmail: data.recipientEmail || '',
      channel: data.channel || 'Email',
      subject: data.subject || 'Outreach Communication',
      snippet: data.snippet || '',
      status: 'Sent',
      sentAt: new Date().toISOString(),
      templateId: data.templateId,
    };
    this.commsStore.unshift(newComm);
    return newComm;
  }

  async update(id: string, data: Partial<CrmCommunicationItem>): Promise<CrmCommunicationItem> {
    const idx = this.commsStore.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error(`Communication ${id} not found`);

    const updated = {
      ...this.commsStore[idx],
      ...data,
    };
    this.commsStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.commsStore.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.commsStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const CommunicationsRepository = new CommunicationsRepositoryImpl();
