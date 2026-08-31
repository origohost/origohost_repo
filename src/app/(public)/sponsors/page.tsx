import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Coins, Users, Flame, Calendar, CheckCircle2, ArrowRight,
  Shield, Award, ExternalLink, HelpCircle
} from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Accordion } from '@/components/ui/Accordion';
import { getSponsors } from '@/services/content/sponsors.service';

export const metadata: Metadata = {
  title: 'Corporate Sponsorship & Technical Partnerships',
  description:
    'Support student hackathons, open-source development, and developer education across India. Review sponsorship tiers and audience reach.',
};

export default async function SponsorsPage() {
  const allSponsors = await getSponsors();
  const sponsorshipTiers = [
    {
      tier: 'Strategic Partner',
      audience: 'Flagship Partner Across All 2026 Initiatives',
      benefits: [
        'Title sponsor branding on CyberForge 2026',
        'Keynote speaker slot at all national webinars',
        'Direct access to opt-in hackathon participant resumes',
        'Custom track challenge with dedicated API bounties',
        'Prominent logo placement on all documentation and portal footers',
      ],
      badge: 'Premier',
    },
    {
      tier: 'Track Sponsor',
      audience: 'Specific Challenge Track Sponsor',
      benefits: [
        'Dedicated hackathon challenge track (e.g. AI, DevOps, Cloud)',
        'Workshop hosting slot during the Knowledge Sharing Series',
        'Access to submissions and winners in your designated track',
        'Prominent logo on event marketing and session streams',
      ],
      badge: 'Specialized',
    },
    {
      tier: 'Community Supporter',
      audience: 'Grassroots Developer Grants',
      benefits: [
        'Logo placement on community event directories and slides',
        'Direct distribution of API credits or developer perks',
        'Mention in official press releases and event wrap-ups',
      ],
      badge: 'Ecosystem',
    },
  ];

  const sponsorFaqs = [
    {
      id: 'sponsor-faq-1',
      title: 'How are sponsorship contributions allocated?',
      content: 'Sponsorship funding is directed transparently toward student travel grants, compute infrastructure sandbox credits, event venue logistics, and hackathon prize bounties.',
    },
    {
      id: 'sponsor-faq-2',
      title: 'Can sponsors propose custom challenge problems for hackathons?',
      content: 'Yes. Track and Strategic sponsors work directly with our technical direction team to craft realistic engineering problems featuring your tools, SDKs, or cloud infrastructure.',
    },
    {
      id: 'sponsor-faq-3',
      title: 'What demographic does OrigoHOST reach?',
      content: 'Our verified community reaches engineering students, early-career developers, campus leads, and tech enthusiasts across Tier 1, 2, and 3 engineering colleges throughout India.',
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
              <span className="origo-eyebrow">Sponsorship Portfolio</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Empower the next generation of <span className="text-gradient-origo">software engineers.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              Sponsor OrigoHOST hackathons, workshops, and student chapters. Connect directly with verified developers, promote developer tools, and discover top-tier engineering talent.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact?category=sponsorship" variant="primary" size="lg">
                Request Sponsorship Deck
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="#tiers" variant="secondary" size="lg">
                View Sponsorship Tiers
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Why Sponsor OrigoHOST ─────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Tangible Value</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Why Partner as a Sponsor?
            </Heading>
            <Text size="md" variant="secondary">
              Direct access to builders solving problems, not passive lecture attendees.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-card bg-surface border border-border shadow-xs">
              <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <Heading as="h3" size="sm" className="mb-2">
                High-Intent Developer Reach
              </Heading>
              <Text size="sm" variant="secondary" className="leading-relaxed">
                Reach active engineering students and practitioners across college campuses and regional developer hubs.
              </Text>
            </div>

            <div className="p-7 rounded-card bg-surface border border-border shadow-xs">
              <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Flame className="h-5 w-5" aria-hidden="true" />
              </div>
              <Heading as="h3" size="sm" className="mb-2">
                API & Tool Adoption
              </Heading>
              <Text size="sm" variant="secondary" className="leading-relaxed">
                Put your developer tools, APIs, and cloud services directly into the hands of competitors building hackathon capstones.
              </Text>
            </div>

            <div className="p-7 rounded-card bg-surface border border-border shadow-xs">
              <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Award className="h-5 w-5" aria-hidden="true" />
              </div>
              <Heading as="h3" size="sm" className="mb-2">
                Verified Talent Discovery
              </Heading>
              <Text size="sm" variant="secondary" className="leading-relaxed">
                Evaluate candidates based on actual merged code, working deployments, and hackathon presentation rigor.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3. Sponsorship Tiers ─────────────────────────────────────── */}
      <Section spacing="lg" background="surface" id="tiers">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Engagement Levels</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Sponsorship Packages
            </Heading>
            <Text size="md" variant="secondary">
              Flexible tiers structured around your hiring, developer marketing, and CSR initiatives.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsorshipTiers.map((tier) => (
              <div
                key={tier.tier}
                className="p-7 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">
                    <Badge variant="secondary">{tier.badge}</Badge>
                  </div>
                  <Heading as="h3" size="sm" className="mb-1">
                    {tier.tier}
                  </Heading>
                  <Text size="xs" variant="muted" className="mb-6">
                    {tier.audience}
                  </Text>
                  <div className="space-y-2.5 pt-4 border-t border-border/60">
                    {tier.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-body-xs text-ink-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-border/40">
                  <Button href="/contact?category=sponsorship" variant="outline" size="sm" className="w-full">
                    Inquire for Package
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 4. Current Supporters ────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Supporters</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Verified Sponsors & Organizations
            </Heading>
            <Text size="md" variant="secondary">
              Organizations actively supporting student builders and competitive technical events.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-caption font-mono text-primary uppercase font-semibold block mb-1">
                    {sponsor.tier}
                  </span>
                  <h4 className="font-display font-bold text-heading-md text-ink mb-2">
                    {sponsor.name}
                  </h4>
                  <Text size="xs" variant="secondary">
                    Supporting technical education and competitive hackathons across the ecosystem.
                  </Text>
                </div>
                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-body-xs font-semibold hover:gap-1.5 transition-all pt-3 border-t border-border/40 mt-4"
                  >
                    Visit sponsor
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. Sponsor FAQ ───────────────────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="md">
          <div className="text-center mb-12">
            <span className="text-kicker text-primary uppercase">Governance & Compliance</span>
            <Heading as="h2" size="xl" className="mt-1">
              Sponsorship FAQ
            </Heading>
          </div>
          <Accordion items={sponsorFaqs} allowMultiple />
        </Container>
      </Section>

      {/* ── 6. Final CTA ─────────────────────────────────────────────── */}
      <section className="section-dark py-24 md:py-32 relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4 !bg-white/10 !text-white !border-white/20">
            Support Builders
          </Badge>
          <Heading as="h2" size="xl" className="text-white mb-4">
            Become an OrigoHOST Sponsor
          </Heading>
          <Text size="lg" className="text-[#B7C2D9] max-w-xl mx-auto mb-8 leading-relaxed">
            Partner with us to support upcoming hackathons, provide API credits, and connect with premier engineering talent.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact?category=sponsorship" variant="primary" size="lg">
              Contact Sponsorship Team
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/events"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              View Upcoming Events
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
