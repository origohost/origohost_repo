import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { FAQDirectory } from '@/features/faq';
import { getFAQs } from '@/services/content/faq.service';
import { generateFAQSchema } from '@/lib/schema';
import { Spinner } from '@/components/shared/Spinner';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Clear answers to questions regarding OrigoHOST student chapters, hackathon rules, speaker participation, and institutional MoUs.',
};

export default async function FAQPage() {
  const allFaqs = await getFAQs();
  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <div className="flex flex-col w-full">
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Knowledge Base</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Frequently <span className="text-gradient-origo">Asked Questions</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              Straightforward answers about our developer community, hackathon schedules, campus chapter programs, and technical tracks.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="#faq-list" variant="primary" size="lg">
                Browse Questions
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Ask a Question
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. FAQ Directory ─────────────────────────────────────────── */}
      <Section spacing="lg" background="default" id="faq-list">
        <Container size="lg">
          <div className="mb-8">
            <span className="text-kicker text-primary uppercase">Ecosystem Inquiries</span>
            <Heading as="h2" size="xl" className="mt-1">
              Common Questions & Answers
            </Heading>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <Spinner size="md" label="Loading questions..." />
              </div>
            }
          >
            <FAQDirectory initialFaqs={allFaqs} />
          </Suspense>
        </Container>
      </Section>

      {/* ── 3. Still Need Help? ──────────────────────────────────────── */}
      <section className="section-dark py-24 md:py-32 relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4 !bg-white/10 !text-white !border-white/20">
            Support Desk
          </Badge>
          <Heading as="h2" size="xl" className="text-white mb-4">
            Still Have an Unanswered Question?
          </Heading>
          <Text size="lg" className="text-[#B7C2D9] max-w-xl mx-auto mb-8 leading-relaxed">
            Our operations team is available to assist you with any specific question regarding chapter governance, hackathon criteria, or partnership terms.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Contact Team
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="/join"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Join OrigoHOST
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
