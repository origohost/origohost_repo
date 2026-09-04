import React, { useState, useEffect } from "react";
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
  MessageSquare,
  Sprout,
  HeartPulse,
  Coins,
  Landmark,
  Lightbulb,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn, Tilt } from "@/components/motion/primitives";
import HeroSection from "@/frontend/pages/hero";
import { EventService, EventItem } from "@/domains/events/event.service";

// 4 PARTICIPATION PILLARS
const PARTICIPATION_PILLARS = [
  {
    title: "LEARN",
    desc: "Gain real-world engineering capability through practitioner workshops and sessions.",
    items: ["Hands-on Workshops", "Interactive Webinars", "Knowledge Sharing Series (KSS)", "Skill Bootcamps"],
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50/80",
    border: "border-blue-200",
  },
  {
    title: "BUILD",
    desc: "Solve challenges and turn breakthrough ideas into production codebases.",
    items: ["48-Hour Hackathons", "Problem Ideathons", "Tech Marathons", "Open Source Labs"],
    icon: Code2,
    color: "text-emerald-600",
    bg: "bg-emerald-50/80",
    border: "border-emerald-200",
  },
  {
    title: "CONNECT",
    desc: "Meet developers, researchers, campus leaders, and industry mentors.",
    items: ["Community Meetups", "Roundtable Sessions", "Conferences & Summits", "Chapter Gatherings"],
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50/80",
    border: "border-purple-200",
  },
  {
    title: "CONTRIBUTE",
    desc: "Give back, guide emerging developers, and lead technical initiatives.",
    items: ["Mentorship Tracks", "Tech Speaking", "Community Volunteering", "Campus Ambassadorship"],
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50/80",
    border: "border-amber-200",
  },
];

// TECHNOLOGY x INDUSTRY INTERSECTIONS
const TECH_INDUSTRY_INTERSECTIONS = [
  {
    tech: "Artificial Intelligence",
    industry: "AgriTech & Farming",
    title: "AI × Agriculture",
    desc: "Precision crop telemetry, drone imagery analysis & automated yield forecasting.",
    icon: Brain,
    industryIcon: Sprout,
    tagColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    tech: "Cloud & Microservices",
    industry: "Healthcare & MedTech",
    title: "Cloud × Healthcare",
    desc: "HIPAA-compliant patient telemetry, electronic records & distributed medical APIs.",
    icon: Cloud,
    industryIcon: HeartPulse,
    tagColor: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    tech: "Cybersecurity",
    industry: "FinTech & Banking",
    title: "Security × Finance",
    desc: "Zero-trust banking architectures, fraud detection & smart contract vulnerability audit.",
    icon: Shield,
    industryIcon: Coins,
    tagColor: "text-purple-600 bg-purple-50 border-purple-200",
  },
  {
    tech: "IoT & Edge Computing",
    industry: "Smart Cities & Mobility",
    title: "IoT × Smart Cities",
    desc: "LoRaWAN sensor networks, traffic flow telemetry & intelligent public grids.",
    icon: Bot,
    industryIcon: Landmark,
    tagColor: "text-amber-600 bg-amber-50 border-amber-200",
  },
];

