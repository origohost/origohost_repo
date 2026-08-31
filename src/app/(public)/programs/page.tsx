import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Layers, BookOpen, Cpu, Sparkles, CheckCircle2,
  ArrowRight, Award, Compass, Shield, Users
} from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { ProgramCard } from '@/components/cards/ProgramCard';
import { EventCard } from '@/components/cards/EventCard';
import { Accordion } from '@/components/ui/Accordion';
import { getPrograms } from '@/services/content/programs.service';
import { getEvents } from '@/services/events/events.service';

export const metadata: Metadata = {
  title: 'Flagship Programs & Technical Initiatives',
  description:
    'Explore structured multi-week engineering training cohorts, including the Knowledge Sharing Series (KSS) and AI Foundation Program across India.',
};

export default async function ProgramsPage() {
  const allPrograms = await getPrograms();
  const allEvents = await getEvents();
  const programFaqs = [
    {
      id: 'prog-faq-1',
      title: 'What differentiates a Program from an Event?',
      content: 'A Program is an ongoing multi-week curriculum cohort with progressive milestones, homework projects, and mentorship. An Event is a single live hackathon or standalone webinar episode.',
    },
    {
      id: 'prog-faq-2',
      title: 'Are OrigoHOST programs free for students?',
      content: 'Yes. Our core open-access engineering cohorts are free for registered community participants.',
    },
    {
      id: 'prog-faq-3',
      title: 'How are participants selected for cohorts?',
      content: 'Applications are reviewed based on foundational interest, basic git/coding proficiency, and personal motivation to complete hands-on project assignments.',
    },
    {
      id: 'prog-faq-4',
      title: 'Do participants receive verified completion credentials?',
      content: 'Students who submit their required capstone repositories and attend core milestones receive a verified digital completion credential.',
    },
  ];

  const programOutcomes = [
    {
      title: 'Production Code Repositories',
      desc: 'Graduates finish cohorts with clean, deployed GitHub repositories demonstrating working systems architecture.',
    },
    {
      title: 'Mentorship & Code Reviews',
      desc: 'Direct line to senior engineers who inspect student architectures, teach debugging techniques, and refine code.',
    },
    {
      title: 'Hackathon Fast-Track',
      desc: 'Cohort participants receive priority seeding and team matchmaking for CyberForge and affiliated buildathons.',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Curated Cohorts</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Programs that turn theoretical knowledge into <span className="text-gradient-origo">real software.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              OrigoHOST develops sustained multi-week technical pathways that combine live instruction, hands-on server deployment, and peer code reviews.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="#cohorts" variant="primary" size="lg">
                Explore Active Cohorts
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/join" variant="secondary" size="lg">
                Apply for Next Cohort
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Active Cohorts ────────────────────────────────────────── */}
      <Section spacing="lg" background="default" id="cohorts">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Current Offerings</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Active & Upcoming Program Tracks
            </Heading>
            <Text size="md" variant="secondary">
              Deep, comprehensive curricula designed in partnership with industry practitioners and academic faculty.
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. Program Outcomes & Impact ─────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-kicker text-primary uppercase">Measurable Value</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              What Participants Achieve
            </Heading>
            <Text size="md" variant="secondary">
              Every cohort is designed around tangible engineering output, not passive attendance.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programOutcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="p-7 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Heading as="h3" size="sm" className="mb-2">
                    {outcome.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="leading-relaxed">
                    {outcome.desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 4. Program FAQs ──────────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="md">
          <div className="text-center mb-12">
            <span className="text-kicker text-primary uppercase">Cohort Admissions</span>
            <Heading as="h2" size="xl" className="mt-1">
              Program Frequently Asked Questions
            </Heading>
          </div>
          <Accordion items={programFaqs} allowMultiple />
        </Container>
      </Section>

      {/* ── 5. Final CTA ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#FFF7ED] dark:bg-[#020817] relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4">
            Admissions Open
          </Badge>
          <Heading as="h2" size="xl" className="text-foreground mb-4 font-display">
            Enroll in an OrigoHOST Technical Pathway
          </Heading>
          <Text size="lg" className="text-foreground-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Gain the engineering rigor, mentorship, and practical systems skills necessary to build production software.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join" variant="primary" size="lg">
              Apply for Next Cohort
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/events"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Browse Upcoming Sessions
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
