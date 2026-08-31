'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/buttons/Button';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface HeroProps {
  kicker?: string;
  title: string;
  description: string;
  primaryCTA?: { label: string; href: string; magnetic?: boolean };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
  theme?: 'dark' | 'light';
  children?: React.ReactNode;
  className?: string;
}

export function Hero({
  kicker,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  theme = 'light',
  children,
  className,
}: HeroProps) {
  const isDark = theme === 'dark';

  return (
    <section
      className={cn(
        'relative overflow-hidden flex items-center min-h-[52vh] py-20 md:py-28',
        className
      )}
      style={isDark ? { background: 'var(--gradient-hero)' } : undefined}
    >
      {/* Dot pattern */}
      {isDark && <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />}

      {/* Ambient orbs (dark mode) */}
      {isDark && (
        <>
          <div className="absolute top-1/4 right-[5%] w-80 h-80 rounded-full bg-brand-electric/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-[5%] w-64 h-64 rounded-full bg-brand-cyan/10 blur-[80px] pointer-events-none" />
        </>
      )}

      {/* Light mode surface */}
      {!isDark && <div className="absolute inset-0 bg-surface-secondary pointer-events-none" />}

      <div className="container-site relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Text column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {kicker && (
              <motion.p
                variants={staggerItem}
                className={cn('kicker mb-4', isDark ? 'text-brand-light/70' : 'text-brand-electric')}
              >
                {kicker}
              </motion.p>
            )}

            <motion.h1
              variants={staggerItem}
              className={cn(
                'font-display font-black text-display-md md:text-display-xl mb-5 text-balance',
                isDark ? 'text-white' : 'text-ink'
              )}
              style={{ letterSpacing: '-0.03em' }}
            >
              {title}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className={cn(
                'text-body-lg mb-8 max-w-2xl text-pretty leading-relaxed',
                isDark ? 'text-white/75' : 'text-ink-secondary'
              )}
            >
              {description}
            </motion.p>

            {(primaryCTA || secondaryCTA) && (
              <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
                {primaryCTA && (
                  <Button href={primaryCTA.href} variant="primary" size="lg" magnetic={primaryCTA.magnetic ?? true} icon>
                    {primaryCTA.label}
                  </Button>
                )}
                {secondaryCTA && (
                  <a
                    href={secondaryCTA.href}
                    className={cn(
                      'inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-body-lg font-bold transition-all duration-200',
                      isDark
                        ? 'text-white border border-white/20 hover:bg-white/10 hover:border-white/30'
                        : 'text-brand-electric border border-brand-electric/30 hover:bg-brand-electric/[0.05]'
                    )}
                  >
                    {secondaryCTA.label}
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Visual/children slot */}
          {children && (
            <motion.div
              variants={staggerItem}
              className="lg:col-span-5 w-full flex justify-center lg:justify-end"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom fade to surface */}
      {isDark && (
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
        />
      )}
    </section>
  );
}
