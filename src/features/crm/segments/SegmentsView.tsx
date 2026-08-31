'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Filter, Plus, Users, ShieldCheck, Tag, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

import type { CrmSegment } from '@/types/crm';

const mockSegments: CrmSegment[] = [
  {
    id: 'seg-1',
    name: 'Active Node Partners',
    description: 'Contacts and organizations running active infrastructure nodes.',
    filters: { status: ['Active'], pathway: ['INFRASTRUCTURE_PARTNER'] },
    memberCount: 18,
    createdAt: '2026-08-20',
    updatedAt: '2026-08-30',
  },
  {
    id: 'seg-2',
    name: 'Pending Grants Applicants',
    description: 'Inbound developers with applications under technical evaluation.',
    filters: { status: ['PENDING', 'REVIEW'], pathway: ['ECOSYSTEM_DEVELOPER'] },
    memberCount: 7,
    createdAt: '2026-08-22',
    updatedAt: '2026-08-29',
  },
  {
    id: 'seg-3',
    name: 'University Chapter Leads',
    description: 'Student campus organizers and university department contacts.',
    filters: { role: ['Student Lead', 'Professor'], tags: ['Campus'] },
    memberCount: 42,
    createdAt: '2026-08-15',
    updatedAt: '2026-08-28',
  },
];

export function SegmentsView() {
  const [segments, setSegments] = useState<CrmSegment[]>(mockSegments);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Segmentation Engine</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// DYNAMIC VIEWS & TAGS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Saved Contact Segments & Filters
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Query-driven audience segments for targeted communications, event outreach, and automation rules.
          </Text>
        </div>
        <Button size="sm" className="gap-1.5 shadow-xs">
          <Plus className="h-4 w-4" /> Create New Segment
        </Button>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {segments.map((seg) => (
          <div
            key={seg.id}
            className="p-5 rounded-card bg-surface border border-border shadow-2xs space-y-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <Heading as="h3" size="sm" className="text-ink font-bold">{seg.name}</Heading>
                <Badge variant="info" size="sm" className="font-mono">
                  {seg.memberCount} Members
                </Badge>
              </div>

              <Text size="xs" variant="muted" className="mt-2.5 leading-relaxed">
                {seg.description}
              </Text>

              <div className="mt-4 p-3 rounded-btn bg-surface-elevated border border-border/60 space-y-1 text-body-xs">
                <span className="font-mono text-[10px] text-ink-muted uppercase block">Active Filters</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(seg.filters).map(([k, v]) => (
                    <span key={k} className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20">
                      {k}: {Array.isArray(v) ? v.join(', ') : v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-[10px] font-mono text-ink-muted">Updated: {seg.updatedAt}</span>
              <Link href={`/crm/contacts?segment=${seg.id}`}>
                <Button size="xs" variant="secondary" className="gap-1">
                  View Segment Records <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
