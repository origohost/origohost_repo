import React from 'react';
import Link from 'next/link';
import {
  Users, Building2, UserCheck, CalendarCheck,
  TrendingUp, Activity, ArrowRight, CheckSquare, Clock
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type {
  CrmMetricSummary,
  FunnelStage,
  CrmContact,
  CrmLead,
  CrmInteraction,
  CrmRegistrationItem,
  CrmTaskItem
} from '@/types/crm';

interface CrmDashboardViewProps {
  metrics: CrmMetricSummary;
  funnel: FunnelStage[];
  contacts: CrmContact[];
  leads: CrmLead[];
  interactions: CrmInteraction[];
  registrations: CrmRegistrationItem[];
  tasks: CrmTaskItem[];
}

export function CrmDashboardView({
  metrics,
  funnel,
  contacts,
  leads,
  interactions,
  registrations,
  tasks,
}: CrmDashboardViewProps) {
  const metricCards = [
    { label: 'Total Contacts', value: metrics.totalContacts, icon: Users, color: 'text-sky-500 bg-sky-500/10' },
    { label: 'New Leads', value: metrics.newLeads, icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Active Members', value: metrics.activeMembers, icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Event Registrations', value: metrics.eventRegistrations, icon: CalendarCheck, color: 'text-primary bg-primary/10' },
    { label: 'Organizations', value: metrics.totalOrganizations, icon: Building2, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Pending Follow-ups', value: metrics.pendingFollowUps, icon: CheckSquare, color: 'text-rose-500 bg-rose-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <Heading as="h1" size="xl" className="tracking-tight">
            Operational Dashboard
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Real-time ecosystem metrics across contacts, leads, community members, events, and tasks.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/crm/contacts/new"
            className="px-3.5 py-2 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
          >
            + Add Contact
          </Link>
          <Link
            href="/crm/interactions/new"
            className="px-3.5 py-2 rounded-btn bg-surface border border-border text-ink font-semibold text-body-sm hover:bg-surface-elevated transition-colors"
          >
            Log Activity
          </Link>
        </div>
      </div>

      {/* ── Primary Metric Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="p-4 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-xs font-medium text-ink-muted">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <span className="text-heading-xl font-bold font-mono text-ink tracking-tight">
                {card.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Funnel / Growth & Recent Activity Grid ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Funnel */}
        <div className="lg:col-span-2 p-6 rounded-card bg-surface border border-border shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Heading as="h3" size="sm" className="text-ink">
                Community Engagement Funnel
              </Heading>
              <Text size="xs" variant="muted">
                Conversion from new leads to confirmed event participants
              </Text>
            </div>
            <Link href="/crm/reports" className="text-body-xs font-semibold text-primary hover:underline">
              Full Analytics →
            </Link>
          </div>
          <div className="space-y-4">
            {funnel.map((stage) => (
              <div key={stage.stage} className="space-y-1.5">
                <div className="flex justify-between text-body-xs font-medium">
                  <span className="text-ink">{stage.stage}</span>
                  <span className="font-mono text-ink-muted">
                    {stage.count} ({stage.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Follow-ups */}
        <div className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Heading as="h3" size="sm" className="text-ink">
                Upcoming Follow-ups
              </Heading>
              <Badge variant="warning">{tasks.length} Pending</Badge>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg bg-surface-elevated border border-border/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-body-xs text-ink truncate max-w-[180px]">
                      {task.title}
                    </span>
                    <Badge variant={task.priority === 'Urgent' ? 'error' : 'warning'} size="sm">
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-ink-muted">
                    <span>Due: {task.dueDate}</span>
                    <span className="font-mono">{task.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/crm/tasks" className="mt-4 text-center block text-body-xs font-semibold text-primary hover:underline">
            View All Tasks →
          </Link>
        </div>
      </div>

      {/* ── Recent Contacts & Registrations Table ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="p-6 rounded-card bg-surface border border-border shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <Heading as="h3" size="sm" className="text-ink">
              Recent Contacts & Members
            </Heading>
            <Link href="/crm/contacts" className="text-body-xs font-semibold text-primary hover:underline">
              View Directory →
            </Link>
          </div>
          <div className="divide-y divide-border/60">
            {contacts.slice(0, 4).map((contact) => {
              const fn = contact.firstName || (contact as any).personalInfo?.firstName || 'Contact';
              const ln = contact.lastName || (contact as any).personalInfo?.lastName || '';
              const em = contact.email || (contact as any).personalInfo?.email || '—';
              return (
                <div key={contact.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <Link href={`/crm/contacts/${contact.id}`} className="font-semibold text-body-sm text-ink hover:text-primary transition-colors">
                      {fn} {ln}
                    </Link>
                    <p className="text-body-xs text-ink-muted">{em}</p>
                  </div>
                  <Badge variant={contact.status === 'Active' ? 'success' : 'info'} size="sm">
                    {contact.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Event Registrations */}
        <div className="p-6 rounded-card bg-surface border border-border shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <Heading as="h3" size="sm" className="text-ink">
              Recent Registrations
            </Heading>
            <Link href="/crm/registrations" className="text-body-xs font-semibold text-primary hover:underline">
              All Registrations →
            </Link>
          </div>
          <div className="divide-y divide-border/60">
            {registrations.map((reg) => (
              <div key={reg.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-body-sm text-ink">{reg.participantName}</span>
                  <p className="text-body-xs text-ink-muted truncate max-w-[240px]">{reg.eventTitle}</p>
                </div>
                <Badge variant={reg.status === 'Confirmed' ? 'success' : 'info'} size="sm">
                  {reg.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
