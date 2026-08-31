import { team } from '@/data/team/team.data';
import type { TeamMember } from '@/types';

export async function getTeamMembers(department?: string): Promise<TeamMember[]> {
  if (!department || department === 'All') {
    return team;
  }
  return team.filter((m) => m.department && m.department.toLowerCase() === department.toLowerCase());
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const member = team.find((m) => m.slug === slug || m.id === slug);
  return member || null;
}
