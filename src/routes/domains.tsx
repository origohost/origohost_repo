import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Cloud,
  Shield,
  Cpu,
  Code2,
  Database,
  Bot,
  Layers,
  Globe,
  Radio,
  Sparkles,
  Terminal,
} from "lucide-react";

export const Route = createFileRoute("/domains")({
  head: () =>
    buildSeo({
      title: "Technology Domains — Explore Technology Across Every Field",
      description:
        "Technology is bigger than a single field. Explore AI, Cloud, Cybersecurity, DevOps, Robotics, Web3, Data, and Emerging Tech across OrigoHOST.",
      path: "/domains",
    }),
  component: DomainsPage,
});

const DOMAINS_LIST = [
  {
    icon: Brain,
    name: "Artificial Intelligence",
    desc: "AI, generative AI, machine learning, deep learning, intelligent systems, AI agents, and emerging AI technologies.",
  },
  {
    icon: Cloud,
    name: "Cloud Computing",
    desc: "Cloud infrastructure, cloud platforms, architecture, distributed systems, serverless technologies, and cloud-native computing.",
  },
  {
    icon: Shield,
    name: "Cybersecurity",
    desc: "Security, ethical hacking, application security, network security, threat intelligence, privacy, and cyber defense.",
  },
  {
    icon: Radio,
    name: "Networking",
    desc: "Computer networks, wireless technologies, network infrastructure, protocols, connectivity, and next-generation networking.",
  },
  {
    icon: Cpu,
    name: "DevOps & Platform Engineering",
    desc: "Automation, CI/CD, containers, Kubernetes, infrastructure as code, observability, and modern platform engineering.",
  },
  {
    icon: Code2,
    name: "Software Engineering",
    desc: "Web development, application development, backend systems, APIs, architecture, testing, and engineering practices.",
  },
  {
    icon: Database,
    name: "Data",
    desc: "Data engineering, analytics, databases, visualization, data science, and intelligent data systems.",
  },
  {
    icon: Bot,
    name: "Robotics & IoT",
    desc: "Connected devices, robotics, automation, embedded systems, sensors, and intelligent machines.",
  },
  {
    icon: Layers,
    name: "Web3 & Blockchain",
    desc: "Blockchain, decentralized systems, digital assets, smart contracts, and Web3 technologies.",
  },
  {
    icon: Globe,
    name: "AR / VR / XR",
    desc: "Immersive experiences, extended reality, spatial computing, virtual environments, and digital interaction.",
  },
  {
    icon: Terminal,
    name: "Open Source",
    desc: "Open-source technologies, projects, communities, contribution, and collaborative development.",
  },
  {
    icon: Sparkles,
    name: "Emerging Technology",
    desc: "Explore technologies that are redefining how we build, work, communicate, and live.",
  },
];

function DomainsPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            TECHNOLOGY DOMAINS
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Explore Technology. Across Every Domain.
          </h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Technology is bigger than a single field. Explore the ideas, tools, challenges, and
            communities shaping the digital world.
          </p>
        </div>
      </section>

      {/* DOMAINS GRID */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOMAINS_LIST.map((domain) => (
            <div
              key={domain.name}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <domain.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{domain.name}</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">{domain.desc}</p>
              </div>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-300">
                <Link to="/events">Explore Domain Events</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
