import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, ExternalLink, Github, Terminal, Layers } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () =>
    buildSeo({
      title: "Projects — Projects That Turn Ideas Into Reality",
      description:
        "Explore projects, experiments, and initiatives created across the OrigoHOST ecosystem.",
      path: "/projects",
    }),
  component: ProjectsPage,
});

const PROJECT_LIST = [
  {
    name: "Origo Cloud CLI & Sandbox",
    cat: "Developer Tools",
    desc: "Command-line tool and sandbox manager for instant container deployment and cloud workspace setup.",
    tech: ["TypeScript", "Node.js", "Docker API"],
    status: "Active",
  },
  {
    name: "CyberForge Vulnerability Scanner",
    cat: "Security",
    desc: "Real-time security scanner built during CyberForge 2026 for automated threat detection.",
    tech: ["Python", "Go", "Docker"],
    status: "Completed",
  },
  {
    name: "KSS Knowledge Portal",
    cat: "Community",
    desc: "Open-source archive and video indexing platform for Knowledge Sharing Series episodes.",
    tech: ["React", "Supabase", "Tailwind CSS"],
    status: "Active",
  },
  {
    name: "Origo AI Assistant",
    cat: "AI",
    desc: "Generative AI helper for automated code reviews and technical workshop Q&A.",
    tech: ["Python", "PyTorch", "LLM APIs"],
    status: "In Development",
  },
];

function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            ORIGOHOST PROJECTS
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Projects That Turn Ideas Into Reality
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore projects, experiments, and initiatives created across the OrigoHOST ecosystem.
          </p>
        </div>
      </section>

      {/* PROJECT CARDS */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECT_LIST.map((proj) => (
            <div
              key={proj.name}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {proj.cat}
                  </span>
                  <span className="text-xs font-mono text-emerald-600 font-semibold">
                    {proj.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{proj.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-300">
                <Link to="/open-source">
                  Explore Project <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
