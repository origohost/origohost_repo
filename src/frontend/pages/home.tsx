import React from "react";
import { m as motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Shield,
  Cloud,
  Code2,
  Trophy,
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  ChevronRight,
  FileText,
  Brain,
  Globe,
  CheckCircle,
  Cpu,
  Database,
  Bot,
  Layers,
  Award,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn, Tilt } from "@/components/motion/primitives";
import HeroSection from "@/frontend/pages/hero";

const PartnersMarqueeSection = React.lazy(() =>
  import("@/components/partners-marquee-section").then((mod) => ({
    default: mod.PartnersMarqueeSection,
  })),
);

// 12 EVENT FORMATS
const EVENT_FORMATS = [
  {
    name: "Meetups",
    desc: "Connect with people, exchange ideas, and explore technology together.",
  },
  {
    name: "Seminars",
    desc: "Learn from experts and explore important technology and industry topics.",
  },
  {
    name: "Hackathons",
    desc: "Build solutions, solve challenges, and compete with other builders.",
  },
  { name: "Ideathons", desc: "Turn problems into ideas and ideas into possibilities." },
  {
    name: "Tech Marathons",
    desc: "Extended technology challenges designed for deep collaboration and problem solving.",
  },
  { name: "Webinars", desc: "Learn from experts and practitioners from wherever you are." },
  {
    name: "KSS (Knowledge Sharing)",
    desc: "Knowledge-sharing sessions focused on practical technology discussions.",
  },
  { name: "Workshops", desc: "Hands-on experiences designed around practical learning." },
  { name: "Masterclasses", desc: "Deep-dive sessions led by experienced practitioners." },
  { name: "Conferences", desc: "Bring communities, experts, and organizations together." },
  { name: "Bootcamps", desc: "Intensive skill-building learning cohorts." },
  { name: "Community Sessions", desc: "Interactive discussions, open forums, and peer learning." },
];

// 12 TECH DOMAINS
const TECH_DOMAINS = [
  "Artificial Intelligence",
  "Cloud Computing",
  "Cybersecurity",
  "Networking",
  "DevOps & Platform Eng",
  "Software Engineering",
  "Data Science & DBs",
  "Robotics & IoT",
  "Web3 & Blockchain",
  "AR / VR / XR",
  "Open Source",
  "Emerging Technology",
];

// 12 INDUSTRIES
const REAL_WORLD_INDUSTRIES = [
  "Agriculture & AgriTech",
  "Business & Entrepreneurship",
  "Food Technology",
  "Healthcare & HealthTech",
  "Education & EdTech",
  "Finance & FinTech",
  "Smart Cities & IoT",
  "Environment & Sustainability",
  "Media & Entertainment",
  "Manufacturing & Industry 4.0",
  "Government & Public Tech",
  "Digital World & Ecosystems",
];

// WAYS TO PARTICIPATE
const PARTICIPATION_WAYS = [
  "Attend an event",
  "Join a meetup",
  "Compete in a hackathon",
  "Solve an ideathon challenge",
  "Attend a webinar",
  "Join a KSS session",
  "Participate in a tech marathon",
  "Learn through workshops",
  "Share your knowledge",
  "Build with the community",
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0a0a0a] selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* PARTNERS MARQUEE */}
      <React.Suspense fallback={<div className="h-28 bg-slate-50" />}>
        <PartnersMarqueeSection />
      </React.Suspense>

      {/* 2. EXPLORE THE COMMUNITY */}
      <section id="participate" className="relative bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              EXPLORE THE COMMUNITY
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              One Community. Countless Ways to Participate.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Whether you're here to learn something new, meet people, compete, share knowledge,
              solve problems, or build something meaningful, there is a place for you at OrigoHOST.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PARTICIPATION_WAYS.map((way) => (
              <div
                key={way}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-center transition-all hover:shadow-md hover:border-blue-300"
              >
                <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800">{way}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EVENT FORMATS MATRIX */}
      <section id="event-formats" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                EVENT EXPERIENCES
              </span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Where the Community Comes Together
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10"
            >
              <Link to="/events">
                Explore All Events <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENT_FORMATS.map((ef) => (
              <div
                key={ef.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2">
                  {ef.name}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{ef.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY DOMAINS & REAL-WORLD INDUSTRIES */}
      <section id="matrix" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              TAXONOMY ENGINE
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Technology × Industry × Events
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Technology should not be isolated from real-world problems. Discover events,
              challenges, and learning structured around domain expertise and industry impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tech Domains Box */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900">12 Technology Domains</h3>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-xs font-bold text-blue-600"
                >
                  <Link to="/domains">
                    View Domains <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {TECH_DOMAINS.map((domain) => (
                  <div
                    key={domain}
                    className="rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-800 border border-slate-200/80"
                  >
                    {domain}
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Fields Box */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900">12 Real-World Industries</h3>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-xs font-bold text-emerald-600"
                >
                  <Link to="/industries">
                    View Fields <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {REAL_WORLD_INDUSTRIES.map((ind) => (
                  <div
                    key={ind}
                    className="rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-800 border border-slate-200/80"
                  >
                    {ind}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KNOWLEDGE & OPPORTUNITIES */}
      <section id="knowledge-opps" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Knowledge */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                  KNOWLEDGE HUB
                </span>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Knowledge for Builders.</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Explore ideas, insights, tutorials, research, community stories, and practical
                  knowledge from across the technology ecosystem.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Articles", "Tutorials", "Guides", "Research", "Reports", "Case Studies"].map(
                    (k) => (
                      <span
                        key={k}
                        className="text-xs font-bold bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200"
                      >
                        {k}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <Button
                asChild
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold"
              >
                <Link to="/knowledge">
                  Explore Knowledge <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Opportunities */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-4">
                  OPPORTUNITIES
                </span>
                <h3 className="text-3xl font-black text-slate-900 mb-4">
                  Find Your Next Opportunity.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Discover ways to learn, participate, contribute, compete, and grow with the
                  community across hackathons, mentorship, and speaking.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "Hackathons",
                    "Competitions",
                    "Speaking",
                    "Mentorship",
                    "Volunteering",
                    "Open Source",
                  ].map((o) => (
                    <span
                      key={o}
                      className="text-xs font-bold bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200"
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-slate-300 font-bold"
              >
                <Link to="/opportunities">
                  Browse Opportunities <Trophy className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section
        id="final-cta"
        className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 py-24 text-white"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Your Next Build Could Start Here.
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
            Learn something new. Meet someone new. Build something meaningful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 rounded-full bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 shadow-xl transition-all"
            >
              <Link to="/register">
                Join the Community <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold px-8"
            >
              <Link to="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
