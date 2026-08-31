import React from 'react';
import { cn } from '@/lib/utils';

export interface TagProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function Tag({ active = false, onClick, className, children }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 text-body-sm font-medium rounded-full border transition-all duration-150',
        active
          ? 'bg-brand-electric text-white border-brand-electric shadow-xs'
          : 'bg-surface text-ink-secondary border-brand-deep/10 hover:border-brand-deep/30',
        className
      )}
    >
      {children}
    </button>
  );
}
