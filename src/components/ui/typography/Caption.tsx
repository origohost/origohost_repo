import React from 'react';
import { cn } from '@/lib/utils';

interface CaptionProps {
  className?: string;
  children: React.ReactNode;
}

export function Caption({ className, children }: CaptionProps) {
  return (
    <span
      className={cn(
        'text-body-sm text-ink-muted block',
        className
      )}
    >
      {children}
    </span>
  );
}
