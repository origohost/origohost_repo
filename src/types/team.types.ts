export interface TeamMemberLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  department?: string;
  biography: string;
  avatar: string;
  approvedLinks: TeamMemberLinks;
  featured: boolean;
  order: number;
}
