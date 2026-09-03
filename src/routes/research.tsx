import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Cloud, Shield, Cpu, Code2 } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () =>
    buildSeo({
      title: "Research — Researching the Technologies Shaping Tomorrow",
      description:
        "Origo Labs explores emerging technologies, cloud infrastructure, distributed systems, AI, and security.",
      path: "/research",
    }),
  component: ResearchPage,
});

const RESEARCH_FOCUS = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Exploring scalable, reliable, and efficient infrastructure and edge-native runtimes.",
  },
  {
    icon: Cpu,
    title: "Distributed Systems",
    desc: "Understanding how modern systems scale, recover from failures, and operate globally.",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    desc: "Research and experimentation across modern AI systems, model serving, and LLMs.",
  },
  {
    icon: Shield,
    title: "Security",
    desc: "Exploring security challenges, zero-trust architectures, and application defense.",
  },
  {
    icon: Code2,
    title: "Open Source",
    desc: "Turning research and experimentation into useful community tools and open software.",
  },
];

function ResearchPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            ORIGO LABS
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Researching the Technologies Shaping Tomorrow
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Origo Labs explores emerging technologies and the systems behind them.
          </p>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            AREAS OF INQUIRY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">Core Focus Areas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESEARCH_FOCUS.map((rf) => (
            <div
              key={rf.title}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm"
            >
              <rf.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{rf.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{rf.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
