import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { getActivityById } from '@/services/crm/activities.service';
import { Heading, Text, Badge } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await getActivityById(id);
  if (!res.data) return { title: 'Activity Not Found — CRM' };
  return { title: `Activity: ${res.data.subject}` };
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getActivityById(id);
  if (!res.data) notFound();
  const act = res.data;

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/crm/activities" className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Activity Log
      </Link>

      <div className="p-6 rounded-card bg-surface border border-border space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <Badge variant="primary">{act.type}</Badge>
          <span className="text-body-xs font-mono text-ink-muted flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Logged: {act.createdAt.slice(0, 10)}
          </span>
        </div>
        <Heading as="h1" size="xl" className="text-ink">{act.subject}</Heading>
        {act.description && <p className="text-body-sm text-ink-secondary leading-relaxed bg-surface-elevated p-4 rounded-btn border border-border/40">{act.description}</p>}
      </div>
    </div>
  );
}
