import type { CommunityMember } from '@/types/crm';
import type { BaseRepositoryContract } from './base.repository';

const seedMembers: CommunityMember[] = [
  {
    id: 'mem-01',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@dtu.ac.in',
    phone: '+91 98765 43210',
    role: 'Chapter Lead',
    status: 'Active',
    chapter: 'DTU Chapter',
    organization: 'Delhi Technological University',
    githubUrl: 'https://github.com/aaravsharma',
    linkedinUrl: 'https://linkedin.com/in/aaravsharma',
    skills: ['TypeScript', 'Next.js', 'Kubernetes', 'Cybersecurity'],
    joinedAt: '2025-09-01T10:00:00Z',
    notes: 'Campus Chapter Lead for DTU. Organized KSS Ep 03 Cybersecurity workshop.',
    createdAt: '2025-09-01T10:00:00Z',
    updatedAt: '2026-02-15T12:00:00Z',
  },
  {
    id: 'mem-02',
    fullName: 'Priya Verma',
    email: 'priya.verma@glbitm.org',
    phone: '+91 98123 45678',
    role: 'Organizer',
    status: 'Active',
    chapter: 'GL Bajaj Chapter',
    organization: 'GL Bajaj Group of Institutions',
    githubUrl: 'https://github.com/priyaverma-dev',
    linkedinUrl: 'https://linkedin.com/in/priyaverma-dev',
    skills: ['React', 'Python', 'Machine Learning', 'Event Management'],
    joinedAt: '2025-10-15T09:00:00Z',
    notes: 'Lead organizer for GL Bajaj AI & Cloud Developer Meetups.',
    createdAt: '2025-10-15T09:00:00Z',
    updatedAt: '2026-02-10T14:30:00Z',
  },
  {
    id: 'mem-03',
    fullName: 'Rohan Gupta',
    email: 'rohan.gupta@cyberforge.io',
    phone: '+1 415 555 0199',
    role: 'Speaker',
    status: 'Active',
    chapter: 'Global Developer Network',
    organization: 'CyberForge Security Labs',
    githubUrl: 'https://github.com/rohanguptasec',
    linkedinUrl: 'https://linkedin.com/in/rohanguptasec',
    skills: ['Penetration Testing', 'Rust', 'Cloud Security', 'DevSecOps'],
    joinedAt: '2025-11-20T14:00:00Z',
    notes: 'Keynote Speaker at CyberForge 2026 Hackathon on Ethical Hacking.',
    createdAt: '2025-11-20T14:00:00Z',
    updatedAt: '2026-02-20T16:00:00Z',
  },
  {
    id: 'mem-04',
    fullName: 'Ananya Roy',
    email: 'ananya.roy@opensource.org.in',
    phone: '+91 80 9876 5432',
    role: 'Mentor',
    status: 'Active',
    chapter: 'OpenSource India Hub',
    organization: 'OpenSource India Foundation',
    githubUrl: 'https://github.com/ananyaroy-oss',
    linkedinUrl: 'https://linkedin.com/in/ananyaroy-oss',
    skills: ['Node.js', 'GraphQL', 'System Architecture', 'Community Mentorship'],
    joinedAt: '2025-12-01T11:30:00Z',
    notes: 'Senior mentor for student open-source contributors during Origo AI Cohort.',
    createdAt: '2025-12-01T11:30:00Z',
    updatedAt: '2026-02-18T10:15:00Z',
  },
  {
    id: 'mem-05',
    fullName: 'Vikramaditya Singh',
    email: 'vikram.singh@gmail.com',
    phone: '+91 99887 76655',
    role: 'Developer',
    status: 'Active',
    chapter: 'DTU Chapter',
    organization: 'Delhi Technological University',
    githubUrl: 'https://github.com/vikram-singh',
    linkedinUrl: 'https://linkedin.com/in/vikram-singh',
    skills: ['Go', 'Docker', 'PostgreSQL', 'TailwindCSS'],
    joinedAt: '2026-01-10T15:45:00Z',
    notes: 'Active hackathon participant and open-source documentation contributor.',
    createdAt: '2026-01-10T15:45:00Z',
    updatedAt: '2026-02-22T09:00:00Z',
  },
  {
    id: 'mem-06',
    fullName: 'Neha Kapoor',
    email: 'neha.kapoor@alumni.dtu.ac.in',
    phone: '+91 91234 56789',
    role: 'Contributor',
    status: 'Alumni',
    chapter: 'DTU Chapter',
    organization: 'CloudScale Global',
    githubUrl: 'https://github.com/nehakapoor-cloud',
    linkedinUrl: 'https://linkedin.com/in/nehakapoor-cloud',
    skills: ['AWS', 'Terraform', 'CI/CD Pipelines'],
    joinedAt: '2024-08-15T09:00:00Z',
    notes: 'Former Chapter Lead now working at CloudScale Global; guest judge for hackathons.',
    createdAt: '2024-08-15T09:00:00Z',
    updatedAt: '2026-01-30T11:00:00Z',
  },
];

class MembersRepositoryImpl implements BaseRepositoryContract<CommunityMember> {
  private membersStore: CommunityMember[] = [...seedMembers];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<CommunityMember[]> {
    let result = [...this.membersStore];

    if (filter?.role && filter.role !== 'All Roles') {
      result = result.filter((m) => m.role === filter.role);
    }
    if (filter?.chapter && filter.chapter !== 'All Chapters') {
      result = result.filter((m) => m.chapter === filter.chapter);
    }
    if (filter?.status && filter.status !== 'All Statuses') {
      result = result.filter((m) => m.status === filter.status);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.fullName.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          (m.organization && m.organization.toLowerCase().includes(q)) ||
          m.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<CommunityMember | null> {
    return this.membersStore.find((m) => m.id === id) || null;
  }

  async create(data: Partial<CommunityMember>): Promise<CommunityMember> {
    const newMember: CommunityMember = {
      id: `mem-${Date.now()}`,
      fullName: data.fullName || 'New Member',
      email: data.email || '',
      phone: data.phone || '',
      role: data.role || 'Developer',
      status: data.status || 'Active',
      chapter: data.chapter || 'Independent',
      organization: data.organization || '',
      githubUrl: data.githubUrl || '',
      linkedinUrl: data.linkedinUrl || '',
      skills: Array.isArray(data.skills) ? data.skills : [],
      joinedAt: data.joinedAt || new Date().toISOString(),
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.membersStore.unshift(newMember);
    return newMember;
  }

  async update(id: string, data: Partial<CommunityMember>): Promise<CommunityMember> {
    const idx = this.membersStore.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Member ${id} not found`);

    const updated = {
      ...this.membersStore[idx],
      ...data,
      skills: Array.isArray(data.skills) ? data.skills : this.membersStore[idx].skills,
      updatedAt: new Date().toISOString(),
    };
    this.membersStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.membersStore.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    this.membersStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const MembersRepository = new MembersRepositoryImpl();
