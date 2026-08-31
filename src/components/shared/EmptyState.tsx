import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/buttons/Button';
import { Heading, Text } from '@/components/ui';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  onActionClick,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12',
        'border border-dashed border-border rounded-card bg-surface shadow-xs',
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 rounded-btn bg-primary/10 text-primary mb-4">
          {icon}
        </div>
      )}
      <Heading as="h4" size="sm" className="mb-2">
        {title}
      </Heading>
      <Text size="sm" variant="muted" className="max-w-md mb-6">
        {description}
      </Text>
      {actionLabel && (
        <Button
          variant="outline"
          href={actionHref}
          onClick={onActionClick}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
