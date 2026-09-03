import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code2, Users, Share2, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "About OrigoHOST — Technology Community & Event Ecosystem",
      description:
        "OrigoHOST is a technology community and event ecosystem connecting people, ideas, technology, and real-world challenges.",
      path: "/about",
    }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: BookOpen,
    title: "Learn",
    desc: "We believe continuous learning is the foundation of meaningful progress.",
  },
  {
    icon: Code2,
    title: "Build",
    desc: "We value experimentation, practical work, and shipping real solutions.",
  },
  {
    icon: Users,
    title: "Collaborate",
    desc: "Better outcomes come from diverse people working together.",
  },
  { icon: Share2, title: "Share", desc: "Knowledge becomes more valuable when it is shared." },
  {
    icon: Target,
    title: "Impact",
    desc: "Technology should create measurable and meaningful real-world outcomes.",
  },
];

function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            ABOUT ORIGOHOST
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Connecting People, Ideas & Possibilities.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            OrigoHOST is a technology community and event ecosystem connecting people, ideas,
            technology, and real-world challenges.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto border-b border-slate-100">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            OUR STORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-6">How It Started</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
            OrigoHOST began with a simple idea: technology becomes more powerful when people learn,
            compete, and build together.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            What started as a community initiative has grown into an ecosystem connecting students,
            developers, engineers, researchers, founders, educators, and technology enthusiasts
            across India.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              MISSION
            </span>
            <h3 className="text-2xl font-black mt-4 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              To create an open technology ecosystem where people can access knowledge, develop
              practical skills, collaborate with peers, and turn ideas into real-world solutions.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              VISION
            </span>
            <h3 className="text-2xl font-black mt-4 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              A future where access to technology, knowledge, and community opportunity is open to
              everyone shaping the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto border-b border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((val) => (
            <div key={val.title} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <val.icon className="h-6 w-6 text-blue-600 mb-3" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">{val.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Be part of what we're building.</h2>
          <p className="text-slate-300 text-base mb-8">
            Join developers, learners, and innovators across India.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
          >
            <Link to="/register">
              Join the Community <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
