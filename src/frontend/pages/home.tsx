import React from "react";
import { m as motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Server,
  Users,
  Zap,
  Shield,
  Cloud,
  Code2,
  Trophy,
  Calendar,
  Clock,
  BookOpen,
  Download,
  GraduationCap,
  ChevronRight,
  FileText,
  HelpCircle,
  Brain,
  Globe,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Counter, FadeIn, ScaleIn, Tilt, SpotlightCard } from "@/components/motion/primitives";
import HeroSection from "@/frontend/pages/hero";

const PartnersMarqueeSection = React.lazy(() =>
  import("@/components/partners-marquee-section").then((mod) => ({
    default: mod.PartnersMarqueeSection,
  })),
);

// ECOSYSTEM PILLARS
const ECOSYSTEM_PILLARS = [
  {
    title: "Origo Cloud",
    desc: "Infrastructure and cloud technologies for modern builders.",
    icon: Cloud,
    color: "blue",
    link: "/cloud",
  },
  {
    title: "Origo Academy",
    desc: "Learning experiences designed to develop practical technology skills.",
    icon: GraduationCap,
    color: "emerald",
    link: "/academy",
  },
  {
    title: "Origo Community",
    desc: "A network of developers, students, educators, and technology enthusiasts.",
    icon: Users,
    color: "purple",
    link: "/community",
  },
  {
    title: "Origo Events",
    desc: "Hackathons, meetups, workshops, masterclasses, and technology experiences.",
    icon: Calendar,
    color: "amber",
    link: "/community/events",
  },
  {
    title: "Origo AI",
    desc: "Exploration and experimentation across artificial intelligence and emerging technologies.",
    icon: Brain,
    color: "indigo",
    link: "/topics/ai",
  },
  {
    title: "Origo Dev",
    desc: "Open-source projects, engineering initiatives, and developer collaboration.",
    icon: Code2,
    color: "rose",
    link: "/open-source",
  },
];

// PROGRAM CARDS
const PROGRAM_CARDS = [
  {
    title: "Cloud & Infrastructure",
    category: "Infrastructure",
    desc: "Master container orchestration, VPS management, and cloud architecture.",
  },
  {
    title: "DevOps & Platform Engineering",
    category: "Engineering",
    desc: "Automated deployment pipelines, CI/CD, and site reliability engineering.",
  },
  {
    title: "AI & Machine Learning",
    category: "AI",
    desc: "Practical workshops in generative AI, neural networks, and model deployment.",
  },
  {
    title: "Cybersecurity",
    category: "Security",
    desc: "Threat modeling, vulnerability assessment, and defense strategies.",
  },
  {
    title: "Web & Application Development",
    category: "Full-Stack",
    desc: "Modern frontend frameworks, API design, and distributed backends.",
  },
  {
    title: "Open Source",
    category: "Community",
    desc: "Collaborate on real open-source tools and infrastructure projects.",
  },
];

// EVENT SECTIONS
const UPCOMING_EVENTS = [
  {
    title: "Cybersecurity & Ethical Hacking Essentials",
    type: "Webinar",
    date: "7 September 2026",
    desc: "Deep dive into penetration testing, threat modeling, and modern defense strategies.",
    link: "/community/events",
  },
  {
    title: "CyberForge 2026 Hackathon",
    type: "Hackathon",
    date: "21 September 2026",
    desc: "48-hour intensive hackathon building next-generation secure cloud applications.",
    link: "/community/events",
  },
];

// COMMUNITY BENEFITS
const COMMUNITY_BENEFITS = [
  "Learn with peers",
  "Find collaborators",
  "Meet mentors",
  "Participate in events",
  "Build projects",
  "Share knowledge",
  "Discover opportunities",
];

// RESEARCH AREAS
const RESEARCH_FOCUS = [
  {
    title: "Cloud Infrastructure",
    desc: "Exploring scalable, reliable, and efficient infrastructure.",
  },
  { title: "Distributed Systems", desc: "Understanding how modern systems scale and operate." },
  {
    title: "Artificial Intelligence",
    desc: "Research and experimentation across modern AI systems.",
  },
  {
    title: "Security",
    desc: "Exploring security challenges across infrastructure and applications.",
  },
];

