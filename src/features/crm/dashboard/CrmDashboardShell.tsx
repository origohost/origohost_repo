import React from 'react';
import Link from 'next/link';
import { Users, Building2, Target, Activity as ActivityIcon, FileText, CheckSquare, ArrowUpRight, AlertCircle, Plus, Sparkles } from 'lucide-react';
import { CrmPageHeader, MetricCard } from '@/features/crm/components';
import { getContacts } from '@/services/crm/contacts.service';
import { getOrganizations } from '@/services/crm/organizations.service';
import { getLeads } from '@/services/crm/leads.service';
import { getActivities } from '@/services/crm/activities.service';
import { getApplications } from '@/services/crm/applications.service';
import { getCrmTasks } from '@/services/crm/tasks.service';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';


export async function CrmDashboardShell() {
  const [contactsRes, orgsRes, leadsRes, activitiesRes, appsRes, tasksRes] = await Promise.all([
    getContacts(),
    getOrganizations(),
    getLeads(),
    getActivities(),
    getApplications(),
    getCrmTasks(),
  ]);

  const contacts = contactsRes.data || [];
  const orgs = orgsRes.data || [];
  const leads = leadsRes.data || [];
  const activities = activitiesRes.data || [];
  const apps = appsRes.data || [];
  const tasks = tasksRes.data || [];

  const activeLeads = leads.filter((l) => l.status !== 'CONVERTED' && l.status !== 'LOST');
  const pendingApps = apps.filter((a) => a.status === 'PENDING' || a.status === 'REVIEW');
  const openTasks = tasks.filter((t) => t.status !== 'Completed');

  return (
    <div className="space-y-6">
      {/* Header with Quick Action Shortcuts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CrmPageHeader
          title="CRM Operational Command Center"
          subtitle="Real-time operational dashboard for ecosystem metrics, pending applications, active tasks, and relationships."
          badgeText="Operational v1.0"
        />
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/crm/contacts/new">
            <Button size="sm" className="gap-1.5 font-medium">
              <Plus className="h-4 w-4" /> Add Contact
            </Button>
          </Link>
          <Link href="/crm/tasks">
            <Button size="sm" variant="secondary" className="gap-1.5 font-medium">
              <CheckSquare className="h-4 w-4" /> New Task
            </Button>
          </Link>
        </div>
      </div>

      {/* Operational Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard label="Total Contacts" value={contacts.length} icon={Users} subtext="Active ecosystem records" isPlaceholder={false} />
        <MetricCard label="Organizations" value={orgs.length} icon={Building2} subtext="Institutions & Partners" isPlaceholder={false} />
        <MetricCard label="Active Leads" value={activeLeads.length} icon={Target} subtext="Inbound pipeline prospects" isPlaceholder={false} />
        <MetricCard label="Pending Applications" value={pendingApps.length} icon={FileText} subtext="Requires operational review" isPlaceholder={false} />
        <MetricCard label="Open Tasks" value={openTasks.length} icon={CheckSquare} subtext="Pending follow-ups & to-dos" isPlaceholder={false} />
      </div>

      {/* Attention Section */}
      {pendingApps.length > 0 && (
        <div className="p-4 rounded-card bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <Heading as="h4" size="sm" className="text-amber-700 dark:text-amber-300 font-bold">
                {pendingApps.length} Application{pendingApps.length > 1 ? 's' : ''} Awaiting Review
              </Heading>
              <Text size="xs" className="text-amber-700/80 dark:text-amber-400/80">
                Inbound ecosystem join applications require review and contact conversion.
              </Text>
            </div>
          </div>
          <Link href="/crm/applications" className="shrink-0">
            <Button size="xs" variant="secondary" className="gap-1 bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/30">
              Review Pipeline <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Primary Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Added Contacts */}
        <div className="lg:col-span-2 p-5 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <Heading as="h3" size="sm" className="text-ink">Recent Ecosystem Contacts</Heading>
            <Link href="/crm/contacts" className="text-body-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
              Directory <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border/60">
            {contacts.slice(0, 5).map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between">
                <div>
                  <Link href={`/crm/contacts/${c.id}`} className="font-bold text-body-sm text-ink hover:text-primary transition-colors block">
                    {c.firstName} {c.lastName}
                  </Link>
                  <span className="text-body-xs text-ink-muted">{c.email} • {c.role || c.jobTitle || 'Member'}</span>
                </div>
                <Badge variant={c.status === 'Active' ? 'success' : 'info'} size="sm">
                  {c.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Status Breakdown & Open Tasks */}
        <div className="space-y-6">
          {/* Lead Pipeline Summary */}
          <div className="p-5 rounded-card bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <Heading as="h3" size="sm" className="text-ink">Lead Pipeline Breakdown</Heading>
              <Link href="/crm/leads" className="text-body-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
                Leads <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'CONVERTED'].map((st) => {
                const count = leads.filter((l) => l.status === st).length;
                return (
                  <div key={st} className="flex justify-between items-center text-body-xs font-medium border-b border-border/40 pb-2">
                    <span className="text-ink-secondary">{st}</span>
                    <span className="font-mono font-bold text-ink bg-surface-elevated px-2 py-0.5 rounded border border-border/60">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Task List */}
          <div className="p-5 rounded-card bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <Heading as="h3" size="sm" className="text-ink">Tasks Requiring Action</Heading>
              <Link href="/crm/tasks" className="text-body-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
                All Tasks <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.slice(0, 4).map((t) => (
                <div key={t.id} className="p-2.5 rounded-btn bg-surface-elevated border border-border/60 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="font-semibold text-body-xs text-ink block truncate">{t.title}</span>
                    <span className="text-[11px] text-ink-muted font-mono">Due: {t.dueDate || 'Today'}</span>
                  </div>
                  <Badge variant={t.priority === 'Urgent' || t.priority === 'High' ? 'error' : t.priority === 'Medium' ? 'warning' : 'info'} size="sm">
                    {t.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
