import React from 'react';
import type { Metadata } from 'next';
import { getCrmTasks } from '@/services/crm/tasks.service';
import { TasksView } from '@/features/crm/tasks/TasksView';
import type { CrmTaskItem } from '@/types/crm';

export const metadata: Metadata = {
  title: 'Tasks & Operational To-Dos — CRM | OrigoHOST',
  description: 'Manage team follow-ups, milestone deadlines, and contact action items.',
};

export default async function TasksPage() {
  const result = await getCrmTasks();
  const list: CrmTaskItem[] = result.success && result.data ? (result.data as CrmTaskItem[]) : [];

  return <TasksView initialTasks={list} />;
}
