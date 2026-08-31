import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps {
  variant?: 'primary' | 'subtle' | 'nav' | 'ghost';
  external?: boolean;
  showIcon?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      variant = 'primary',
      external,
      showIcon = false,
      active = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isExternal =
      external ??
      (typeof href === 'string' &&
        (href.startsWith('http://') || href.startsWith('https://')));

    const variants = {
      primary:
        'text-primary hover:underline underline-offset-4 font-medium',
      subtle:
        'text-ink-secondary hover:text-primary transition-colors duration-150',
      nav: cn(
        'text-body-sm font-semibold transition-colors duration-150 py-1.5 px-2 rounded-md',
        active
          ? 'text-primary bg-primary/10'
          : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
      ),
      ghost:
        'text-ink hover:text-primary transition-colors duration-150',
    };

    const commonClasses = cn(
      'inline-flex items-center gap-1 cursor-pointer outline-none',
      'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xs',
      variants[variant],
      className
    );

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className={commonClasses}
          {...props}
        >
          {children}
          {showIcon && <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />}
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={commonClasses} {...props}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';
