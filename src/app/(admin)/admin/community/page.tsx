import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Plus, Users, GraduationCap, ArrowRight } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Community Ecosystem — Admin Control Center | OrigoHOST',
};

const mockChapters = [
  { id: 'chap-01', name: 'DTU Chapter', institution: 'Delhi Technological University', leads: 'Aarav Sharma', members: 420, status: 'Active' },
  { id: 'chap-02', name: 'GL Bajaj Chapter', institution: 'GL Bajaj Institute of Tech', leads: 'Priya Verma', members: 310, status: 'Active' },
  { id: 'chap-03', name: 'OpenSource India Hub', institution: 'OpenSource India Foundation', leads: 'Ananya Roy', members: 680, status: 'Active' },
];

export default function AdminCommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-border/60 pb-5">
        <div>
          <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
            Campus Chapters & Ecosystem Hubs
          </Heading>
          <Text size="md" variant="secondary" className="mt-1">
            Oversee national campus chapters, developer working groups, and chapter lead allocations.
          </Text>
        </div>
        <Link
          href="/crm/members/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-body-sm shadow-xs hover:bg-brand-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Campus Chapter
        </Link>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#0B1628] border-b border-[#E2E8F0] dark:border-border/60 text-[11px] font-mono font-bold text-foreground-muted uppercase tracking-wider">
                <th className="py-3.5 px-4">Chapter Hub</th>
                <th className="py-3.5 px-4">Institution / Partner</th>
                <th className="py-3.5 px-4">Chapter Lead</th>
                <th className="py-3.5 px-4">Member Count</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-border/60 text-body-sm">
              {mockChapters.map((chap) => (
                <tr key={chap.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0B1628]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{chap.name}</td>
                  <td className="py-3.5 px-4 text-body-xs text-foreground-muted">{chap.institution}</td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{chap.leads}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{chap.members} Members</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success" size="sm">
                      {chap.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/crm/members"
                      className="px-3 py-1 rounded-lg text-body-xs font-semibold bg-surface-elevated text-foreground hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      View Members Roster
                    </Link>
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
