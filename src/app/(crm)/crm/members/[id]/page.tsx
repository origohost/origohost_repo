import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  Edit,
  Clock,
  Github,
  Linkedin,
  FileText,
  Code2,
  Building,
  Award,
} from 'lucide-react';
import { getMemberById } from '@/services/crm/members.service';
import { Heading, Text, Badge } from '@/components/ui';
import type { MemberRole } from '@/types/crm';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await getMemberById(id);
  if (!res.data) return { title: 'Member Not Found — CRM' };
  return { title: `${res.data.fullName} — Community Member Profile | OrigoHOST CRM` };
}

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getMemberById(id);
  if (!res.data) notFound();
  const member = res.data;

  const formattedJoined = new Date(member.joinedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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
    <div className="space-y-6 max-w-4xl">
      {/* Navigation */}
      <Link
        href="/crm/members"
        className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Members Roster
      </Link>

      {/* Profile Header */}
      <div className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
            <User className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Heading as="h1" size="xl" className="text-ink font-bold">
                {member.fullName}
              </Heading>
              <Badge variant={getRoleBadgeVariant(member.role)} size="sm">
                {member.role}
              </Badge>
              <Badge variant={member.status === 'Active' ? 'success' : 'info'} size="sm">
                {member.status}
              </Badge>
            </div>
            <Text size="xs" variant="muted" className="mt-1 flex items-center gap-2">
              <span>{member.chapter}</span>
              <span>•</span>
              <span>{member.organization || 'Independent Developer'}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Member since {formattedJoined}
              </span>
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/crm/members/${member.id}/edit`}
            className="px-4 py-2 rounded-btn bg-primary text-white text-body-xs font-semibold flex items-center gap-1.5 hover:bg-primary-hover transition-colors shadow-xs"
          >
            <Edit className="h-3.5 w-3.5" /> Edit Profile
          </Link>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Mail className="h-4 w-4 text-primary" />
            <Heading as="h3" size="sm" className="text-ink">
              Contact & Affiliation
            </Heading>
          </div>

          <div className="space-y-3 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Email Address</span>
              <span className="text-ink font-medium flex items-center gap-1 mt-0.5">
                <Mail className="h-3.5 w-3.5 text-primary" /> {member.email}
              </span>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Phone Number</span>
              {member.phone ? (
                <span className="text-ink font-medium flex items-center gap-1 mt-0.5">
                  <Phone className="h-3.5 w-3.5 text-primary" /> {member.phone}
                </span>
              ) : (
                <span className="text-ink-muted">—</span>
              )}
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Campus / Hub Chapter</span>
              <span className="text-ink font-medium flex items-center gap-1 mt-0.5">
                <GraduationCap className="h-3.5 w-3.5 text-primary" /> {member.chapter}
              </span>
            </div>
          </div>
        </div>

        {/* Social & Skills */}
        <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Code2 className="h-4 w-4 text-primary" />
            <Heading as="h3" size="sm" className="text-ink">
              Social Profiles & Stack
            </Heading>
          </div>

          <div className="space-y-3 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Social Links</span>
              <div className="flex items-center gap-3 mt-1">
                {member.githubUrl ? (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-body-xs"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                ) : (
                  <span className="text-ink-muted text-body-xs">No GitHub linked</span>
                )}

                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-body-xs"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                ) : (
                  <span className="text-ink-muted text-body-xs">No LinkedIn linked</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Technical Stack & Skills</span>
              {member.skills && member.skills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-body-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-ink-muted">—</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Contributions Card */}
      <div className="p-6 rounded-card bg-surface border border-border space-y-3 shadow-xs">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <FileText className="h-4 w-4 text-primary" />
          <Heading as="h3" size="sm" className="text-ink">
            Community Notes & Achievements
          </Heading>
        </div>
        <p className="text-body-sm text-ink-secondary leading-relaxed">
          {member.notes || 'No detailed community notes recorded yet for this member.'}
        </p>
      </div>
    </div>
  );
}
