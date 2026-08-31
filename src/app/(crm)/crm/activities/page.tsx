'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { CrmPageHeader, FilterBar, DataTableShell, StatusBadge } from '@/features/crm/components';
import { getActivities } from '@/services/crm/activities.service';
import type { Activity } from '@/types/crm';

export default function ActivitiesPage() {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All');

  const loadData = React.useCallback(async () => {
    const res = await getActivities(searchQuery, typeFilter);
    if (res.data) setActivities(res.data);
  }, [searchQuery, typeFilter]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="space-y-6">
      <CrmPageHeader
        title="Activity Log & Timeline"
        subtitle="Log and monitor calls, meetings, emails, notes, and operational tasks."
        badgeText={`${activities.length} Activities`}
        actions={
          <Link
            href="/crm/activities/new"
            className="px-4 py-2 rounded-btn bg-primary text-white font-semibold text-body-sm flex items-center gap-1.5 shadow-xs hover:bg-primary-hover transition-colors"
          >
            <Plus className="h-4 w-4" /> Log Activity
          </Link>
        }
      />

      <FilterBar
        searchPlaceholder="Search activity logs..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterLabel="Type"
        filterValue={typeFilter}
        filterOptions={[
          { label: 'All Types', value: 'All' },
          { label: 'Meeting', value: 'Meeting' },
          { label: 'Call', value: 'Call' },
          { label: 'Email', value: 'Email' },
          { label: 'Note', value: 'Note' },
          { label: 'Task', value: 'Task' },
        ]}
        onFilterChange={setTypeFilter}
      />

      <DataTableShell
        footer={
          <div className="flex items-center justify-between">
            <span>Showing {activities.length} activity records</span>
            <span className="font-mono text-[11px]">Timeline Active</span>
          </div>
        }
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-elevated border-b border-border text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Logged By</th>
              <th className="py-3 px-4">Timestamp / Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-body-sm">
            {activities.map((act) => (
              <tr key={act.id} className="hover:bg-surface-elevated/40 transition-colors">
                <td className="py-3.5 px-4">
                  <Link href={`/crm/activities/${act.id}`} className="font-bold text-ink hover:text-primary transition-colors block">
                    {act.subject}
                  </Link>
                  {act.description && <span className="text-body-xs text-ink-muted line-clamp-1">{act.description}</span>}
                </td>
                <td className="py-3.5 px-4 font-mono text-body-xs">{act.type}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={act.status} />
                </td>
                <td className="py-3.5 px-4 text-ink-secondary text-body-xs">{act.createdBy || 'System'}</td>
                <td className="py-3.5 px-4 text-body-xs font-mono text-ink-muted">
                  {act.dueAt?.slice(0, 10) || act.createdAt?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