export default function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    EventService.getEvents({ limit: 3, status: "upcoming" }).then((res) => {
      setFeaturedEvents(res.events);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#0a0a0a] selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION & TRUST METRICS */}
      <HeroSection />

      {/* 2. PARTICIPATION FRAMEWORK (4 PILLARS) */}
      <section id="participate" className="relative bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              EXPLORE THE COMMUNITY
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              One Community. Countless Ways to Participate.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              Whether you're here to learn something new, build applications, share technical knowledge, or connect with industry practitioners, there is a place for you at OrigoHOST.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTICIPATION_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-3xl border ${pillar.border} bg-white p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${pillar.bg} flex items-center justify-center mb-5`}>
                    <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400 block mb-1">
                    PILLAR {pillar.title}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{pillar.desc}</p>

                  <ul className="space-y-2 text-xs font-bold text-slate-800 border-t border-slate-100 pt-4">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC UPCOMING EVENTS */}
      <section id="events" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                UPCOMING EXPERIENCES
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Featured Ecosystem Events
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10 font-bold text-sm"
            >
              <Link to="/events">
                Explore All Events <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.length > 0
              ? featuredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-4">
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full">
                          {ev.format || "Community Event"}
                        </span>
                        <span className="text-slate-400 font-mono">{ev.mode || "Hybrid"}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                        {ev.description || "Join community builders for this technical experience."}
                      </p>
                    </div>
                    <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold">
                      <Link to="/events">View Event <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                ))
              : [
                  { title: "CyberForge 2026 Hackathon", format: "Hackathon", desc: "48-hour intensive buildathon creating secure cloud applications & threat audit bots." },
                  { title: "AI for Agriculture Ideathon", format: "Ideathon", desc: "Turn agricultural challenges into smart AI, drone telemetry & crop yield analysis solutions." },
                  { title: "Knowledge Sharing Series (KSS)", format: "KSS Session", desc: "Expert-led technical deep dive sharing Kubernetes & CI/CD engineering playbooks." },
                ].map((ev) => (
                  <div
                    key={ev.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-4">
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full">
                          {ev.format}
                        </span>
                        <span className="text-emerald-400 font-mono">Upcoming</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-6">
                        {ev.desc}
                      </p>
                    </div>
                    <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold">
                      <Link to="/events">View Event <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY x INDUSTRY DISCOVERY ENGINE */}
      <section id="taxonomy-matrix" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
              DISCOVERY MATRIX ENGINE
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Technology Domain × Real-World Industry
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Technology should not exist in isolation. Discover how AI, Cloud, Cybersecurity, IoT, and DevOps transform real-world fields from AgriTech to FinTech and HealthTech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_INDUSTRY_INTERSECTIONS.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-6 shadow-xs border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block border mb-4 ${item.tagColor}`}>
                    {item.title}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.tech}</h3>
                  <div className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                    <span>In</span> <item.industryIcon className="w-3.5 h-3.5 text-blue-600" /> <span>{item.industry}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                </div>
                <Button asChild variant="outline" className="w-full rounded-full border-slate-300 text-xs font-bold">
                  <Link to="/events">Explore Intersection</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HUMAN COMMUNITY STORYTELLING */}
      <section id="community-people" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200 inline-block mb-4">
                COMMUNITY DRIVEN
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Built by People. Powered by Community.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                OrigoHOST brings together developers, students, researchers, campus ambassadors, and senior engineers to collaborate, share knowledge, and build meaningful technology together.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>15,000+ Active developers & student participants</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>75+ Participating academic & technical institutions</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Certified verified credentials for eligible program completions</span>
                </div>
              </div>
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-6">
                <Link to="/register">Join the Network <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Campus Ambassadors</h4>
                <p className="text-xs text-slate-600">Leading tech chapters & workshops across engineering colleges.</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <GraduationCap className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Speakers & Mentors</h4>
                <p className="text-xs text-slate-600">Senior practitioners leading masterclasses and project code reviews.</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <Trophy className="w-8 h-8 text-amber-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Hackathon Builders</h4>
                <p className="text-xs text-slate-600">Creating open source tools, threat scanners & cloud applications.</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <Award className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Verified Credentials</h4>
                <p className="text-xs text-slate-600">Official certificate verification for event & bootcamp participants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section
        id="final-cta"
        className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 py-24 text-white"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Your Next Build Could Start Here.
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
            Learn something new. Meet someone new. Build something meaningful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 rounded-full bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 shadow-xl transition-all text-base"
            >
              <Link to="/register">
                Join OrigoHOST <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold px-8 text-base"
            >
              <Link to="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
