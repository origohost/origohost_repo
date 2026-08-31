import React from 'react';
import { Badge } from '@/components/ui';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'info';

  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('confirmed') || s.includes('attended') || s.includes('qualified') || s.includes('sent')) {
    variant = 'success';
  } else if (s.includes('lead') || s.includes('ongoing') || s.includes('pending') || s.includes('in progress') || s.includes('engaged')) {
    variant = 'warning';
  } else if (s.includes('cancel') || s.includes('archived') || s.includes('failed') || s.includes('urgent')) {
    variant = 'error';
  } else if (s.includes('strategic') || s.includes('primary')) {
    variant = 'primary';
  }

  return (
    <Badge variant={variant} size="sm" className={className}>
      {status}
    </Badge>
  );
}
