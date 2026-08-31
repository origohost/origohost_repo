import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  background?: 'default' | 'surface' | 'elevated' | 'navy';
  as?: 'section' | 'div' | 'article' | 'aside';
}

export function Section({
  className,
  spacing = 'md',
  background = 'default',
  as: Component = 'section',
  children,
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: 'py-0',
    sm: 'py-16 md:py-20',
    md: 'py-20 md:py-24',
    lg: 'py-24 md:py-28 lg:py-32',
    xl: 'py-28 md:py-32 lg:py-36',
  };

  const backgroundClasses = {
    default: 'bg-bg text-ink',
    surface: 'bg-surface text-ink border-y border-border/40',
    elevated: 'bg-surface-elevated text-ink',
    navy: 'bg-brand-navy text-white',
  };

  return (
    <Component
      className={cn(
        'w-full relative',
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
