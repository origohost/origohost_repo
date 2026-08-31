import type { Activity } from '@/types/crm';
import type { BaseRepositoryContract } from './base.repository';

class ActivitiesRepositoryImpl implements BaseRepositoryContract<Activity> {
  private activitiesStore: Activity[] = [
    {
      id: 'act-01',
      type: 'Meeting',
      subject: 'Keynote Speaker Briefing',
      description: 'Discussed session outline and technical requirements for KSS Ep 03.',
      status: 'Completed',
      createdBy: 'Operator',
      createdAt: '2026-02-15T14:30:00Z',
      updatedAt: '2026-02-15T14:30:00Z',
    },
    {
      id: 'act-02',
      type: 'Call',
      subject: 'Sponsorship Discussion Call',
      description: 'Follow-up call regarding DTU Hackathon sponsorship tier.',
      status: 'Pending',
      dueAt: '2026-03-01T10:00:00Z',
      createdBy: 'Operator',
      createdAt: '2026-02-18T09:00:00Z',
      updatedAt: '2026-02-18T09:00:00Z',
    },
  ];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<Activity[]> {
    let result = [...this.activitiesStore];
    if (filter?.type && filter.type !== 'All') {
      result = result.filter((a) => a.type === filter.type);
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) => a.subject.toLowerCase().includes(q) || (a.description && a.description.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<Activity | null> {
    return this.activitiesStore.find((a) => a.id === id) || null;
  }

  async create(data: Partial<Activity>): Promise<Activity> {
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      contactId: data.contactId,
      organizationId: data.organizationId,
      type: data.type || 'Meeting',
      subject: data.subject || 'New Activity Log',
      description: data.description || '',
      status: data.status || 'Pending',
      dueAt: data.dueAt,
      completedAt: data.completedAt,
      createdBy: data.createdBy || 'Operator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.activitiesStore.unshift(newAct);
    return newAct;
  }

  async update(id: string, data: Partial<Activity>): Promise<Activity> {
    const idx = this.activitiesStore.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error(`Activity ${id} not found`);

    const updated = { ...this.activitiesStore[idx], ...data, updatedAt: new Date().toISOString() };
    this.activitiesStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.activitiesStore.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    this.activitiesStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> { return true; }
  async archive(): Promise<boolean> { return true; }
}

export const ActivitiesRepository = new ActivitiesRepositoryImpl();
