import type { CrmApplication } from '@/types/crm';
import { SupabaseAdapter } from './adapters/supabase.adapter';
import type { Database } from '@/types/database.types';

type ApplicationRow = Database['public']['Tables']['crm_applications']['Row'];

function mapRowToApplication(row: ApplicationRow): CrmApplication {
  return {
    id: row.id,
    applicantName: row.applicant_name,
    email: row.email,
    pathway: (row.pathway as any) || 'COMMUNITY_MEMBER',
    status: (row.status as any) || 'PENDING',
    organizationName: row.chapter_name || undefined,
    notes: row.notes || undefined,
    submittedAt: row.created_at,
    reviewedBy: row.reviewed_by || undefined,
    tags: ['Inbound'],
  };
}

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
];

let memoryStore: CrmApplication[] = [...mockApplications];

export class ApplicationsRepository {
  static async findAll(query?: string, filters?: { status?: string; pathway?: string }): Promise<CrmApplication[]> {
    if (SupabaseAdapter.isConfigured()) {
      const res = await SupabaseAdapter.queryTable<ApplicationRow>('crm_applications');
      if (res.data && res.data.length > 0) {
        let apps = res.data.map(mapRowToApplication);
        if (filters?.status && filters.status !== 'ALL') {
          apps = apps.filter((a) => a.status === filters.status);
        }
        if (filters?.pathway && filters.pathway !== 'ALL') {
          apps = apps.filter((a) => a.pathway === filters.pathway);
        }
        if (query) {
          const q = query.toLowerCase();
          apps = apps.filter(
            (a) =>
              a.applicantName.toLowerCase().includes(q) ||
              a.email.toLowerCase().includes(q) ||
              (a.organizationName && a.organizationName.toLowerCase().includes(q))
          );
        }
        return apps;
      }
    }

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
    if (SupabaseAdapter.isConfigured()) {
      const res = await SupabaseAdapter.queryTable<ApplicationRow>('crm_applications', '*', { id: `eq.${id}` });
      if (res.data && res.data[0]) {
        return mapRowToApplication(res.data[0]);
      }
    }
    return memoryStore.find((a) => a.id === id) || null;
  }

  static async create(data: Partial<CrmApplication>): Promise<CrmApplication> {
    if (SupabaseAdapter.isConfigured()) {
      const row = {
        applicant_name: data.applicantName || 'New Applicant',
        email: data.email || '',
        pathway: data.pathway || 'COMMUNITY_MEMBER',
        status: data.status || 'PENDING',
        chapter_name: data.organizationName || null,
        notes: data.notes || null,
      };

      const res = await SupabaseAdapter.insertRow<ApplicationRow>('crm_applications', row);
      if (res.data) {
        const created = mapRowToApplication(res.data);
        memoryStore.unshift(created);
        return created;
      }
    }

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
    if (SupabaseAdapter.isConfigured()) {
      const updates: Record<string, unknown> = {};
      if (data.applicantName !== undefined) updates.applicant_name = data.applicantName;
      if (data.status !== undefined) updates.status = data.status;
      if (data.notes !== undefined) updates.notes = data.notes;
      if (data.reviewedBy !== undefined) updates.reviewed_by = data.reviewedBy;

      const res = await SupabaseAdapter.updateRow<ApplicationRow>('crm_applications', id, updates);
      if (res.data) {
        const updated = mapRowToApplication(res.data);
        const index = memoryStore.findIndex((a) => a.id === id);
        if (index !== -1) memoryStore[index] = updated;
        return updated;
      }
    }

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
    if (SupabaseAdapter.isConfigured()) {
      await SupabaseAdapter.deleteRow('crm_applications', id);
    }
    const initialLen = memoryStore.length;
    memoryStore = memoryStore.filter((a) => a.id !== id);
    return memoryStore.length < initialLen;
  }
}
