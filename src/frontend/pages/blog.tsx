import { createFileRoute, Link } from "@tanstack/react-router";
import { m as motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { buildSeo } from "@/lib/seo";

export const POSTS = [
  {
    cat: "Platform",
    title: "Designing an Internal Developer Platform that engineers actually use",
    author: "Team OrigoHOST",
    read: "8 min",
    tone: "from-[var(--brand-orange)]/30 to-[var(--brand-orange-glow)]/10",
    slug: "designing-internal-developer-platform",
  },
  {
    cat: "SRE",
    title: "SLOs without the drama: a practical starter guide",
    author: "Team OrigoHOST",
    read: "6 min",
    tone: "from-[var(--brand-green)]/30 to-[var(--brand-orange-glow)]/10",
    slug: "slos-without-drama",
  },
  {
    cat: "Cloud",
    title: "Multi-cloud in 2026: pragmatic patterns that survive contact with reality",
    author: "Team OrigoHOST",
    read: "10 min",
    tone: "from-indigo-500/30 to-blue-500/10",
    slug: "multi-cloud-in-2026",
  },
  {
    cat: "Edge",
    title: "Edge-native architectures: when latency actually matters",
    author: "Team OrigoHOST",
    read: "7 min",
    tone: "from-purple-500/30 to-pink-500/10",
    slug: "edge-native-architectures",
  },
  {
    cat: "Career",
    title: "Breaking into platform engineering from a college campus",
    author: "Team OrigoHOST",
    read: "5 min",
    tone: "from-yellow-500/30 to-[var(--brand-green)]/10",
    slug: "breaking-into-platform-engineering",
  },
  {
    cat: "Reliability",
    title: "Reading a great incident retro (and writing one)",
    author: "Team OrigoHOST",
    read: "9 min",
    tone: "from-rose-500/30 to-pink-500/10",
    slug: "reading-a-great-incident-retro",
  },
];

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Blog"
      title={
        <>
          Field notes from{" "}
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
            operators
          </span>
        </>
      }
      description="Playbooks, retros, and essays from engineers shipping in production."
      breadcrumb={[{ label: "Blog" }]}
    >
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 hide-scrollbar">
        {POSTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group overflow-hidden rounded-3xl border border-[var(--brand-ink)]/5 bg-white shadow-[var(--shadow-soft)] snap-center shrink-0 w-[85vw] md:w-auto flex flex-col"
          >
            <div className={`aspect-[16/9] bg-gradient-to-br ${p.tone}`} />
            <div className="p-6">
              <span className="inline-block rounded-full bg-[var(--brand-mint)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-green)]">
                {p.cat}
              </span>
              <h3 className="mt-3 text-lg font-bold leading-snug group-hover:text-[var(--brand-orange)]">
                <Link to="/blog/$slug" params={{ slug: p.slug }}>
                  {p.title}
                </Link>
              </h3>
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--brand-ink)]/60">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {p.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {p.read}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
