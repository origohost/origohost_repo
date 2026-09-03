import { m as motion } from "framer-motion";
import { FileText, Presentation, Video, NotebookPen, Layers, Download } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/lib/seo";

const RESOURCES = [
  {
    icon: FileText,
    cat: "PDF",
    title: "Platform Engineering Handbook — 2026 edition",
    size: "4.2 MB",
  },
  { icon: Presentation, cat: "Slides", title: "Kubernetes at Scale — Summit deck", size: "12 MB" },
  { icon: NotebookPen, cat: "Notes", title: "SRE Foundations — Bootcamp notes", size: "1.8 MB" },
  { icon: Layers, cat: "Template", title: "Incident Retro Template", size: "220 KB" },
  { icon: Video, cat: "Recording", title: "Edge Compute Deep Dive Webinar", size: "1h 12m" },
  { icon: FileText, cat: "PDF", title: "Multi-cloud Cost Playbook", size: "2.4 MB" },
];

export default function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Resource Library"
      title={
        <>
          Everything from our{" "}
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
            workshops
          </span>
          , in one place
        </>
      }
      description="Slides, notes, templates, and recordings — free for the community."
      breadcrumb={[{ label: "Resources" }]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {RESOURCES.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="flex items-center gap-4 rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-6 shadow-sm hover:shadow-[var(--shadow-soft)]"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--brand-mint)]">
              <r.icon className="h-5 w-5 text-[var(--brand-green)]" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-orange)]">
                {r.cat}
              </span>
              <h3 className="mt-1 text-base font-semibold leading-snug">{r.title}</h3>
              <p className="mt-1 text-xs text-[var(--brand-ink)]/60">{r.size}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label={`Download ${r.title}`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
