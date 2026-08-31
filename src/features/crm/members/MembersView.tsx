'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Users,
  Plus,
  Trash2,
  Edit3,
  Filter,
  GraduationCap,
  Award,
  Shield,
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import type { CommunityMember, MemberRole, MemberStatus, ChapterName } from '@/types/crm';
import { deleteMember } from '@/services/crm/members.service';

interface MembersViewProps {
  initialMembers: CommunityMember[];
}

const roleOptions = ['All Roles', 'Student', 'Developer', 'Chapter Lead', 'Speaker', 'Mentor', 'Organizer', 'Contributor'];
const chapterOptions = ['All Chapters', 'DTU Chapter', 'GL Bajaj Chapter', 'OpenSource India Hub', 'Global Developer Network', 'Independent'];
const statusOptions = ['All Statuses', 'Active', 'Pending', 'Alumni', 'Inactive'];

export function MembersView({ initialMembers }: MembersViewProps) {
  const [members, setMembers] = useState<CommunityMember[]>(initialMembers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [chapterFilter, setChapterFilter] = useState('All Chapters');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesRole = roleFilter === 'All Roles' || m.role === roleFilter;
    const matchesChapter = chapterFilter === 'All Chapters' || m.chapter === chapterFilter;
    const matchesStatus = statusFilter === 'All Statuses' || m.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      m.fullName.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.organization && m.organization.toLowerCase().includes(q)) ||
      m.skills.some((s) => s.toLowerCase().includes(q));

    return matchesRole && matchesChapter && matchesStatus && matchesSearch;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove member "${name}" from the community roster?`)) return;
    setDeletingId(id);
    const res = await deleteMember(id);
    if (res.success) {
      setMembers((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert('Failed to delete community member.');
    }
    setDeletingId(null);
  };

  const totalMembers = members.length;
  const activeLeads = members.filter((m) => m.role === 'Chapter Lead' || m.role === 'Organizer').length;
  const mentorsSpeakers = members.filter((m) => m.role === 'Mentor' || m.role === 'Speaker').length;
  const campusChaptersCount = new Set(members.map((m) => m.chapter)).size;

  const getRoleBadgeVariant = (role: MemberRole) => {
    switch (role) {
      case 'Chapter Lead':
      case 'Organizer':
        return 'primary';
      case 'Speaker':
      case 'Mentor':
        return 'warning';
      case 'Developer':
      case 'Contributor':
        return 'info';
      case 'Student':
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
            <span className="text-body-xs font-mono text-ink-muted">{'// COMMUNITY ROSTER'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            Community Members Roster
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Active developer ecosystem members across campus chapters, working groups, and mentorship pools.
          </Text>
        </div>
        <Link
          href="/crm/members/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          Add Community Member
        </Link>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Total Members</span>
            <span className="text-heading-sm font-bold text-ink">{totalMembers} Members</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-amber/10 text-accent-amber">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Leads & Organizers</span>
            <span className="text-heading-sm font-bold text-ink">{activeLeads} Members</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-blue/10 text-accent-blue">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Mentors & Speakers</span>
            <span className="text-heading-sm font-bold text-ink">{mentorsSpeakers} Members</span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-accent-emerald">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-ink-muted block font-medium">Active Chapters</span>
            <span className="text-heading-sm font-bold text-ink">{campusChaptersCount} Hubs</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-surface p-4 rounded-card border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by member name, email, organization, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-ink-muted" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {roleOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {chapterOptions.map((opt) => (
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

      {/* Member Cards Grid */}
      {filteredMembers.length === 0 ? (
        <div className="p-12 text-center bg-surface rounded-card border border-border space-y-3">
          <Users className="h-10 w-10 text-ink-muted mx-auto" />
          <Heading as="h3" size="sm" className="text-ink">
            No Members Found
          </Heading>
          <Text size="xs" variant="muted">
            Try adjusting your search query or filters to find community members.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-card bg-surface border border-border shadow-xs space-y-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <Heading as="h3" size="sm" className="text-ink font-bold">
                      {member.fullName}
                    </Heading>
                    <span className="text-body-xs text-ink-muted block mt-0.5 font-medium">
                      {member.organization || member.chapter}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={getRoleBadgeVariant(member.role)} size="sm">
                      {member.role}
                    </Badge>
                    <Badge variant={member.status === 'Active' ? 'success' : 'info'} size="sm">
                      {member.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5 text-body-xs text-ink-muted bg-surface-elevated p-3 rounded-lg border border-border/60 my-3">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-primary shrink-0" /> {member.email}
                  </span>
                  {member.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary shrink-0" /> {member.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-primary shrink-0" /> {member.chapter}
                  </span>
                </div>

                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div className="flex items-center gap-3">
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-muted hover:text-primary transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-muted hover:text-primary transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/crm/members/${member.id}/edit`}
                    className="p-1.5 rounded text-ink-muted hover:text-primary transition-colors"
                    title="Edit Member"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id, member.fullName)}
                    disabled={deletingId === member.id}
                    className="p-1.5 rounded text-ink-muted hover:text-accent-rose transition-colors disabled:opacity-50"
                    title="Delete Member"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/crm/members/${member.id}`}
                    className="inline-flex items-center gap-1 text-primary font-semibold text-body-xs hover:underline ml-1"
                  >
                    Profile <ArrowRight className="h-3 w-3" />
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
