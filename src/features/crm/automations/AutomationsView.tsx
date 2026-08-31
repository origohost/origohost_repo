'use client';

import React, { useState } from 'react';
import { Zap, Play, CheckCircle2, AlertCircle, Plus, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

import type { CrmAutomationRule } from '@/types/crm';

const mockRules: CrmAutomationRule[] = [
  {
    id: 'auto-1',
    name: 'New Application Task Trigger',
    description: 'When an inbound join application is submitted, automatically create a follow-up review task for operators.',
    trigger: 'NEW_APPLICATION',
    action: 'CREATE_TASK',
    isActive: true,
    lastExecutedAt: '2026-08-30 18:45 UTC',
    executionCount: 14,
  },
  {
    id: 'auto-2',
    name: 'Event Attendance Contact Tagging',
    description: 'When a contact attends an official summit event, automatically tag their profile as Summit-Attendee.',
    trigger: 'EVENT_ATTENDED',
    action: 'ADD_TAG',
    isActive: true,
    lastExecutedAt: '2026-08-28 12:10 UTC',
    executionCount: 38,
  },
  {
    id: 'auto-3',
    name: 'Lead Conversion Owner Assignment',
    description: 'When a lead status changes to QUALIFIED, assign lead owner and trigger notification email.',
    trigger: 'LEAD_STATUS_CHANGED',
    action: 'ASSIGN_OWNER',
    isActive: false,
    executionCount: 5,
  },
];

export function AutomationsView() {
  const [rules, setRules] = useState<CrmAutomationRule[]>(mockRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Workflow Engine</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// TRIGGER → ACTION'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            CRM Workflow Automations
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Automate task creation, contact status updates, notifications, and tag assignments based on ecosystem triggers.
          </Text>
        </div>
        <Button size="sm" className="gap-1.5 shadow-xs">
          <Plus className="h-4 w-4" /> Create Automation Rule
        </Button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-card bg-surface border border-border shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg shrink-0 ${rule.isActive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-surface-elevated text-ink-muted'}`}>
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <Heading as="h3" size="sm" className="text-ink font-bold">{rule.name}</Heading>
                  <Badge variant={rule.isActive ? 'success' : 'secondary'} size="sm">
                    {rule.isActive ? 'ACTIVE' : 'DISABLED'}
                  </Badge>
                </div>

                <Text size="xs" variant="muted" className="mt-1">
                  {rule.description}
                </Text>
                <div className="flex flex-wrap gap-2 mt-2 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-surface-elevated text-ink border border-border">Trigger: {rule.trigger}</span>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Action: {rule.action}</span>
                  {rule.lastExecutedAt && <span className="px-2 py-0.5 rounded bg-surface-elevated text-ink-muted">Last run: {rule.lastExecutedAt}</span>}
                  <span className="px-2 py-0.5 rounded bg-surface-elevated text-ink-muted">Runs: {rule.executionCount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button size="xs" variant="secondary" onClick={() => toggleRule(rule.id)} className="gap-1">
                {rule.isActive ? 'Disable' : 'Enable'}
              </Button>
              <Button size="xs" variant="secondary" className="gap-1">
                <RefreshCw className="h-3 w-3" /> Test Execution
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
