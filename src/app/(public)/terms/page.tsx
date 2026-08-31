import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Container, Section } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Terms & Conditions — OrigoHOST',
  description:
    'OrigoHOST Terms & Conditions of website use, community participation, and event attendance across India.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Terms & Conditions', href: '/terms' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── Breadcrumbs ────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface py-3">
        <Container size="lg">
          <Breadcrumb items={breadcrumbs} />
        </Container>
      </div>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-16 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="md" className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="primary" dot>
              Institutional & Legal
            </Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// CODE OF CONDUCT'}</span>
          </div>
          <Heading as="h1" size="2xl" className="mb-4">
            Terms & Conditions
          </Heading>
          <Text size="sm" variant="muted">
            Effective Date: August 28, 2026 | Last Updated: August 28, 2026
          </Text>
        </Container>
      </section>

      {/* ── Prose Content ──────────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="md" className="space-y-8">
          <p className="text-body-lg text-ink font-semibold leading-relaxed">
            Please read these terms and conditions carefully before utilizing the OrigoHOST website, participating in our programs, registering for hackathons, or accessing our curated open-source resources.
          </p>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              1. Acceptance of Terms
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              By accessing our website or participating in OrigoHOST events, workshops, and cohorts, you agree to comply with these terms, our community code of conduct, and all applicable laws and regulations in India.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              2. Community Code of Conduct
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              OrigoHOST is dedicated to providing a harassment-free experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, race, or religion. Harassment of event participants, speakers, or mentors in any form will result in immediate expulsion from the community network without recourse.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              3. Intellectual Property & Project Ownership
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              Participants retain 100% intellectual property rights to the code, software architectures, and projects they develop during OrigoHOST hackathons and cohorts. OrigoHOST claims zero ownership over participant repository creations.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              4. Chapter Charter Governance
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              Official OrigoHOST Student Chapters operate under approved charter guidelines. Chapter leads are expected to uphold transparent financial ethics, non-discriminatory participation rules, and accurate brand representation.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              5. Limitation of Liability
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              OrigoHOST provides learning materials, webinars, and sandbox developer infrastructure on an &ldquo;as is&rdquo; basis. In no event shall OrigoHOST or its organizers be liable for any indirect, incidental, or consequential damages resulting from platform usage or service interruptions.
            </Text>
          </div>
        </Container>
      </Section>
    </div>
  );
}
