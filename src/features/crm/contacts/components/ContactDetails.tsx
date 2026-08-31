'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Edit, Calendar, Building2, Activity, FileText, CheckSquare, MessageSquare, Plus, ArrowUpRight, Tag, ShieldCheck } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

import type { Contact } from '@/types/crm';

interface ContactDetailsProps {
  contact: Contact;
}

export function ContactDetails({ contact }: ContactDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'events' | 'applications' | 'tasks'>('overview');
  const [notes, setNotes] = useState<string[]>(contact.notes ? [contact.notes] : ['Initial onboarding touchpoint logged.']);
  const [newNote, setNewNote] = useState('');

  const fn = contact.firstName || (contact as any).personalInfo?.firstName || 'Contact';
  const ln = contact.lastName || (contact as any).personalInfo?.lastName || '';
  const em = contact.email || (contact as any).personalInfo?.email || '—';
  const ph = contact.phone || (contact as any).personalInfo?.phone || '—';

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([newNote.trim(), ...notes]);
    setNewNote('');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Contact Profile Header */}
      <div className="p-6 rounded-card bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-xl shrink-0 border border-primary/20">
            {fn[0]}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Heading as="h1" size="xl" className="text-ink font-bold">{fn} {ln}</Heading>
              <Badge variant={contact.status === 'Active' ? 'success' : 'info'} size="sm">
                {contact.status}
              </Badge>
            </div>
            <Text size="xs" variant="muted" className="mt-1 flex items-center gap-2">
              <span>{contact.jobTitle || 'Ecosystem Member'}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {contact.organizationId || 'Independent / Individual'}</span>
              <span>•</span>
              <span>Source: {contact.source || 'Inbound Website'}</span>
            </Text>
            {contact.tags && contact.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {contact.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-surface-elevated text-ink-muted border border-border/80 flex items-center gap-1">
                    <Tag className="h-2.5 w-2.5" /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/crm/contacts/${contact.id}/edit`}>
            <Button size="sm" variant="secondary" className="gap-1.5">
              <Edit className="h-3.5 w-3.5" /> Edit Profile
            </Button>
          </Link>
          <a href={`mailto:${em}`}>
            <Button size="sm" className="gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Send Email
            </Button>
          </a>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border flex items-center gap-6 text-body-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> Overview & Info
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'activities' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <Activity className="h-4 w-4" /> Activity Log
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'events' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <Calendar className="h-4 w-4" /> Events & Registrations
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'applications' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <FileText className="h-4 w-4" /> Applications
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'tasks' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <CheckSquare className="h-4 w-4" /> Tasks & Notes
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-card bg-surface border border-border space-y-4">
            <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Contact Details</Heading>
            <div className="space-y-3 text-body-sm">
              <div>
                <span className="text-body-xs text-ink-muted block">Email Address</span>
                <span className="text-ink font-medium flex items-center gap-1.5 mt-0.5"><Mail className="h-4 w-4 text-primary" /> {em}</span>
              </div>
              <div>
                <span className="text-body-xs text-ink-muted block">Phone Number</span>
                <span className="text-ink font-medium flex items-center gap-1.5 mt-0.5"><Phone className="h-4 w-4 text-primary" /> {ph}</span>
              </div>
              <div>
                <span className="text-body-xs text-ink-muted block">Organization & Title</span>
                <span className="text-ink font-medium flex items-center gap-1.5 mt-0.5"><Building2 className="h-4 w-4 text-primary" /> {contact.organizationId || 'N/A'} ({contact.jobTitle || 'Member'})</span>
              </div>
              <div>
                <span className="text-body-xs text-ink-muted block">Created Date</span>
                <span className="text-ink font-mono text-body-xs">{contact.createdAt || '2026-08-25'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-card bg-surface border border-border space-y-4">
            <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Operational Notes</Heading>
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log a new note or interaction summary for this contact..."
                className="w-full p-2.5 text-body-xs bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:border-primary"
                rows={3}
              />
              <Button type="submit" size="xs" className="gap-1">
                <Plus className="h-3.5 w-3.5" /> Add Note
              </Button>
            </form>
            <div className="space-y-2 pt-2">
              {notes.map((n, idx) => (
                <div key={idx} className="p-3 rounded-btn bg-surface-elevated border border-border/60 text-body-xs text-ink space-y-1">
                  <div className="flex justify-between text-[10px] text-ink-muted font-mono">
                    <span>Operator Log</span>
                    <span>Recent</span>
                  </div>
                  <p>{n}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <Heading as="h3" size="sm" className="text-ink">Activity Timeline</Heading>
            <Link href="/crm/activities" className="text-body-xs font-semibold text-primary hover:underline flex items-center gap-1">
              Global Log <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-btn bg-surface-elevated border border-border/60 flex items-start gap-3">
              <Activity className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-body-sm font-semibold text-ink block">Profile Verified & Updated</span>
                <span className="text-body-xs text-ink-muted">Contact details verified by System Operator.</span>
                <span className="text-[10px] text-ink-muted font-mono block mt-1">2026-08-30 14:22 UTC</span>
              </div>
            </div>
            <div className="p-3 rounded-btn bg-surface-elevated border border-border/60 flex items-start gap-3">
              <Mail className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-body-sm font-semibold text-ink block">Inbound Form Submission Received</span>
                <span className="text-body-xs text-ink-muted">Submitted contact form for OrigoHOST node hosting inquiry.</span>
                <span className="text-[10px] text-ink-muted font-mono block mt-1">2026-08-28 09:15 UTC</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <Heading as="h3" size="sm" className="text-ink">Event Participation & Registrations</Heading>
            <Link href="/crm/registrations" className="text-body-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View All Registrations <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="p-4 rounded-btn bg-surface-elevated border border-border/60 flex items-center justify-between">
            <div>
              <span className="font-semibold text-body-sm text-ink block">OrigoHOST Annual Infrastructure Summit 2026</span>
              <span className="text-body-xs text-ink-muted">Ticket Type: VIP Developer Pass</span>
            </div>
            <Badge variant="success" size="sm">Confirmed</Badge>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <Heading as="h3" size="sm" className="text-ink">Application Pipeline</Heading>
            <Link href="/crm/applications" className="text-body-xs font-semibold text-primary hover:underline flex items-center gap-1">
              Applications <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="p-4 rounded-btn bg-surface-elevated border border-border/60 flex items-center justify-between">
            <div>
              <span className="font-semibold text-body-sm text-ink block">Infrastructure Partner Cohort Application</span>
              <span className="text-body-xs text-ink-muted">Submitted via public website form.</span>
            </div>
            <Badge variant="warning" size="sm">PENDING REVIEW</Badge>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <Heading as="h3" size="sm" className="text-ink">Assigned Tasks</Heading>
            <Link href="/crm/tasks" className="text-body-xs font-semibold text-primary hover:underline flex items-center gap-1">
              Task Board <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="p-3 rounded-btn bg-surface-elevated border border-border/60 flex items-center justify-between">
            <div>
              <span className="font-semibold text-body-sm text-ink block">Schedule Follow-up Discovery Call</span>
              <span className="text-body-xs text-ink-muted">Discuss technical node hosting requirements.</span>
            </div>
            <Badge variant="warning" size="sm">TODO</Badge>
          </div>
        </div>
      )}
    </div>
  );
}

