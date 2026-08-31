import React from 'react';
import { cn } from '@/lib/utils';

export interface BodyProps {
  as?: 'p' | 'span' | 'div';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  className?: string;
  children: React.ReactNode;
}

export function Body({ as: Component = 'p', size = 'md', className, children }: BodyProps) {
  const sizes = {
    xl: 'text-body-xl',
    lg: 'text-body-lg',
    md: 'text-body-md',
    sm: 'text-body-sm',
  };

  return (
    <Component
      className={cn(
        'font-sans text-ink-secondary font-normal text-pretty',
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
