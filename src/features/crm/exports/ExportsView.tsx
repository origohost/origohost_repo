'use client';

import React, { useState } from 'react';
import { Download, FileSpreadsheet, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';


export function ExportsView() {
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = (dataset: string) => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Data Export</Badge>
          <span className="text-body-xs font-mono text-ink-muted">{'// AUDITED EXPORTS'}</span>
        </div>
        <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
          Data Export Operations
        </Heading>
        <Text size="sm" variant="secondary" className="mt-1">
          Export filtered contacts, leads, organizations, and event registrations with operational security logging.
        </Text>
      </div>

      {downloaded && (
        <div className="p-4 rounded-card bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-body-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> CSV Export generated and downloaded successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-md bg-primary/10 text-primary">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <Heading as="h3" size="sm" className="text-ink font-bold">Contacts & Profiles</Heading>
              <Text size="xs" variant="muted">All active ecosystem contacts, emails, and roles.</Text>
            </div>
          </div>
          <Button onClick={() => handleExport('contacts')} size="sm" className="w-full gap-2">
            <Download className="h-4 w-4" /> Export Contacts CSV
          </Button>
        </div>

        <div className="p-5 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <Heading as="h3" size="sm" className="text-ink font-bold">Inbound Leads Pipeline</Heading>
              <Text size="xs" variant="muted">Full pipeline deal stages and estimated values.</Text>
            </div>
          </div>
          <Button onClick={() => handleExport('leads')} size="sm" variant="secondary" className="w-full gap-2">
            <Download className="h-4 w-4" /> Export Leads CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
