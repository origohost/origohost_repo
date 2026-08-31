import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { GalleryGrid } from '@/features/gallery';
import { getGalleryItems } from '@/services/content/gallery.service';

export const metadata: Metadata = {
  title: 'Media Gallery & Event Photography',
  description:
    'Visual documentation and photographs from OrigoHOST hackathons, campus chapter meetups, and developer cohorts across India.',
};

export default async function GalleryPage() {
  const allGallery = await getGalleryItems();
  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Visual Archives</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Moments from the <span className="text-gradient-origo">builder ecosystem.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              A curated visual record of competitive hackathon finals, university campus chapter launch events, and community builder workshops.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="#media" variant="primary" size="lg">
                View Photo Collections
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/events" variant="secondary" size="lg">
                Explore Upcoming Events
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Gallery Grid Section ──────────────────────────────────── */}
      <Section spacing="lg" background="default" id="media">
        <Container size="lg">
          <div className="mb-8">
            <span className="text-kicker text-primary uppercase">Ecosystem Photography</span>
            <Heading as="h2" size="xl" className="mt-1">
              Photo Archives
            </Heading>
          </div>

          <GalleryGrid initialItems={allGallery} />
        </Container>
      </Section>

      {/* ── 3. Final CTA ─────────────────────────────────────────────── */}
      <section className="section-dark py-24 md:py-32 relative overflow-hidden border-t border-border/40 text-center">
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4 !bg-white/10 !text-white !border-white/20">
            Be Part of the Next Milestone
          </Badge>
          <Heading as="h2" size="xl" className="text-white mb-4">
            Create Memories at CyberForge 2026
          </Heading>
          <Text size="lg" className="text-[#B7C2D9] max-w-xl mx-auto mb-8 leading-relaxed">
            Register your team, compete in real-world tracks, and get featured in our national community media showcase.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/events/cyberforge-2026" variant="primary" size="lg">
              Register for CyberForge
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
