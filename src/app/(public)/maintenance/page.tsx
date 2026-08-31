import React from 'react';
import type { Metadata } from 'next';
import { Settings, ExternalLink, RefreshCw } from 'lucide-react';
import { Heading, Text } from '@/components/ui';
import { Button } from '@/components/buttons/Button';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Under Scheduled Maintenance — OrigoHOST',
  description: 'OrigoHOST is currently undergoing scheduled maintenance. Please check back shortly.',
};

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-24 sm:py-32 bg-bg">
      <Container size="sm" className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-card bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
          <Settings className="h-8 w-8 animate-spin" aria-hidden="true" />
        </div>

        <span className="text-caption font-mono text-primary uppercase font-bold tracking-wider mb-2">
          Infrastructure Maintenance
        </span>

        <Heading as="h1" size="xl" className="text-ink mb-3">
          Scheduled Upgrades in Progress
        </Heading>

        <Text size="md" variant="secondary" className="max-w-md mb-8 mx-auto leading-relaxed">
          OrigoHOST systems are currently undergoing infrastructure maintenance. We will be back online shortly. Follow our community dispatch channels for real-time status updates.
        </Text>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="https://linkedin.com/company/origohost" variant="primary" size="lg" external>
            Status on LinkedIn
            <ExternalLink className="h-4 w-4 ml-1.5" aria-hidden="true" />
          </Button>
          <Button href="/" variant="secondary" size="lg">
            Retry Connection
          </Button>
        </div>
      </Container>
    </div>
  );
}
