'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Shield, UserPlus, Mail, Key, CheckCircle } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';


const mockAdminUsers = [
  { id: 'usr-01', name: 'System Operator', email: 'operator@origohost.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
  { id: 'usr-02', name: 'Aarav Sharma', email: 'aarav.sharma@dtu.ac.in', role: 'Chapter Manager', status: 'Active', lastActive: '2 hours ago' },
  { id: 'usr-03', name: 'Priya Verma', email: 'priya.v@glbajaj.ac.in', role: 'Event Coordinator', status: 'Active', lastActive: 'Yesterday' },
  { id: 'usr-04', name: 'Content Editor', email: 'cms.editor@origohost.com', role: 'CMS Editor', status: 'Active', lastActive: '3 days ago' },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-border/60 pb-5">
        <div>
          <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
            Platform Users & Access Roles
          </Heading>
          <Text size="md" variant="secondary" className="mt-1">
            Manage administrative credentials, role-based access control (RBAC), and active operator sessions.
          </Text>
        </div>
        <button
          onClick={() => alert('New operator invite link generated and copied to clipboard!')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-body-sm shadow-xs hover:bg-brand-primary-hover transition-colors"
        >
          <UserPlus className="h-4 w-4" /> Invite Platform Operator
        </button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#0B1628] border-b border-[#E2E8F0] dark:border-border/60 text-[11px] font-mono font-bold text-foreground-muted uppercase tracking-wider">
                <th className="py-3.5 px-4">Operator Name</th>
                <th className="py-3.5 px-4">Role / Permissions</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-border/60 text-body-sm">
              {mockAdminUsers.map((usr) => (
                <tr key={usr.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0B1628]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-foreground block">{usr.name}</span>
                    <span className="text-body-xs text-foreground-muted flex items-center gap-1 mt-0.5">
                      <Mail className="h-3 w-3" /> {usr.email}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="primary" size="sm">
                      {usr.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-body-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="h-3 w-3" /> {usr.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-body-xs text-foreground-muted">
                    {usr.lastActive}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Reset password trigger sent for ${usr.email}`)}
                      className="px-3 py-1 rounded-lg text-body-xs font-semibold bg-surface-elevated text-foreground hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      Security Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
