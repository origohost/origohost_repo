export type MemberRole = 'Student' | 'Developer' | 'Chapter Lead' | 'Speaker' | 'Mentor' | 'Organizer' | 'Contributor';
export type MemberStatus = 'Active' | 'Pending' | 'Alumni' | 'Inactive';
export type ChapterName = 'DTU Chapter' | 'GL Bajaj Chapter' | 'OpenSource India Hub' | 'Global Developer Network' | 'Independent';

export interface CommunityMember {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: MemberRole;
  status: MemberStatus;
  chapter: ChapterName;
  organization?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  skills: string[];
  joinedAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CrmMember = CommunityMember;
