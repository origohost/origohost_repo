import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ExternalLink, RefreshCw, CheckCircle, Database } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'CMS & Content Pages — Admin Control Center | OrigoHOST',
};

const mockCmsPages = [
  { id: 'page-01', title: 'Homepage', slug: '/', status: 'Published', collection: 'Pages', lastModified: '2026-08-30' },
  { id: 'page-02', title: 'About OrigoHOST', slug: '/about', status: 'Published', collection: 'Pages', lastModified: '2026-08-28' },
  { id: 'page-03', title: 'Knowledge Sharing Series 2026', slug: '/programs/kss2026', status: 'Published', collection: 'Programs', lastModified: '2026-08-25' },
  { id: 'page-04', title: 'Generative AI Workshop 2026', slug: '/events/ai-workshop-2026', status: 'Published', collection: 'Events', lastModified: '2026-08-20' },
];

export default function AdminCmsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-border/60 pb-5">
        <div>
          <Heading as="h1" size="xl" className="font-display font-bold text-foreground">
            CMS & Content Operations
          </Heading>
          <Text size="md" variant="secondary" className="mt-1">
            Manage Payload CMS content collections, public page publishing, and media asset storage.
          </Text>
        </div>
        <Link
          href="/admin"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-body-sm shadow-xs hover:bg-brand-primary-hover transition-colors"
        >
          <ExternalLink className="h-4 w-4" /> Open Payload CMS Panel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-brand-primary/10 text-brand-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-foreground-muted block font-medium">Published Pages</span>
            <span className="text-heading-sm font-bold text-foreground">18 Pages</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-foreground-muted block font-medium">CMS Connection</span>
            <span className="text-heading-sm font-bold text-foreground">Active (Local/DB)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <span className="text-body-xs text-foreground-muted block font-medium">Media Assets</span>
            <span className="text-heading-sm font-bold text-foreground">42 Assets</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#0B1628] border-b border-[#E2E8F0] dark:border-border/60 text-[11px] font-mono font-bold text-foreground-muted uppercase tracking-wider">
                <th className="py-3.5 px-4">Page Title</th>
                <th className="py-3.5 px-4">Route Path</th>
                <th className="py-3.5 px-4">Collection</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-border/60 text-body-sm">
              {mockCmsPages.map((page) => (
                <tr key={page.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0B1628]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{page.title}</td>
                  <td className="py-3.5 px-4 font-mono text-body-xs text-foreground-muted">{page.slug}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="secondary" size="sm">
                      {page.collection}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-body-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="h-3 w-3" /> {page.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={page.slug}
                      target="_blank"
                      className="px-3 py-1 rounded-lg text-body-xs font-semibold bg-surface-elevated text-foreground hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      View Live Page
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
