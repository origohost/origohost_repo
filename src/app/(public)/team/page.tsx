import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, HeartHandshake, Users, Sparkles } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { TeamCard } from '@/components/cards/TeamCard';
import { getTeamMembers } from '@/services/content/team.service';

export const metadata: Metadata = {
  title: 'Leadership & Organizing Core',
  description:
    'Meet the engineers, organizers, and educators directing the OrigoHOST developer community, technical hackathons, and campus chapters across India.',
};

export default async function TeamPage() {
  const allTeam = await getTeamMembers();
  const leadership = allTeam.filter((m) => m.department === 'Leadership');
  const technicalTeam = allTeam.filter((m) => m.department === 'Technology' || m.department === 'Education');

  const principles = [
    {
      title: 'Action-First Accountability',
      desc: 'Our organizers write code, debug systems, and coordinate sessions directly alongside community participants.',
    },
    {
      title: 'Decentralized Mentorship',
      desc: 'We empower campus chapter leads with operational autonomy to run local hackathons under master brand standards.',
    },
    {
      title: 'Uncompromising Governance',
      desc: 'Strict transparency in event judging, merit-based speaker selection, and institutional firewalling.',
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
              <span className="origo-eyebrow">Ecosystem Stewards</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              The organizers and engineers <span className="text-gradient-origo">behind OrigoHOST.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              Guiding technical direction, campus chapters, and national hackathons with a commitment to open-source software and builder empowerment.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="/join?pathway=volunteer" variant="primary" size="lg">
                Join the Organizing Team
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                Our Mission & History
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Leadership Section ────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Executive Stewards</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Leadership Core
            </Heading>
            <Text size="md" variant="secondary">
              Directing ecosystem strategy, institutional partnerships, and community growth across India.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. Technical & Community Operations ──────────────────────── */}
      {technicalTeam.length > 0 && (
        <Section spacing="lg" background="surface">
          <Container size="lg">
            <div className="max-w-3xl mb-12">
              <span className="text-kicker text-primary uppercase">Operations & Technology</span>
              <Heading as="h2" size="xl" className="mt-1 mb-3">
                Community & Program Management
              </Heading>
              <Text size="md" variant="secondary">
                Coordinating live broadcasts, student hackathon support, and open-source tooling.
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── 4. Team Philosophy ──────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-kicker text-primary uppercase">Guiding Values</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Our Organizing Principles
            </Heading>
            <Text size="md" variant="secondary">
              How we approach community leadership, education, and technical governance.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-7 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <Heading as="h3" size="sm" className="mb-2">
                    {p.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="leading-relaxed">
                    {p.desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. Final CTA ─────────────────────────────────────────────── */}
      <section className="section-dark py-24 md:py-32 relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4 !bg-white/10 !text-white !border-white/20">
            Open Call
          </Badge>
          <Heading as="h2" size="xl" className="text-white mb-4">
            Join the OrigoHOST Organizing Core
          </Heading>
          <Text size="lg" className="text-[#B7C2D9] max-w-xl mx-auto mb-8 leading-relaxed">
            We are always looking for passionate community organizers, technical mentors, and campus ambassadors.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join?pathway=volunteer" variant="primary" size="lg">
              Apply as Volunteer / Lead
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Contact Leadership
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
