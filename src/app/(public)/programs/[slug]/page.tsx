import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layers, ArrowLeft, Users, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { getPrograms, getProgramBySlug } from '@/services/content/programs.service';
import { getEvents } from '@/services/events/events.service';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { EventCard } from '@/components/cards/EventCard';
import { Container, Section } from '@/components/layout';
import { generateBreadcrumbSchema } from '@/lib/schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allPrograms = await getPrograms();
  return allPrograms.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: 'Program Not Found' };

  return {
    title: `${program.name} — OrigoHOST Programs`,
    description: program.purpose,
    openGraph: {
      title: `${program.name} — OrigoHOST Programs`,
      description: program.purpose,
      type: 'website',
    },
  };
}

export default async function ProgramDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const allEvents = await getEvents();
  const associatedEvents = allEvents.filter(
    (e) =>
      e.relatedProgram === program.slug ||
      e.relatedProgram === program.id ||
      program.relatedEvents.includes(e.id) ||
      program.relatedEvents.includes(e.slug)
  );

  const breadcrumbs = [
    { label: 'Programs', href: '/programs' },
    { label: program.name, href: `/programs/${program.slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Breadcrumb ──────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface py-3">
        <Container size="lg">
          <Breadcrumb items={breadcrumbs} />
        </Container>
      </div>

      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="section-dark py-20 md:py-28 relative overflow-hidden border-t border-border/40 text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <Container size="lg" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-8 space-y-5">
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-[#B7C2D9] hover:text-white transition-colors text-body-sm font-medium group outline-none"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Back to Programs
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" className="!bg-white/10 !text-white !border-white/20">
                {program.status}
              </Badge>
              {program.seriesStructure && (
                <span className="text-caption font-mono uppercase tracking-wider text-[#B7C2D9]">
                  {program.seriesStructure}
                </span>
              )}
            </div>

            <h1 className="text-display-md sm:text-display-lg font-extrabold tracking-tight text-white font-display text-gradient-origo">
              {program.name}
            </h1>

            <Text size="lg" className="text-[#B7C2D9] max-w-3xl leading-relaxed">
              {program.purpose}
            </Text>
          </div>

          {/* Action Card */}
          <div className="lg:col-span-4 bg-surface p-6 rounded-card border border-border shadow-card text-ink flex flex-col gap-5">
            <span className="text-caption font-mono uppercase text-primary font-bold">
              Cohort Enrollment
            </span>
            <div className="space-y-2 text-body-sm">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-ink-muted">Status:</span>
                <span className="font-semibold text-ink">{program.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-ink-muted">Focus:</span>
                <span className="font-semibold text-ink">{program.focusAreas[0]}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-ink-muted">Admissions:</span>
                <span className="font-semibold text-accent-green">Open Access</span>
              </div>
            </div>

            <Button href="/join" variant="primary" size="lg" className="w-full justify-center">
              Apply for Cohort
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ─── Program Content & Associated Sessions ───────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-kicker text-primary uppercase block mb-1">Curriculum Framework</span>
                <Heading as="h2" size="lg" className="mb-4">
                  Program Objectives & Architecture
                </Heading>
                <Text size="md" variant="secondary" className="leading-relaxed whitespace-pre-line">
                  {program.description ||
                    'This structured initiative provides guided pathways, hands-on server configurations, and engineering projects designed to turn learners into production-ready software builders.'}
                </Text>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-surface p-6 rounded-card border border-border shadow-xs">
                <Heading as="h3" size="sm" className="mb-3 text-ink">
                  Technical Domains
                </Heading>
                <div className="flex flex-wrap gap-1.5">
                  {program.focusAreas.map((fa) => (
                    <span
                      key={fa}
                      className="inline-flex items-center px-2.5 py-1 rounded-btn text-body-xs font-medium bg-surface-elevated text-ink-secondary border border-border"
                    >
                      {fa}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Associated Events / Episodes */}
          {associatedEvents.length > 0 && (
            <div>
              <div className="mb-8">
                <span className="text-kicker text-primary uppercase">Program Episodes</span>
                <Heading as="h2" size="xl" className="mt-1">
                  Webinars & Sessions in this Series
                </Heading>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {associatedEvents.map((ev) => (
                  <EventCard key={ev.id} event={ev} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
