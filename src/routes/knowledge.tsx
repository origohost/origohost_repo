import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Code2, Brain, ArrowRight, Video, Sparkles } from "lucide-react";

export const Route = createFileRoute("/knowledge")({
  head: () =>
    buildSeo({
      title: "Knowledge Hub — Knowledge for the Curious and the Curious-to-Build",
      description:
        "Explore ideas, insights, tutorials, research, reports, case studies, and practical knowledge from across the technology ecosystem.",
      path: "/knowledge",
    }),
  component: KnowledgePage,
});

const KNOWLEDGE_CATEGORIES = [
  {
    title: "Articles & Insights",
    type: "Articles",
    count: "12+ Published",
    desc: "Long-form technology articles and ecosystem analysis.",
  },
  {
    title: "Tutorials & Playbooks",
    type: "Tutorials",
    count: "25+ Guides",
    desc: "Step-by-step technical guides for cloud, AI, and DevOps.",
  },
  {
    title: "Research & Origo Labs",
    type: "Research",
    count: "5 Projects",
    desc: "Emerging tech papers on distributed systems & security.",
  },
  {
    title: "Community Stories",
    type: "Stories",
    count: "18 Stories",
    desc: "Real-world experiences from builders, chapter leads, and mentors.",
  },
  {
    title: "Event Insights & KSS",
    type: "Event Recordings",
    count: "40+ Hours",
    desc: "Video archives and takeaways from Knowledge Sharing Series webinars.",
  },
  {
    title: "Technical Reports",
    type: "Reports",
    count: "8 Reports",
    desc: "In-depth benchmarking and developer ecosystem reports.",
  },
];

function KnowledgePage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            KNOWLEDGE BASE
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Knowledge for the Curious and the Curious-to-Build.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore ideas, insights, tutorials, research, stories, and practical knowledge from
            across the technology ecosystem.
          </p>
        </div>
      </section>

      {/* KNOWLEDGE CATEGORIES */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KNOWLEDGE_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm hover:border-blue-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                  {cat.type}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{cat.desc}</p>
                <span className="text-xs font-mono text-slate-500 block mb-6">{cat.count}</span>
              </div>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-300">
                <Link to="/blog">Browse {cat.type}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
