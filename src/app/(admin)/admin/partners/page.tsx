import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Plus, Building, DollarSign } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Partners & Sponsors — Admin Control Center | OrigoHOST',
};

const mockPartners = [
  { id: 'part-01', name: 'CyberForge Security Labs', type: 'Sponsor', tier: 'Title Partner', contract: '₹5,00,000', status: 'Active' },
  { id: 'part-02', name: 'Delhi Technological University', type: 'University', tier: 'Academic Partner', contract: 'Institutional MOU', status: 'Active' },
  { id: 'part-03', name: 'CloudScale Global', type: 'Enterprise', tier: 'Cloud Infrastructure Partner', contract: '₹3,50,000', status: 'Active' },
];

export default function AdminPartnersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-border/60 pb-5">
        <div>
          <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
            Partners & Corporate Sponsors
          </Heading>
          <Text size="md" variant="secondary" className="mt-1">
            Manage corporate sponsorships, university MOUs, tier allocations, and financial contracts.
          </Text>
        </div>
        <Link
          href="/crm/organizations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-body-sm shadow-xs hover:bg-brand-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Institutional Partner
        </Link>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#0B1628] border-b border-[#E2E8F0] dark:border-border/60 text-[11px] font-mono font-bold text-foreground-muted uppercase tracking-wider">
                <th className="py-3.5 px-4">Partner Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Sponsorship Tier</th>
                <th className="py-3.5 px-4">Contract / Commitment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-border/60 text-body-sm">
              {mockPartners.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0B1628]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{p.name}</td>
                  <td className="py-3.5 px-4 font-mono text-body-xs text-foreground-muted">{p.type}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="warning" size="sm">
                      {p.tier}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{p.contract}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success" size="sm">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/crm/organizations"
                      className="px-3 py-1 rounded-lg text-body-xs font-semibold bg-surface-elevated text-foreground hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      Manage Account
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
