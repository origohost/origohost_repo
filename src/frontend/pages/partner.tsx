import { Link, useRouter } from "@tanstack/react-router";
import { m as motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Cpu,
  Users,
  Rocket,
  Award,
  Tv,
  BookOpen,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

const PARTNER_CATEGORIES = [
  {
    icon: Cpu,
    title: "Technology Partners",
    desc: "Platforms, cloud providers, AI frameworks, and tool creators.",
  },
  {
    icon: GraduationCap,
    title: "Education Partners",
    desc: "Universities, colleges, institutes, and learning organizations.",
  },
  {
    icon: Building2,
    title: "Industry Partners",
    desc: "Enterprise companies and tech teams transforming real-world fields.",
  },
  {
    icon: Users,
    title: "Community Partners",
    desc: "Developer communities, user groups, and tech clubs.",
  },
  {
    icon: Rocket,
    title: "Startup Partners",
    desc: "Emerging companies building disruptive technology.",
  },
  {
    icon: Award,
    title: "Institutional Partners",
    desc: "Government bodies, public initiatives, and non-profits.",
  },
  { icon: Tv, title: "Media Partners", desc: "Tech publications, podcasts, and media channels." },
  {
    icon: BookOpen,
    title: "Knowledge Partners",
    desc: "Research labs, educators, and content creators.",
  },
];

export function PartnersErrorPage() {
  const router = useRouter();
  return (
    <PageShell
      eyebrow="Partnerships"
      title="Partners are temporarily unavailable"
      description="We couldn't load the partner directory just now."
      breadcrumb={[{ label: "Partners" }]}
    >
      <div className="mx-auto max-w-2xl rounded-3xl border border-blue-200 bg-blue-50 p-8 text-center">
        <h2 className="text-2xl font-black">Something went wrong</h2>
        <Button
          onClick={() => router.invalidate()}
          className="mt-6 rounded-full bg-blue-600 text-white"
        >
          Try again
        </Button>
      </div>
    </PageShell>
  );
}

export function PartnersNotFoundPage() {
  return (
    <PageShell
      eyebrow="Partnerships"
      title="Partners not found"
      description="Directory unavailable."
      breadcrumb={[{ label: "Partners" }]}
    >
      <div className="text-center text-sm text-slate-600">
        <Link to="/" className="underline">
          Return home
        </Link>
      </div>
    </PageShell>
  );
}

export default function PartnersPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            COLLABORATION & ALLIANCES
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Build the Ecosystem With Us.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Collaborate with OrigoHOST across technology, education, industry, research, and
            community initiatives.
          </p>
        </div>
      </section>

      {/* PARTNER CATEGORIES */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNER_CATEGORIES.map((pc) => (
            <div
              key={pc.title}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <pc.icon className="h-7 w-7 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{pc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div className="mt-16 rounded-3xl bg-slate-900 p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black">Ready to partner with OrigoHOST?</h2>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              Tell us about your program, audience, and goals. We'll design an outcome-focused
              collaboration tuned to your teams.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
          >
            <Link to="/contact">
              Start a Partnership <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
