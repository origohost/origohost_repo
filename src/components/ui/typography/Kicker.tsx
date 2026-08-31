import React from 'react';
import { cn } from '@/lib/utils';

interface KickerProps {
  className?: string;
  children: React.ReactNode;
}

export function Kicker({ className, children }: KickerProps) {
  return (
    <span
      className={cn(
        'text-kicker font-semibold uppercase tracking-widest text-brand-electric block mb-2',
        className
      )}
    >
      {children}
    </span>
  );
}
