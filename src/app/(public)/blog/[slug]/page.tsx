import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag as TagIcon, Award, ArrowRight } from 'lucide-react';
import { getArticles, getArticleBySlug, getRelatedArticles } from '@/services/content/articles.service';
import { getEvents } from '@/services/events/events.service';
import { getPrograms } from '@/services/content/programs.service';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Container, Section } from '@/components/layout';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allArticles = await getArticles();
  return allArticles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} — OrigoHOST Dispatches`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — OrigoHOST Dispatches`,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allEvents = await getEvents();
  const allPrograms = await getPrograms();

  const relatedEvs = allEvents.filter(
    (e) => article.relatedEvents.includes(e.id) || article.relatedEvents.includes(e.slug)
  );
  const relatedProgs = allPrograms.filter(
    (p) => article.relatedPrograms.includes(p.id) || article.relatedPrograms.includes(p.slug)
  );
  const relatedArticles = await getRelatedArticles(article.slug, article.category, 2);

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: article.title, href: `/blog/${article.slug}` },
  ];

  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Breadcrumbs ──────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface py-3">
        <Container size="lg">
          <Breadcrumb items={breadcrumbs} />
        </Container>
      </div>

      {/* ─── Header ──────────────────────────────────────────────────── */}
      <section className="section-dark py-20 md:py-28 relative overflow-hidden border-t border-border/40 text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <Container size="md" className="space-y-6 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[#B7C2D9] hover:text-white transition-colors text-body-sm font-medium group outline-none"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to Editorial Log
          </Link>

          <div>
            <Badge variant="primary" className="!bg-white/10 !text-white !border-white/20 mb-3">
              {article.category}
            </Badge>

            <h1 className="text-display-md sm:text-display-lg font-extrabold tracking-tight text-white font-display text-gradient-origo leading-tight">
              {article.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[#B7C2D9] text-body-sm pt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            {article.author && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>
                    {article.author.name} ({article.author.role})
                  </span>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* ─── Article Body ────────────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="md" className="space-y-8">
          {/* Featured Image */}
          <div className="relative aspect-[21/9] rounded-card overflow-hidden bg-surface-elevated border border-border">
            <Image
              src={
                article.featuredImage ||
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200'
              }
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Article Prose Body */}
          <div className="text-body-md text-ink-secondary space-y-6 leading-relaxed">
            {article.body ? (
              <div dangerouslySetInnerHTML={{ __html: article.body }} />
            ) : (
              <p className="leading-relaxed">
                {article.excerpt}
                <br />
                <br />
                This article covers strategic engineering developments across the OrigoHOST ecosystem.
                Our initiatives bring builders and practitioners together to collaborate, exchange
                verified insights, and launch software systems.
              </p>
            )}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="pt-6 border-t border-border flex flex-wrap gap-2 items-center">
              <TagIcon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-surface-elevated border border-border text-body-xs font-semibold rounded-btn text-ink-secondary uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Items */}
          {(relatedEvs.length > 0 || relatedProgs.length > 0) && (
            <div className="pt-8 border-t border-border space-y-6">
              <Heading as="h3" size="sm" className="text-ink">
                Related Initiatives & Events
              </Heading>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedEvs.map((ev) => (
                  <Link
                    key={ev.id}
                    href={`/events/${ev.slug}`}
                    className="p-4 rounded-card border border-border bg-surface hover:border-primary/40 flex items-start gap-3 transition-colors outline-none"
                  >
                    <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-body-md font-bold text-ink mb-0.5 line-clamp-1">
                        {ev.title}
                      </h4>
                      <span className="text-caption font-mono uppercase text-primary">
                        {ev.format}
                      </span>
                    </div>
                  </Link>
                ))}

                {relatedProgs.map((prog) => (
                  <Link
                    key={prog.id}
                    href={`/programs/${prog.slug}`}
                    className="p-4 rounded-card border border-border bg-surface hover:border-primary/40 flex items-start gap-3 transition-colors outline-none"
                  >
                    <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-body-md font-bold text-ink mb-0.5 line-clamp-1">
                        {prog.name}
                      </h4>
                      <span className="text-caption font-mono uppercase text-primary">
                        Program Track
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
