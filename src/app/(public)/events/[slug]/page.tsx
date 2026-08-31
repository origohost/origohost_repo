import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Monitor, ArrowLeft, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { getEvents, getEventBySlug } from '@/services/events/events.service';
import { getProgramBySlug } from '@/services/content/programs.service';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { formatDate } from '@/lib/utils';
import { generateEventSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { Container, Section } from '@/components/layout';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allEvents = await getEvents();
  return allEvents.map((e) => ({
    slug: e.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Event Not Found' };

  return {
    title: `${event.title} — OrigoHOST Events`,
    description: event.summary,
    openGraph: {
      title: `${event.title} — OrigoHOST Events`,
      description: event.summary,
      type: 'website',
    },
  };
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const relatedProgram = event.relatedProgram
    ? await getProgramBySlug(event.relatedProgram)
    : null;

  const breadcrumbs = [
    { label: 'Events', href: '/events' },
    { label: event.title, href: `/events/${event.slug}` },
  ];

  const isUpcoming = event.status === 'Upcoming' || event.status === 'Ongoing';

  // Schema.org JSON-LD
  const eventSchema = generateEventSchema(event);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="flex flex-col w-full">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
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
          {/* Header Details */}
          <div className="lg:col-span-8 space-y-5">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-[#B7C2D9] hover:text-white transition-colors text-body-sm font-medium group outline-none"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Back to Events Directory
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" className="!bg-white/10 !text-white !border-white/20">
                {event.format}
              </Badge>
              <Badge variant="secondary">
                {event.type}
              </Badge>
              <span className="text-caption font-mono uppercase tracking-wider text-[#B7C2D9]">
                {event.delivery}
              </span>
            </div>

            <h1 className="text-display-md sm:text-display-lg font-extrabold tracking-tight text-white font-display text-gradient-origo">
              {event.title}
            </h1>

            <Text size="lg" className="text-[#B7C2D9] max-w-3xl leading-relaxed">
              {event.summary}
            </Text>
          </div>

          {/* Action Card */}
          <div className="lg:col-span-4 bg-surface p-6 rounded-card border border-border shadow-card text-ink flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-caption font-mono uppercase text-ink-muted block">Date</span>
                  <span className="text-body-md font-semibold text-ink">{formatDate(event.startDate)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {event.delivery === 'Online' ? (
                  <Monitor className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <span className="text-caption font-mono uppercase text-ink-muted block">Location / Mode</span>
                  <span className="text-body-md font-semibold text-ink">{event.location.name}</span>
                </div>
              </div>
            </div>

            {isUpcoming ? (
              <div className="flex flex-col gap-2">
                <Button
                  href={event.registrationUrl || '#'}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  external={!!event.registrationUrl}
                >
                  Register for Event
                </Button>
                {event.registrationDeadline && (
                  <span className="text-center text-body-xs text-ink-muted">
                    Deadline: {formatDate(event.registrationDeadline)}
                  </span>
                )}
              </div>
            ) : (
              <div className="p-3 bg-surface-elevated rounded-btn border border-border text-center">
                <span className="text-body-sm font-semibold text-ink-muted">This Event Has Concluded</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ─── Detailed Prose Content ──────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main info */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-kicker text-primary uppercase block mb-1">Session Overview</span>
              <Heading as="h2" size="lg" className="mb-4">
                About the Event
              </Heading>
              <Text size="md" variant="secondary" className="leading-relaxed whitespace-pre-line">
                {event.description ||
                  'This event is organized as part of the OrigoHOST tech community network. Join us to acquire practical experience, engage in hands-on building, and collaborate with peers and mentors.'}
              </Text>
            </div>

            {/* Audience checklist */}
            {event.audience.length > 0 && (
              <div className="p-6 bg-surface border border-border rounded-card shadow-xs">
                <Heading as="h3" size="sm" className="mb-4 text-ink">
                  Target Audience
                </Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.audience.map((aud) => (
                    <div key={aud} className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                      <span className="text-body-sm text-ink-secondary">{aud}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Related program */}
            {relatedProgram && (
              <div className="bg-surface p-6 rounded-card border border-border shadow-xs flex flex-col gap-3">
                <span className="text-caption font-mono uppercase font-bold text-primary">
                  Parent Program
                </span>
                <Heading as="h3" size="sm" className="text-ink">
                  {relatedProgram.name}
                </Heading>
                <Text size="sm" variant="secondary" className="line-clamp-3">
                  {relatedProgram.purpose}
                </Text>
                <Link
                  href={`/programs/${relatedProgram.slug}`}
                  className="text-primary font-semibold text-body-sm hover:underline inline-flex items-center gap-1 mt-2 outline-none"
                >
                  Explore Program
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Focus areas */}
            {event.focusAreas.length > 0 && (
              <div className="bg-surface p-6 rounded-card border border-border shadow-xs">
                <Heading as="h3" size="sm" className="mb-3 text-ink">
                  Focus Areas
                </Heading>
                <div className="flex flex-wrap gap-1.5">
                  {event.focusAreas.map((fa) => (
                    <span
                      key={fa}
                      className="inline-flex items-center px-2.5 py-1 rounded-btn text-body-xs font-medium bg-surface-elevated text-ink-secondary border border-border"
                    >
                      {fa}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
