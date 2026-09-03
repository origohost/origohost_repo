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
  CheckCircle2,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Counter,
  FadeIn,
  ScaleIn,
  Tilt,
  SpotlightCard,
  Stagger,
} from "@/components/motion/primitives";
import HeroSection from "@/frontend/pages/hero";

const PartnersMarqueeSection = React.lazy(() =>
  import("@/components/partners-marquee-section").then((mod) => ({
    default: mod.PartnersMarqueeSection,
  })),
);

// --- DATA DEFINITIONS FOR FRONTEND CONTENT ---

// Section 2: Why OrigoHOST
const WHY_ORIGOHOST = [
  {
    icon: Cloud,
    title: "Cloud Compute Infrastructure",
    body: "Access real compute sandboxes, database instances, and automated deployment pipelines engineered for practical learning.",
  },
  {
    icon: Users,
    title: "Peer Developer Network",
    body: "Connect with thousands of student developers, open-source contributors, and co-builders across university campuses.",
  },
  {
    icon: Zap,
    title: "Industry-Aligned Cohorts",
    body: "Master full-stack architecture, cloud systems, and AI fundamentals through structured, expert-guided programs.",
  },
  {
    icon: Trophy,
    title: "Career & Venture Launchpad",
    body: "Transform hackathon prototypes into production software and gain direct visibility with top technology hiring partners.",
  },
];

// Section 3: Audience Sections
const AUDIENCES = [
  {
    label: "// FOR DEVELOPERS",
    title: "Students & Engineers",
    body: "Gain hands-on software engineering experience, access cloud development environments, and collaborate with peers on real-world projects.",
    cta: "Explore Developer Hub",
    link: "/community",
  },
  {
    label: "// FOR COMMUNITY LEADERS",
    title: "Campus Leads & Mentors",
    body: "Establish an official OrigoHOST chapter at your institution, host practical technical workshops, and empower emerging tech talent.",
    cta: "Join Community Network",
    link: "/community/ambassadors",
  },
  {
    label: "// FOR INSTITUTIONS",
    title: "Partners & Enterprise Sponsors",
    body: "Engage high-caliber student developers, support flagship hackathons, and collaborate on technical education initiatives.",
    cta: "Partner With Us",
    link: "/become-a-sponsor",
  },
];

// Section 4: Ecosystem Reach
const REACH_METRICS = [
  {
    value: 3000,
    suffix: "+",
    label: "Active Community Members",
    desc: "Students, software engineers, and technology builders across India",
  },
  {
    value: 20,
    suffix: "+",
    label: "Workshops & Hackathons",
    desc: "Hands-on learning sessions, webinars, and build competitions",
  },
  {
    value: 10,
    suffix: "+",
    label: "University Chapters",
    desc: "Chartered student communities empowering local developer ecosystems",
  },
  {
    value: 2,
    suffix: "",
    label: "Flagship Initiatives",
    desc: "Knowledge Sharing Series (KSS) & AI Foundation Program",
  },
];

// Section 5: Learning & Growth Pathways
const PATHWAYS = [
  {
    step: "01",
    title: "Aspiring Software Engineers",
    desc: "Build practical expertise in cloud computing and software design while building a standout portfolio of real-world applications.",
  },
  {
    step: "02",
    title: "Campus Chapter Leaders & Volunteers",
    desc: "Lead tech initiatives at your university with dedicated resources, workshop toolkits, and ongoing support from the OrigoHOST team.",
  },
  {
    step: "03",
    title: "Industry Partners & Sponsors",
    desc: "Connect with talented student engineers, sponsor CyberForge hackathons, and contribute to industry-aligned learning programs.",
  },
];

// Section 6: Featured Initiatives
const FEATURED_PROGRAMS = [
  {
    title: "Knowledge Sharing Series 2026 — KSS2026",
    status: "Active",
    type: "Episode-based webinar series — multiple episodes per year",
    desc: "A structured, episode-based webinar series where technology practitioners share verified knowledge, practical insights and real-world experience with the OrigoHOST community.",
    topics: ["Cybersecurity", "Cloud Computing", "DevOps", "Artificial Intelligence", "+1"],
    cta: "Explore Program",
    link: "/community/events",
  },
  {
    title: "OrigoHOST AI Foundation Program",
    status: "Upcoming",
    type: "Foundational AI Cohort",
    desc: "An introductory program exploring artificial intelligence, machine learning and generative AI — designed to make AI accessible to builders at all levels.",
    topics: ["Artificial Intelligence", "Machine Learning", "Generative AI"],
    cta: "Explore Program",
    link: "/community/events",
  },
];

