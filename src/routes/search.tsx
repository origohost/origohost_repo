import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search as SearchIcon,
  Calendar,
  BookOpen,
  Code,
  Briefcase,
  Users,
  ArrowRight,
  Filter,
  Layers,
  Globe,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

export const Route = createFileRoute("/search")({
  head: () =>
    buildSeo({
      title: "Ecosystem Search — OrigoHOST Discovery Engine",
      description:
        "Search events, technology domains, industries, knowledge articles, research papers, programs, open source projects, and opportunities across OrigoHOST.",
      path: "/search",
    }),
  component: SearchPage,
});

const ALL_RESULTS = [
  {
    id: "res-1",
    type: "event",
    category: "Events",
    title: "National AI & Generative Systems Hackathon 2026",
    desc: "48-hour competitive engineering hackathon building generative AI applications for smart cities and healthcare.",
    link: "/community/events/ai-hackathon-2026",
    tags: ["AI", "Hackathon", "Healthcare"],
    date: "Sep 24-26, 2026",
  },
  {
    id: "res-2",
    type: "event",
    category: "Events",
    title: "Cloud Native & Kubernetes KSS Workshop",
    desc: "Deep-dive Knowledge Sharing Session on microservices, eBPF telemetry, and multi-region cloud resilience.",
    link: "/events",
    tags: ["Cloud", "DevOps", "KSS"],
    date: "Oct 12, 2026",
  },
  {
    id: "res-3",
    type: "knowledge",
    category: "Knowledge",
    title: "Building Zero-Trust Mesh Networks for Distributed Cloud Infra",
    desc: "Architectural blueprint for implementing Mutual TLS and WireGuard tunnels across hybrid multi-cloud environments.",
    link: "/knowledge",
    tags: ["Cybersecurity", "Networking", "Architecture"],
    date: "5 min read",
  },
  {
    id: "res-4",
    type: "knowledge",
    category: "Knowledge",
    title: "Origo Labs: Next-Gen Quantum-Resistant Cryptography Report",
    desc: "Research whitepaper analyzing lattice-based post-quantum encryption algorithms for financial data safety.",
    link: "/research",
    tags: ["Research", "Security", "Emerging Tech"],
    date: "12 min read",
  },
  {
    id: "res-5",
    type: "project",
    category: "Projects",
    title: "OrigoMesh — Open Source Edge Telemetry Framework",
    desc: "High-throughput Rust framework for low-latency IoT sensor collection and real-world industrial monitoring.",
    link: "/projects",
    tags: ["Open Source", "IoT", "Rust"],
    date: "v1.4.0 Released",
  },
  {
    id: "res-6",
    type: "opportunity",
    category: "Opportunities",
    title: "Call for Speakers: National Cyber Defense Summit 2026",
    desc: "Submit your CFP for keynote talks, panel discussions, and technical demonstrations on threat intelligence.",
    link: "/opportunities",
    tags: ["CFP", "Speaking", "Cybersecurity"],
    date: "Deadline: Oct 1, 2026",
  },
  {
    id: "res-7",
    type: "speaker",
    category: "People",
    title: "Dr. Ananya Sharma — Lead AI Fellow at Origo Labs",
    desc: "Specialist in transformer models, distributed ML training, and ethical AI deployment in enterprise systems.",
    link: "/speakers",
    tags: ["AI", "Speaker", "Research"],
    date: "14 Talk Sessions",
  },
  {
    id: "res-8",
    type: "program",
    category: "Programs",
    title: "Full-Stack Distributed Systems Bootcamp 2026",
    desc: "12-week intensive learning cohort covering Go, gRPC, distributed consensus, and cloud-native databases.",
    link: "/programs",
    tags: ["Bootcamp", "Software Eng", "Go"],
    date: "Starts Nov 2026",
  },
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "event" | "knowledge" | "project" | "opportunity" | "speaker">("all");

  const filteredResults = useMemo(() => {
    return ALL_RESULTS.filter((item) => {
      const matchesTab = activeTab === "all" || item.type === activeTab;
      const matchesQuery =
        !query.trim() ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesTab && matchesQuery;
    });
  }, [query, activeTab]);

  return (
    <PageShell>
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-slate-900 py-16 lg:py-24 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 via-slate-900 to-slate-950"
        />
        <div className="container relative mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
            <Sparkles className="h-4 w-4" />
            <span>Discovery Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Search OrigoHOST Ecosystem
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Find events, technical articles, research whitepapers, open-source projects, community mentors, and active opportunities.
          </p>

          {/* Search Input Bar */}
          <div className="relative max-w-3xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="search"
              placeholder="Search AI, Cloud, Cybersecurity, Hackathons, Whitepapers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:bg-white/15 focus:ring-2 focus:ring-blue-500 text-base"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Results Section */}
      <section className="py-12 lg:py-16 bg-slate-950 min-h-[60vh] text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Tabs Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
            {[
              { id: "all", label: "All Results", icon: Layers },
              { id: "event", label: "Events", icon: Calendar },
              { id: "knowledge", label: "Knowledge", icon: BookOpen },
              { id: "project", label: "Projects", icon: Code },
              { id: "opportunity", label: "Opportunities", icon: Briefcase },
              { id: "speaker", label: "People", icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Result Count Meta */}
          <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredResults.length}</strong> result
              {filteredResults.length === 1 ? "" : "s"}
              {query && (
                <span>
                  {" "}
                  for "<span className="text-blue-400">{query}</span>"
                </span>
              )}
            </span>
          </div>

          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-blue-500/50 hover:bg-slate-900 transition-all shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="rounded-md bg-blue-500/20 text-blue-300 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-3xl border border-dashed border-white/15 bg-slate-900/30 p-8">
              <SearchIcon className="h-12 w-12 text-slate-500 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No matching ecosystem records found</h3>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                Try refining your search terms or selecting a different content category.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setActiveTab("all");
                }}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
