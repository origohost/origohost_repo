import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { getProgramBySlug, getPrograms } from '@/services/content/programs.service';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const programs = await getPrograms();
  const program = programs.find((p) => p.id === id || p.slug === id);
  if (!program) return { title: 'Program Not Found — CRM' };
  return { title: `Cohort: ${program.name} — CRM` };
}

export default async function CrmProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const programs = await getPrograms();
  const program = programs.find((p) => p.id === id || p.slug === id);
  if (!program) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link href="/crm/programs" className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Programs
        </Link>
        <Heading as="h1" size="xl">
          {program.name}
        </Heading>
      </div>

      <div className="p-6 rounded-card bg-surface border border-border space-y-3">
        <Badge variant="primary">{program.purpose}</Badge>
        <p className="text-body-sm text-ink-secondary leading-relaxed">{program.description || program.purpose}</p>
      </div>
    </div>
  );
}