// BLOG ARTICLES
const BLOG_ARTICLES = [
  {
    title: "Launching KSS2026: Knowledge Sharing Series for Builders",
    category: "Community",
    date: "2026-08-20",
    desc: "Episode-based webinar series connecting developers directly with technical experts and practitioners.",
    link: "/blog",
  },
  {
    title: "CyberForge 2026 Hackathon: Concluded with Success at GL Bajaj",
    category: "Events",
    date: "2026-06-15",
    desc: "Highlights and winning projects from our national buildathon empowering 500+ builders.",
    link: "/blog",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0a0a0a] selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* TRUST / PARTNERS MARQUEE */}
      <React.Suspense fallback={<div className="h-28 bg-slate-50" />}>
        <PartnersMarqueeSection />
      </React.Suspense>

      {/* 2. WHAT IS ORIGOHOST? */}
      <section id="about-intro" className="relative bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              ABOUT ORIGOHOST
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              More Than a Community.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              OrigoHOST is a technology ecosystem built around people who want to learn, build,
              experiment, and grow together.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              From technical workshops and community meetups to hackathons, research, open-source
              initiatives, and industry collaborations, we create spaces where knowledge turns into
              action.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
              >
                <Link to="/about">
                  Discover OrigoHOST <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ECOSYSTEM */}
      <section id="ecosystem" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              ECOSYSTEM
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              One Ecosystem. Many Ways to Build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ECOSYSTEM_PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <Link to={p.link} className="block h-full">
                  <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-blue-500/50 transition-all hover:-translate-y-1">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/20 text-blue-400 mb-6">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">{p.desc}</p>
                    <span className="text-xs font-bold text-blue-400 inline-flex items-center gap-1">
                      Learn More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10 px-8"
            >
              <Link to="/ecosystem">Explore the Ecosystem</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS */}
      <section id="programs" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              PRACTICAL LEARNING
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Learn by Building.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Practical programs designed to help learners and builders move from concepts to
              real-world experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {PROGRAM_CARDS.map((prog, i) => (
              <ScaleIn key={prog.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-4">
                      {prog.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{prog.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{prog.desc}</p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-slate-300"
                  >
                    <Link to="/programs">
                      View Program Details <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScaleIn>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
            >
              <Link to="/programs">
                Explore All Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS */}
      <section id="events" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                COMMUNITY EVENTS
              </span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Where the Community Comes Together.
              </h2>
              <p className="mt-3 text-slate-600 max-w-xl">
                Join workshops, meetups, hackathons, masterclasses, and community experiences
                designed around learning and building together.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-slate-300">
              <Link to="/community/events">
                View All Events <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UPCOMING_EVENTS.map((ev) => (
              <div
                key={ev.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {ev.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{ev.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{ev.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{ev.desc}</p>
                </div>
                <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                  <Link to={ev.link}>
                    Event Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY */}
      <section id="community" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              COMMUNITY
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Find Your People.
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Connect with developers, students, mentors, educators, founders, and technology
              enthusiasts who are learning and building alongside you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {COMMUNITY_BENEFITS.map((ben) => (
              <div
                key={ben}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <CheckCircle className="h-6 w-6 text-blue-400 mx-auto mb-3" />
                <span className="text-sm font-bold text-white">{ben}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
            >
              <Link to="/register">
                Join OrigoHOST <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. RESEARCH & RESOURCES */}
      <section id="research" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Research Column */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                  RESEARCH (ORIGO LABS)
                </span>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Explore What's Next.</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Origo Labs explores emerging technologies across cloud computing, distributed
                  systems, artificial intelligence, security, and modern infrastructure.
                </p>
                <div className="space-y-3 mb-8">
                  {RESEARCH_FOCUS.map((r) => (
                    <div key={r.title} className="text-xs border-l-2 border-blue-600 pl-3">
                      <strong className="text-slate-900 block">{r.title}</strong>
                      <span className="text-slate-500">{r.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-300">
                <Link to="/research">
                  Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Resources Column */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-4">
                  KNOWLEDGE FOR BUILDERS
                </span>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Curated Resources.</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Discover guides, technical resources, research, toolkits, learning materials, and
                  community knowledge engineered for practical application.
                </p>
                <ul className="space-y-3 text-xs text-slate-700 font-semibold mb-8">
                  <li className="flex items-center gap-2">✓ Git & GitHub Version Control Guide</li>
                  <li className="flex items-center gap-2">
                    ✓ Deploying to VPS & Bare-Metal Basics
                  </li>
                  <li className="flex items-center gap-2">✓ Cloud Infrastructure Playbooks</li>
                  <li className="flex items-center gap-2">✓ AI & Machine Learning Starter Kits</li>
                </ul>
              </div>
              <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/resources">
                  Browse Resources <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BLOG & INSIGHTS */}
      <section id="blog" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                BLOG & INSIGHTS
              </span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Ideas, Insights & Community Stories.
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full border-slate-300">
              <Link to="/blog">
                Read the Blog <FileText className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_ARTICLES.map((art) => (
              <div
                key={art.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {art.category}
                    </span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{art.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{art.desc}</p>
                </div>
                <Button asChild variant="outline" className="w-full rounded-full border-slate-300">
                  <Link to={art.link}>
                    Read Post <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PARTNERS */}
      <section id="partners" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            PARTNERSHIPS
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl max-w-3xl mx-auto">
            Built With the Ecosystem.
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We collaborate with organizations, institutions, communities, and technology partners to
            create meaningful learning and technology experiences.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
            >
              <Link to="/partners">
                Become a Partner <Globe className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
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
              <Link to="/community/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