// Section 7: Upcoming Events & Workshops
const UPCOMING_SESSIONS = [
  {
    title: "Cybersecurity & Ethical Hacking Essentials",
    type: "Webinar",
    status: "Registration Open",
    audience: "Open Community",
    date: "7 September 2026",
    desc: "Deep dive into penetration testing, threat modeling, and modern defense strategies.",
    format: "Online Webinar",
    link: "/community/events",
  },
  {
    title: "CyberForge 2026 Hackathon",
    type: "Hackathon",
    status: "Registration Open",
    audience: "Open Community",
    date: "21 September 2026",
    desc: "48-hour intensive hackathon building next-generation secure cloud applications.",
    format: "Tech Hub Center & Virtual",
    link: "/community/events",
  },
];

// Section 8: Opportunities
const OPPORTUNITIES = [
  {
    title: "Campus Chapter Leadership",
    category: "Chapters",
    desc: "Establish an official student chapter at your university, receive mentorship and event support, and cultivate a thriving developer community on campus.",
    cta: "Apply for Chapter Leadership",
    link: "/community/ambassadors",
  },
  {
    title: "Community Volunteering",
    category: "Volunteering",
    desc: "Help organize interactive masterclasses, assist with hackathon operations, and contribute to open-source developer tools.",
    cta: "Join as Volunteer",
    link: "/joincommunity",
  },
  {
    title: "Technical Mentorship",
    category: "Mentorship",
    desc: "Share your professional insights, review student projects, and guide aspiring software engineers toward industry success.",
    cta: "Become a Mentor",
    link: "/contact",
  },
];

// Section 9: Community Knowledge
const ARTICLES = [
  {
    category: "News",
    date: "2026-08-20",
    title: "Launching KSS2026: Knowledge Sharing webinar Series for Builders",
    desc: "We are officially launching the Knowledge Sharing Series (KSS2026) webinar, designed to connect developers directly with technical experts and practitioners.",
    author: "Ritik Kumar",
    role: "Community Director",
    topics: ["CLOUD", "AI/ML", "OPEN SOURCE", "DEVOPS", "CYBERSECURITY", "TUTORIALS"],
    link: "/blog",
  },
  {
    category: "Events",
    date: "2026-06-15",
    title: "CyberForge 2026 Hackathon: Concluded with Success at GL Bajaj",
    desc: "Highlights and winning projects from our 48-hour buildathon empowering 500+ builders to build scalable cloud solutions.",
    author: "OrigoHOST Team",
    role: "Editorial",
    topics: ["HACKATHON", "COMMUNITY", "CLOUD"],
    link: "/blog",
  },
];

// Section 10: Learning Resources
const RESOURCES = [
  {
    title: "Git & GitHub Version Control Guide",
    type: "Guide",
    access: "Internal",
    desc: "A practical, step-by-step documentation guide covering git flow, pull requests, commit guidelines and repository management for community projects.",
    topics: ["Open Source", "DevOps"],
    format: "PDF Document",
    cta: "Download Guide",
    link: "/resources",
  },
  {
    title: "Deploying to VPS & Bare-Metal Basics",
    type: "Documentation",
    access: "Internal",
    desc: "Practical guides from OrigoHOST Cloud on provisioning virtual private servers, configuring firewalls, setting reverse proxies and managing secure SSH access.",
    topics: ["Cloud Computing", "Infrastructure & Hosting"],
    format: "PDF Document",
    cta: "Download Guide",
    link: "/resources",
  },
];

// Section 11: Collaborators
const COLLABORATORS = [
  {
    category: "Technology Partners",
    items: [
      { name: "Supabase", detail: "Database" },
      { name: "Vercel", detail: "Host Platforms" },
      { name: "GitHub Campus Program", detail: "Developer Tools" },
    ],
  },
  {
    category: "Academic Institutions",
    items: [
      { name: "Leading Technology Institutes", detail: "Academic Network" },
      { name: "Delhi Technological University", detail: "Campus Partner" },
      { name: "NIET Chapter Alliance", detail: "Student Hub" },
    ],
  },
  {
    category: "Industry Sponsors",
    items: [
      { name: "CyberForge Industry Sponsors", detail: "Hackathon Partners" },
      { name: "OrigoHOST Cloud Compute Hubs", detail: "Infrastructure" },
      { name: "National Hackathon Panels", detail: "Jury Alliance" },
    ],
  },
];

