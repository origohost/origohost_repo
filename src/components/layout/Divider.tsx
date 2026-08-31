import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export function Divider({
  className,
  orientation = 'horizontal',
  label,
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px bg-border self-stretch shrink-0', className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center w-full my-4', className)}
        {...props}
      >
        <div className="flex-grow border-t border-border" />
        <span className="px-3 text-body-xs font-medium text-ink-muted uppercase tracking-wider select-none">
          {label}
        </span>
        <div className="flex-grow border-t border-border" />
      </div>
    );
  }

  return (
    <hr
      className={cn('w-full border-0 border-t border-border my-6', className)}
      {...props}
    />
  );
}
