'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Program } from '@/types';
import { Badge } from '@/components/ui/Badge';

export interface ProgramCardProps {
  program: Program;
}

const statusColors: Record<string, 'success' | 'secondary' | 'info' | 'warning'> = {
  Active:    'success',
  Completed: 'secondary',
  Upcoming:  'info',
  Paused:    'warning',
};

const bannerGradients: Record<string, string> = {
  Active:    'linear-gradient(135deg, #020817 0%, #431407 50%, #FF7316 100%)',
  Upcoming:  'linear-gradient(135deg, #020817 0%, #FF8F33 100%)',
  Completed: 'linear-gradient(135deg, #020817 0%, #071225 100%)',
  Paused:    'linear-gradient(135deg, #020817 0%, #9A3412 100%)',
};

export function ProgramCard({ program }: ProgramCardProps) {
  const isReducedMotion = useReducedMotion();
  const banner = bannerGradients[program.status] ?? bannerGradients.Active;

  return (
    <motion.div
      whileHover={isReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col md:flex-row h-full bg-white dark:bg-surface rounded-card border border-[#E2E8F0] dark:border-border overflow-hidden shadow-xs hover:border-primary/40 transition-all duration-200"
    >
      {/* ── Banner ───────────────────────────────────────────────────── */}
      <div
        className="relative w-full md:w-2/5 min-h-[160px] md:min-h-full flex items-center justify-center overflow-hidden"
        style={{ background: banner }}
      >
        <BookOpen className="h-12 w-12 text-white/20" aria-hidden="true" />
        <div className="absolute top-3.5 left-3.5">
          <Badge variant={statusColors[program.status]}>{program.status}</Badge>
        </div>
        {program.seriesStructure && (
          <div className="absolute bottom-3.5 left-3.5 right-3.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              {program.seriesStructure}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="flex flex-col justify-between p-6 md:p-7 w-full md:w-3/5">
        <div>
          <Link href={`/programs/${program.slug}`} className="group/title block mb-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs">
            <h3 className="font-display font-bold text-heading-lg line-clamp-2 text-ink group-hover/title:text-primary transition-colors duration-150">
              {program.name}
            </h3>
          </Link>

          <p className="text-body-sm text-ink-secondary line-clamp-3 mb-5 leading-relaxed">
            {program.purpose}
          </p>

          {/* Focus area chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {program.focusAreas.slice(0, 4).map((area) => (
              <span
                key={area}
                className="inline-flex items-center px-2 py-0.5 rounded-btn text-body-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {area}
              </span>
            ))}
            {program.focusAreas.length > 4 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-btn text-body-xs font-medium bg-surface-elevated text-ink-muted border border-border">
                +{program.focusAreas.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-border/60">
          <Link
            href={`/programs/${program.slug}`}
            className="inline-flex items-center gap-1 text-primary font-semibold text-body-sm hover:gap-2 transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
          >
            Explore Program
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
