import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'featured' | 'interactive';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default:
        'bg-surface border border-border text-ink shadow-xs',
      elevated:
        'bg-surface-elevated border border-border text-ink shadow-card',
      featured:
        'bg-surface border-2 border-primary/50 text-ink shadow-card-hover relative overflow-hidden',
      interactive:
        'bg-surface border border-border text-ink shadow-xs hover:shadow-card-hover ' +
        'hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 ease-standard cursor-pointer',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-card p-6 flex flex-col',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-heading-lg font-bold text-ink leading-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-body-sm text-ink-secondary', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex-1 text-body-md text-ink-secondary', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between pt-4 mt-auto border-t border-border/50', className)}
      {...props}
    >
      {children}
    </div>
  );
}
