'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Users, Building2, Target, Calendar, CheckSquare, ArrowRight, Loader2 } from 'lucide-react';
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

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
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
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const getIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'contact': return <Users className="h-4 w-4 text-emerald-500" />;
      case 'organization': return <Building2 className="h-4 w-4 text-blue-500" />;
      case 'lead': return <Target className="h-4 w-4 text-amber-500" />;
      case 'event': return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'task': return <CheckSquare className="h-4 w-4 text-teal-500" />;
    }
  };

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-surface border border-border rounded-card shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-border py-3 bg-surface-elevated">
          <Search className="h-5 w-5 text-ink-muted shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contacts, leads, organizations, events, tasks..."
            className="flex-1 ml-3 bg-transparent text-ink text-body-sm focus:outline-none placeholder:text-ink-muted"
          />
          {isPending && <Loader2 className="h-4 w-4 text-primary animate-spin mr-2" />}
          <button
            onClick={onClose}
            className="p-1 rounded-btn hover:bg-surface text-ink-muted hover:text-ink transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-ink-muted text-body-xs">
              Type to search across all operational CRM records...
              <div className="mt-2 font-mono text-[11px] opacity-70">Tip: Press ESC to exit or Cmd+K / Ctrl+K anytime.</div>
            </div>
          ) : results.length === 0 && !isPending ? (
            <div className="p-8 text-center text-ink-muted text-body-xs">
              No CRM records matching <span className="font-semibold text-ink">&quot;{query}&quot;</span>.
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between p-2.5 rounded-btn hover:bg-surface-elevated text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-md bg-surface border border-border shrink-0">
                      {getIcon(item.type)}
                    </div>
                    <div className="truncate">
                      <div className="text-body-sm font-semibold text-ink group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-body-xs text-ink-muted truncate">{item.subtitle}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 bg-surface-elevated/50 flex items-center justify-between text-[11px] text-ink-muted font-mono">
          <span>Search Engine Active</span>
          <Link href="/crm/search" onClick={onClose} className="hover:text-primary transition-colors">
            Advanced Search Page →
          </Link>
        </div>
      </div>
    </div>
  );
}
