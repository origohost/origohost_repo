'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  Filter,
  TrendingUp,
  Target,
  DollarSign,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { Lead, LeadStatus, LeadPriority } from '@/types/crm';
import { deleteLead } from '@/services/crm/leads.service';

interface LeadsViewProps {
  initialLeads: Lead[];
}

const statusOptions = ['All Statuses', 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'CONVERTED', 'LOST'];
const priorityOptions = ['All Priorities', 'Low', 'Medium', 'High', 'Urgent'];

export function LeadsView({ initialLeads }: LeadsViewProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'All Statuses' || l.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priorities' || l.priority === priorityFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      l.title.toLowerCase().includes(q) ||
      l.source.toLowerCase().includes(q) ||
      (l.notes && l.notes.toLowerCase().includes(q));

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete lead "${title}"?`)) return;
    setDeletingId(id);
    const res = await deleteLead(id);
    if (res.success) {
      setLeads((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert('Failed to delete lead.');
    }
    setDeletingId(null);
  };

  const totalLeads = leads.length;
  const totalPipelineValue = leads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
  const convertedLeads = leads.filter((l) => l.status === 'CONVERTED').length;
  const urgentHighLeads = leads.filter((l) => l.priority === 'Urgent' || l.priority === 'High').length;

  const getStatusBadgeVariant = (status: LeadStatus) => {
    switch (status) {
      case 'CONVERTED':
        return 'success';
      case 'LOST':
        return 'error';
      case 'PROPOSAL':
      case 'QUALIFIED':
        return 'warning';
      case 'CONTACTED':
      case 'NEW':
      default:
        return 'primary';
    }
  };

  const getPriorityBadgeVariant = (priority: LeadPriority) => {
    switch (priority) {
      case 'Urgent':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
      default:
        return 'secondary';
    }
  };

  const [viewMode, setViewMode] = useState<'grid' | 'kanban'>('grid');

  const stages: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'CONVERTED', 'LOST'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// INBOUND PIPELINE'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Inbound Leads & Qualification Pipeline
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Track website intake inquiries, campus chapter applications, event leads, and sponsorship deals.
          </Text>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-surface-elevated p-1 rounded-btn border border-border flex items-center gap-1 text-body-xs font-semibold">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded transition-colors ${viewMode === 'grid' ? 'bg-surface text-primary shadow-2xs font-bold' : 'text-ink-muted'}`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-2.5 py-1 rounded transition-colors ${viewMode === 'kanban' ? 'bg-surface text-primary shadow-2xs font-bold' : 'text-ink-muted'}`}
            >
              Kanban Board
            </button>
          </div>
          <Link
            href="/crm/leads/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Add Lead
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Pipeline</span>
            <span className="text-heading-sm font-bold text-ink">{totalLeads} Leads</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Pipeline Value</span>
            <span className="text-heading-sm font-bold text-ink">₹{totalPipelineValue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Converted Deals</span>
            <span className="text-heading-sm font-bold text-ink">{convertedLeads} Deals</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">High / Urgent Priority</span>
            <span className="text-heading-sm font-bold text-ink">{urgentHighLeads} Leads</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search leads by title, intake source, or notes..."
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
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {priorityOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Render Mode: Kanban Board vs Grid */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {stages.map((stg) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stg);
            return (
              <div key={stg} className="bg-surface border border-border rounded-card p-3 space-y-3 shrink-0 min-w-[240px]">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-bold text-body-xs text-ink">{stg}</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-surface-elevated text-ink-muted font-bold">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {stageLeads.map((lead) => (
                    <div key={lead.id} className="p-3 rounded-btn bg-surface-elevated border border-border/80 space-y-2 text-body-xs hover:border-primary/50 transition-colors">
                      <Link href={`/crm/leads/${lead.id}`} className="font-bold text-ink hover:text-primary transition-colors block">
                        {lead.title}
                      </Link>
                      <span className="text-[11px] text-ink-muted block">{lead.source}</span>
                      <div className="flex items-center justify-between pt-1 font-mono text-[10px]">
                        <span className="text-primary font-bold">₹{(lead.estimatedValue || 0).toLocaleString()}</span>
                        <Badge variant={getPriorityBadgeVariant(lead.priority)} size="sm">{lead.priority}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
          <AlertCircle className="h-10 w-10 text-ink-muted mx-auto" />
          <Heading as="h3" size="sm" className="text-ink">
            No Inbound Leads Found
          </Heading>
          <Text size="xs" variant="muted">
            Try adjusting your search criteria or add a new inbound lead inquiry.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-5 rounded-card bg-surface border border-border shadow-xs space-y-3 flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Heading as="h3" size="sm" className="text-ink font-bold leading-snug">
                    {lead.title}
                  </Heading>
                  <Badge variant={getStatusBadgeVariant(lead.status)} size="sm">
                    {lead.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-body-xs text-ink-muted">
                  <span>Source: {lead.source}</span>
                  <Badge variant={getPriorityBadgeVariant(lead.priority)} size="sm">
                    {lead.priority}
                  </Badge>
                </div>

                {lead.notes && (
                  <div className="mt-3 p-3 rounded-lg bg-surface-elevated text-body-xs text-ink-secondary border border-border/60 line-clamp-3 leading-relaxed">
                    {lead.notes}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <span className="text-body-xs font-mono text-primary font-bold">
                  Est: ₹{(lead.estimatedValue || 0).toLocaleString('en-IN')}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/crm/leads/${lead.id}/edit`}
                    className="p-1.5 rounded text-ink-muted hover:text-primary transition-colors"
                    title="Edit Lead"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(lead.id, lead.title)}
                    disabled={deletingId === lead.id}
                    className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors disabled:opacity-50"
                    title="Delete Lead"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/crm/leads/${lead.id}`}
                    className="inline-flex items-center gap-1 text-primary font-semibold text-body-xs hover:underline ml-1"
                  >
                    Manage <ArrowRight className="h-3 w-3" />
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

