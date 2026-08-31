'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'cyan' | 'purple' | 'green';
  hover?: boolean;
  /** Render a coloured top-stripe accent */
  accent?: boolean;
  accentColor?: string;
  padding?: 'sm' | 'md' | 'lg';
}

const glowMap: Record<string, string> = {
  blue:   '0 0 30px rgba(255,115,22,0.30), 0 0 60px rgba(255,115,22,0.12)',
  cyan:   '0 0 30px rgba(6,182,212,0.30), 0 0 60px rgba(6,182,212,0.12)',
  purple: '0 0 30px rgba(124,58,237,0.30), 0 0 60px rgba(124,58,237,0.12)',
  green:  '0 0 30px rgba(16,185,129,0.30), 0 0 60px rgba(16,185,129,0.12)',
};

const borderGradientMap: Record<string, string> = {
  blue:   'linear-gradient(135deg, #FF7316, #FF8F33)',
  cyan:   'linear-gradient(135deg, #06B6D4, #38BDF8)',
  purple: 'linear-gradient(135deg, #7C3AED, #EC4899)',
  green:  'linear-gradient(135deg, #10B981, #06B6D4)',
};

const accentGradientMap: Record<string, string> = {
  blue:   'var(--gradient-primary)',
  cyan:   'linear-gradient(90deg, #06B6D4, #38BDF8)',
  purple: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
  green:  'linear-gradient(90deg, #10B981, #34D399)',
};

const paddingMap: Record<string, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Premium card with animated gradient border glow on hover.
 * Uses a pseudo-element masking technique — pure CSS, no SVG.
 */
export function GlowCard({
  children,
  className,
  glowColor = 'blue',
  hover = true,
  accent = false,
  accentColor,
  padding = 'md',
}: GlowCardProps) {
  const isReducedMotion = useReducedMotion();
  const effectiveGlow   = glowMap[glowColor];
  const borderGradient  = borderGradientMap[glowColor];
  const accentGradient  = accentColor ?? accentGradientMap[glowColor];

  return (
    <motion.div
      whileHover={hover && !isReducedMotion ? { y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } } : {}}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'bg-surface border border-[var(--color-border)]',
        'transition-[box-shadow,border-color] duration-300',
        className
      )}
      style={{ boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => {
        if (!hover) return;
        (e.currentTarget as HTMLElement).style.boxShadow = effectiveGlow + ', var(--shadow-card-hover)';
        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
      }}
      onMouseLeave={(e) => {
        if (!hover) return;
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
        (e.currentTarget as HTMLElement).style.borderColor = '';
      }}
    >
      {/* Gradient border layer (pseudo-element via wrapper) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: borderGradient, padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
      />

      {/* Coloured top accent bar */}
      {accent && (
        <div className="h-0.5 w-full" style={{ background: accentGradient }} />
      )}

      {/* Content */}
      <div className={paddingMap[padding]}>
        {children}
      </div>
    </motion.div>
  );
}
