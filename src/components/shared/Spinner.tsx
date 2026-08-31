'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function Spinner({ size = 'md', className, label = 'Loading...' }: SpinnerProps) {
  const isReducedMotion = useReducedMotion();

  const sizes = {
    sm: 'h-4 w-4 stroke-[3px]',
    md: 'h-6 w-6 stroke-[2.5px]',
    lg: 'h-10 w-10 stroke-[2px]',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center justify-center', className)}
    >
      <motion.svg
        className={cn('text-primary', sizes[size])}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={isReducedMotion ? {} : { rotate: 360 }}
        transition={isReducedMotion ? {} : { duration: 0.9, ease: 'linear', repeat: Infinity }}
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="inherit"
        />
        <path
          className="opacity-90"
          d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5936 2.37255 15.0934 3.03362 16.4268"
          stroke="currentColor"
          strokeWidth="inherit"
          strokeLinecap="round"
        />
      </motion.svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