// Section 12: Developer Journey
const JOURNEY_STAGES = [
  {
    step: "Stage 01",
    title: "Learn",
    desc: "Master practical systems engineering and modern software development standards.",
  },
  {
    step: "Stage 02",
    title: "Explore",
    desc: "Discover emerging technologies through interactive, expert-led technical sessions.",
  },
  {
    step: "Stage 03",
    title: "Connect",
    desc: "Engage with motivated developer peers, industry mentors, and project collaborators.",
  },
  {
    step: "Stage 04",
    title: "Collaborate",
    desc: "Work alongside peer developers to contribute to active open-source initiatives.",
  },
  {
    step: "Stage 05",
    title: "Build",
    desc: "Develop and deploy functional software applications using modern cloud environments.",
  },
  {
    step: "Stage 06",
    title: "Solve",
    desc: "Participate in CyberForge hackathons to address real-world engineering challenges.",
  },
  {
    step: "Stage 07",
    title: "Lead",
    desc: "Establish and guide an official OrigoHOST Student Chapter at your university.",
  },
  {
    step: "Stage 08",
    title: "Innovate",
    desc: "Transform validated software prototypes into impactful, scalable projects.",
  },
  {
    step: "Stage 09",
    title: "Guide",
    desc: "Share your knowledge as a technical mentor or speaker for upcoming cohorts.",
  },
];

// Section 13: Community Testimonials
const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    role: "Builder",
    quote:
      "Participating in CyberForge 2026 was my turning point. I went from reading articles about ethical hacking to collaborating on a team of four to build a real-time vulnerability scanner.",
  },
  {
    name: "Diya Sharma",
    role: "Chapter Lead · Noida Chapter",
    quote:
      "Directing our campus chapter under the OrigoHOST master brand allowed us to host local workshops on DevOps practices. Watching peers deploy their first Linux VPS was incredibly fulfilling.",
  },
];

// Section 14: FAQ
const FAQS = [
  {
    q: "What is OrigoHOST and who can join?",
    a: "OrigoHOST is an enterprise-grade developer ecosystem and infrastructure platform in India. It is open to engineering students, software developers, campus community leaders, and industry professionals eager to learn, build, and deploy production-ready systems.",
  },
  {
    q: "How do campus chapters work and how can I charter one at my college?",
    a: "Campus chapters are student-led developer hubs operating under an official OrigoHOST charter. Chapter leads receive complete event toolkits, workshop curricula, cloud resources, and guidance from the OrigoHOST team to run technical activities on campus.",
  },
  {
    q: "Are OrigoHOST learning programs and masterclasses free for students?",
    a: "Yes, our flagship educational cohorts (such as the Knowledge Sharing Series) and open webinars are completely free for verified community members and university students.",
  },
  {
    q: "What is CyberForge and how do hackathons work on OrigoHOST?",
    a: "CyberForge is our national hackathon and buildathon series. Developers team up to solve real-world problem statements provided by industry partners, using OrigoHOST cloud infrastructure to build and present working software.",
  },
  {
    q: "How can companies and technology organizations partner with OrigoHOST?",
    a: "Enterprise partners can sponsor hackathons, provide API credentials/cloud credits, host guest technical masterclasses, and recruit pre-vetted developer talent directly through our ecosystem pipelines.",
  },
  {
    q: "How do I access developer sandboxes and deployment tools?",
    a: "Once registered on the OrigoHOST platform, active community members receive sandbox access keys and deployment guides within their developer dashboard.",
  },
];

