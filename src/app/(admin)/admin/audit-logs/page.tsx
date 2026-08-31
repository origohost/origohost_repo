import React from 'react';
import type { Metadata } from 'next';
import { Activity, Shield, Clock, User, FileText } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { getAuditLogs } from '@/services/crm/audit.service';

export const metadata: Metadata = {
  title: 'Audit Logs — Admin Control Center | OrigoHOST',
};

export default async function AdminAuditLogsPage() {
  const auditLogs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E2E8F0] dark:border-border/60 pb-5">
        <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
          Platform System Audit Logs
        </Heading>
        <Text size="md" variant="secondary" className="mt-1">
          Immutable operational trail tracking all create, update, delete, and security events across the platform.
        </Text>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#0B1628] border-b border-[#E2E8F0] dark:border-border/60 text-[11px] font-mono font-bold text-foreground-muted uppercase tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Operator</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Entity Target</th>
                <th className="py-3.5 px-4">Entity ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-border/60 text-body-sm">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0B1628]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-body-xs text-foreground-muted">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{log.operatorName}</td>
                  <td className="py-3.5 px-4 font-mono text-body-xs">
                    <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{log.entityType}</td>
                  <td className="py-3.5 px-4 font-mono text-body-xs text-foreground-muted">{log.entityId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
