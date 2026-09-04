import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import {
  Sprout,
  Building,
  Utensils,
  HeartPulse,
  GraduationCap,
  Coins,
  Landmark,
  Leaf,
  Tv,
  Factory,
  ShieldCheck,
  Globe,
} from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () =>
    buildSeo({
      title: "Industries & Real-World Fields — Technology Meets the Real World",
      description:
        "Explore how technology is transforming AgriTech, FinTech, HealthTech, EdTech, Smart Cities, Sustainability, and Industry 4.0 across OrigoHOST.",
      path: "/industries",
    }),
  component: IndustriesPage,
});

const INDUSTRIES_LIST = [
  {
    icon: Sprout,
    name: "Agriculture & AgriTech",
    desc: "AI, IoT, automation, drones, smart farming, data, and digital agriculture.",
  },
  {
    icon: Building,
    name: "Business & Entrepreneurship",
    desc: "Technology-driven businesses, startups, innovation, digital transformation, and entrepreneurship.",
  },
  {
    icon: Utensils,
    name: "Food Technology",
    desc: "Food innovation, automation, supply chains, smart food systems, sustainability, and emerging food technologies.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare & HealthTech",
    desc: "Digital health, AI, healthcare systems, medical technology, data, and connected healthcare.",
  },
  {
    icon: GraduationCap,
    name: "Education & EdTech",
    desc: "Technology-enabled learning, digital education, learning platforms, AI in education, and future skills.",
  },
  {
    icon: Coins,
    name: "Finance & FinTech",
    desc: "Digital finance, financial technology, payments, blockchain, security, and financial innovation.",
  },
  {
    icon: Landmark,
    name: "Smart Cities",
    desc: "Connected infrastructure, mobility, energy, public systems, IoT, and urban technology.",
  },
  {
    icon: Leaf,
    name: "Environment & Sustainability",
    desc: "Climate technology, sustainability, renewable energy, environmental monitoring, and green innovation.",
  },
  {
    icon: Tv,
    name: "Media & Entertainment",
    desc: "Digital media, content technology, immersive experiences, AI, gaming, and creative technology.",
  },
  {
    icon: Factory,
    name: "Manufacturing & Industry 4.0",
    desc: "Automation, robotics, industrial IoT, AI, digital twins, and intelligent manufacturing.",
  },
  {
    icon: ShieldCheck,
    name: "Government & Public Technology",
    desc: "Digital public infrastructure, civic technology, public services, and technology for social impact.",
  },
  {
    icon: Globe,
    name: "Digital World",
    desc: "Digital transformation, online ecosystems, digital identity, digital experiences, and emerging internet technologies.",
  },
];

function IndustriesPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
            REAL-WORLD IMPACT
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Technology Meets the Real World.
          </h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Explore how technology is transforming industries, businesses, communities, and everyday
            life.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES_LIST.map((ind) => (
            <div
              key={ind.name}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <ind.icon className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{ind.name}</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">{ind.desc}</p>
              </div>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-300">
                <Link to="/events">Explore Field Events</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
