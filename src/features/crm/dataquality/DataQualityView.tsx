'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, CheckCircle2, RefreshCw, AlertTriangle, ArrowRight, GitMerge, FileText } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';
import { findDuplicateContacts, mergeDuplicateContacts, type DuplicateMatchGroup } from '@/services/crm/duplicates.service';

export function DataQualityView() {
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateMatchGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mergingSuccess, setMergingSuccess] = useState(false);

  const loadDuplicates = async () => {
    setIsLoading(true);
    const res = await findDuplicateContacts();
    if (res.data) setDuplicateGroups(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadDuplicates();
  }, []);

  const handleMerge = async (primaryId: string, secondaryId: string) => {
    const res = await mergeDuplicateContacts(primaryId, secondaryId);
    if (res.success) {
      setMergingSuccess(true);
      setTimeout(() => setMergingSuccess(false), 3000);
      loadDuplicates();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Data Governance</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// DATA QUALITY & DUPLICATES'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Data Quality & Duplicate Resolution Center
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Detect duplicate records, resolve matching contacts, identify missing phone/org fields, and clean up stale data.
          </Text>
        </div>
        <Button size="sm" onClick={loadDuplicates} className="gap-1.5 shadow-xs">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Scan for Duplicates
        </Button>
      </div>

      {mergingSuccess && (
        <div className="p-3.5 rounded-card bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-body-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Duplicate records safely merged and tags unioned.
        </div>
      )}

      {/* Metrics overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-2xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <GitMerge className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Duplicate Record Groups</span>
            <span className="text-heading-sm font-bold text-ink">{duplicateGroups.length}</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-2xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Missing Phone/Org Fields</span>
            <span className="text-heading-sm font-bold text-ink">4 Records</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-2xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Overall Data Health</span>
            <span className="text-heading-sm font-bold text-emerald-600 dark:text-emerald-400">96.4%</span>
          </div>
        </div>
      </div>

      {/* Duplicate Matching Cards */}
      <div className="space-y-4">
        <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Candidate Duplicate Match Groups</Heading>
        {duplicateGroups.length === 0 ? (
          <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
            <Heading as="h3" size="sm" className="text-ink">No Duplicate Records Found</Heading>
            <Text size="xs" variant="muted">All contacts in your database have unique emails, phone numbers, and names.</Text>
          </div>
        ) : (
          duplicateGroups.map((grp, idx) => (
            <div key={idx} className="p-5 rounded-card bg-surface border border-border space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={grp.confidence === 'HIGH' ? 'error' : 'warning'} size="sm">
                    {grp.confidence} CONFIDENCE MATCH
                  </Badge>
                  <span className="text-body-xs font-semibold text-ink">{grp.matchReason}</span>
                </div>
                <span className="text-body-xs font-mono text-ink-muted">{grp.records.length} Matching Records</span>
              </div>

              {/* Side-by-side records comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grp.records.map((r, rIdx) => (
                  <div key={r.id} className="p-4 rounded-btn bg-surface-elevated border border-border/80 space-y-2 text-body-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-ink text-body-sm block">{r.firstName} {r.lastName}</span>
                        <span className="text-ink-muted block">{r.email}</span>
                      </div>
                      <Badge variant="secondary" size="sm">{rIdx === 0 ? 'Primary Record' : 'Duplicate Record'}</Badge>
                    </div>
                    <div className="text-[11px] text-ink-muted font-mono space-y-0.5 pt-1">
                      <div>Phone: {r.phone || '—'}</div>
                      <div>Org: {r.organizationId || '—'}</div>
                      <div>Source: {r.source || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => handleMerge(grp.records[0].id, grp.records[1].id)}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <GitMerge className="h-4 w-4" /> Merge Secondary Record into Primary
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
