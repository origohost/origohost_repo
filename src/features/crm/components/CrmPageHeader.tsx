import React from 'react';
import { Heading, Text, Badge } from '@/components/ui';

interface CrmPageHeaderProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  actions?: React.ReactNode;
}

export function CrmPageHeader({ title, subtitle, badgeText, actions }: CrmPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Heading as="h1" size="xl" className="tracking-tight text-ink">
            {title}
          </Heading>
          {badgeText && <Badge variant="secondary" size="sm">{badgeText}</Badge>}
        </div>
        {subtitle && (
          <Text size="sm" variant="secondary" className="mt-0.5">
            {subtitle}
          </Text>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
