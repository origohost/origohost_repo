'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled,
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary/90 shadow-sm ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      secondary:
        'bg-surface-elevated text-ink hover:bg-surface border border-border ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      ghost:
        'bg-transparent text-ink-secondary hover:text-ink hover:bg-surface-elevated ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      outline:
        'bg-transparent text-ink border border-border hover:border-primary/60 hover:text-primary ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    };

    const sizes = {
      sm: 'h-8 w-8 rounded-btn text-body-sm p-1.5',
      md: 'h-10 w-10 rounded-btn text-body-md p-2',
      lg: 'h-12 w-12 rounded-btn text-body-lg p-2.5',
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer',
          'transition-colors duration-150 ease-standard',
          'outline-none disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          children
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
