import type { CrmRegistrationItem } from '@/types/crm';
import { mockRegistrations } from '@/data/crm/registrations.data';
import type { BaseRepositoryContract } from './base.repository';

class RegistrationsRepositoryImpl implements BaseRepositoryContract<CrmRegistrationItem> {
  private regStore: CrmRegistrationItem[] = [...mockRegistrations];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<CrmRegistrationItem[]> {
    let result = [...this.regStore];

    if (filter?.status && filter.status !== 'All Statuses') {
      result = result.filter((r) => r.status === filter.status);
    }
    if (filter?.eventId) {
      result = result.filter((r) => r.eventId === filter.eventId);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.participantName.toLowerCase().includes(q) ||
          r.participantEmail.toLowerCase().includes(q) ||
          r.eventTitle.toLowerCase().includes(q) ||
          (r.organizationName && r.organizationName.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<CrmRegistrationItem | null> {
    return this.regStore.find((r) => r.id === id) || null;
  }

  async create(data: Partial<CrmRegistrationItem>): Promise<CrmRegistrationItem> {
    const newReg: CrmRegistrationItem = {
      id: `reg-${Date.now()}`,
      eventId: data.eventId || 'kss2026-ep04',
      eventTitle: data.eventTitle || 'Community Masterclass Session',
      contactId: data.contactId || 'cnt-01',
      participantName: data.participantName || 'New Participant',
      participantEmail: data.participantEmail || '',
      organizationName: data.organizationName || '',
      registrationDate: new Date().toISOString(),
      status: data.status || 'Confirmed',
      ticketCategory: data.ticketCategory || 'General Access',
      checkedIn: Boolean(data.checkedIn),
      checkedInAt: data.checkedIn ? new Date().toISOString() : undefined,
      notes: data.notes || '',
    };
    this.regStore.unshift(newReg);
    return newReg;
  }

  async update(id: string, data: Partial<CrmRegistrationItem>): Promise<CrmRegistrationItem> {
    const idx = this.regStore.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Registration ${id} not found`);

    const updated = {
      ...this.regStore[idx],
      ...data,
    };
    this.regStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.regStore.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    this.regStore.splice(idx, 1);
    return true;
  }

  async toggleCheckIn(id: string): Promise<CrmRegistrationItem> {
    const idx = this.regStore.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Registration ${id} not found`);

    const item = this.regStore[idx];
    const isCheckingIn = !item.checkedIn;
    const updated: CrmRegistrationItem = {
      ...item,
      checkedIn: isCheckingIn,
      checkedInAt: isCheckingIn ? new Date().toISOString() : undefined,
      status: isCheckingIn ? 'Attended' : 'Confirmed',
    };
    this.regStore[idx] = updated;
    return updated;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const RegistrationsRepository = new RegistrationsRepositoryImpl();
