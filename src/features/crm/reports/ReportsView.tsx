'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Building,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { CrmMetricSummary, FunnelStage } from '@/types/crm';

interface ReportsViewProps {
  metrics: CrmMetricSummary;
  funnel: FunnelStage[];
}

export function ReportsView({ metrics, funnel }: ReportsViewProps) {
  const [timeframe, setTimeframe] = useState('Last 30 Days');
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ metrics, funnel }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `origohost-crm-report-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setExporting(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// REPORTS & ECOSYSTEM ANALYTICS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            CRM Reports & Ecosystem Analytics
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Conversion funnel breakdown, event attendance ratios, institutional partner statistics, and lead velocity.
          </Text>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3.5 py-2 text-body-sm bg-surface border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="Last 7 Days" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Last 7 Days</option>
            <option value="Last 30 Days" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Last 30 Days</option>
            <option value="Last 90 Days" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Last 90 Days</option>
            <option value="All Time" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">All Time</option>
          </select>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {exporting ? 'Generating...' : 'Export JSON'}
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-card bg-surface border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-body-xs font-semibold">Total Contacts</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-heading-md font-bold text-ink">{metrics.totalContacts.toLocaleString()}</div>
          <span className="text-body-xs text-emerald-500 font-medium flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> +12.4% vs last period
          </span>
        </div>

        <div className="p-5 rounded-card bg-surface border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-body-xs font-semibold">Pipeline Leads</span>
            <TrendingUp className="h-4 w-4 text-accent-amber" />
          </div>
          <div className="text-heading-md font-bold text-ink">{metrics.newLeads}</div>
          <span className="text-body-xs text-emerald-500 font-medium flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> +8.1% intake velocity
          </span>
        </div>

        <div className="p-5 rounded-card bg-surface border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-body-xs font-semibold">Event Registrations</span>
            <Calendar className="h-4 w-4 text-accent-blue" />
          </div>
          <div className="text-heading-md font-bold text-ink">{metrics.eventRegistrations.toLocaleString()}</div>
          <span className="text-body-xs text-emerald-500 font-medium flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> 84% attendance rate
          </span>
        </div>

        <div className="p-5 rounded-card bg-surface border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-body-xs font-semibold">Partner Orgs</span>
            <Building className="h-4 w-4 text-accent-purple" />
          </div>
          <div className="text-heading-md font-bold text-ink">{metrics.totalOrganizations}</div>
          <span className="text-body-xs text-ink-muted font-medium">
            Universities & Enterprises
          </span>
        </div>
      </div>

      {/* Conversion Funnel Section */}
      <div className="p-6 rounded-card bg-surface border border-border space-y-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <Heading as="h3" size="sm" className="text-ink font-bold">
              Inbound Lead Qualification Funnel
            </Heading>
            <Text size="xs" variant="muted" className="mt-0.5">
              Stage progression from raw inquiry to confirmed partner or attendee.
            </Text>
          </div>
          <Badge variant="primary" size="sm">
            {timeframe}
          </Badge>
        </div>

        <div className="space-y-4">
          {funnel.map((stage) => (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex items-center justify-between text-body-xs font-semibold">
                <span className="text-ink">{stage.stage}</span>
                <span className="font-mono text-ink-muted">
                  {stage.count} ({stage.percentage}%)
                </span>
              </div>
              <div className="h-3 w-full bg-surface-elevated rounded-full overflow-hidden border border-border/40">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
