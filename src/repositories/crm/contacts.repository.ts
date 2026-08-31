import type { Contact } from '@/types/crm';
import type { BaseRepositoryContract } from './base.repository';

const seedContacts: Contact[] = [
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
    notes: 'Key contact for Delhi Technological University chapter.',
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
    notes: 'GL Bajaj Group of Institutions lead.',
    createdAt: '2026-01-20T11:00:00Z',
    updatedAt: '2026-02-10T09:15:00Z',
  },
];

class ContactsRepositoryImpl implements BaseRepositoryContract<Contact> {
  private contactsStore: Contact[] = [...seedContacts];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<Contact[]> {
    let result = [...this.contactsStore];

    if (filter?.status) {
      result = result.filter((c) => c.status === filter.status);
    } else {
      result = result.filter((c) => c.status !== 'Deleted');
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(q) ||
          c.lastName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async findById(id: string): Promise<Contact | null> {
    return this.contactsStore.find((c) => c.id === id) || null;
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    const newContact: Contact = {
      id: `cnt-${Date.now()}`,
      firstName: data.firstName || 'New',
      lastName: data.lastName || 'Contact',
      email: data.email || 'new.contact@example.com',
      phone: data.phone || '',
      organizationId: data.organizationId || '',
      jobTitle: data.jobTitle || 'Member',
      source: data.source || 'Direct Intake',
      status: data.status || 'Active',
      tags: data.tags || [],
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.contactsStore.unshift(newContact);
    return newContact;
  }

  async update(id: string, data: Partial<Contact>): Promise<Contact> {
    const idx = this.contactsStore.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error(`Contact ${id} not found`);

    const updated: Contact = {
      ...this.contactsStore[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.contactsStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const contact = await this.findById(id);
    if (!contact) return false;

    contact.status = 'Deleted';
    contact.updatedAt = new Date().toISOString();
    return true;
  }

  async restore(id: string): Promise<boolean> {
    const contact = await this.findById(id);
    if (!contact) return false;

    contact.status = 'Active';
    contact.updatedAt = new Date().toISOString();
    return true;
  }

  async archive(id: string): Promise<boolean> {
    const contact = await this.findById(id);
    if (!contact) return false;

    contact.status = 'Archived';
    contact.updatedAt = new Date().toISOString();
    return true;
  }
}

export const ContactsRepository = new ContactsRepositoryImpl();
