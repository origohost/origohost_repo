import type { Organization } from '@/types/crm';
import type { BaseRepositoryContract } from './base.repository';

const seedOrgs: Organization[] = [
  {
    id: 'org-01',
    name: 'Delhi Technological University',
    website: 'https://dtu.ac.in',
    email: 'chapters@dtu.ac.in',
    phone: '+91 11 2787 1018',
    industry: 'Higher Education',
    type: 'University',
    status: 'Active',
    notes: 'Primary university campus chapter lead in New Delhi with 350+ active student members.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-02-01T12:00:00Z',
  },
  {
    id: 'org-02',
    name: 'GL Bajaj Group of Institutions',
    website: 'https://glbitm.org',
    email: 'contact@glbitm.org',
    phone: '+91 120 232 3888',
    industry: 'Engineering & Technology',
    type: 'University',
    status: 'Active',
    notes: 'Active developer chapter hosting KSS 2026 monthly workshops and hackathons.',
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-10T11:30:00Z',
  },
  {
    id: 'org-03',
    name: 'CyberForge Security Labs',
    website: 'https://cyberforge.io',
    email: 'partnerships@cyberforge.io',
    phone: '+1 415 555 0192',
    industry: 'Cybersecurity',
    type: 'Sponsor',
    status: 'Active',
    notes: 'Title sponsor for CyberForge 2026 Hackathon; providing $15K in prize pool & platform credits.',
    createdAt: '2026-01-20T14:20:00Z',
    updatedAt: '2026-02-15T16:00:00Z',
  },
  {
    id: 'org-04',
    name: 'CloudScale Global Inc.',
    website: 'https://cloudscale.com',
    email: 'enterprise@cloudscale.com',
    phone: '+1 800 555 4910',
    industry: 'Cloud Infrastructure',
    type: 'Enterprise',
    status: 'Partner',
    notes: 'Enterprise partner providing cloud credits and mentorship for Origo AI Foundation Program.',
    createdAt: '2026-01-25T11:00:00Z',
    updatedAt: '2026-02-18T10:15:00Z',
  },
  {
    id: 'org-05',
    name: 'OpenSource India Foundation',
    website: 'https://opensource.org.in',
    email: 'community@opensource.org.in',
    phone: '+91 80 4123 9000',
    industry: 'Non-Profit / Open Source',
    type: 'Community',
    status: 'Active',
    notes: 'Strategic community collaborator for joint webinar dispatches and hackathon mentoring.',
    createdAt: '2026-02-01T08:30:00Z',
    updatedAt: '2026-02-22T09:45:00Z',
  },
  {
    id: 'org-06',
    name: 'NextGen AI Ventures',
    website: 'https://nextgenai.vc',
    email: 'deals@nextgenai.vc',
    phone: '+1 650 555 2381',
    industry: 'Venture Capital',
    type: 'Startup',
    status: 'Prospect',
    notes: 'Early-stage venture firm exploring ecosystem demo day partnerships and pitch evaluations.',
    createdAt: '2026-02-05T13:00:00Z',
    updatedAt: '2026-02-25T15:20:00Z',
  },
];

class OrganizationsRepositoryImpl implements BaseRepositoryContract<Organization> {
  private orgsStore: Organization[] = [...seedOrgs];

  async findAll(query?: string): Promise<Organization[]> {
    let result = [...this.orgsStore];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.type.toLowerCase().includes(q) ||
          (o.industry && o.industry.toLowerCase().includes(q)) ||
          (o.email && o.email.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<Organization | null> {
    return this.orgsStore.find((o) => o.id === id) || null;
  }

  async create(data: Partial<Organization>): Promise<Organization> {
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: data.name || 'New Organization',
      website: data.website || '',
      email: data.email || '',
      phone: data.phone || '',
      industry: data.industry || 'Technology',
      type: data.type || 'University',
      status: data.status || 'Active',
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.orgsStore.unshift(newOrg);
    return newOrg;
  }

  async update(id: string, data: Partial<Organization>): Promise<Organization> {
    const idx = this.orgsStore.findIndex((o) => o.id === id);
    if (idx === -1) throw new Error(`Organization ${id} not found`);

    const updated = { ...this.orgsStore[idx], ...data, updatedAt: new Date().toISOString() };
    this.orgsStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.orgsStore.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    this.orgsStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const OrganizationsRepository = new OrganizationsRepositoryImpl();
