import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Handshake, Building2, CheckCircle2, ArrowRight, ExternalLink,
  Award, Globe, Shield, Users, Landmark
} from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { getPartners } from '@/services/content/partners.service';

export const metadata: Metadata = {
  title: 'Institutional & Ecosystem Partners',
  description:
    'Explore institutional collaboration frameworks, university MoUs, and technology ecosystem partnerships with OrigoHOST across India.',
};

export default async function PartnersPage() {
  const allPartners = await getPartners();
  const partnerModels = [
    {
      title: 'Academic Institutions & Colleges',
      badge: 'MoU Framework',
      desc: 'Collaborative hackathons, faculty co-branded workshops, student chapter charters, and hands-on curriculum support.',
      benefits: ['Campus Hackathons', 'Faculty Workshops', 'Official Chapter Charters', 'Student Mentorship'],
    },
    {
      title: 'Technology & Cloud Providers',
      badge: 'API & Infrastructure',
      desc: 'Providing API access, compute credits, technical mentors, and specialized challenge tracks for competitive hackathons.',
      benefits: ['Developer API Adoption', 'Hackathon Challenge Tracks', 'Technical Keynotes', 'Talent Discovery'],
    },
    {
      title: 'Community Ecosystem Networks',
      badge: 'Decentralized Hubs',
      desc: 'Joint meetups, cross-community promotion, shared speaker rosters, and collaborative regional conferences.',
      benefits: ['Shared Speaker Rosters', 'Regional Co-Meetups', 'Cross-Community Reach', 'Resource Sharing'],
    },
  ];

  const partnershipSteps = [
    { step: '01', title: 'Initial Inquiry', desc: 'Submit a collaboration proposal specifying institutional goals, student body size, or technical tools.' },
    { step: '02', title: 'Alignment Meeting', desc: 'Our partnerships team schedules a strategic sync to define mutual milestones, MoUs, and delivery timelines.' },
    { step: '03', title: 'Charter & Execution', desc: 'Execution of formal partnership framework; onboarding chapter leads or scheduling collaborative hackathons.' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Collaborative Alliances</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Building together. Creating <span className="text-gradient-origo">institutional impact.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              OrigoHOST collaborates with universities, technical institutes, developer tool companies, and community organizations to build sustainable technical ecosystems across India.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact?category=institutional" variant="primary" size="lg">
                Initiate Partnership
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="#models" variant="secondary" size="lg">
                Explore Partnership Models
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Partnership Models ────────────────────────────────────── */}
      <Section spacing="lg" background="default" id="models">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Collaboration Frameworks</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              How We Collaborate
            </Heading>
            <Text size="md" variant="secondary">
              Structured partnership tiers ensuring mutual value, transparency, and high educational standards.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerModels.map((model) => (
              <div
                key={model.title}
                className="p-7 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">
                    <Badge variant="secondary">{model.badge}</Badge>
                  </div>
                  <Heading as="h3" size="sm" className="mb-2">
                    {model.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="leading-relaxed mb-6">
                    {model.desc}
                  </Text>
                  <div className="space-y-2 pt-4 border-t border-border/60">
                    <span className="text-caption font-mono text-ink-muted uppercase font-bold block mb-1">
                      Deliverables:
                    </span>
                    {model.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-body-xs text-ink-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. Active Partners Showcase ──────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Ecosystem Network</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Current Partner Organizations
            </Heading>
            <Text size="md" variant="secondary">
              Verified universities and developer ecosystems collaborating with OrigoHOST.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allPartners.map((partner) => (
              <div
                key={partner.id}
                className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{partner.category}</Badge>
                  </div>
                  <h4 className="font-display font-bold text-heading-md text-ink mb-2">
                    {partner.name}
                  </h4>
                  <Text size="xs" variant="secondary" className="leading-relaxed mb-4">
                    {partner.description}
                  </Text>
                </div>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-body-xs font-semibold hover:gap-1.5 transition-all pt-3 border-t border-border/40"
                  >
                    Partner website
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 4. Partnership Process ──────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-kicker text-primary uppercase">Execution Pipeline</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              The Partnership Process
            </Heading>
            <Text size="md" variant="secondary">
              Simple, transparent steps to formalize institutional collaboration.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnershipSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-primary font-bold text-heading-lg mb-2 block">
                    {step.step}
                  </span>
                  <Heading as="h3" size="sm" className="mb-2">
                    {step.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="leading-relaxed">
                    {step.desc}
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
            Institutional Intake
          </Badge>
          <Heading as="h2" size="xl" className="text-white mb-4">
            Bring OrigoHOST to Your Institution
          </Heading>
          <Text size="lg" className="text-[#B7C2D9] max-w-xl mx-auto mb-8 leading-relaxed">
            Collaborate on competitive hackathons, student chapters, and verified technical curricula.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact?category=institutional" variant="primary" size="lg">
              Contact Partnerships Team
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/community"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Explore Chapter Network
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
