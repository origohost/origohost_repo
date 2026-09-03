import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/mentors")({
  head: () =>
    buildSeo({
      title: "Mentors & Leaders — Learn From the Community",
      description:
        "Connect with community guides, chapter leaders, technical mentors, and volunteers across OrigoHOST.",
      path: "/mentors",
    }),
  component: MentorsPage,
});

const PUBLIC_MENTORS = [
  {
    name: "Aarav Mehta",
    role: "Builder & Security Mentor",
    domain: "Vulnerability Scanning & Pen Testing",
  },
  { name: "Diya Sharma", role: "Noida Chapter Lead", domain: "DevOps & Campus Workshops" },
  {
    name: "Ritik Kumar",
    role: "Community Director",
    domain: "Cloud Architecture & Ecosystem Strategy",
  },
];

function MentorsPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
            COMMUNITY GUIDES
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Learn From the Community.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect with technical mentors, chapter leaders, and experienced practitioners who guide
            builders across India.
          </p>
        </div>
      </section>

      {/* MENTORS GRID */}
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PUBLIC_MENTORS.map((m) => (
            <div
              key={m.name}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 text-center shadow-sm"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                {m.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{m.name}</h3>
              <p className="text-xs font-semibold text-emerald-600 mb-3">{m.role}</p>
              <span className="text-[10px] font-mono bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200 block">
                {m.domain}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
