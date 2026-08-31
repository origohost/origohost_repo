'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, ArrowLeft, ShieldAlert, X, AlertCircle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { LogoMark } from '@/components/shared/LogoMark';
import { GlobalSearchModal } from './GlobalSearchModal';
import type { CRMSession } from '@/types/crm/auth.types';
import { getCrmNotifications, type CrmNotificationAlert } from '@/services/crm/notifications.service';

interface CrmHeaderProps {
  session: CRMSession;
}

export function CrmHeader({ session }: CrmHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<CrmNotificationAlert[]>([]);

  useEffect(() => {
    getCrmNotifications().then((res) => {
      if (res.data) setNotifications(res.data);
    });
  }, []);

  return (
    <>
      <header className="bg-surface border-b border-border sticky top-0 z-40 px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="OrigoHOST Home">
            <LogoMark variant="full" className="h-7" />
          </Link>
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span>CRM Command Center</span>
            <span className="opacity-60">v1.0</span>
          </div>
        </div>

        {/* Center Global Search Trigger */}
        <div className="hidden md:flex items-center relative max-w-sm w-full mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between pl-3 pr-2 py-1.5 text-body-xs bg-surface-elevated border border-border/80 rounded-btn text-ink-muted hover:text-ink hover:border-primary/50 transition-colors text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-ink-muted group-hover:text-primary transition-colors" />
              <span>Search CRM (Contacts, Orgs, Events)...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-surface border border-border rounded text-ink-muted shadow-2xs">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right User & Actions */}
        <div className="flex items-center gap-3">
          {session.isPlaceholderAuth && (
            <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded">
              <ShieldAlert className="h-3 w-3" /> Dev Auth
            </span>
          )}

          {/* Notification Trigger & Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Notifications"
              className="p-1.5 rounded-btn text-ink-muted hover:text-ink hover:bg-surface-elevated transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface border border-border rounded-card shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-border bg-surface-elevated flex items-center justify-between">
                  <span className="font-bold text-body-xs text-ink flex items-center gap-1.5">
                    <Bell className="h-3.5 w-3.5 text-primary" /> Operational Notifications ({notifications.length})
                  </span>
                  <button onClick={() => setIsNotifOpen(false)} className="p-1 rounded text-ink-muted hover:text-ink">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-border/60">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-ink-muted text-body-xs">No pending operational alerts.</div>
                  ) : (
                    notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.href}
                        onClick={() => setIsNotifOpen(false)}
                        className="p-3 block hover:bg-surface-elevated transition-colors text-left group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-body-xs text-ink group-hover:text-primary transition-colors block">{n.title}</span>
                          <span className="text-[10px] font-mono text-ink-muted shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-ink-muted mt-0.5 line-clamp-2">{n.message}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-border/60" />

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-xs">
              {session.user.name[0]}
            </div>
            <div className="hidden lg:block text-left">
              <span className="block text-body-xs font-semibold text-ink leading-tight">{session.user.name}</span>
              <span className="block text-[10px] font-mono text-ink-muted">{session.user.roles[0]}</span>
            </div>
          </div>

          <Link
            href="/"
            className="ml-2 text-body-xs font-semibold text-ink-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Web
          </Link>
        </div>
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}


