'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  HTMLMotionProps,
} from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  href?: string;
  magnetic?: boolean;
  loading?: boolean;
  external?: boolean;
  icon?: boolean;
  disabled?: boolean;
}


export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      magnetic = false,
      loading = false,
      external = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const reducedMotionHook = useReducedMotion();
    const isReducedMotion = Boolean(reducedMotionHook);
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);


    React.useImperativeHandle(ref, () => buttonRef.current as any);

    /*
     * Magnetic physics calculations
     */
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = {
      damping: 18,
      stiffness: 160,
      mass: 0.1,
    };

    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled || loading || !buttonRef.current || isReducedMotion) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
      const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.3;

      x.set(offsetX);
      y.set(offsetY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    /*
     * Semantic Variant styles adhering to OrigoHOST tokens
     */
    const variants: Record<string, string> = {
      primary:
        'bg-[#FF7316] text-white hover:bg-[#E85F0B] active:scale-[0.98] ' +
        'border border-transparent shadow-sm ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',

      secondary:
        'bg-white dark:bg-surface-elevated text-[#0B1220] dark:text-foreground hover:bg-[#FFF7ED] hover:border-[#FDBA74] active:scale-[0.98] ' +
        'border border-[#CBD5E1] dark:border-border shadow-xs ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',

      ghost:
        'bg-transparent text-[#334155] dark:text-foreground-muted hover:bg-[#FFF7ED] hover:text-[#9A3412] active:scale-[0.98] ' +
        'border border-transparent ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',

      outline:
        'bg-transparent text-[#FF7316] border border-[#CBD5E1] dark:border-border hover:border-[#FF7316] ' +
        'hover:bg-[#FFF7ED] active:scale-[0.98] ' +
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',

      link:
        'bg-transparent text-primary hover:underline underline-offset-4 p-0 ' +
        'border-transparent focus-visible:ring-2 focus-visible:ring-primary rounded-xs',
    };

    // Standardized 8-10px border radius for buttons
    const sizes: Record<string, string> = {
      xs: 'px-2.5 py-1 text-body-xs rounded-btn font-semibold gap-1',
      sm: 'px-3.5 py-1.5 text-body-sm rounded-btn font-semibold gap-1.5',
      md: 'px-5 py-2.5 text-body-md rounded-btn font-semibold gap-2',
      lg: 'px-6 py-3 text-body-lg rounded-btn font-bold gap-2.5',
    };


    const baseStyles = cn(
      'inline-flex items-center justify-center select-none cursor-pointer',
      'transition-colors duration-150 ease-standard',
      'outline-none',
      (disabled || loading) && 'opacity-50 pointer-events-none cursor-not-allowed',
      variants[variant],
      variant !== 'link' && sizes[size],
      className
    );

    const motionProps = magnetic && !isReducedMotion
      ? {
          style: { x: springX, y: springY },
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
        }
      : {};

    const content = (
      <>
        {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0 mr-1.5" aria-hidden="true" />}
        {children}
      </>
    );

    /*
     * Navigation Link vs. Action Button
     */
    if (href && !disabled) {
      if (external) {
        return (
          <motion.span {...motionProps} className="inline-block">
            <a
              href={href}
              ref={buttonRef as React.Ref<HTMLAnchorElement>}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(baseStyles, 'group')}
            >
              {content}
            </a>
          </motion.span>
        );
      }

      return (
        <motion.span {...motionProps} className="inline-block">
          <Link
            href={href}
            ref={buttonRef as React.Ref<HTMLAnchorElement>}
            className={cn(baseStyles, 'group')}
          >
            {content}
          </Link>
        </motion.span>
      );
    }

    return (
      <motion.button
        type="button"
        ref={buttonRef as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        aria-busy={loading}
        className={baseStyles}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';