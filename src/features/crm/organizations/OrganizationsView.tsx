'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Building2,
  Globe,
  Mail,
  Phone,
  ArrowRight,
  Plus,
  Trash2,
  Edit3,
  Filter,
  GraduationCap,
  Briefcase,
  Award,
  Layers,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { Organization } from '@/types/crm';
import { deleteOrganization } from '@/services/crm/organizations.service';

interface OrganizationsViewProps {
  initialOrganizations: Organization[];
}

const typeOptions = ['All Types', 'University', 'Enterprise', 'Startup', 'Community', 'Sponsor', 'Partner'];
const statusOptions = ['All Statuses', 'Active', 'Partner', 'Prospect', 'Inactive', 'Archived'];

export function OrganizationsView({ initialOrganizations }: OrganizationsViewProps) {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredOrgs = organizations.filter((o) => {
    const matchesType = typeFilter === 'All Types' || o.type === typeFilter;
    const matchesStatus = statusFilter === 'All Statuses' || o.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      o.name.toLowerCase().includes(q) ||
      (o.industry && o.industry.toLowerCase().includes(q)) ||
      (o.email && o.email.toLowerCase().includes(q));

    return matchesType && matchesStatus && matchesSearch;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete organization "${name}"?`)) return;
    setDeletingId(id);
    const res = await deleteOrganization(id);
    if (res.success) {
      setOrganizations((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert('Failed to delete organization.');
    }
    setDeletingId(null);
  };

  const totalCount = organizations.length;
  const universityCount = organizations.filter((o) => o.type === 'University').length;
  const sponsorCount = organizations.filter((o) => o.type === 'Sponsor' || o.type === 'Enterprise').length;
  const activeCount = organizations.filter((o) => o.status === 'Active' || o.status === 'Partner').length;

  return (
    <div className="space-y-6">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// ORGANIZATIONS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Organizations & Institutional Partners
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Directory of partner universities, enterprise sponsors, startups, and community hubs.
          </Text>
        </div>
        <Link
          href="/crm/organizations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          Add Organization
        </Link>
      </div>

      {/* ── Metric Cards Overview ──────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Orgs</span>
            <span className="text-heading-sm font-bold text-ink">{totalCount}</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-blue/10 text-accent-blue">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">University Chapters</span>
            <span className="text-heading-sm font-bold text-ink">{universityCount}</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-amber/10 text-accent-amber">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Enterprise & Sponsors</span>
            <span className="text-heading-sm font-bold text-ink">{sponsorCount}</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Active Partners</span>
            <span className="text-heading-sm font-bold text-ink">{activeCount}</span>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by organization name, industry, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-ink-muted" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {typeOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
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
      </div>

      {/* ── Organization Cards Grid ─────────────────────────────────── */}
      {filteredOrgs.length === 0 ? (
        <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
          <Building2 className="h-10 w-10 text-ink-muted mx-auto" />
          <Heading as="h3" size="sm" className="text-ink">
            No Organizations Found
          </Heading>
          <Text size="xs" variant="muted">
            Try adjusting your search criteria or add a new institutional organization.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrgs.map((org) => (
            <div
              key={org.id}
              className="p-6 rounded-card bg-surface border border-border shadow-xs space-y-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <Heading as="h3" size="sm" className="text-ink font-bold">
                      {org.name}
                    </Heading>
                    <span className="text-body-xs text-ink-muted block mt-0.5 font-mono">
                      {org.industry || 'Technology Track'}
                    </span>
                  </div>
                  <Badge variant={org.type === 'University' ? 'primary' : org.type === 'Sponsor' ? 'warning' : 'info'}>
                    {org.type}
                  </Badge>
                </div>

                {org.notes && (
                  <p className="text-body-xs text-ink-secondary leading-relaxed line-clamp-2 my-3">{org.notes}</p>
                )}

                <div className="space-y-1.5 text-body-xs text-ink-muted bg-surface-elevated p-3 rounded-lg border border-border/60">
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5 text-primary shrink-0" /> {org.website}
                    </a>
                  )}
                  {org.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-primary shrink-0" /> {org.email}
                    </span>
                  )}
                  {org.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary shrink-0" /> {org.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <Badge variant={org.status === 'Active' || org.status === 'Partner' ? 'success' : 'info'} size="sm">
                  {org.status}
                </Badge>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/crm/organizations/${org.id}/edit`}
                    className="p-1.5 rounded text-ink-muted hover:text-primary transition-colors"
                    title="Edit Organization"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(org.id, org.name)}
                    disabled={deletingId === org.id}
                    className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors disabled:opacity-50"
                    title="Delete Organization"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/crm/organizations/${org.id}`}
                    className="inline-flex items-center gap-1 text-primary font-semibold text-body-xs hover:underline ml-1"
                  >
                    View Details <ArrowRight className="h-3 w-3" />
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
