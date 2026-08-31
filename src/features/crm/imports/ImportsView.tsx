'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle2, AlertTriangle, FileText, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';


export function ImportsView() {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<'upload' | 'preview' | 'imported'>('upload');
  const [previewData, setPreviewData] = useState<any[]>([]);

  const handleSimulatedUpload = () => {
    setPreviewData([
      { firstName: 'David', lastName: 'Kim', email: 'david@nexuslayer.io', organization: 'NexusLayer', status: 'Active' },
      { firstName: 'Elena', lastName: 'Vazquez', email: 'elena@solardao.org', organization: 'SolarDAO', status: 'Active' },
      { firstName: 'Alex', lastName: 'Mercer', email: 'alex@hostnode.net', organization: 'HostNode', status: 'Lead' },
    ]);
    setStep('preview');
  };

  const handleConfirmImport = () => {
    setStep('imported');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Data Management</Badge>
          <span className="text-body-xs font-mono text-ink-muted">{'// CSV IMPORT PIPELINE'}</span>
        </div>
        <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
          Controlled Data Import
        </Heading>
        <Text size="sm" variant="secondary" className="mt-1">
          Upload, validate, preview, and import contacts or leads from CSV files with duplicate detection.
        </Text>
      </div>

      {step === 'upload' && (
        <div className="p-8 rounded-card bg-surface border-2 border-dashed border-border text-center space-y-4">
          <Upload className="h-10 w-10 text-primary mx-auto" />
          <div>
            <Heading as="h3" size="sm" className="text-ink font-bold">Upload CSV Contact File</Heading>
            <Text size="xs" variant="muted" className="mt-1">
              Supports CSV format containing columns: firstName, lastName, email, phone, organization, tags.
            </Text>
          </div>
          <Button onClick={handleSimulatedUpload} className="gap-2 mx-auto">
            Select Sample CSV & Preview <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {step === 'preview' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <Heading as="h3" size="sm" className="text-ink">Preview & Duplicate Validation</Heading>
            <Badge variant="success" size="sm">3 Valid Records</Badge>
          </div>

          <div className="divide-y divide-border/60 text-body-xs">
            {previewData.map((row, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-ink">{row.firstName} {row.lastName}</span>
                  <span className="text-ink-muted ml-2">{row.email} • {row.organization}</span>
                </div>
                <Badge variant="info" size="sm">{row.status}</Badge>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <Button variant="secondary" onClick={() => setStep('upload')}>
              Cancel
            </Button>
            <Button onClick={handleConfirmImport} className="gap-2">
              <CheckCircle2 className="h-4 w-4" /> Confirm & Ingest 3 Contacts
            </Button>
          </div>
        </div>
      )}

      {step === 'imported' && (
        <div className="p-8 rounded-card bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <div>
            <Heading as="h3" size="md" className="text-emerald-700 dark:text-emerald-300 font-bold">Import Completed Successfully!</Heading>
            <Text size="xs" className="text-emerald-700/80 dark:text-emerald-400/80 mt-1">
              3 new contacts were ingested and logged into the audit trail.
            </Text>
          </div>
          <Button onClick={() => setStep('upload')} variant="secondary" className="mx-auto">
            Import Another File
          </Button>
        </div>
      )}
    </div>
  );
}
