'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Plus,
  Trash2,
  Filter,
  CheckCircle2,
  Users,
  Tag,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { Program } from '@/types';
import { deleteProgram } from '@/services/crm/programs.service';

interface ProgramsViewProps {
  initialPrograms: Program[];
}

const statusOptions = ['All Statuses', 'Active', 'Upcoming', 'Completed'];

export function ProgramsView({ initialPrograms }: ProgramsViewProps) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredPrograms = programs.filter((p) => {
    const matchesStatus = statusFilter === 'All Statuses' || p.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(q) ||
      p.purpose.toLowerCase().includes(q) ||
      p.focusAreas.some((f) => f.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete program "${name}"?`)) return;
    setDeletingId(id);
    const res = await deleteProgram(id);
    if (res.success) {
      setPrograms((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert('Failed to delete program.');
    }
    setDeletingId(null);
  };

  const totalPrograms = programs.length;
  const activeCount = programs.filter((p) => p.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">CRM Module</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// PROGRAM COHORTS & EDUCATION'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Program Cohorts & Educational Initiatives
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Track knowledge sharing series, AI foundation cohorts, and curriculum progress across developer tracks.
          </Text>
        </div>
        <Link
          href="/crm/programs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          Create Program
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Educational Tracks</span>
            <span className="text-heading-sm font-bold text-ink">{totalPrograms} Tracks</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Active Cohorts</span>
            <span className="text-heading-sm font-bold text-ink">{activeCount} Active Tracks</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search programs by name, purpose, or focus areas..."
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

      {/* Programs List */}
      {filteredPrograms.length === 0 ? (
        <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
          <BookOpen className="h-10 w-10 text-ink-muted mx-auto" />
          <Heading as="h3" size="sm" className="text-ink">
            No Program Cohorts Found
          </Heading>
          <Text size="xs" variant="muted">
            Try adjusting your search query or filters.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="p-6 rounded-card bg-surface border border-border shadow-xs space-y-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Heading as="h3" size="md" className="text-ink font-bold">
                      {prog.name}
                    </Heading>
                    <Badge variant={prog.status === 'Active' ? 'success' : 'info'} size="sm">
                      {prog.status}
                    </Badge>
                  </div>
                  <Text size="xs" variant="muted" className="mt-1">
                    Audience: {prog.audience.join(', ')}
                  </Text>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(prog.id, prog.name)}
                    disabled={deletingId === prog.id}
                    className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors disabled:opacity-50"
                    title="Delete Program"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/programs/${prog.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-primary font-semibold text-body-xs hover:underline ml-1"
                  >
                    Public Track Page <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <p className="text-body-sm text-ink-secondary leading-relaxed">
                {prog.description || prog.purpose}
              </p>

              {prog.focusAreas && prog.focusAreas.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {prog.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-body-xs font-semibold"
                    >
                      {area}
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
