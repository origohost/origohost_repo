import { Network, Server, GraduationCap, Users, Calendar, Brain, Code, Globe2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

const ENTITIES = [
  {
    name: "Origo Cloud",
    description: "Enterprise-grade cloud hosting, VPS, and bare-metal infrastructure.",
    icon: Server,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Origo Academy",
    description: "Educational arm providing workshops, courses, and technical training.",
    icon: GraduationCap,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    name: "Origo Community",
    description: "The core developer network connecting engineers across India.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    name: "Origo Events",
    description: "Organizer of massive technical hackathons and developer meetups.",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    name: "Origo AI",
    description: "Research and deployment of generative models and LLM infrastructure.",
    icon: Brain,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    name: "Origo Dev",
    description: "Open-source contributions and internal tooling.",
    icon: Code,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
];

export default function EcosystemPage() {
  return (
    <PageShell title="The Origo Ecosystem">
      <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center space-x-4 mb-6">
            <Network className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">The Origo Ecosystem</h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed">
            OrigoHOST is more than just a platform. We are a deeply interconnected network of
            infrastructure, education, and community initiatives driving the future of Indian
            technology.
          </p>
        </div>
      </section>

      {/* Entity Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 p-8 bg-slate-100 border border-slate-200 rounded-2xl max-w-4xl mx-auto">
            <h2 id="tl-dr" className="text-2xl font-bold text-slate-900 mb-3">
              TL;DR: What is the OrigoHOST Ecosystem?
            </h2>
            <p className="text-lg text-slate-700 font-medium">
              The OrigoHOST Ecosystem is a unified network of technology entities including Origo
              Cloud (Infrastructure), Origo Academy (Education), Origo Community (Network), Origo AI
              (Research), Origo Events (Hackathons), and Origo Dev (Open Source).
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 hide-scrollbar">
            {ENTITIES.map((entity) => {
              const Icon = entity.icon;
              return (
                <div
                  key={entity.name}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow snap-center shrink-0 w-[85vw] md:w-auto flex flex-col"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${entity.bgColor}`}
                  >
                    <Icon className={`w-7 h-7 ${entity.color}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">{entity.name}</h2>
                  <p className="text-slate-600 leading-relaxed">{entity.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Globe2 className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Unified by a Single Mission</h2>
          <p className="text-lg text-slate-600">
            All entities within the Origo Ecosystem share a unified architecture, seamless
            authentication, and a common goal: to empower builders globally.
          </p>
        </div>
      </section>
      </div>
    </PageShell>
  );
}
