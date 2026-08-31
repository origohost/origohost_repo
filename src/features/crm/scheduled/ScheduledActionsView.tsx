'use client';

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Plus, ArrowRight, Bell } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

interface ScheduledAction {
  id: string;
  title: string;
  targetContact: string;
  scheduledTime: string;
  actionType: 'EMAIL_REMINDER' | 'TASK_DUE' | 'STATUS_CHANGE';
  status: 'SCHEDULED' | 'EXECUTED' | 'CANCELLED';
}

const mockScheduledActions: ScheduledAction[] = [
  {
    id: 'sch-1',
    title: 'Post-Summit Follow-up Email',
    targetContact: 'Dr. Evelyn Reed',
    scheduledTime: '2026-09-05 10:00 UTC',
    actionType: 'EMAIL_REMINDER',
    status: 'SCHEDULED',
  },
  {
    id: 'sch-2',
    title: 'Inbound Grant Application Decision Reminder',
    targetContact: 'Marcus Vance',
    scheduledTime: '2026-09-02 14:00 UTC',
    actionType: 'TASK_DUE',
    status: 'SCHEDULED',
  },
];

export function ScheduledActionsView() {
  const [actions, setActions] = useState<ScheduledAction[]>(mockScheduledActions);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Automation Scheduler</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// FUTURE WORKFLOWS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Scheduled Actions & Reminders
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Calendar queue of scheduled follow-up outreach, automated reminders, and future status actions.
          </Text>
        </div>
        <Button size="sm" className="gap-1.5 shadow-xs">
          <Plus className="h-4 w-4" /> Schedule Action
        </Button>
      </div>

      {/* Queue List */}
      <div className="space-y-3">
        {actions.map((act) => (
          <div key={act.id} className="p-4 rounded-card bg-surface border border-border shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-body-sm text-ink block">{act.title}</span>
                <span className="text-body-xs text-ink-muted">Target: <strong className="text-ink">{act.targetContact}</strong> • Type: {act.actionType}</span>
                <span className="text-[11px] font-mono text-primary block mt-1">Scheduled for: {act.scheduledTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="warning" size="sm">{act.status}</Badge>
              <Button size="xs" variant="secondary">Cancel</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
