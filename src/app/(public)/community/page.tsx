import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, Terminal, BookOpen, Sparkles, Building2,
  CheckCircle2, ArrowRight, Shield, HeartHandshake,
  Compass, Award, Globe, Code, Cpu, Calendar, Trophy,
  ExternalLink
} from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Accordion } from '@/components/ui/Accordion';
import { EventCard } from '@/components/cards/EventCard';
import { stories } from '@/data/stories/stories.data';
import { getUpcomingEvents } from '@/services/events/events.service';

export const metadata: Metadata = {
  title: 'Community Network — Campus Chapters & Builder Pathways',
  description:
    'Join thousands of developers, engineering students, mentors, and campus chapter leads across India building production software with OrigoHOST.',
};

export default async function CommunityPage() {
  const upcomingEvents = await getUpcomingEvents(3);

  const memberCohorts = [
    {
      title: 'Engineering Students',
      desc: 'Bridging classroom theory with actual system architecture, competitive hackathons, and open-source contributions.',
      badge: 'Academic Track',
    },
    {
      title: 'Active Developers & Builders',
      desc: 'Deploying real software, testing cloud infrastructure, and finding co-engineers for collaborative projects.',
      badge: 'Engineering Track',
    },
    {
      title: 'Campus Chapter Leads',
      desc: 'Chartering and leading official OrigoHOST student chapters with direct logistical and curriculum support.',
      badge: 'Leadership Track',
    },
    {
      title: 'Technical Speakers & Mentors',
      desc: 'Senior industry professionals sharing architecture lessons, reviewing student pull requests, and judging hackathons.',
      badge: 'Mentorship Track',
    },
  ];

  const participationPathways = [
    {
      role: 'Participant',
      action: 'Attend sessions & compete in hackathons',
      href: '/join?pathway=participant',
      icon: Terminal,
    },
    {
      role: 'Volunteer',
      action: 'Support hackathon logistics & community operations',
      href: '/join?pathway=volunteer',
      icon: HeartHandshake,
    },
    {
      role: 'Speaker',
      action: 'Deliver masterclasses & architecture walkthroughs',
      href: '/join?pathway=speaker',
      icon: Users,
    },
    {
      role: 'Mentor',
      action: 'Review code & guide student hackathon teams',
      href: '/join?pathway=mentor',
      icon: Compass,
    },
    {
      role: 'Organizer',
      action: 'Coordinate regional meetups & tech symposiums',
      href: '/join?pathway=organizer',
      icon: Building2,
    },
    {
      role: 'Campus Representative',
      action: 'Lead chapter outreach and student admissions',
      href: '/join?pathway=campus-rep',
      icon: Award,
    },
  ];

  const communityActivities = [
    {
      title: 'Competitive Hackathons',
      desc: 'High-intensity, multi-day engineering sprints like CyberForge where teams solve real infrastructure and software challenges.',
      icon: Trophy,
    },
    {
      title: 'Knowledge Sharing Series (KSS)',
      desc: 'Weekly and bi-weekly interactive masterclasses covering DevOps, cybersecurity, cloud architecture, and modern full-stack development.',
      icon: Terminal,
    },
    {
      title: 'Peer Architecture Reviews',
      desc: 'Hands-on review sessions where student developers present system blueprints and receive feedback from production engineers.',
      icon: Code,
    },
    {
      title: 'Campus Chapter Sprints',
      desc: 'In-person study groups and buildathons run at colleges chartered under the OrigoHOST Student Chapter network.',
      icon: Building2,
    },
  ];

  const communityPillars = [
    {
      icon: Compass,
      title: 'Open Participation',
      desc: 'Free access to community sessions, knowledge hubs, and open-source tools without paywalls.',
    },
    {
      icon: Code,
      title: 'Action-First Focus',
      desc: 'Every community activity is structured around writing code, debugging systems, or deploying prototypes.',
    },
    {
      icon: Users,
      title: 'Decentralized Leadership',
      desc: 'Regional chapters operate with autonomy, organized by local student leads under master brand standards.',
    },
    {
      icon: Shield,
      title: 'Strict Code of Conduct',
      desc: 'A safe, merit-based environment welcoming builders from all institutions and experience levels.',
    },
  ];

  const chapterBenefits = [
    'Official OrigoHOST Student Chapter Charter and recognition certificate',
    'Curriculum kits and presentation slide decks for technical workshops',
    'Free OrigoHOST Cloud sandbox infrastructure credits for chapter hackathons',
    'Direct routing of keynote speakers and industry mentors to your campus',
    'Exclusive invitations to the national CyberForge builder finals',
  ];

  const communityFaqs = [
    {
      id: 'comm-faq-1',
      title: 'Are there any fees or subscriptions required to join?',
      content: 'Joining the OrigoHOST community is free. While core community sessions, webinars, and open-source projects are completely free, select specialized masterclasses, advanced compute sandboxes, or professional certification tracks may be paid based on specific program requirements.',
    },
    {
      id: 'comm-faq-2',
      title: 'How can our college start an official OrigoHOST Student Chapter?',
      content: 'Student leaders can apply through the Campus Lead pathway on our Join page. Our community operations team will review your application and provide the official Chapter Handbook and charter guidelines.',
    },
    {
      id: 'comm-faq-3',
      title: 'Can beginner developers and first-year students participate?',
      content: 'Absolutely. Programs like the Knowledge Sharing Series (KSS) are specifically designed with foundational modules to transition beginners into practical builders.',
    },
    {
      id: 'comm-faq-4',
      title: 'How are volunteers and contributors recognized?',
      content: 'Active contributors receive verified credential badges, recommendations, and pathways into technical leadership and advisory roles.',
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
              <span className="origo-eyebrow">Decentralized Builder Network</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              A community of engineers who learn, build, and <span className="text-gradient-origo">ship together.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              OrigoHOST unites developers, researchers, students, and mentors across India around practical software engineering, competitive hackathons, and local campus chapters.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="/join" variant="primary" size="lg">
                Join a Pathway
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/resources" variant="secondary" size="lg">
                Download Chapter Handbook
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Ecosystem Cohorts ─────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Ecosystem Cohorts</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Who Is Part of OrigoHOST?
            </Heading>
            <Text size="md" variant="secondary">
              Whether you are writing your first line of code or architecting distributed systems, there is a designated participation cohort tailored to your focus.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memberCohorts.map((cohort) => (
              <div
                key={cohort.title}
                className="p-7 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="primary">{cohort.badge}</Badge>
                  </div>
                  <Heading as="h3" size="sm" className="mb-2 text-ink">
                    {cohort.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="leading-relaxed">
                    {cohort.desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. Participation Pathways ────────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Engagement Blueprint</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              6 Ways to Get Involved
            </Heading>
            <Text size="md" variant="secondary">
              Choose the pathway that matches your skills, availability, and technical career goals.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {participationPathways.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.role}
                  href={path.href}
                  className="p-6 rounded-card bg-surface border border-border shadow-xs hover:shadow-card hover:border-primary/40 transition-all flex flex-col justify-between group outline-none"
                >
                  <div>
                    <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Heading as="h3" size="sm" className="mb-1 text-ink group-hover:text-primary transition-colors">
                      {path.role}
                    </Heading>
                    <Text size="sm" variant="secondary" className="leading-relaxed">
                      {path.action}
                    </Text>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border/40 flex items-center gap-1.5 text-primary text-body-xs font-semibold">
                    Apply via Join Portal
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 4. Community Activities ──────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-kicker text-primary uppercase">What We Do</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Community Activities
            </Heading>
            <Text size="md" variant="secondary">
              Continuous learning, competitive development, and structured collaboration sprints.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.title}
                  className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Heading as="h3" size="sm" className="mb-2 text-ink">
                      {act.title}
                    </Heading>
                    <Text size="xs" variant="secondary" className="leading-relaxed">
                      {act.desc}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 5. Campus Chapter Framework ──────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="primary" dot>
              Decentralized Model
            </Badge>
            <Heading as="h2" size="xl">
              Charter an OrigoHOST Chapter on Your Campus
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              Student chapter charters give ambitious campus developers the backing, brand recognition, and curriculum resources required to build a thriving technical hub at their college.
            </Text>

            <div className="space-y-3 pt-2">
              {chapterBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-body-sm text-ink-secondary font-medium leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button href="/join?pathway=campus-rep" variant="primary" size="lg">
                Apply for Chapter Charter
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-card bg-surface border border-border shadow-card space-y-6">
            <span className="text-caption font-mono uppercase text-primary font-bold">
              Charter Progression Timeline
            </span>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center font-mono text-caption font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-body-md text-ink">Application & Interview</h4>
                  <p className="text-body-xs text-ink-muted">Prospective student lead submits credentials and motivation.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center font-mono text-caption font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-body-md text-ink">Charter Provisioning</h4>
                  <p className="text-body-xs text-ink-muted">Receive official Chapter Handbook, badge assets, and slide decks.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center font-mono text-caption font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-body-md text-ink">Inaugural Hack Day</h4>
                  <p className="text-body-xs text-ink-muted">Launch with co-hosted technical workshop and builder orientation.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 6. Upcoming Events Preview ───────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <Section spacing="lg" background="default">
          <Container size="lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-kicker text-primary uppercase">Live Community Calendar</span>
                <Heading as="h2" size="xl" className="mt-1">
                  Upcoming Community Sessions
                </Heading>
              </div>
              <Button href="/events" variant="secondary" size="md">
                View Full Calendar
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── 7. Member Stories & Voices ───────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Community Voices</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Builder Perspectives
            </Heading>
            <Text size="md" variant="secondary">
              Real experiences from developers and student chapter coordinators in the ecosystem.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.slice(0, 3).map((st) => (
              <div
                key={st.id}
                className="p-7 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <p className="text-body-sm text-ink-secondary italic leading-relaxed mb-6">
                    &ldquo;{st.story}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-border/40">
                  <span className="font-semibold text-body-sm text-ink block">{st.name}</span>
                  <span className="text-caption text-ink-muted">{st.role}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 8. Guidelines & FAQ ──────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="md">
          <div className="text-center mb-12">
            <span className="text-kicker text-primary uppercase">Community Norms</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Community FAQ & Guidelines
            </Heading>
            <Text size="md" variant="secondary">
              Clear rules ensuring a welcoming, productive builder environment.
            </Text>
          </div>

          <Accordion items={communityFaqs} allowMultiple />
        </Container>
      </Section>

      {/* ── 9. Final CTA ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#FFF7ED] dark:bg-[#020817] relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4">
            Open Intake
          </Badge>
          <Heading as="h2" size="xl" className="text-foreground mb-4 font-display">
            Ready to Build With Us?
          </Heading>
          <Text size="lg" className="text-foreground-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Join the developer ecosystem today. Choose your participation pathway, access free documentation, and start shipping software.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join" variant="primary" size="lg">
              Choose Your Pathway
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Contact Community Team
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
