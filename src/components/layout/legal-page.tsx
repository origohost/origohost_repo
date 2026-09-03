import { PageShell } from "@/components/layout/page-shell";
import { sanitizeHtml } from "@/lib/sanitize";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  content: string;
}

export function LegalPage({ title, lastUpdated, content }: LegalPageProps) {
  return (
    <PageShell title={title} description={`OrigoHOST ${title}`}>
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
        <p className="text-[var(--brand-ink)]/60 mb-10 border-b border-[var(--brand-ink)]/5 pb-10 font-medium">
          Last Updated: {lastUpdated}
        </p>
        <div
          className="prose prose-slate max-w-none prose-headings:text-[var(--brand-ink)] prose-h1:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-2xl prose-p:text-[var(--brand-ink)]/70 prose-p:leading-relaxed prose-a:text-[var(--brand-orange)] hover:prose-a:text-[var(--brand-orange-glow)] prose-li:text-[var(--brand-ink)]/70"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      </div>
    </PageShell>
  );
}
