import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Terminal, Users, BookOpen, Sparkles, Shield,
  ArrowRight, CheckCircle2, Award, HeartHandshake,
  Compass, Cpu, Layers
} from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { getTeamMembers } from '@/services/content/team.service';
import { TeamCard } from '@/components/cards/TeamCard';

export const metadata: Metadata = {
  title: 'About OrigoHOST — Mission, Ecosystem Model & Governance',
  description:
    'Discover the origins, core values, architectural model, and leadership behind OrigoHOST. Where builders become innovators across India.',
};

export default async function AboutPage() {
  const allTeam = await getTeamMembers();
  const leadership = allTeam.filter(
    (m) => m.department === 'Leadership' || m.department === 'Technical Direction'
  );

  const pillars = [
    {
      icon: Terminal,
      title: 'Infrastructure & Tooling',
      desc: 'Providing real deployment environments, code templates, and compute access through OrigoHOST Cloud and OrigoHOST Dev.',
    },
    {
      icon: BookOpen,
      title: 'Practical Education',
      desc: 'Structured curricula and webinars that bridge theoretical computer science with real-world production engineering.',
    },
    {
      icon: Users,
      title: 'Grassroots Community',
      desc: 'Decentralized campus chapters and local builder groups operating across colleges and tech hubs in India.',
    },
    {
      icon: Sparkles,
      title: 'Competitive Innovation',
      desc: 'Flagship buildathons and hackathons where talent is identified, tested, and elevated directly into industry networks.',
    },
  ];

  const differentiators = [
    {
      title: 'Zero Vanity Metrics',
      desc: 'We do not inflate membership counters or celebrate attendance numbers. Our focus is strictly on projects deployed, pull requests merged, and chapters active.',
    },
    {
      title: 'Action Over Theory',
      desc: 'Every session, workshop, and webinar is backed by real code repositories, executable demos, and structured student participation.',
    },
    {
      title: 'Institutional Independence',
      desc: 'OrigoHOST operates with strict governance and an ethical firewall separating educational programs from commercial sponsor demands.',
    },
    {
      title: 'Transparent Pathways',
      desc: 'Clear, verifiable progression from novice learner to active builder, volunteer organizer, speaker, and chapter lead.',
    },
  ];

  const timelineMilestones = [
    {
      year: '2024',
      title: 'Foundation & First Hackathon',
      desc: 'Inception of the OrigoHOST community network; launched inaugural CyberForge hackathon uniting builders across regional universities.',
    },
    {
      year: '2025',
      title: 'Knowledge Sharing Series Launch',
      desc: 'Rolled out the structured multi-episode technical webinar series covering Cybersecurity, Cloud Infrastructure, and DevOps.',
    },
    {
      year: '2026',
      title: 'Ecosystem Expansion & Chapters',
      desc: 'Institutionalization of the Master Brand model; expansion of official student chapters and foundational AI training tracks.',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. About Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Ecosystem Narrative</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Building the ecosystem where builders become <span className="text-gradient-origo">innovators.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              OrigoHOST is an India-origin technology and community ecosystem dedicated to empowering students, developers, and institutions through practical engineering experiences and structured builder pathways.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="/community" variant="primary" size="md">
                Explore Community
              </Button>
              <Button href="/team" variant="secondary" size="md">
                Meet the Team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Mission & Vision ──────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-kicker text-primary uppercase block mb-2">Our Mission</span>
                <Heading as="h2" size="lg" className="mb-4">
                  Democratizing Practical Engineering Experience
                </Heading>
                <Text size="md" variant="secondary" className="leading-relaxed">
                  To eliminate the disconnect between textbook computing education and industrial software engineering by providing access to verified curricula, infrastructure, and an active builder peer network.
                </Text>
              </div>
              <div className="mt-8 pt-4 border-t border-border/40 flex items-center gap-2 text-primary text-body-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Action-driven engineering education</span>
              </div>
            </div>

            <div className="p-8 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-kicker text-primary uppercase block mb-2">Our Vision</span>
                <Heading as="h2" size="lg" className="mb-4">
                  A High-Caliber Builder Network Across India
                </Heading>
                <Text size="md" variant="secondary" className="leading-relaxed">
                  To establish thriving OrigoHOST student chapters and builder hubs in every premier engineering institution, training engineers who launch open software and solve real infrastructural challenges.
                </Text>
              </div>
              <div className="mt-8 pt-4 border-t border-border/40 flex items-center gap-2 text-primary text-body-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Decentralized grassroots leadership</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3. The 4 Foundation Pillars ──────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-kicker text-primary uppercase">Operating Foundations</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              How OrigoHOST Operates
            </Heading>
            <Text size="md" variant="secondary">
              Four interlocking pillars that enable developers to progress from initial learners into recognized platform engineers.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-card bg-surface border border-border shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Heading as="h3" size="sm" className="mb-2">
                      {pillar.title}
                    </Heading>
                    <Text size="sm" variant="secondary" className="leading-relaxed">
                      {pillar.desc}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 4. What Makes OrigoHOST Different ───────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Distinctive Standards</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              What Sets OrigoHOST Apart
            </Heading>
            <Text size="md" variant="secondary">
              We operate as a technical community and infrastructure hub, not a hype-driven marketing club or course aggregator.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((diff) => (
              <div
                key={diff.title}
                className="p-6 rounded-card bg-surface border border-border shadow-xs"
              >
                <Heading as="h3" size="sm" className="text-ink mb-2">
                  {diff.title}
                </Heading>
                <Text size="sm" variant="secondary" className="leading-relaxed">
                  {diff.desc}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. Ecosystem Journey Timeline ───────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-kicker text-primary uppercase">Our Evolution</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              The Journey So Far
            </Heading>
            <Text size="md" variant="secondary">
              A chronological view of our growth, milestones, and expanding ecosystem footprint.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timelineMilestones.map((item) => (
              <div
                key={item.year}
                className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono font-bold text-heading-lg text-primary block mb-2">
                    {item.year}
                  </span>
                  <Heading as="h3" size="sm" className="mb-2">
                    {item.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="leading-relaxed">
                    {item.desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 6. Leadership & Accountability ─────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-kicker text-primary uppercase">Ecosystem Stewards</span>
              <Heading as="h2" size="xl" className="mt-1">
                Leadership & Technical Direction
              </Heading>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1 text-primary font-semibold text-body-sm hover:underline"
            >
              View complete team directory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.slice(0, 3).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 7. Call To Action ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#FFF7ED] dark:bg-[#020817] relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4">
            Build With Us
          </Badge>
          <Heading as="h2" size="xl" className="text-foreground mb-4 font-display">
            Ready to Build Systems That Matter?
          </Heading>
          <Text size="lg" className="text-foreground-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of developers, chapter leads, and mentors collaborating inside the OrigoHOST ecosystem.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join" variant="primary" size="lg">
              Apply for Pathway
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Contact Team
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
