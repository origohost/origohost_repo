import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarRange, ArrowRight, Trophy, Video, Users } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { EventDirectory } from '@/features/events';
import { getEvents } from '@/services/events/events.service';
import { Spinner } from '@/components/shared/Spinner';

export const metadata: Metadata = {
  title: 'Technical Events, Hackathons & Webinars',
  description:
    'Discover upcoming hackathons, engineering webinars, and developer meetups hosted across India by OrigoHOST. Practical coding and systems architecture.',
};

export default async function EventsPage() {
  const allEvents = await getEvents();
  const featuredEvent = allEvents.find((e) => e.featured && e.status === 'Upcoming') || allEvents[0];

  const eventFormats = [
    {
      title: 'Competitive Hackathons',
      icon: Trophy,
      desc: 'Multi-day engineering buildathons like CyberForge where teams engineer and launch production solutions.',
    },
    {
      title: 'Technical Masterclasses',
      icon: Video,
      desc: 'Live deep-dives into cloud infrastructure, cybersecurity, and containerization with code demos.',
    },
    {
      title: 'Campus Chapter Meetups',
      icon: Users,
      desc: 'Regional offline workshops and peer study sprints organized by student chapter coordinators.',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Events Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Live & Upcoming</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Learn, build, connect, and <span className="text-gradient-origo">innovate in public.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              Explore hands-on technical sessions designed to bring developers, students, and mentors together through practical engineering, competitive challenges, and real-world system architecture.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="#directory" variant="primary" size="lg">
                Explore Event Directory
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/contact?category=speaker" variant="secondary" size="lg">
                Propose a Session
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Featured Highlight Banner ─────────────────────────────── */}
      {featuredEvent && (
        <Section spacing="sm" background="default" className="border-b border-border/60">
          <Container size="lg">
            <div className="p-8 rounded-card bg-surface border-2 border-primary/40 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" dot>Featured Highlight</Badge>
                  <span className="text-caption font-mono text-ink-muted uppercase">{featuredEvent.format}</span>
                </div>
                <Heading as="h2" size="md" className="mb-2">
                  {featuredEvent.title}
                </Heading>
                <Text size="sm" variant="secondary" className="leading-relaxed mb-4">
                  {featuredEvent.summary}
                </Text>
                <div className="flex items-center gap-4 text-body-xs font-medium text-ink">
                  <span>Mode: {featuredEvent.delivery}</span>
                  <span>•</span>
                  <span>Location: {featuredEvent.location.name}</span>
                </div>
              </div>
              <div className="shrink-0">
                <Button href={`/events/${featuredEvent.slug}`} variant="primary" size="lg">
                  Register for Event
                  <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── 3. Event Formats Overview ────────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-kicker text-primary uppercase">Event Architecture</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              How We Deliver Sessions
            </Heading>
            <Text size="md" variant="secondary">
              Strictly structured formats focused on tangible coding and architecture outcomes.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventFormats.map((format) => {
              const Icon = format.icon;
              return (
                <div
                  key={format.title}
                  className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Heading as="h3" size="sm" className="mb-2">
                      {format.title}
                    </Heading>
                    <Text size="sm" variant="secondary" className="leading-relaxed">
                      {format.desc}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 4. Searchable Event Directory ────────────────────────────── */}
      <Section spacing="lg" background="default" id="directory">
        <Container size="lg">
          <div className="mb-8">
            <span className="text-kicker text-primary uppercase">All Sessions</span>
            <Heading as="h2" size="xl" className="mt-1">
              Events Directory
            </Heading>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <Spinner size="md" label="Loading events directory..." />
              </div>
            }
          >
            <EventDirectory initialEvents={allEvents} />
          </Suspense>
        </Container>
      </Section>

      {/* ── 5. Host or Propose a Session CTA ─────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#FFF7ED] dark:bg-[#020817] relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4">
            Call for Speakers & Hosts
          </Badge>
          <Heading as="h2" size="xl" className="text-foreground mb-4 font-display">
            Host an Event or Propose a Technical Talk
          </Heading>
          <Text size="lg" className="text-foreground-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Are you an industry engineer with production experience, or a campus lead ready to host a regional hackathon? Partner with our events team.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join?pathway=speaker" variant="primary" size="lg">
              Apply as Speaker
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/contact?category=institutional"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Host on Campus
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
