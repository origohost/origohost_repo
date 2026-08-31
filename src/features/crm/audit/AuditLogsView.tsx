'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Filter, Clock, User, ArrowRight, Activity, Database } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { getAuditLogs } from '@/services/crm/audit.service';
import type { AuditLogEntry } from '@/types/crm/audit.types';

export function AuditLogsView() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  useEffect(() => {
    getAuditLogs().then((data) => setLogs(data));
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      log.operatorName.toLowerCase().includes(q) ||
      log.entityType.toLowerCase().includes(q) ||
      log.entityId.toLowerCase().includes(q);

    return matchesAction && matchesSearch;
  });

  const getActionBadge = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'CREATE': return <Badge variant="success" size="sm">CREATE</Badge>;
      case 'UPDATE': return <Badge variant="info" size="sm">UPDATE</Badge>;
      case 'DELETE': return <Badge variant="error" size="sm">DELETE</Badge>;
      case 'ARCHIVE': return <Badge variant="warning" size="sm">ARCHIVE</Badge>;
      case 'RESTORE': return <Badge variant="primary" size="sm">RESTORE</Badge>;
      case 'EXPORT': return <Badge variant="secondary" size="sm">EXPORT</Badge>;
      default: return <Badge variant="outline" size="sm">{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Security & Audit</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// AUDIT LOG TRAIL'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Operational Audit Trail
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Immutable log of all CRM operations, record mutations, status updates, bulk actions, and data exports.
          </Text>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search logs by operator name, entity type, or record ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-ink-muted" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none"
          >
            <option value="ALL">All Actions</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="ARCHIVE">ARCHIVE</option>
            <option value="RESTORE">RESTORE</option>
            <option value="EXPORT">EXPORT</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-surface border border-border rounded-card overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-elevated border-b border-border text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Operator</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Entity Type</th>
              <th className="py-3 px-4">Target Record ID</th>
              <th className="py-3 px-4">Recorded Changes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-body-xs font-mono">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-ink-muted">
                  No audit log entries matching filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="py-3 px-4 text-ink-muted shrink-0">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-ink">
                    <span className="flex items-center gap-1.5 font-sans"><User className="h-3.5 w-3.5 text-primary" /> {log.operatorName}</span>
                  </td>
                  <td className="py-3 px-4">{getActionBadge(log.action)}</td>
                  <td className="py-3 px-4 font-bold text-primary">{log.entityType}</td>
                  <td className="py-3 px-4 text-ink-secondary">{log.entityId}</td>
                  <td className="py-3 px-4 text-ink-muted font-sans text-[11px]">
                    {log.changes ? (
                      <span className="p-1 rounded bg-surface-elevated border border-border inline-block max-w-xs truncate">
                        {JSON.stringify(log.changes)}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
