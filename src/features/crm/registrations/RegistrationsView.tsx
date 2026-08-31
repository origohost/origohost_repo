'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Filter,
  UserCheck,
  Ticket,
  Mail,
  Building,
  QrCode,
  AlertCircle,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { CrmRegistrationItem, RegistrationStatus } from '@/types/crm';
import { toggleRegistrationCheckIn, deleteCrmRegistration } from '@/services/crm/registrations.service';

interface RegistrationsViewProps {
  initialRegistrations: CrmRegistrationItem[];
}

const statusOptions = ['All Statuses', 'Confirmed', 'Attended', 'Waitlisted', 'Cancelled', 'No-show'];

export function RegistrationsView({ initialRegistrations }: RegistrationsViewProps) {
  const [registrations, setRegistrations] = useState<CrmRegistrationItem[]>(initialRegistrations);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const filteredRegistrations = registrations.filter((r) => {
    const matchesStatus = statusFilter === 'All Statuses' || r.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      r.participantName.toLowerCase().includes(q) ||
      r.participantEmail.toLowerCase().includes(q) ||
      r.eventTitle.toLowerCase().includes(q) ||
      (r.organizationName && r.organizationName.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const handleToggleCheckIn = async (id: string) => {
    setTogglingId(id);
    const res = await toggleRegistrationCheckIn(id);
    if (res.success && res.data) {
      setRegistrations((prev) =>
        prev.map((item) => (item.id === id ? (res.data as CrmRegistrationItem) : item))
      );
    }
    setTogglingId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove registration record for "${name}"?`)) return;
    const res = await deleteCrmRegistration(id);
    if (res.success) {
      setRegistrations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const totalRegs = registrations.length;
  const checkedInCount = registrations.filter((r) => r.checkedIn).length;
  const confirmedCount = registrations.filter((r) => r.status === 'Confirmed' || r.status === 'Attended').length;

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'Attended':
      case 'Confirmed':
        return 'success';
      case 'Waitlisted':
        return 'warning';
      case 'Cancelled':
      case 'No-show':
        return 'error';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// EVENT ATTENDANCE & CHECK-INS'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Event Registrations & Live Check-ins
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Real-time participant rosters, ticket tier validation, and event attendance check-ins.
          </Text>
        </div>
        <Link
          href="/crm/registrations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          Add Registration Record
        </Link>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Ticket className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Registrations</span>
            <span className="text-heading-sm font-bold text-ink">{totalRegs} Participants</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Checked-in Attendees</span>
            <span className="text-heading-sm font-bold text-ink">{checkedInCount} Checked In</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-blue/10 text-accent-blue">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Confirmed Passes</span>
            <span className="text-heading-sm font-bold text-ink">{confirmedCount} Passes</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by participant name, email, event title, or university..."
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

      {/* Roster Table */}
      <div className="rounded-card bg-surface border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-elevated border-b border-border text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
                <th className="py-3.5 px-4">Participant</th>
                <th className="py-3.5 px-4">Event Title</th>
                <th className="py-3.5 px-4">Ticket Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Live Check-in</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-body-sm">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-ink-muted">
                    No event registration records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-ink block">{reg.participantName}</span>
                      <span className="text-body-xs text-ink-muted flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3" /> {reg.participantEmail}
                      </span>
                      {reg.organizationName && (
                        <span className="text-body-xs text-ink-muted flex items-center gap-1 mt-0.5">
                          <Building className="h-3 w-3" /> {reg.organizationName}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink max-w-xs truncate">
                      {reg.eventTitle}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-mono text-body-xs font-semibold">
                        {reg.ticketCategory}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getStatusBadge(reg.status)} size="sm">
                        {reg.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleCheckIn(reg.id)}
                        disabled={togglingId === reg.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-btn text-body-xs font-semibold transition-colors border ${
                          reg.checkedIn
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400'
                            : 'bg-surface-elevated text-ink-muted border-border hover:border-primary/50'
                        }`}
                      >
                        <QrCode className="h-3.5 w-3.5" />
                        {reg.checkedIn ? 'Checked In' : 'Check In'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(reg.id, reg.participantName)}
                        className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors"
                        title="Delete Record"
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
    </div>
  );
}
