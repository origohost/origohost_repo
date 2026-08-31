import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Download, Terminal, FileCode, CheckCircle2 } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { ResourceDirectory } from '@/features/resources';
import { getResources } from '@/services/content/resources.service';
import { Spinner } from '@/components/shared/Spinner';

export const metadata: Metadata = {
  title: 'Engineering Resources, Guides & Starter Kits',
  description:
    'Access verified technical documentation, deployment guides, chapter starter handbooks, and open-source toolkits curated by OrigoHOST.',
};

export default async function ResourcesPage() {
  const allResources = await getResources();

  const resourceCategories = [
    {
      title: 'Systems & Cloud Deployment',
      desc: 'Guides covering VPS configuration, reverse proxies, Linux server hardening, and Docker containerization.',
      icon: Terminal,
    },
    {
      title: 'Open Source & Git Flow',
      desc: 'Documentation on pull request etiquette, semantic commits, branching models, and open repository management.',
      icon: FileCode,
    },
    {
      title: 'Chapter Operations & Sprints',
      desc: 'Step-by-step blueprints for launching local student chapters, organizing hack days, and running study groups.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Resources Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Technical Library</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Practical documentation for <span className="text-gradient-origo">builders and chapter leads.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              Curated blueprints, deployment roadmaps, and open-source boilerplates created to eliminate guesswork and help you ship real software systems faster.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="#directory" variant="primary" size="lg">
                Browse All Resources
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/contact?category=general" variant="secondary" size="lg">
                Contribute a Guide
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Featured Knowledge Tracks ─────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Knowledge Tracks</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Core Documentation Pillars
            </Heading>
            <Text size="md" variant="secondary">
              Direct, reproducible technical knowledge divided into operational focus areas.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourceCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Heading as="h3" size="sm" className="mb-2">
                      {cat.title}
                    </Heading>
                    <Text size="sm" variant="secondary" className="leading-relaxed">
                      {cat.desc}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 3. Searchable Resource Directory ─────────────────────────── */}
      <Section spacing="lg" background="surface" id="directory">
        <Container size="lg">
          <div className="mb-8">
            <span className="text-kicker text-primary uppercase">Repository</span>
            <Heading as="h2" size="xl" className="mt-1">
              Resource Directory
            </Heading>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <Spinner size="md" label="Loading resources directory..." />
              </div>
            }
          >
            <ResourceDirectory initialResources={allResources} />
          </Suspense>
        </Container>
      </Section>

      {/* ── 4. Open Source Contribution CTA ──────────────────────────── */}
      <section className="section-dark py-24 md:py-32 relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4 !bg-white/10 !text-white !border-white/20">
            Open Knowledge Base
          </Badge>
          <Heading as="h2" size="xl" className="text-white mb-4">
            Have a Guide or Template to Share?
          </Heading>
          <Text size="lg" className="text-[#cbd5e1] max-w-xl mx-auto mb-8 leading-relaxed">
            All OrigoHOST technical guides are reviewed by senior engineers before publication. Contribute your tutorials to help tens of thousands of student builders across India.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join?pathway=volunteer" variant="primary" size="lg">
              Become a Contributor
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/contact?category=general"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Submit Content Idea
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
