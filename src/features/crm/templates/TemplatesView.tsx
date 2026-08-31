'use client';

import React, { useState } from 'react';
import { Mail, Plus, Edit3, Trash2, CheckCircle2, FileText } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

interface CommunicationTemplate {
  id: string;
  name: string;
  category: 'Onboarding' | 'Follow-up' | 'Event' | 'Application';
  subject: string;
  body: string;
  updatedAt: string;
}

const mockTemplates: CommunicationTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Application Ingest Confirmation',
    category: 'Application',
    subject: 'We have received your OrigoHOST Join Application',
    body: 'Hi {{firstName}}, thank you for submitting your join application for {{pathway}}. Our team will evaluate your profile and get back within 48 hours.',
    updatedAt: '2026-08-25',
  },
  {
    id: 'tpl-2',
    name: 'Discovery Call Follow-up',
    category: 'Follow-up',
    subject: 'Following up on our discovery conversation — OrigoHOST',
    body: 'Hi {{firstName}}, great speaking with you regarding {{organization}}. Let us know if you need additional documentation on node co-location.',
    updatedAt: '2026-08-28',
  },
  {
    id: 'tpl-3',
    name: 'Summit Event VIP Pass Confirmation',
    category: 'Event',
    subject: 'Your VIP Pass for Annual Infrastructure Summit 2026',
    body: 'Hi {{firstName}}, your ticket for {{eventTitle}} has been confirmed. We look forward to hosting you!',
    updatedAt: '2026-08-30',
  },
];

export function TemplatesView() {
  const [templates, setTemplates] = useState<CommunicationTemplate[]>(mockTemplates);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Communications Engine</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// TEMPLATE LIBRARY'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Communication Template Library
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Reusable email and notification templates for outreach, follow-ups, and event confirmations.
          </Text>
        </div>
        <Button size="sm" className="gap-1.5 shadow-xs">
          <Plus className="h-4 w-4" /> Create Template
        </Button>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="p-5 rounded-card bg-surface border border-border shadow-2xs space-y-3 flex flex-col justify-between hover:border-primary/40 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <Heading as="h3" size="sm" className="text-ink font-bold">{tpl.name}</Heading>
                <Badge variant="info" size="sm">{tpl.category}</Badge>
              </div>
              <span className="text-body-xs font-semibold text-primary block mt-2">Subject: {tpl.subject}</span>
              <p className="text-body-xs text-ink-muted line-clamp-3 mt-1.5 p-2.5 rounded-btn bg-surface-elevated border border-border/60 italic font-mono text-[11px]">
                &quot;{tpl.body}&quot;
              </p>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-[10px] font-mono text-ink-muted">Updated: {tpl.updatedAt}</span>
              <Button size="xs" variant="secondary" className="gap-1">
                <Edit3 className="h-3 w-3" /> Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
