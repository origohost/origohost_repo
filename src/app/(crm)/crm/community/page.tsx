import React from 'react';
import type { Metadata } from 'next';
import { CommunityView } from '@/features/crm/community/CommunityView';

export const metadata: Metadata = {
  title: 'Community Members — CRM | OrigoHOST',
  description: 'Manage community member relationships, mentors, speakers, and organizers.',
};

export default function CommunityPage() {
  return <CommunityView />;
}
