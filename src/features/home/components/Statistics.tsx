'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Heading, Body } from '@/components/ui';
import { staggerContainer, staggerItem, viewport } from '@/lib/motion';

export interface StatItem {
  number: string;
  label: string;
  subtext?: string;
}

interface StatisticsProps {
  items: StatItem[];
  title?: string;
  className?: string;
}

export function Statistics({ items, title, className }: StatisticsProps) {
  const isReducedMotion = useReducedMotion();

  return (
    <section className={cn('section-py bg-surface-secondary border-y border-brand-deep/[0.04]', className)}>
      <div className="container-site">
        {title && (
          <Heading as="h2" size="sm" className="text-center mb-12 tracking-wide uppercase text-xs text-ink-muted">
            {title}
          </Heading>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className="flex flex-col items-center justify-center p-6 bg-surface rounded-2xl border border-brand-deep/[0.04] shadow-xs"
            >
              {/* Large Metric Number */}
              <span className="font-display font-black text-4xl md:text-5xl text-brand-electric tracking-tight mb-2 select-none">
                {item.number}
              </span>
              
              {/* Metric Label */}
              <Heading as="h3" size="sm" className="text-heading-md font-bold text-brand-deep mb-1 text-center">
                {item.label}
              </Heading>

              {/* Verified Metric Context Subtext */}
              {item.subtext && (
                <span className="text-[10px] font-medium text-ink-muted/70 tracking-wide block max-w-[200px] text-center">
                  {item.subtext}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
