import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'orange'
  | 'default'
  | 'destructive'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
  secondary: 'bg-surface-elevated text-foreground-muted border-border',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  destructive: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  info: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  neutral: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  orange: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  default: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
  outline: 'bg-transparent text-foreground border-border',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] font-mono font-medium',
  md: 'px-2.5 py-1 text-body-xs font-mono font-semibold',
  lg: 'px-3 py-1.5 text-body-sm font-mono font-bold',
};

export function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors select-none',
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0 animate-pulse',
            variant === 'success' && 'bg-emerald-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'error' && 'bg-rose-500',
            variant === 'info' && 'bg-sky-500',
            (!variant || variant === 'primary' || variant === 'default') && 'bg-brand-primary'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