export default function HomePage() {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(0);

  return (
    <div className="relative min-h-screen bg-white text-[#0a0a0a] selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* PARTNERS / SPONSORS MARQUEE */}
      <React.Suspense fallback={<div className="h-32 bg-slate-50" />}>
        <PartnersMarqueeSection />
      </React.Suspense>

      {/* 2. WHY ORIGOHOST */}
      <section
        id="why"
        className="relative bg-white py-24 overflow-hidden border-b border-slate-100"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              WHY ORIGOHOST
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Everything You Need to Build & Scale
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Designed from the ground up to empower software builders with real tools,
              collaborative networks, and institutional backing.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ORIGOHOST.map((item, i) => (
              <ScaleIn key={item.title} delay={i * 0.08}>
                <Tilt className="h-full">
                  <SpotlightCard
                    color="37, 99, 235"
                    className="h-full rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-300"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-600">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  </SpotlightCard>
                </Tilt>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AUDIENCE SECTIONS */}
      <section id="audiences" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              TAILORED EXPERIENCE
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Built for Every Builder in the Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AUDIENCES.map((aud, i) => (
              <FadeIn key={aud.title} delay={i * 0.1}>
                <div className="h-full flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 block mb-4">
                      {aud.label}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-4">{aud.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-8">{aud.body}</p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-white/20 bg-white/10 text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                  >
                    <Link to={aud.link}>
                      {aud.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM REACH */}
      <section id="reach" className="bg-blue-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
              ECOSYSTEM REACH
            </span>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Our Impact Across the Community
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {REACH_METRICS.map((m, i) => (
              <ScaleIn key={m.label} delay={i * 0.08}>
                <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md border border-white/15 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="text-5xl font-black tracking-tight">
                      <Counter value={m.value} suffix={m.suffix} />
                    </div>
                    <div className="mt-3 text-lg font-bold text-white">{m.label}</div>
                  </div>
                  <p className="mt-4 text-xs text-blue-100/80 leading-relaxed">{m.desc}</p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEARNING & GROWTH PATHWAYS */}
      <section id="pathways" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              GROWTH PATHWAYS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Structured Programs Designed for Every Stage of Your Journey
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              OrigoHOST provides clear, guided pathways tailored to your goals—whether you are
              mastering new technologies, leading a student community, or partnering to support
              technological innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {PATHWAYS.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <span className="text-4xl font-black text-blue-600/30 block mb-4 font-mono">
                      {p.step}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8 shadow-md"
            >
              <Link to="/register">
                Get Started With OrigoHOST <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. FEATURED INITIATIVES */}
      <section id="initiatives" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                FEATURED INITIATIVES
              </span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Our Active Programs
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full border-slate-300">
              <Link to="/community/events">
                View All Programs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_PROGRAMS.map((prog) => (
              <div
                key={prog.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        prog.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {prog.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{prog.type}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{prog.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{prog.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {prog.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold bg-white text-slate-700 border border-slate-200 px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                  <Link to={prog.link}>
                    {prog.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. UPCOMING EVENTS & WORKSHOPS */}
      <section id="events" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                UPCOMING SESSIONS
              </span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Participate in Our Next Technical Session
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10"
            >
              <Link to="/community/events">
                View Event Calendar <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UPCOMING_SESSIONS.map((ev) => (
              <div
                key={ev.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                      {ev.type}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      {ev.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono ml-auto">{ev.date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{ev.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{ev.desc}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-8 border-t border-white/10 pt-4">
                    <span>
                      Format: <strong className="text-white">{ev.format}</strong>
                    </span>
                    <span>
                      Audience: <strong className="text-white">{ev.audience}</strong>
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  <Link to={ev.link}>
                    Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OPPORTUNITIES */}
      <section id="opportunities" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              OPPORTUNITIES
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Ways to Get Involved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OPPORTUNITIES.map((opp) => (
              <div
                key={opp.title}
                className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                    {opp.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{opp.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-8">{opp.desc}</p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                >
                  <Link to={opp.link}>
                    {opp.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. COMMUNITY KNOWLEDGE */}
      <section id="articles" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                COMMUNITY KNOWLEDGE
              </span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Technical Insights & Articles
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full border-slate-300">
              <Link to="/blog">
                Read All Articles <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ARTICLES.map((art) => (
              <div
                key={art.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {art.category}
                    </span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{art.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{art.desc}</p>

                  <div className="text-xs text-slate-500 mb-6">
                    By <strong className="text-slate-900">{art.author}</strong> ({art.role})
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {art.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
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

      {/* 10. LEARNING RESOURCES */}
      <section id="resources" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                LEARNING RESOURCES
              </span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Curated Developer Guides & Tools
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10"
            >
              <Link to="/resources">
                View All Resources <FileText className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESOURCES.map((res) => (
              <div
                key={res.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                      {res.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{res.access}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{res.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{res.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {res.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-white/10 text-slate-200 px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  <Link to={res.link}>
                    {res.cta} <Download className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. COLLABORATORS */}
      <section id="collaborators" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              COLLABORATORS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Valued Partners & Sponsors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLABORATORS.map((group) => (
              <div
                key={group.category}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                  {group.category}
                </h3>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-xs text-slate-500 font-mono">{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. DEVELOPER JOURNEY */}
      <section id="journey" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              ROADMAP
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Community Learning & Growth Stages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOURNEY_STAGES.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. COMMUNITY TESTIMONIALS */}
      <section id="testimonials" className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              COMMUNITY TESTIMONIALS
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Voices From Our Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col justify-between"
              >
                <p className="text-slate-700 italic text-base leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-slate-900 text-lg">{t.name}</div>
                  <div className="text-xs text-blue-600 font-semibold">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQ ACCORDION */}
      <section id="faq" className="bg-white py-24 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              FAQ
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Everything You Need to Know
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Got questions about joining, chartering a chapter, or participating in events? We have
              answers.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 text-lg hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`h-5 w-5 text-slate-400 transition-transform ${
                        isOpen ? "rotate-90 text-blue-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15. FINAL CTA */}
      <section
        id="join"
        className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 py-24 text-white"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Ready to Build the Future of Software?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10">
            Join thousands of passionate student developers, campus chapter leads, and industry
            mentors collaborating across India. Access deployment resources, attend expert
            masterclasses, and ship production-grade code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 rounded-full bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 shadow-xl hover:scale-105 transition-all"
            >
              <Link to="/register">
                Join OrigoHOST Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold px-8"
            >
              <Link to="/contact">Contact Community Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
