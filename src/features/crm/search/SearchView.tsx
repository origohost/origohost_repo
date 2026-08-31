'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Search, Loader2, Users, Building2, Target, Calendar, CheckSquare, ArrowRight } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';

import { getContacts } from '@/services/crm/contacts.service';
import { getOrganizations } from '@/services/crm/organizations.service';
import { getLeads } from '@/services/crm/leads.service';
import { getEvents } from '@/services/crm/events.service';
import { getTasks } from '@/services/crm/tasks.service';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'contact' | 'organization' | 'lead' | 'event' | 'task';
  href: string;
}

export function SearchView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    startTransition(async () => {
      const q = query.toLowerCase().trim();
      const [cRes, oRes, lRes, eRes, tRes] = await Promise.all([
        getContacts(q),
        getOrganizations(q),
        getLeads(q),
        getEvents(q),
        getTasks(q),
      ]);

      const items: SearchResultItem[] = [];

      (cRes.data || []).forEach((c: any) => {
        items.push({
          id: `c-${c.id}`,
          title: `${c.firstName} ${c.lastName}`,
          subtitle: `${c.email || ''} • ${c.role || 'Contact'}`,
          type: 'contact',
          href: `/crm/contacts/${c.id}`,
        });
      });

      (oRes.data || []).forEach((o: any) => {
        items.push({
          id: `o-${o.id}`,
          title: o.name,
          subtitle: `${o.industry || 'Organization'} • ${o.city || ''}`,
          type: 'organization',
          href: `/crm/organizations/${o.id}`,
        });
      });

      (lRes.data || []).forEach((l: any) => {
        items.push({
          id: `l-${l.id}`,
          title: `${l.firstName || ''} ${l.lastName || ''}`.trim() || l.title || 'Lead',
          subtitle: `Lead (${l.status}) • ${l.company || l.email || ''}`,
          type: 'lead',
          href: `/crm/leads/${l.id}`,
        });
      });

      (eRes.data || []).forEach((e: any) => {
        items.push({
          id: `e-${e.id}`,
          title: e.title,
          subtitle: `Event (${e.status}) • ${e.startDate || ''}`,
          type: 'event',
          href: `/crm/events/${e.id}`,
        });
      });

      (tRes.data || []).forEach((t: any) => {
        items.push({
          id: `t-${t.id}`,
          title: t.title,
          subtitle: `Task (${t.status}) • Priority: ${t.priority}`,
          type: 'task',
          href: `/crm/tasks/${t.id}`,
        });
      });


      setResults(items);
    });
  };

  const getIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'contact': return <Users className="h-4 w-4 text-emerald-500" />;
      case 'organization': return <Building2 className="h-4 w-4 text-blue-500" />;
      case 'lead': return <Target className="h-4 w-4 text-amber-500" />;
      case 'event': return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'task': return <CheckSquare className="h-4 w-4 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Global Navigation</Badge>
          <span className="text-body-xs font-mono text-ink-muted">{'// CROSS-ENTITY SEARCH'}</span>
        </div>
        <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
          Global CRM Search Engine
        </Heading>
        <Text size="sm" variant="secondary" className="mt-1">
          Perform fast indexing searches across contacts, organizations, leads, events, and tasks.
        </Text>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type query to search across all CRM domains..."
            className="w-full pl-10 pr-4 py-2.5 text-body-sm bg-surface border border-border rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary"
          />
        </div>
        <Button type="submit" disabled={isPending} className="gap-2 shrink-0">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Search
        </Button>
      </form>

      {results.length > 0 && (
        <div className="space-y-2">
          <span className="text-body-xs font-mono text-ink-muted block">Found {results.length} result{results.length > 1 ? 's' : ''}</span>
          <div className="divide-y divide-border/60 bg-surface border border-border rounded-card">
            {results.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="p-4 flex items-center justify-between hover:bg-surface-elevated transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-surface-elevated border border-border">
                    {getIcon(r.type)}
                  </div>
                  <div>
                    <span className="font-bold text-body-sm text-ink group-hover:text-primary transition-colors block">{r.title}</span>
                    <span className="text-body-xs text-ink-muted">{r.subtitle}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
