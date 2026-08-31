import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<string, { bg: string; dot: string }> = {
  primary: {
    bg: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30',
    dot: 'bg-orange-500',
  },
  secondary: {
    bg: 'bg-slate-100 text-slate-800 dark:bg-slate-800/80 dark:text-slate-200 border border-slate-200 dark:border-slate-700',
    dot: 'bg-slate-500',
  },
  success: {
    bg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30',
    dot: 'bg-amber-500',
  },
  error: {
    bg: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30',
    dot: 'bg-rose-500',
  },
  info: {
    bg: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30',
    dot: 'bg-sky-500',
  },
  outline: {
    bg: 'bg-transparent text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700',
    dot: 'bg-slate-500',
  },
};

const sizeStyles: Record<string, string> = {
  sm: 'px-2 py-0.5 text-[10px] tracking-wider rounded-full gap-1',
  md: 'px-2.5 py-1 text-xs tracking-wide rounded-full gap-1.5',
};

export function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  className,
  children,
}: BadgeProps) {
  const selectedVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold uppercase select-none',
        selectedVariant.bg,
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full shrink-0 animate-pulse', selectedVariant.dot)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
