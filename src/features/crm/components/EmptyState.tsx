import React from 'react';
import { Layers } from 'lucide-react';
import { Heading, Text } from '@/components/ui';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No Records Found',
  description = 'Records will appear here as members, contacts, and event data populate the ecosystem.',
  action,
}: EmptyStateProps) {
  return (
    <div className="p-12 rounded-card bg-surface border border-border border-dashed text-center space-y-3 flex flex-col items-center justify-center">
      <div className="p-3 rounded-full bg-surface-elevated text-ink-muted border border-border">
        <Layers className="h-6 w-6" />
      </div>
      <Heading as="h3" size="sm" className="text-ink">
        {title}
      </Heading>
      <Text size="xs" variant="secondary" className="max-w-md mx-auto leading-relaxed">
        {description}
      </Text>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
