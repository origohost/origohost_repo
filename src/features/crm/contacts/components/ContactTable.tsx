'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowRight, Eye, Edit, Trash2 } from 'lucide-react';
import { StatusBadge } from '@/features/crm/components';
import type { Contact } from '@/types/crm';

interface ContactTableProps {
  contacts: Contact[];
  onDelete?: (id: string) => void;
}

export function ContactTable({ contacts, onDelete }: ContactTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-elevated border-b border-border text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
            <th className="py-3 px-4">Name & Email</th>
            <th className="py-3 px-4">Job Title</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Source</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 text-body-sm">
          {contacts.map((contact) => {
            const fn = contact.firstName || (contact as any).personalInfo?.firstName || 'Contact';
            const ln = contact.lastName || (contact as any).personalInfo?.lastName || '';
            const em = contact.email || (contact as any).personalInfo?.email || '—';

            return (
              <tr key={contact.id} className="hover:bg-surface-elevated/40 transition-colors">
                <td className="py-3.5 px-4">
                  <Link href={`/crm/contacts/${contact.id}`} className="font-bold text-ink hover:text-primary transition-colors block">
                    {fn} {ln}
                  </Link>
                  <span className="text-body-xs text-ink-muted flex items-center gap-1 mt-0.5">
                    <Mail className="h-3 w-3 shrink-0" /> {em}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-medium text-ink">
                  {contact.jobTitle || 'Member'}
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={contact.status} />
                </td>
                <td className="py-3.5 px-4 text-body-xs text-ink-muted">
                  {contact.source || 'Direct Intake'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/crm/contacts/${contact.id}`} className="p-1.5 rounded text-ink-muted hover:text-primary hover:bg-surface-elevated">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link href={`/crm/contacts/${contact.id}/edit`} className="p-1.5 rounded text-ink-muted hover:text-primary hover:bg-surface-elevated">
                      <Edit className="h-4 w-4" />
                    </Link>
                    {onDelete && (
                      <button onClick={() => onDelete(contact.id)} className="p-1.5 rounded text-ink-muted hover:text-rose-500 hover:bg-rose-500/10">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
