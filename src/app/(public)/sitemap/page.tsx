import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Network, ChevronRight } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

export const metadata: Metadata = {
  title: 'Sitemap — OrigoHOST Directory',
  description: 'OrigoHOST site map and hierarchical page directory across all technical tracks, initiatives, and legal resources.',
};

export default function SitemapPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Sitemap', href: '/sitemap' },
  ];

  const sitemapGroups = [
    {
      title: 'Explore OrigoHOST',
      links: [
        { label: 'Home', href: '/', desc: 'Introduction, value proposition, featured programs and active events.' },
        { label: 'About', href: '/about', desc: 'Our vision, principles, ecosystem entities, leadership and operating pillars.' },
        { label: 'Community', href: '/community', desc: 'Our developer coordination pathways and Campus Chapter specifications.' },
        { label: 'Team', href: '/team', desc: 'The organizers and tech directors driving the community.' },
      ],
    },
    {
      title: 'Ecosystem & Programs',
      links: [
        { label: 'Events', href: '/events', desc: 'Webinars (KSS 2026), hackathons (CyberForge 2026) and local meetups.' },
        { label: 'Programs', href: '/programs', desc: 'Structured tech pathways and curriculum series definitions.' },
        { label: 'Projects', href: '/projects', desc: 'Open-source repositories and community-built developer tools shipped to GitHub.' },
        { label: 'Partners', href: '/partners', desc: 'Verified academic and technological collaborators.' },
        { label: 'Sponsors', href: '/sponsors', desc: 'Strategic partners and sponsorship value specifications.' },
      ],
    },
    {
      title: 'Knowledge & Dispatches',
      links: [
        { label: 'Resources', href: '/resources', desc: 'Practical documentation, guides, learning paths, and downloadable tools.' },
        { label: 'Blog / News', href: '/blog', desc: 'Official articles, engineering post-mortems, and announcements.' },
        { label: 'Gallery / Media', href: '/gallery', desc: 'Visual records of collaboration, hackathon finals, and meetups.' },
        { label: 'FAQ', href: '/faq', desc: 'Answers to inquiries regarding chapters, sponsorship and policies.' },
      ],
    },
    {
      title: 'Get Involved & Discovery',
      links: [
        { label: 'Join OrigoHOST', href: '/join', desc: 'Pathway applications for participants, volunteers, speakers and mentors.' },
        { label: 'Contact', href: '/contact', desc: 'Inquiry forms with routing categories and response SLAs.' },
        { label: 'Search', href: '/search', desc: 'Unified cross-ecosystem search interface.' },
      ],
    },
    {
      title: 'Institutional & Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy', desc: 'Information collection consent, rights, and privacy practices.' },
        { label: 'Terms & Conditions', href: '/terms', desc: 'Conditions of website use, codes of conduct, and chapter charters.' },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── Breadcrumbs ────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface py-3">
        <Container size="lg">
          <Breadcrumb items={breadcrumbs} />
        </Container>
      </div>

      {/* ── Page Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-16 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="primary" dot>
                Platform Directory
              </Badge>
              <span className="text-body-xs font-mono text-ink-muted">{'// HIERARCHY'}</span>
            </div>
            <Heading as="h1" size="2xl" className="mb-4">
              OrigoHOST Sitemap
            </Heading>
            <Text size="lg" variant="secondary" className="leading-relaxed">
              Navigate directly to any section of the OrigoHOST ecosystem using this complete, indexable directory.
            </Text>
          </div>
        </Container>
      </section>

      {/* ── Sitemap Listings ─────────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sitemapGroups.map((group) => (
              <div key={group.title} className="p-6 rounded-card bg-surface border border-border shadow-xs space-y-6">
                <h2 className="text-caption font-mono uppercase tracking-wider text-primary font-bold border-b border-border/60 pb-3">
                  {group.title}
                </h2>

                <div className="space-y-4">
                  {group.links.map((link) => (
                    <div key={link.href} className="group">
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1.5 font-display font-semibold text-body-md text-ink group-hover:text-primary transition-colors outline-none"
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4 text-ink-muted group-hover:text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                      <p className="text-body-xs text-ink-secondary mt-1 leading-relaxed">
                        {link.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
