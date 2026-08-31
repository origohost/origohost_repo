import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  Phone,
  Edit,
  Calendar,
  Layers,
  FileText,
  Clock,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import { getOrganizationById } from '@/services/crm/organizations.service';
import { Heading, Text, Badge } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await getOrganizationById(id);
  if (!res.data) return { title: 'Organization Not Found — CRM' };
  return { title: `${res.data.name} — Organization Profile | OrigoHOST CRM` };
}

export default async function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getOrganizationById(id);
  if (!res.data) notFound();
  const org = res.data;

  const formattedCreated = new Date(org.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Navigation */}
      <Link
        href="/crm/organizations"
        className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Organizations
      </Link>

      {/* Main Header Profile Card */}
      <div className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Heading as="h1" size="xl" className="text-ink font-bold">
                {org.name}
              </Heading>
              <Badge variant={org.type === 'University' ? 'primary' : org.type === 'Sponsor' ? 'warning' : 'info'}>
                {org.type}
              </Badge>
              <Badge variant={org.status === 'Active' || org.status === 'Partner' ? 'success' : 'info'}>
                {org.status}
              </Badge>
            </div>
            <Text size="xs" variant="muted" className="mt-1 flex items-center gap-2">
              <span>{org.industry || 'Technology Track'}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Joined {formattedCreated}
              </span>
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/crm/organizations/${org.id}/edit`}
            className="px-4 py-2 rounded-btn bg-primary text-white text-body-xs font-semibold flex items-center gap-1.5 hover:bg-primary-hover transition-colors shadow-xs"
          >
            <Edit className="h-3.5 w-3.5" /> Edit Profile
          </Link>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Globe className="h-4 w-4 text-primary" />
            <Heading as="h3" size="sm" className="text-ink">
              Institutional Contact
            </Heading>
          </div>

          <div className="space-y-3 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Website</span>
              {org.website ? (
                <a
                  href={org.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-medium hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Globe className="h-3.5 w-3.5" /> {org.website}
                </a>
              ) : (
                <span className="text-ink-muted">—</span>
              )}
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Primary Email</span>
              {org.email ? (
                <span className="text-ink font-medium flex items-center gap-1 mt-0.5">
                  <Mail className="h-3.5 w-3.5 text-primary" /> {org.email}
                </span>
              ) : (
                <span className="text-ink-muted">—</span>
              )}
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Contact Phone</span>
              {org.phone ? (
                <span className="text-ink font-medium flex items-center gap-1 mt-0.5">
                  <Phone className="h-3.5 w-3.5 text-primary" /> {org.phone}
                </span>
              ) : (
                <span className="text-ink-muted">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Partnership Overview */}
        <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <Heading as="h3" size="sm" className="text-ink">
              Partnership Scope
            </Heading>
          </div>

          <div className="space-y-3 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Classification</span>
              <span className="text-ink font-medium block mt-0.5">{org.type} Organization</span>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Current Status</span>
              <span className="text-ink font-medium block mt-0.5">{org.status} Partner</span>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Industry Focus</span>
              <span className="text-ink font-medium block mt-0.5">{org.industry || 'Technology & Engineering'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & History Card */}
      <div className="p-6 rounded-card bg-surface border border-border space-y-3 shadow-xs">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <FileText className="h-4 w-4 text-primary" />
          <Heading as="h3" size="sm" className="text-ink">
            Operational & History Notes
          </Heading>
        </div>
        <p className="text-body-sm text-ink-secondary leading-relaxed">
          {org.notes || 'No detailed operational notes recorded yet for this organization.'}
        </p>
      </div>
    </div>
  );
}
