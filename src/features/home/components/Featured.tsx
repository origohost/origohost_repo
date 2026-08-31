'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { staggerContainer, viewport } from '@/lib/motion';

interface FeaturedProps {
  kicker?: string;
  title: string;
  description?: string;
  viewAllUrl?: string;
  viewAllLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export function Featured({
  kicker,
  title,
  description,
  viewAllUrl,
  viewAllLabel = 'View All',
  children,
  className,
}: FeaturedProps) {
  return (
    <section className={cn('section-py bg-surface', className)}>
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {kicker && <span className="kicker mb-3 block">{kicker}</span>}
            <h2
              className="font-display font-bold text-display-sm md:text-display-md text-ink"
              style={{ letterSpacing: '-0.025em' }}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-body-lg text-ink-secondary leading-relaxed">{description}</p>
            )}
          </div>

          {viewAllUrl && (
            <div className="shrink-0">
              <Link
                href={viewAllUrl}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-body-md font-semibold text-ink-secondary hover:text-brand-electric hover:border-brand-electric/30 transition-all duration-150"
              >
                {viewAllLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
