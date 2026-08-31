'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, Clock, ShieldCheck, Mail, Building2, UserCheck, Plus, AlertCircle } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

import type { CrmApplication } from '@/types/crm';
import { updateApplicationStatus } from '@/services/crm/applications.service';
import { createContact } from '@/services/crm/contacts.service';

interface ApplicationDetailsViewProps {
  application: CrmApplication;
}

export function ApplicationDetailsView({ application: initialApp }: ApplicationDetailsViewProps) {
  const [app, setApp] = useState<CrmApplication>(initialApp);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionSuccess, setConversionSuccess] = useState(false);
  const [notes, setNotes] = useState(app.notes || '');

  const handleStatusChange = async (status: CrmApplication['status']) => {
    const res = await updateApplicationStatus(app.id, status, 'usr-operator-01', notes);
    if (res.success && res.data) {
      setApp(res.data);
    }
  };

  const handleConvertToContact = async () => {
    setIsConverting(true);
    const names = app.applicantName.split(' ');
    const firstName = names[0] || 'Applicant';
    const lastName = names.slice(1).join(' ') || '';

    const contactRes = await createContact({
      firstName,
      lastName,
      email: app.email,
      phone: app.phone,
      organizationId: app.organizationName,
      source: `Application (${app.pathway})`,
      status: 'Active',
      tags: ['Converted-Applicant', app.pathway],
    });

    if (contactRes.success) {
      await handleStatusChange('APPROVED');
      setConversionSuccess(true);
    }
    setIsConverting(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/crm/applications"
        className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Applications Pipeline
      </Link>

      {/* Profile Header */}
      <div className="p-6 rounded-card bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Heading as="h1" size="xl" className="text-ink font-bold">{app.applicantName}</Heading>
            <Badge variant={app.status === 'APPROVED' ? 'success' : app.status === 'REJECTED' ? 'error' : 'warning'} size="sm">
              {app.status}
            </Badge>
          </div>
          <Text size="xs" variant="muted" className="mt-1 flex items-center gap-2">
            <span>{app.email}</span>
            <span>•</span>
            <span>Pathway: {app.pathway.replace('_', ' ')}</span>
            <span>•</span>
            <span>Org: {app.organizationName || 'Independent'}</span>
          </Text>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {app.status !== 'APPROVED' && (
            <Button
              size="sm"
              onClick={handleConvertToContact}
              disabled={isConverting}
              className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              <UserCheck className="h-4 w-4" /> Convert to Active Contact
            </Button>
          )}
        </div>
      </div>

      {conversionSuccess && (
        <div className="p-4 rounded-card bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-body-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Application approved and active CRM contact created!
        </div>
      )}

      {/* Decision Workflow & Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-card bg-surface border border-border space-y-4">
          <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Submission Details</Heading>
          
          <div className="grid grid-cols-2 gap-4 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block">Applicant Email</span>
              <span className="text-ink font-medium">{app.email}</span>
            </div>
            <div>
              <span className="text-body-xs text-ink-muted block">Phone</span>
              <span className="text-ink font-medium">{app.phone || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-body-xs text-ink-muted block">Organization / Entity</span>
              <span className="text-ink font-medium">{app.organizationName || 'Independent'}</span>
            </div>
            <div>
              <span className="text-body-xs text-ink-muted block">Submission Date</span>
              <span className="text-ink font-mono text-body-xs">{new Date(app.submittedAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-body-xs text-ink-muted block mb-1">Applicant Statement / Notes</span>
            <div className="p-3.5 rounded-btn bg-surface-elevated border border-border/80 text-body-xs text-ink leading-relaxed">
              {app.notes || 'No extra submission notes.'}
            </div>
          </div>
        </div>

        {/* Action Controls Sidebar */}
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Decision Workflow</Heading>
          
          <div className="space-y-2">
            <Button
              size="sm"
              variant={app.status === 'REVIEW' ? 'primary' : 'secondary'}
              onClick={() => handleStatusChange('REVIEW')}
              className="w-full justify-start gap-2"
            >
              <Clock className="h-4 w-4" /> Move to Review
            </Button>

            <Button
              size="sm"
              variant={app.status === 'APPROVED' ? 'primary' : 'secondary'}
              onClick={() => handleStatusChange('APPROVED')}
              className="w-full justify-start gap-2 text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4" /> Approve Application
            </Button>

            <Button
              size="sm"
              variant={app.status === 'REJECTED' ? 'primary' : 'secondary'}
              onClick={() => handleStatusChange('REJECTED')}
              className="w-full justify-start gap-2 text-rose-600 dark:text-rose-400"
            >
              <XCircle className="h-4 w-4" /> Reject Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
