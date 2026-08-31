import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowRight, Rss } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { BlogDirectory } from '@/features/blog';
import { getArticles } from '@/services/content/articles.service';
import { Spinner } from '@/components/shared/Spinner';

export const metadata: Metadata = {
  title: 'Blog, Technical Insights & Announcements',
  description:
    'Stay updated with OrigoHOST hackathon announcements, engineering post-mortems, community chapter news, and technical tutorials.',
};

export default async function BlogPage() {
  const allArticles = await getArticles();
  const featuredArticle = allArticles.find((a) => a.featured) || allArticles[0];

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Editorial Hub</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Engineering dispatches, news, and <span className="text-gradient-origo">case studies.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              In-depth articles covering our nationwide hackathons, chapter initiatives, systems architectures, and practical guides from the builder community.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="#articles" variant="primary" size="lg">
                Browse Articles
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/rss.xml" variant="secondary" size="lg" external>
                <Rss className="h-4 w-4 mr-1.5" aria-hidden="true" />
                RSS Feed
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Featured Highlight ────────────────────────────────────── */}
      {featuredArticle && (
        <Section spacing="sm" background="default" className="border-b border-border/60">
          <Container size="lg">
            <div className="p-8 rounded-card bg-surface border-2 border-primary/40 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" dot>Featured Dispatch</Badge>
                  <span className="text-caption font-mono text-ink-muted uppercase">{featuredArticle.category}</span>
                </div>
                <Heading as="h2" size="md" className="mb-2">
                  {featuredArticle.title}
                </Heading>
                <Text size="sm" variant="secondary" className="leading-relaxed mb-4 line-clamp-2">
                  {featuredArticle.excerpt}
                </Text>
                <div className="flex items-center gap-4 text-body-xs font-medium text-ink-muted">
                  <span>Published: {featuredArticle.publishedAt}</span>
                  {featuredArticle.author && (
                    <>
                      <span>•</span>
                      <span>Author: {featuredArticle.author.name}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                <Button href={`/blog/${featuredArticle.slug}`} variant="primary" size="lg">
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── 3. Searchable Article Directory ──────────────────────────── */}
      <Section spacing="lg" background="default" id="articles">
        <Container size="lg">
          <div className="mb-8">
            <span className="text-kicker text-primary uppercase">Editorial Archive</span>
            <Heading as="h2" size="xl" className="mt-1">
              All Articles & Updates
            </Heading>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <Spinner size="md" label="Loading articles..." />
              </div>
            }
          >
            <BlogDirectory initialArticles={allArticles} />
          </Suspense>
        </Container>
      </Section>
    </div>
  );
}
