import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { SearchInterface } from '@/features/search';
import { searchEcosystem, type SearchResultType } from '@/services/search/search.service';
import { Spinner } from '@/components/shared/Spinner';

export const metadata: Metadata = {
  title: 'Search the OrigoHOST Ecosystem',
  description:
    'Search across all OrigoHOST hackathons, webinars, technical guides, campus chapters, and documentation.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', type = 'all' } = await searchParams;
  const targetType = (type || 'all') as SearchResultType | 'all';

  const { results } = await searchEcosystem(q, {
    type: targetType,
  });

  return (
    <div className="flex flex-col w-full">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-24 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="primary" dot>
                Ecosystem Search
              </Badge>
              <span className="text-body-xs font-mono text-ink-muted">{'// GLOBAL QUERY'}</span>
            </div>
            <Heading as="h1" size="2xl" className="mb-4">
              Search OrigoHOST
            </Heading>
            <Text size="lg" variant="secondary" className="leading-relaxed">
              Find technical documentation, upcoming hackathons, structured programs, and community guides.
            </Text>
          </div>
        </Container>
      </section>

      {/* ── Search Experience ─────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <Spinner size="lg" label="Searching ecosystem index..." />
              </div>
            }
          >
            <SearchInterface
              initialQuery={q}
              initialType={targetType}
              allResults={results}
            />
          </Suspense>
        </Container>
      </Section>
    </div>
  );
}
