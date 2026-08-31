'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
  className?: string;
}

export function Tooltip({
  content,
  position = 'top',
  className,
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = React.useId();

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {React.cloneElement(children as React.ReactElement<any>, {
        'aria-describedby': isVisible ? tooltipId : undefined,
      })}
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-50 px-2.5 py-1 text-caption font-medium rounded-md shadow-md',
            'bg-[#001857] text-white dark:bg-[#101B30] dark:text-[#F4F7FF] dark:border dark:border-border',
            'whitespace-nowrap pointer-events-none transition-opacity duration-150 animate-fade-up',
            positions[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
