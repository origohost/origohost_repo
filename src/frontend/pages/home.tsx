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

// REAL LEADERS / SPEAKERS
const COMMUNITY_LEADERS = [
  {
    name: "Ritik Kumar",
    role: "Founder & Community Director",
    org: "OrigoHOST Tech Ecosystem",
    image: "/ritik-kumar.webp",
    focus: "Community Growth & Tech Partnerships",
  },
  {
    name: "Brajesh Kumar",
    role: "Tech Lead & Keynote Speaker",
    org: "OrigoHOST Labs",
    image: "/brajesh-kumar.jpg",
    focus: "Distributed Systems & Cloud Security",
  },
  {
    name: "Tarun Kumar",
    role: "Platform Architect",
    org: "OrigoHOST Core",
    image: "/tarun-kumar.webp",
    focus: "Kubernetes, CI/CD & Platform Eng",
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

      {/* 2. COMMUNITY PHOTO MOSAIC & PARTICIPATION FRAMEWORK */}
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

          {/* 2-COLUMN LAYOUT: PHOTO MOSAIC + 4 PILLARS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Column: 3-Photo Community Mosaic */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-16/10 group">
                <img
                  src="/event-gallery-2.jpg"
                  alt="OrigoHOST Community Event Audience"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square group">
                <img
                  src="/team-group.webp"
                  alt="OrigoHOST Organizers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square group">
                <img
                  src="/event-gallery-4.jpg"
                  alt="OrigoHOST Workshop Session"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Column: 4 Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PARTICIPATION_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className={`rounded-3xl border ${pillar.border} bg-slate-50/50 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-2xl ${pillar.bg} flex items-center justify-center mb-4`}>
                      <pillar.icon className={`w-5 h-5 ${pillar.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block mb-1">
                      PILLAR {pillar.title}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{pillar.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{pillar.desc}</p>

                    <ul className="space-y-1.5 text-xs font-bold text-slate-800 border-t border-slate-200/60 pt-3">
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
        </div>
      </section>

      {/* 3. EVENT EXPERIENCES & FEATURED BANNER */}
      <section id="event-experiences" className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3.5 py-1.5 rounded-full border border-blue-500/30">
                EVENT EXPERIENCES
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Where the Community Comes Together
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10 font-bold text-sm"
            >
              <Link to="/events">
                Explore All Formats <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* FEATURED POSTER BANNER + FORMAT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Featured Poster Banner (5 Columns) */}
            <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative group bg-slate-900">
              <img
                src="/assets/events/kss2026ep02-poster.webp"
                alt="Knowledge Sharing Series Poster"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="p-6 bg-slate-900 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded border border-blue-500/30">
                  FLAGSHIP WEBINAR SERIES
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Knowledge Sharing Series (KSS 2026)</h3>
                <p className="text-xs text-slate-300 mt-1">Live technical deep dives led by cloud and platform practitioners.</p>
              </div>
            </div>

            {/* Format Cards (7 Columns) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Meetups", desc: "Informal networking & community tech talks." },
                { name: "Hackathons", desc: "48-hour buildathons creating open source tools." },
                { name: "Ideathons", desc: "Solving real-world industry challenges." },
                { name: "Tech Marathons", desc: "Multi-day continuous learning & sprint." },
                { name: "Workshops", desc: "Hands-on guided coding & deployment labs." },
                { name: "Masterclasses", desc: "Advanced practitioner sessions for senior engineers." },
              ].map((fmt) => (
                <div
                  key={fmt.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
                >
                  <h4 className="text-base font-bold text-white mb-1 flex items-center justify-between">
                    <span>{fmt.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 opacity-60" />
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{fmt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS WITH POSTERS */}
      <section id="upcoming-events" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
                UPCOMING EVENTS
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Register for Next Events
              </h2>
            </div>
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-sm">
              <Link to="/events">Browse Full Calendar <Calendar className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="aspect-16/10 overflow-hidden relative">
                  <img
                    src="/assets/events/kss2026ep03-poster.webp"
                    alt="KSS Episode 3 Poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md">
                    Upcoming
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    DevOps & Cloud
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">
                    KSS Episode 3 — Kubernetes & IaC Automation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    Learn Terraform, Helm charts, and container telemetry with OrigoHOST architects.
                  </p>
                  <div className="text-xs text-slate-500 font-semibold space-y-1">
                    <div>📅 Date: 21 September 2026</div>
                    <div>📍 Mode: Online Webinar Engine</div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs">
                  <Link to="/events">Register Free <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="aspect-16/10 overflow-hidden relative">
                  <img
                    src="/event-poster.jpg"
                    alt="CyberForge Hackathon Poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-md animate-pulse">
                    Live Now
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Cybersecurity
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">
                    CyberForge 2026 National Hackathon
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    48-hour buildathon creating threat scanners & smart contract security audit bots.
                  </p>
                  <div className="text-xs text-slate-500 font-semibold space-y-1">
                    <div>📅 Date: 14-16 October 2026</div>
                    <div>📍 Mode: Hybrid (Delhi & Online)</div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button asChild className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 font-bold text-xs">
                  <Link to="/events">Join Live Hackathon <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="aspect-16/10 overflow-hidden relative">
                  <img
                    src="/event-gallery-1.jpg"
                    alt="AI for AgriTech Ideathon"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white px-2.5 py-1 rounded-full shadow-md">
                    Upcoming
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                    AI × Agriculture
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">
                    AI for Agriculture Ideathon 2026
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    Turn agricultural challenges into smart AI, drone telemetry & crop yield analysis solutions.
                  </p>
                  <div className="text-xs text-slate-500 font-semibold space-y-1">
                    <div>📅 Date: 5 November 2026</div>
                    <div>📍 Mode: Online Webinar Engine</div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs">
                  <Link to="/events">Register Free <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY x INDUSTRY DISCOVERY ENGINE */}
      <section id="taxonomy-matrix" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
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
                className="rounded-3xl bg-slate-50/50 p-6 shadow-xs border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
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

      {/* 6. PEOPLE & COMMUNITY WITH REAL LEADER PORTRAITS */}
      <section id="community-people" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/20 px-3.5 py-1.5 rounded-full border border-purple-500/30">
              COMMUNITY LEADERSHIP
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Built by People. Powered by Community.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Meet the founders, technical architects, and community organizers behind OrigoHOST.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {COMMUNITY_LEADERS.map((leader) => (
              <div
                key={leader.name}
                className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-400/50 mb-4 group-hover:scale-105 transition-transform duration-500 shadow-xl">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                <span className="text-xs font-bold text-purple-400 mt-0.5">{leader.role}</span>
                <span className="text-[11px] text-slate-400 block mb-3">{leader.org}</span>
                <p className="text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  Focus: {leader.focus}
                </p>
              </div>
            ))}
          </div>

          {/* VERIFIED CERTIFICATION PROOF BANNER */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900 p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
                VERIFIED CREDENTIALS
              </span>
              <h3 className="text-2xl font-bold text-white">Official Certificate Verification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eligible participants earn cryptographically verified credentials backed by OrigoHOST's verification system.
              </p>
            </div>
            <div className="w-full lg:w-72 h-44 rounded-2xl overflow-hidden border border-white/20 shadow-xl shrink-0">
              <img src="/actual-cert.webp" alt="OrigoHOST Certificate Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. KNOWLEDGE HUB EDITORIAL SECTION WITH COVER IMAGE */}
      <section id="knowledge-hub" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                KNOWLEDGE HUB
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Knowledge for Builders
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full border-slate-300 font-bold text-sm">
              <Link to="/knowledge">
                Explore Knowledge <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Featured Article Card (7 Columns) */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="aspect-16/9 overflow-hidden">
                <img
                  src="/event-gallery-3.jpg"
                  alt="Knowledge Article Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  FEATURED RESEARCH
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-3 mb-2 group-hover:text-blue-600 transition-colors">
                  Architecting Resilient Distributed Systems on Kubernetes
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  An in-depth study on container orchestration, automated failovers, and telemetry logging for high-scale tech platforms.
                </p>
                <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs">
                  <Link to="/knowledge">Read Full Article <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>

            {/* Knowledge Categories Grid (5 Columns) */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { title: "Tutorials & Playbooks", desc: "Step-by-step technical guides for cloud, AI, and security." },
                { title: "Origo Labs Research", desc: "Emerging tech papers on distributed systems & cryptography." },
                { title: "Community Stories", desc: "Real-world experiences from chapter leads and builders." },
                { title: "Event Insights", desc: "Video archives and takeaways from Knowledge Sharing Series webinars." },
              ].map((k) => (
                <div key={k.title} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{k.title}</h4>
                  <p className="text-xs text-slate-600">{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
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
