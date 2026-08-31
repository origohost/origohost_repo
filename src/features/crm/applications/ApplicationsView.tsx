'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, FileText, CheckCircle2, XCircle, Clock, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

import type { CrmApplication } from '@/types/crm';
import { updateApplicationStatus } from '@/services/crm/applications.service';

interface ApplicationsViewProps {
  initialApplications: CrmApplication[];
}

export function ApplicationsView({ initialApplications }: ApplicationsViewProps) {
  const [apps, setApps] = useState<CrmApplication[]>(initialApplications);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [pathwayFilter, setPathwayFilter] = useState('ALL');

  const filteredApps = apps.filter((a) => {
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesPathway = pathwayFilter === 'ALL' || a.pathway === pathwayFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      a.applicantName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      (a.organizationName && a.organizationName.toLowerCase().includes(q));

    return matchesStatus && matchesPathway && matchesSearch;
  });

  const handleQuickStatus = async (id: string, status: CrmApplication['status']) => {
    const res = await updateApplicationStatus(id, status);
    if (res.success && res.data) {
      setApps((prev) => prev.map((item) => (item.id === id ? res.data! : item)));
    }
  };

  const getStatusBadge = (status: CrmApplication['status']) => {
    switch (status) {
      case 'APPROVED': return <Badge variant="success" size="sm">APPROVED</Badge>;
      case 'REJECTED': return <Badge variant="error" size="sm">REJECTED</Badge>;
      case 'WITHDRAWN': return <Badge variant="secondary" size="sm">WITHDRAWN</Badge>;
      case 'REVIEW': return <Badge variant="warning" size="sm">IN REVIEW</Badge>;
      case 'PENDING': default: return <Badge variant="info" size="sm">PENDING</Badge>;
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Ecosystem Intake</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// JOIN & APPLICATIONS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Application Intake Pipeline
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Review public join submissions, node co-location partnerships, developer grants, and incubator applications.
          </Text>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-2xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Applications</span>
            <span className="text-heading-sm font-bold text-ink">{apps.length}</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-2xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Pending Review</span>
            <span className="text-heading-sm font-bold text-ink">
              {apps.filter((a) => a.status === 'PENDING' || a.status === 'REVIEW').length}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-2xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Approved</span>
            <span className="text-heading-sm font-bold text-ink">
              {apps.filter((a) => a.status === 'APPROVED').length}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-2xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Rejected / Withdrawn</span>
            <span className="text-heading-sm font-bold text-ink">
              {apps.filter((a) => a.status === 'REJECTED' || a.status === 'WITHDRAWN').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search applicants by name, email, or organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-ink-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="REVIEW">REVIEW</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="WITHDRAWN">WITHDRAWN</option>
            </select>
          </div>

          <select
            value={pathwayFilter}
            onChange={(e) => setPathwayFilter(e.target.value)}
            className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none"
          >
            <option value="ALL">All Pathways</option>
            <option value="INFRASTRUCTURE_PARTNER">Infrastructure Partner</option>
            <option value="COMMUNITY_MEMBER">Community Member</option>
            <option value="ECOSYSTEM_DEVELOPER">Ecosystem Developer</option>
            <option value="VENTURE_STUDIO">Venture Studio</option>
          </select>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
          <AlertCircle className="h-10 w-10 text-ink-muted mx-auto" />
          <Heading as="h3" size="sm" className="text-ink">No Applications Found</Heading>
          <Text size="xs" variant="muted">No submission records match your query.</Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-card bg-surface border border-border shadow-2xs space-y-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Heading as="h3" size="sm" className="text-ink font-bold leading-tight">
                      {app.applicantName}
                    </Heading>
                    <span className="text-body-xs text-ink-muted block mt-0.5">{app.email}</span>
                  </div>
                  {getStatusBadge(app.status)}
                </div>

                <div className="mt-3 p-3 rounded-btn bg-surface-elevated border border-border/60 space-y-1 text-body-xs">
                  <span className="text-ink-muted block">Organization: <strong className="text-ink">{app.organizationName || 'Independent'}</strong></span>
                  <span className="text-ink-muted block">Pathway: <strong className="text-primary">{app.pathway.replace('_', ' ')}</strong></span>
                  {app.notes && <p className="text-ink-secondary mt-2 line-clamp-2 italic">&quot;{app.notes}&quot;</p>}
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-ink-muted">
                  Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1">
                  {app.status === 'PENDING' && (
                    <Button size="xs" variant="secondary" onClick={() => handleQuickStatus(app.id, 'REVIEW')} className="gap-1">
                      <Clock className="h-3 w-3" /> Review
                    </Button>
                  )}
                  {app.status === 'REVIEW' && (
                    <Button size="xs" variant="secondary" onClick={() => handleQuickStatus(app.id, 'APPROVED')} className="gap-1 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      <UserCheck className="h-3 w-3" /> Approve
                    </Button>
                  )}
                  <Link href={`/crm/applications/${app.id}`}>
                    <Button size="xs" className="gap-1">
                      Details <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
