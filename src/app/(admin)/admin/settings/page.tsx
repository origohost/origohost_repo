import React from 'react';
import type { Metadata } from 'next';
import { Settings, Shield, Globe, Lock, Save, Database, AlertTriangle } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'System Settings — Admin Control Center | OrigoHOST',
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#E2E8F0] dark:border-border/60 pb-5">
        <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
          Platform System Settings
        </Heading>
        <Text size="md" variant="secondary" className="mt-1">
          Global OrigoHOST platform parameters, CORS security headers, maintenance mode toggle, and storage bounds.
        </Text>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] dark:border-border/60 pb-3">
          <Globe className="h-4 w-4 text-brand-primary" />
          <Heading as="h3" size="sm" className="text-foreground font-bold">
            Public Website & Domain Boundaries
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-foreground mb-1">Production Platform URL</label>
            <input
              type="text"
              readOnly
              value="https://origohost.com"
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-xl text-foreground font-mono"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-foreground mb-1">API & CMS Endpoint</label>
            <input
              type="text"
              readOnly
              value="https://origohost.com/api"
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-xl text-foreground font-mono"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] dark:border-border/60 pb-3">
          <Shield className="h-4 w-4 text-brand-primary" />
          <Heading as="h3" size="sm" className="text-foreground font-bold">
            Platform Maintenance & Emergency Controls
          </Heading>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-body-sm text-foreground font-medium">
              Enable Read-Only Maintenance Mode for Public Intake Forms
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-border text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-body-sm text-foreground font-medium">
              Enforce strict CSRF header verification on API route endpoints
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
