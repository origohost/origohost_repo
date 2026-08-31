import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export function Skeleton({ className, variant = 'rect' }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-sm',
    rect: 'w-full h-full rounded-xl',
    circle: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'skeleton animate-shimmer bg-surface-tertiary',
        variants[variant],
        className
      )}
    />
  );
}
