'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Mail,
  Send,
  Plus,
  Trash2,
  Filter,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  Inbox,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { CrmCommunicationItem, EmailTemplate } from '@/types/crm';
import { deleteCrmCommunication } from '@/services/crm/communications.service';

interface CommunicationsViewProps {
  initialComms: CrmCommunicationItem[];
  initialTemplates: EmailTemplate[];
}

const statusOptions = ['All Statuses', 'Sent', 'Delivered', 'Draft', 'Failed'];

export function CommunicationsView({ initialComms, initialTemplates }: CommunicationsViewProps) {
  const [comms, setComms] = useState<CrmCommunicationItem[]>(initialComms);
  const [templates] = useState<EmailTemplate[]>(initialTemplates);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [activeTab, setActiveTab] = useState<'logs' | 'templates'>('logs');

  const filteredComms = comms.filter((c) => {
    const matchesStatus = statusFilter === 'All Statuses' || c.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      c.recipientName.toLowerCase().includes(q) ||
      c.recipientEmail.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const handleDelete = async (id: string, subject: string) => {
    if (!window.confirm(`Are you sure you want to delete communication log "${subject}"?`)) return;
    const res = await deleteCrmCommunication(id);
    if (res.success) {
      setComms((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const totalComms = comms.length;
  const deliveredCount = comms.filter((c) => c.status === 'Delivered' || c.status === 'Sent').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// COMMUNICATIONS & EMAIL HUB'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Communications & Broadcast Hub
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Outreach logs, speaker invitations, automated registration receipts, and email templates.
          </Text>
        </div>
        <Link
          href="/crm/communications/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Send className="h-4 w-4" />
          Send Broadcast / Email
        </Link>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Dispatched Messages</span>
            <span className="text-heading-sm font-bold text-ink">{totalComms} Messages</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Successful Deliveries</span>
            <span className="text-heading-sm font-bold text-ink">{deliveredCount} Delivered</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-blue/10 text-accent-blue">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Active Templates</span>
            <span className="text-heading-sm font-bold text-ink">{templates.length} Templates</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab('logs')}
          className={`pb-3 font-semibold text-body-sm transition-colors relative ${
            activeTab === 'logs' ? 'text-primary border-b-2 border-primary' : 'text-ink-muted hover:text-ink'
          }`}
        >
          Dispatch Logs ({filteredComms.length})
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-3 font-semibold text-body-sm transition-colors relative ${
            activeTab === 'templates' ? 'text-primary border-b-2 border-primary' : 'text-ink-muted hover:text-ink'
          }`}
        >
          Email Template Library ({templates.length})
        </button>
      </div>

      {activeTab === 'logs' ? (
        <>
          {/* Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <input
                type="text"
                placeholder="Search by recipient name, email, or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

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
          </div>

          {/* Table */}
          <div className="rounded-card bg-surface border border-border overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-elevated border-b border-border text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
                    <th className="py-3.5 px-4">Recipient</th>
                    <th className="py-3.5 px-4">Subject & Snippet</th>
                    <th className="py-3.5 px-4">Channel</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-body-sm">
                  {filteredComms.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-ink-muted">
                        No communication log entries match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredComms.map((comm) => (
                      <tr key={comm.id} className="hover:bg-surface-elevated/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-ink block">{comm.recipientName}</span>
                          <span className="text-body-xs text-ink-muted flex items-center gap-1 mt-0.5">
                            <Mail className="h-3 w-3" /> {comm.recipientEmail}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-ink block line-clamp-1">{comm.subject}</span>
                          {comm.snippet && <span className="text-body-xs text-ink-muted line-clamp-1">{comm.snippet}</span>}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-body-xs">
                          {comm.channel}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant={comm.status === 'Delivered' || comm.status === 'Sent' ? 'success' : 'info'} size="sm">
                            {comm.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDelete(comm.id, comm.subject)}
                            className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors"
                            title="Delete Log"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Template Library */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="p-6 rounded-card bg-surface border border-border space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <Heading as="h3" size="sm" className="text-ink font-bold">
                  {tpl.name}
                </Heading>
                <Badge variant="primary" size="sm">
                  {tpl.category}
                </Badge>
              </div>

              <p className="text-body-xs font-mono text-ink-muted bg-surface-elevated p-2.5 rounded border border-border/60">
                Subject: {tpl.subject}
              </p>

              <p className="text-body-xs text-ink-secondary leading-relaxed">
                {tpl.bodyPreview}
              </p>

              {tpl.variables && tpl.variables.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tpl.variables.map((v) => (
                    <span key={v} className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-[11px]">
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
