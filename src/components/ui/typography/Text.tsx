import React from 'react';
import { cn } from '@/lib/utils';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label' | 'code';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  mono?: boolean;
}

export function Text({
  as: Component = 'p',
  size = 'md',
  variant = 'secondary',
  weight = 'normal',
  mono = false,
  className,
  children,
  ...props
}: TextProps) {
  const sizes = {
    xs: 'text-body-xs',
    sm: 'text-body-sm',
    md: 'text-body-md',
    lg: 'text-body-lg',
    xl: 'text-body-xl',
  };

  const variants = {
    primary: 'text-ink',
    secondary: 'text-ink-secondary',
    muted: 'text-ink-muted',
    inverse: 'text-white',
    accent: 'text-primary',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={cn(
        sizes[size],
        variants[variant],
        weights[weight],
        mono && 'font-mono',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
