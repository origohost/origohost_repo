import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  /** Render a gradient span inside the title — pass the word(s) to highlight */
  highlight?: string;
}

/**
 * Reusable Kicker → H2 → Body section header.
 * Keeps consistent vertical rhythm and typography hierarchy across all pages.
 */
export function SectionHeader({
  kicker,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
  highlight,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  // Split title to inject gradient highlight
  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        isCenter && 'items-center text-center',
        className
      )}
    >
      {kicker && (
        <span className="kicker">{kicker}</span>
      )}
      <h2
        className={cn(
          'font-display font-bold text-display-sm md:text-display-md text-balance',
          titleClassName
        )}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p className={cn('text-body-lg text-ink-secondary text-pretty', isCenter && 'max-w-2xl')}>
          {description}
        </p>
      )}
    </div>
  );
}
