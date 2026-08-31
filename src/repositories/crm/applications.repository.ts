import type { CrmApplication } from '@/types/crm';

const mockApplications: CrmApplication[] = [
  {
    id: 'app-101',
    applicantName: 'Sarah Jenkins',
    email: 'sarah.jenkins@quantumleaf.io',
    phone: '+1 555-0192',
    organizationName: 'QuantumLeaf Systems',
    pathway: 'INFRASTRUCTURE_PARTNER',
    status: 'PENDING',
    notes: 'Submitted via public join form interested in node hosting co-location.',
    submittedAt: '2026-08-28T14:30:00Z',
    tags: ['Inbound', 'Infrastructure', 'Node-Hosting'],
  },
  {
    id: 'app-102',
    applicantName: 'Marcus Vance',
    email: 'marcus@vancetech.org',
    phone: '+1 555-0482',
    organizationName: 'Vance Tech Labs',
    pathway: 'ECOSYSTEM_DEVELOPER',
    status: 'REVIEW',
    notes: 'Under technical evaluation for core protocol grant cohort.',
    submittedAt: '2026-08-25T09:15:00Z',
    reviewedBy: 'usr-operator-01',
    tags: ['Grant', 'Developer', 'Tier-1'],
  },
  {
    id: 'app-103',
    applicantName: 'Elena Rostova',
    email: 'elena@cyberfront.io',
    organizationName: 'CyberFront DAO',
    pathway: 'VENTURE_STUDIO',
    status: 'APPROVED',
    notes: 'Approved for Q4 incubator cohort. Onboarding contact created.',
    submittedAt: '2026-08-20T11:00:00Z',
    reviewedBy: 'usr-operator-01',
    decisionDate: '2026-08-22T16:00:00Z',
    tags: ['Incubator', 'Approved'],
  },
];

let memoryStore: CrmApplication[] = [...mockApplications];

export class ApplicationsRepository {
  static async findAll(query?: string, filters?: { status?: string; pathway?: string }): Promise<CrmApplication[]> {
    let result = [...memoryStore];

    if (filters?.status && filters.status !== 'ALL') {
      result = result.filter((a) => a.status === filters.status);
    }

    if (filters?.pathway && filters.pathway !== 'ALL') {
      result = result.filter((a) => a.pathway === filters.pathway);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) =>
          a.applicantName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.organizationName && a.organizationName.toLowerCase().includes(q))
      );
    }

    return result;
  }

  static async findById(id: string): Promise<CrmApplication | null> {
    const item = memoryStore.find((a) => a.id === id);
    return item || null;
  }

  static async create(data: Partial<CrmApplication>): Promise<CrmApplication> {
    const newApp: CrmApplication = {
      id: `app-${Date.now()}`,
      applicantName: data.applicantName || 'New Applicant',
      email: data.email || '',
      phone: data.phone,
      organizationName: data.organizationName,
      pathway: data.pathway || 'COMMUNITY_MEMBER',
      status: 'PENDING',
      notes: data.notes,
      submittedAt: new Date().toISOString(),
      tags: data.tags || ['Inbound'],
    };
    memoryStore.unshift(newApp);
    return newApp;
  }

  static async update(id: string, data: Partial<CrmApplication>): Promise<CrmApplication> {
    const index = memoryStore.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Application not found');

    const updated = {
      ...memoryStore[index],
      ...data,
      decisionDate: data.status && data.status !== 'PENDING' ? new Date().toISOString() : memoryStore[index].decisionDate,
    };
    memoryStore[index] = updated;
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    const initialLen = memoryStore.length;
    memoryStore = memoryStore.filter((a) => a.id !== id);
    return memoryStore.length < initialLen;
  }
}
