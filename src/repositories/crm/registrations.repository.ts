import type { CrmRegistrationItem } from '@/types/crm';
import { mockRegistrations } from '@/data/crm/registrations.data';
import type { BaseRepositoryContract } from './base.repository';
import { SupabaseAdapter } from './adapters/supabase.adapter';
import type { Database } from '@/types/database.types';

type RegRow = Database['public']['Tables']['event_registrations']['Row'];

function mapRowToRegistration(row: RegRow): CrmRegistrationItem {
  return {
    id: row.id,
    eventId: row.event_id,
    eventTitle: 'Community Event',
    contactId: row.user_id || 'cnt-01',
    participantName: row.name,
    participantEmail: row.email,
    organizationName: '',
    registrationDate: row.registered_at,
    status: row.status === 'WAITLISTED' ? 'Waitlisted' : row.status === 'CANCELLED' ? 'Cancelled' : row.check_in_status === 'ATTENDED' ? 'Attended' : 'Confirmed',
    ticketCategory: 'General Access',
    checkedIn: row.check_in_status === 'ATTENDED',
    checkedInAt: row.check_in_status === 'ATTENDED' ? row.registered_at : undefined,
    notes: '',
  };
}

class RegistrationsRepositoryImpl implements BaseRepositoryContract<CrmRegistrationItem> {
  private regStore: CrmRegistrationItem[] = [...mockRegistrations];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<CrmRegistrationItem[]> {
    if (SupabaseAdapter.isConfigured()) {
      const res = await SupabaseAdapter.queryTable<RegRow>('event_registrations');
      if (res.data && res.data.length > 0) {
        let list = res.data.map(mapRowToRegistration);
        if (filter?.status && filter.status !== 'All Statuses') {
          list = list.filter((r) => r.status === filter.status);
        }
        if (filter?.eventId) {
          list = list.filter((r) => r.eventId === filter.eventId);
        }
        if (query) {
          const q = query.toLowerCase();
          list = list.filter(
            (r) =>
              r.participantName.toLowerCase().includes(q) ||
              r.participantEmail.toLowerCase().includes(q) ||
              r.eventTitle.toLowerCase().includes(q)
          );
        }
        return list;
      }
    }

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
          r.eventTitle.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async findById(id: string): Promise<CrmRegistrationItem | null> {
    if (SupabaseAdapter.isConfigured()) {
      const res = await SupabaseAdapter.queryTable<RegRow>('event_registrations', '*', { id: `eq.${id}` });
      if (res.data && res.data[0]) {
        return mapRowToRegistration(res.data[0]);
      }
    }
    return this.regStore.find((r) => r.id === id) || null;
  }

  async create(data: Partial<CrmRegistrationItem>): Promise<CrmRegistrationItem> {
    if (SupabaseAdapter.isConfigured()) {
      const row = {
        event_id: data.eventId || 'evt-kss-03',
        user_id: data.contactId || null,
        name: data.participantName || 'New Participant',
        email: data.participantEmail || '',
        status: data.status === 'Waitlisted' ? 'WAITLISTED' : 'REGISTERED',
        check_in_status: data.checkedIn ? 'ATTENDED' : 'NOT_ATTENDED',
      };

      const res = await SupabaseAdapter.insertRow<RegRow>('event_registrations', row);
      if (res.data) {
        const created = mapRowToRegistration(res.data);
        this.regStore.unshift(created);
        return created;
      }
    }

    const newReg: CrmRegistrationItem = {
      id: `reg-${Date.now()}`,
      eventId: data.eventId || 'evt-kss-03',
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
    if (SupabaseAdapter.isConfigured()) {
      const updates: Record<string, unknown> = {};
      if (data.participantName) updates.name = data.participantName;
      if (data.status) {
        updates.status = data.status === 'Waitlisted' ? 'WAITLISTED' : data.status === 'Cancelled' ? 'CANCELLED' : 'REGISTERED';
      }
      if (data.checkedIn !== undefined) {
        updates.check_in_status = data.checkedIn ? 'ATTENDED' : 'NOT_ATTENDED';
      }

      const res = await SupabaseAdapter.updateRow<RegRow>('event_registrations', id, updates);
      if (res.data) {
        const updated = mapRowToRegistration(res.data);
        const idx = this.regStore.findIndex((r) => r.id === id);
        if (idx !== -1) this.regStore[idx] = updated;
        return updated;
      }
    }

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
    if (SupabaseAdapter.isConfigured()) {
      await SupabaseAdapter.deleteRow('event_registrations', id);
    }
    const idx = this.regStore.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    this.regStore.splice(idx, 1);
    return true;
  }

  async toggleCheckIn(id: string): Promise<CrmRegistrationItem> {
    const item = await this.findById(id);
    if (!item) throw new Error(`Registration ${id} not found`);
    const newCheckedIn = !item.checkedIn;
    return this.update(id, { checkedIn: newCheckedIn, status: newCheckedIn ? 'Attended' : 'Confirmed' });
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const RegistrationsRepository = new RegistrationsRepositoryImpl();
