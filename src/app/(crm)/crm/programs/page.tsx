import React from 'react';
import type { Metadata } from 'next';
import { getPrograms } from '@/services/crm/programs.service';
import { ProgramsView } from '@/features/crm/programs/ProgramsView';
import type { Program } from '@/types';

export const metadata: Metadata = {
  title: 'Program Cohorts — CRM | OrigoHOST',
  description: 'Manage educational tracks, Knowledge Sharing Series cohorts, and AI foundation tracks.',
};

export default async function ProgramsPage() {
  const result = await getPrograms();
  const list: Program[] = result.success && result.data ? (result.data as Program[]) : [];

  return <ProgramsView initialPrograms={list} />;
}
