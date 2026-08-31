import React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm';
}

export function Heading({
  as: Component = 'h2',
  size,
  className,
  children,
  id,
  ...props
}: HeadingProps) {
  const sizes = {
    '2xl': 'text-display-2xl',
    'xl': 'text-display-xl',
    'lg': 'text-display-lg',
    'md': 'text-display-md',
    'sm': 'text-display-sm',
  };

  const defaultSizeMap = {
    h1: '2xl' as const,
    h2: 'lg' as const,
    h3: 'md' as const,
    h4: 'sm' as const,
    h5: 'sm' as const,
    h6: 'sm' as const,
  };

  const sizeClass = size ? sizes[size] : sizes[defaultSizeMap[Component]];

  return (
    <Component
      id={id}
      className={cn(
        'font-display font-bold tracking-tight text-ink leading-tight',
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
