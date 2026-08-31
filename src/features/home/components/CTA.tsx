'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/buttons/Button';
import { Heading, Body } from '@/components/ui';
import { fadeUp, viewport } from '@/lib/motion';

interface CTAProps {
  title: string;
  description: string;
  primaryCTA: { label: string; href: string; magnetic?: boolean };
  secondaryCTA?: { label: string; href: string };
  className?: string;
}

export function CTA({ title, description, primaryCTA, secondaryCTA, className }: CTAProps) {
  const isReducedMotion = useReducedMotion();

  return (
    <section className={cn('section-py relative overflow-hidden bg-brand-deep text-white dot-pattern', className)}>
      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <Heading as="h2" className="text-white text-display-md md:text-display-lg mb-4 text-balance">
            {title}
          </Heading>

          <Body size="lg" className="text-white/80 max-w-xl mb-8 text-pretty">
            {description}
          </Body>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href={primaryCTA.href}
              variant="primary"
              size="lg"
              className="bg-brand-electric hover:bg-brand-electric-600 border-none shadow-md text-white"
              magnetic={primaryCTA.magnetic ?? true}
            >
              {primaryCTA.label}
            </Button>
            {secondaryCTA && (
              <Button
                href={secondaryCTA.href}
                variant="outline"
                size="lg"
                className="text-white border-white/20 hover:bg-white/10"
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Background Accent Grids */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] rounded-full border border-white/5 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-[-10%] w-[350px] h-[350px] rounded-full border border-white/5 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
