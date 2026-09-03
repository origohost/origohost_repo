import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Trophy, Mic, Users, Code, Award, GraduationCap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/opportunities")({
  head: () =>
    buildSeo({
      title: "Opportunities — Find Your Next Opportunity",
      description:
        "Discover ways to learn, participate, contribute, compete, and grow with the OrigoHOST community.",
      path: "/opportunities",
    }),
  component: OpportunitiesPage,
});

const OPPORTUNITY_TYPES = [
  {
    icon: Trophy,
    title: "Hackathons & Ideathons",
    desc: "Compete in national technology challenges, solve industry problem statements, and win cash prizes & cloud credits.",
  },
  {
    icon: Mic,
    title: "Speaking & Masterclasses",
    desc: "Share your domain expertise, present technical research, and lead webinars for thousands of builders.",
  },
  {
    icon: Users,
    title: "Technical Mentorship",
    desc: "Guide student teams, review project architecture, and mentor emerging software engineers.",
  },
  {
    icon: Code,
    title: "Open Source Contributions",
    desc: "Contribute code, write documentation, and collaborate on production-ready community tools.",
  },
  {
    icon: Award,
    title: "Campus Leadership",
    desc: "Charter an official OrigoHOST chapter at your institution and cultivate local tech talent.",
  },
  {
    icon: GraduationCap,
    title: "Workshops & Training",
    desc: "Participate in hands-on bootcamps and receive verified certificates of accomplishment.",
  },
];

function OpportunitiesPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
            GROWTH & IMPACT
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Find Your Next Opportunity.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover ways to learn, participate, contribute, compete, and grow with the community.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OPPORTUNITY_TYPES.map((opp) => (
            <div
              key={opp.title}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm hover:border-emerald-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <opp.icon className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{opp.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{opp.desc}</p>
              </div>
              <Button
                asChild
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold"
              >
                <Link to="/register">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
