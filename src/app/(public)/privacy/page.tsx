import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Container, Section } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Privacy Policy — OrigoHOST',
  description:
    'OrigoHOST Privacy Policy — how we process, protect, and manage personal data across our technology ecosystem and developer community.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy' },
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
            <span className="text-body-xs font-mono text-ink-muted">{'// COMPLIANCE'}</span>
          </div>
          <Heading as="h1" size="2xl" className="mb-4">
            Privacy Policy
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
            OrigoHOST (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, store, protect, and manage personal information across our website, events, programs, registrations, communications, and digital platforms.
          </p>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              1. Scope of This Policy
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              This policy applies to all users, participants, volunteers, campus chapters, and institutions interacting with the OrigoHOST digital ecosystem, website, forms, and services. It does not cover third-party services which operate under their own independent policies.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              2. Who We Are & Contact Channels
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              OrigoHOST is an India-origin technology and community ecosystem bridging the gap between learning technology and building production systems across India. For inquiries regarding data processing, you can contact our administration at <span className="font-semibold text-primary">info@origohost.com</span> or via our <Link href="/contact" className="text-primary hover:underline font-semibold">Contact Portal</Link>.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              3. Information We Collect
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              We collect information that you provide directly when registering for hackathons, applying for campus chapters, submitting inquiries, or downloading resources. This includes names, email addresses, institutional affiliations, and submitted technical portfolios.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              4. How We Use Information
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              We use collected information exclusively to coordinate event logistics, process cohort applications, issue participation certificates, communicate curriculum updates, and ensure ecosystem security. We never sell or license your personal information to commercial third-party advertisers.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              5. Data Security & Retention
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              We employ encryption in transit (HTTPS/TLS) and secure storage infrastructure to safeguard your information. We retain personal data only for as long as necessary to fulfill the educational or programmatic purposes for which it was gathered.
            </Text>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Heading as="h2" size="sm" className="text-ink">
              6. Your Rights
            </Heading>
            <Text size="md" variant="secondary" className="leading-relaxed">
              You have the right to request access to the personal data we hold about you, request corrections, or request deletion of your account records. To exercise these rights, submit a request through our contact channels.
            </Text>
          </div>
        </Container>
      </Section>
    </div>
  );
}
