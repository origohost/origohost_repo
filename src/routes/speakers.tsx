import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Mic, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/speakers")({
  head: () =>
    buildSeo({
      title: "Speakers & Experts — Learn From People Who Build, Research, and Lead",
      description:
        "Meet technology speakers, practitioners, and leaders presenting across OrigoHOST seminars, webinars, and masterclasses.",
      path: "/speakers",
    }),
  component: SpeakersPage,
});

const PUBLIC_SPEAKERS = [
  {
    name: "Ritik Kumar",
    role: "Community Director & Founder",
    org: "OrigoHOST Tech Community",
    domain: "Cloud, AI & Platform Eng",
  },
  {
    name: "Tarun Kumar",
    role: "Lead Event Host & Developer Advocate",
    org: "OrigoHOST Community",
    domain: "DevOps & Open Source",
  },
  {
    name: "Kushagra Petwal",
    role: "Chairperson",
    org: "The Robotics Club, GBPUAT",
    domain: "Embedded Systems & Robotics",
  },
];

function SpeakersPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            EXPERT NETWORK
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Learn From People Who Build, Research, and Lead.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Meet practitioners, engineers, researchers, and community leaders sharing verified
            knowledge at OrigoHOST events.
          </p>
        </div>
      </section>

      {/* SPEAKERS GRID */}
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PUBLIC_SPEAKERS.map((sp) => (
            <div
              key={sp.name}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 text-center shadow-sm"
            >
              <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                {sp.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{sp.name}</h3>
              <p className="text-xs font-semibold text-blue-600 mb-2">{sp.role}</p>
              <p className="text-xs text-slate-500 mb-4">{sp.org}</p>
              <span className="text-[10px] font-mono bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200 block">
                {sp.domain}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
