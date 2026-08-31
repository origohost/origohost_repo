import type { Lead } from '@/types/crm';
import type { BaseRepositoryContract } from './base.repository';

const seedLeads: Lead[] = [
  {
    id: 'lead-01',
    title: 'AI Foundation Enterprise Sponsorship',
    source: 'Website Intake',
    status: 'QUALIFIED',
    priority: 'High',
    estimatedValue: 250000,
    notes: 'Inquiry from CloudScale Global regarding title sponsorship for Origo AI Foundation Program.',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-15T14:30:00Z',
  },
  {
    id: 'lead-02',
    title: 'DTU Chapter Expansion Lead',
    source: 'Campus Chapter Form',
    status: 'CONTACTED',
    priority: 'Medium',
    estimatedValue: 75000,
    notes: 'Student council president reaching out for official OrigoHOST university chapter accreditation.',
    createdAt: '2026-02-08T09:15:00Z',
    updatedAt: '2026-02-18T11:00:00Z',
  },
  {
    id: 'lead-03',
    title: 'CyberForge Hackathon Prize Pool Sponsorship',
    source: 'Partnership Inquiry',
    status: 'PROPOSAL',
    priority: 'Urgent',
    estimatedValue: 500000,
    notes: 'CyberForge Security Labs submitted proposal for $15K cash prize pool co-sponsorship.',
    createdAt: '2026-02-12T14:00:00Z',
    updatedAt: '2026-02-22T16:45:00Z',
  },
  {
    id: 'lead-04',
    title: 'KSS 2026 DevOps Speaker Inquiry',
    source: 'Event Registration',
    status: 'NEW',
    priority: 'High',
    estimatedValue: 30000,
    notes: 'Senior DevOps Architect interested in keynoting Episode 4 on Cloud Native & Kubernetes.',
    createdAt: '2026-02-20T16:20:00Z',
    updatedAt: '2026-02-20T16:20:00Z',
  },
  {
    id: 'lead-05',
    title: 'GL Bajaj University Chapter Setup',
    source: 'Event Registration',
    status: 'CONVERTED',
    priority: 'Medium',
    estimatedValue: 120000,
    notes: 'Chapter officially chartered; 180+ student registrations onboarded to OrigoHOST platform.',
    createdAt: '2026-01-15T11:00:00Z',
    updatedAt: '2026-02-25T10:00:00Z',
  },
  {
    id: 'lead-06',
    title: 'General Infrastructure Consulting Intake',
    source: 'Direct Inquiry',
    status: 'LOST',
    priority: 'Low',
    estimatedValue: 20000,
    notes: 'Client scope outside community platform boundaries; referred to external partner network.',
    createdAt: '2026-01-28T08:30:00Z',
    updatedAt: '2026-02-10T12:00:00Z',
  },
];

class LeadsRepositoryImpl implements BaseRepositoryContract<Lead> {
  private leadsStore: Lead[] = [...seedLeads];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<Lead[]> {
    let result = [...this.leadsStore];

    if (filter?.status && filter.status !== 'All') {
      result = result.filter((l) => l.status === filter.status);
    }
    if (filter?.priority && filter.priority !== 'All') {
      result = result.filter((l) => l.priority === filter.priority);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.source.toLowerCase().includes(q) ||
          (l.notes && l.notes.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<Lead | null> {
    return this.leadsStore.find((l) => l.id === id) || null;
  }

  async create(data: Partial<Lead>): Promise<Lead> {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      contactId: data.contactId,
      organizationId: data.organizationId,
      title: data.title || 'New Inbound Lead',
      source: data.source || 'Website Intake',
      status: data.status || 'NEW',
      priority: data.priority || 'Medium',
      ownerId: data.ownerId || 'usr-operator-01',
      estimatedValue: Number(data.estimatedValue) || 0,
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.leadsStore.unshift(newLead);
    return newLead;
  }

  async update(id: string, data: Partial<Lead>): Promise<Lead> {
    const idx = this.leadsStore.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error(`Lead ${id} not found`);

    const updated = {
      ...this.leadsStore[idx],
      ...data,
      estimatedValue: data.estimatedValue !== undefined ? Number(data.estimatedValue) : this.leadsStore[idx].estimatedValue,
      updatedAt: new Date().toISOString(),
    };
    this.leadsStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.leadsStore.findIndex((l) => l.id === id);
    if (idx === -1) return false;
    this.leadsStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const LeadsRepository = new LeadsRepositoryImpl();
