import React from 'react';
import type { Metadata } from 'next';
import { getMembers } from '@/services/crm/members.service';
import { MembersView } from '@/features/crm/members/MembersView';
import type { CommunityMember } from '@/types/crm';

export const metadata: Metadata = {
  title: 'Community Members Roster — CRM | OrigoHOST',
  description: 'Manage active developer ecosystem members, campus chapter leads, speakers, mentors, and organizers.',
};

export default async function MembersPage() {
  const result = await getMembers();
  const members: CommunityMember[] = result.success && result.data ? (result.data as CommunityMember[]) : [];

  return <MembersView initialMembers={members} />;
}
