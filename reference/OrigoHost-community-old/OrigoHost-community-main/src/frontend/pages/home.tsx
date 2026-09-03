import { m as motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Server,
  Users,
  Zap,
  Shield,
  Cloud,
  Code2,
  Trophy,
  Calendar,
  MapPin,
  Clock,
  PlayCircle,
  Camera,
  Handshake,
  Send,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  Rocket,
  Gift,
  Heart,
  LayoutGrid,
  Globe,
  Terminal,
  Cpu,
} from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BackgroundOrbs,
  Counter,
  FadeIn,
  Magnetic,
  Reveal,
  ScaleIn,
  Tilt,
  Typewriter,
  SpotlightCard,
  Stagger,
  Marquee,
  ScrollVelocity,
  TextRevealStagger,
} from "@/components/motion/primitives";

const PILLARS = [
  {
    icon: Cloud,
    title: "Cloud & Edge",
    body: "Deep dives on AWS, GCP, Cloudflare, Fly, and edge-native runtimes.",
  },
  {
    icon: Shield,
    title: "Reliability",
    body: "SRE playbooks, incident retros, and observability patterns that actually scale.",
  },
  {
    icon: Code2,
    title: "Platform Eng",
    body: "IDPs, CI/CD, Kubernetes, IaC — the tooling behind fast-moving teams.",
  },
];

const WHAT_WE_DO = [
  {
    icon: Zap,
    title: "Workshops & Training",
    body: "Practical sessions on Kubernetes, Terraform, WebXR, and modern platform engineering designed to help participants build and ship real-time projects. Open to all levels, with certification provided.",
  },
  {
    icon: Trophy,
    title: "Hackathons & Challenges",
    body: "Short-format immersive tech competitions focused on creative problem-solving and cloud/infra development. Supported by mentors and evaluated by industry experts.",
  },
  {
    icon: Users,
    title: "Community Events",
    body: "Developer meetups, speaker series, and interactive sessions hosted in partnership with organisations like Google and AWS — fostering collaboration and knowledge.",
  },
  {
    icon: Handshake,
    title: "Brand & Campus Partnership",
    body: "Collaborations with institutions, universities, and tech organisations to deliver curated cloud & infra programs — including student workshops, tech booths, and long-term training models.",
  },
];

const EVENTS = [
  {
    month: "JUL",
    day: "12",
    tag: "ONLINE",
    time: "12:00 PM – 2:00 PM",
    title: "Knowledge Sharing Series 2026 — Building Intelligent Systems",
    desc: "A practical journey into Embedded Systems & Robotics with Mr. Kushagra Petwal, Chairperson of The Robotics Club, G. B. Pant University of Agriculture & Technology. Hosted by Mr. Tarun Kumar.",
    city: "Live Webinar",
    image: "/event-poster.jpg",
    slug: "knowledge-sharing-series-2026",
  },
  {
    month: "JUN",
    day: "15",
    tag: "OFFLINE",
    time: "10:00 AM",
    title: "Community Meetup & Workshop",
    desc: "Hands-on session exploring real-world cloud scaling, open-source projects, and networking with fellow engineers.",
    city: "Delhi NCR",
    image: "/event-gallery-1.jpg",
    slug: "community-meetup-workshop",
  },
  {
    month: "MAY",
    day: "22",
    tag: "OFFLINE",
    time: "02:00 PM",
    title: "Masterclass: Modern Infrastructure",
    desc: "An immersive deep dive into containerization, Kubernetes, and setting up internal developer platforms.",
    city: "Bangalore",
    image: "/event-gallery-2.jpg",
    slug: "masterclass-modern-infrastructure",
  },
  {
    month: "APR",
    day: "10",
    tag: "OFFLINE",
    time: "11:00 AM",
    title: "Educational Leadership Summit",
    desc: "An exclusive meetup with 50+ school directors to share insights on enhancing educational performance, modern knowledge delivery, and how our infrastructure solutions empower learning institutions.",
    city: "Mathura",
    image: "/event-gallery-3.jpg",
    slug: "educational-leadership-summit",
  },
  {
    month: "MAR",
    day: "05",
    tag: "OFFLINE",
    time: "09:30 AM",
    title: "AI Foundation & Awareness Workshop",
    desc: "An engaging workshop training students across different classes on AI evolution, real-world applications, and responsible usage. Focused on digital safety and empowering a future-ready generation.",
    city: "School Campus",
    image: "/event-gallery-4.jpg",
  },
];

import React, { useMemo } from "react";
import HeroSection from "@/frontend/pages/hero";
const PartnersMarqueeSection = React.lazy(() =>
  import("@/components/partners-marquee-section").then((mod) => ({
    default: mod.PartnersMarqueeSection,
  })),
);
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useQuery } from "@tanstack/react-query";
import { eventApi } from "@/modules/events/api/eventApi";

export default function HomePage() {
  const { data: dynamicEvents = [] } = useQuery({
    queryKey: ["events", "home"],
    queryFn: () => eventApi.getEvents(100),
  });

  const top6Events = useMemo(() => {
    const publishedEvents = dynamicEvents.filter((e) => e.is_published);

    const sortedEvents = [...publishedEvents].sort((a, b) => {
      const aIsPast = a.status === "Past";
      const bIsPast = b.status === "Past";

      if (aIsPast && !bIsPast) return 1;
      if (!aIsPast && bIsPast) return -1;

      const timeA = new Date(`${a.date}T${a.start_time || "00:00"}`).getTime();
      const timeB = new Date(`${b.date}T${b.start_time || "00:00"}`).getTime();

      if (aIsPast) {
        // Both are past, sort descending
        return timeB - timeA;
      } else {
        // Both are upcoming/live, sort ascending
        return timeA - timeB;
      }
    });

    return sortedEvents.slice(0, 6);
  }, [dynamicEvents]);

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const [h, m] = timeString.split(":");
    let hours = parseInt(h, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${m} ${ampm}`;
  };

  const displayEvents = useMemo(() => {
    return top6Events.length > 0
      ? top6Events.map((e) => {
          const d = new Date(e.date);
          const month = d.toLocaleString("default", { month: "short" }).toUpperCase();
          const day = d.getDate().toString().padStart(2, "0");
          let timeStr = formatTime(e.start_time);
          if (e.end_time) {
            timeStr += ` – ${formatTime(e.end_time)}`;
          }
          return {
            month,
            day,
            tag: e.mode?.toUpperCase() || "ONLINE",
            time: timeStr,
            title: e.title,
            desc: e.short_description,
            city: e.venue_name || (e.mode === "online" ? "Live Webinar" : "TBA"),
            image: e.thumbnail_url || null,
            slug: e.slug,
            status: e.status || "Upcoming",
          };
        })
      : EVENTS.map((e) => ({ ...e, status: "Upcoming" }));
  }, [top6Events]);

  return (
    <div className="relative min-h-screen bg-white text-[var(--brand-ink)] selection:bg-[var(--brand-ink)] selection:text-white">
      {/* Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO) Block via JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "OrigoHOST",
            description:
              "OrigoHOST is India's premier Developer and Technology Community focusing on Artificial Intelligence, Cloud Computing, DevOps, Software Engineering, and Hackathons.",
            founder: [{ "@type": "Person", name: "Ritik Kumar" }],
            foundingDate: "2024",
            url: "https://origohost.com",
            sameAs: ["https://twitter.com/origohost", "https://linkedin.com/company/origohost"],
          }),
        }}
      />

      {/* HERO */}
      <HeroSection />

      {/* PARTNERS / SPONSORS MARQUEE */}
      <React.Suspense fallback={<div className="h-48 bg-[#f2f9ff]" />}>
        <PartnersMarqueeSection />
      </React.Suspense>

      {/* WHO WE ARE - BENTO GRID */}
      <section id="about" data-testid="about" className="relative bg-white py-24 overflow-hidden">
        {/* Aurora Mesh Gradient Background Layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{ background: "var(--gradient-aurora)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Pill icon={Users} label="WHO WE ARE" tone="ink" />
            <ScrollVelocity>
              <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl">
                🚀 OrigoHOST{" "}
                <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                  Technology Community
                </span>
              </h2>
            </ScrollVelocity>
            <TextRevealStagger
              text="OrigoHOST, also known as OrigoHOST Tech Community, is an India-based technology community focused on helping students, developers, and professionals learn, build, collaborate, and grow through technical events, hackathons, and workshops."
              className="mx-auto mt-6 max-w-3xl text-lg font-medium text-[var(--brand-ink)]/70"
            />
          </motion.div>

          <Stagger className="mt-16 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible hide-scrollbar">
            {/* Left Large Card */}
            <Tilt
              max={3}
              className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink md:col-span-1 md:row-span-2"
            >
              <SpotlightCard
                color="255, 237, 213"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-50 p-8 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-[var(--brand-orange)] animate-draw-svg">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 text-2xl font-black leading-tight text-[var(--brand-ink)] tracking-tighter">
                    Trusted Partners: OrigoHOST Team & Partners
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--brand-ink)]/60">
                    Built with the support of industry leaders, academia, and government — to bring
                    cloud and platform engineering to the grassroots.
                  </p>
                </div>
                <div className="mt-8 -mx-8 -mb-8 overflow-hidden rounded-b-[2rem]">
                  <OptimizedImage
                    src="/team-group.jpg"
                    alt="OrigoHOST Team"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    containerClassName="h-full w-full"
                  />
                </div>
              </SpotlightCard>
            </Tilt>

            {/* Right Side: 2x2 Grid */}
            <Tilt max={5} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <SpotlightCard
                color="219, 234, 254"
                className="h-full rounded-[2rem] bg-slate-50 p-8 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-600 animate-draw-svg">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="mt-6 text-xl font-bold text-[var(--brand-ink)] tracking-tighter">
                  90,000+ Developers Trained
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-ink)]/60">
                  Workshops. Bootcamps. Challenges. We've empowered thousands to master platform
                  engineering hands-on.
                </p>
              </SpotlightCard>
            </Tilt>

            <Tilt max={5} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <SpotlightCard
                color="243, 232, 255"
                className="h-full rounded-[2rem] bg-slate-50 p-8 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-100 text-purple-600 animate-draw-svg">
                  <Rocket className="h-6 w-6" />
                </div>
                <h4 className="mt-6 text-xl font-bold text-[var(--brand-ink)] tracking-tighter">
                  500+ Teams Onboarded
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-ink)]/60">
                  From indie apps to enterprise infra — our community ideates and builds what the
                  world uses.
                </p>
              </SpotlightCard>
            </Tilt>

            <Tilt max={5} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <SpotlightCard
                color="209, 250, 229"
                className="h-full rounded-[2rem] bg-slate-50 p-8 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-600 animate-draw-svg">
                  <Gift className="h-6 w-6" />
                </div>
                <h4 className="mt-6 text-xl font-bold text-[var(--brand-ink)] tracking-tighter">
                  50+ Meetups Hosted
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-ink)]/60">
                  From speaker-led masterclasses to national hackathons, we've created moments that
                  spark tech learning.
                </p>
              </SpotlightCard>
            </Tilt>

            <Tilt max={5} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <SpotlightCard
                color="255, 228, 230"
                className="h-full rounded-[2rem] bg-slate-50 p-8 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-600 animate-draw-svg">
                  <Heart className="h-6 w-6" />
                </div>
                <h4 className="mt-6 text-xl font-bold text-[var(--brand-ink)] tracking-tighter">
                  400+ Workshops
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-ink)]/60">
                  Across IITs, private institutions, and tier-2 campuses — OrigoHOST makes
                  infrastructure learning accessible nationwide.
                </p>
              </SpotlightCard>
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section
        id="what-we-do"
        data-testid="what-we-do"
        className="relative overflow-hidden bg-gradient-to-b from-[var(--brand-cream)] to-white py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Pill icon={Zap} label="What We Do" tone="ink" />
            <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
              Learn, Build, Grow — with{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                Modern Infra
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[var(--brand-ink)]/70">
              We don't just talk about the future — we build it, together. Hands-on, high-impact
              experiences that bring cloud, edge, and platform engineering to life.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <FadeIn className="lg:row-span-2">
              <div className="relative h-full overflow-hidden rounded-3xl bg-[var(--brand-ink)] p-8 text-white shadow-[var(--shadow-elevated)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[var(--brand-orange)]/20 blur-3xl" />
                <Sparkles className="h-6 w-6 text-[var(--brand-yellow)]" />
                <h3 className="mt-4 text-2xl font-black">Have an idea?</h3>
                <p className="mt-2 text-3xl font-black text-[var(--brand-orange)]">
                  Let's collaborate!
                </p>
                <ul className="mt-8 space-y-4 text-sm text-white/85">
                  {[
                    "Custom Cloud Workshops",
                    "Hackathon Support",
                    "Co-Branded Tech Events",
                    "Brand Partnerships",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--brand-green)]/20 text-[var(--brand-green)]">
                        ✓
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-10 w-full rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] text-white hover:opacity-90"
                >
                  <a href="#contact">
                    Partner With Us <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              {WHAT_WE_DO.map((w, i) => (
                <ScaleIn key={w.title} delay={i * 0.08} from={0.92}>
                  <Tilt className="h-full">
                    <SpotlightCard
                      color="16, 185, 129"
                      className="h-full rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-mint)]">
                        <w.icon className="h-5 w-5 text-[var(--brand-green)]" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-[var(--brand-orange)] tracking-tight">
                        {w.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--brand-ink)]/70">{w.body}</p>
                    </SpotlightCard>
                  </Tilt>
                </ScaleIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED INITIATIVE */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Pill icon={Trophy} label="Featured Initiatives" tone="ink" />
            <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
              ✨ Ecosystem{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                Spotlights
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[var(--brand-ink)]/70">
              National-level infrastructure hackathons, industry collaborations, and long-term
              platform engineering impact.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl border border-[var(--brand-ink)]/5 bg-[var(--brand-cream)] shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-2">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.1 }}
              whileInView={{ clipPath: "inset(0 0 0 0)", scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-video lg:aspect-auto overflow-hidden group"
            >
              <OptimizedImage
                src="/event-gallery-1.jpg"
                alt="Origo Summit"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                containerClassName="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-[var(--brand-orange)]/60 to-[var(--brand-green)]/80 mix-blend-multiply" />
              <div className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-lg z-10">
                <Trophy className="h-5 w-5 text-[var(--brand-orange)]" />
              </div>
              <div className="absolute inset-0 grid place-items-center z-10">
                <p className="text-4xl font-black text-white tracking-widest drop-shadow-md">
                  ORIGO SUMMIT
                </p>
              </div>
            </motion.div>
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[var(--brand-orange)]" />
                <h3 className="text-2xl font-black">OrigoHOST Hackathon 2026</h3>
              </div>
              <p className="mt-4 text-[var(--brand-ink)]/70">
                In partnership with leading cloud providers, the Origo Infra Hackathon is a national
                3-phase platform engineering initiative culminating live at Origo Summit 2026. Over
                9 months, it brings together operators from across India to build production-grade
                infrastructure, mentor-led platform projects, and pitch-ready internal developer
                platforms.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl bg-white p-6">
                {[
                  { v: "1,918+", l: "Registrations" },
                  { v: "4", l: "Tracks", sub: "across the country" },
                  { v: "₹4 Lakh", l: "Cash Prize", sub: "top 5 teams" },
                ].map((x) => (
                  <div key={x.l} className="text-center">
                    <div className="text-2xl font-black text-[var(--brand-orange)]">{x.v}</div>
                    <div className="mt-1 text-xs font-semibold text-[var(--brand-ink)]">{x.l}</div>
                    {x.sub && <div className="text-[10px] text-[var(--brand-ink)]/50">{x.sub}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partner spotlight */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--brand-ink)]/5 bg-[var(--brand-cream)] shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-2">
                <Handshake className="h-5 w-5 text-[var(--brand-orange)]" />
                <h3 className="text-2xl font-black">🤝 OrigoHOST × Cloud Partners</h3>
              </div>
              <p className="mt-4 text-[var(--brand-ink)]/70">
                A nationwide collaboration to empower India's infrastructure community. As one of
                India's most active hosting partners, OrigoHOST works closely with AWS, GCP,
                Cloudflare and Fly to design and execute scalable, outcome-focused platform
                engineering initiatives — hands-on cloud workshops, chaos engineering days, and
                curated hackathons.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl bg-white p-6">
                {[
                  { v: "33+", l: "Events Conducted" },
                  { v: "2,372+", l: "Operators Trained" },
                  { v: "10+", l: "Cities Reached" },
                ].map((x) => (
                  <div key={x.l} className="text-center">
                    <div className="text-2xl font-black text-[var(--brand-orange)]">{x.v}</div>
                    <div className="mt-1 text-xs font-semibold text-[var(--brand-ink)]">{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ clipPath: "inset(0 0 0 100%)", scale: 1.1 }}
              whileInView={{ clipPath: "inset(0 0 0 0)", scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-video lg:aspect-auto overflow-hidden group"
            >
              <OptimizedImage
                src="/sponsor_hero.png"
                alt="Partnerships"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                containerClassName="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-green)]/80 via-blue-600/60 to-[var(--brand-yellow)]/80 mix-blend-multiply" />
              <div className="absolute inset-0 grid place-items-center z-10">
                <p className="text-4xl font-black tracking-widest text-white drop-shadow-md">
                  PARTNERSHIPS
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="bg-gradient-to-b from-[var(--brand-cream)] to-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Pill icon={Calendar} label="Immersive Events" tone="ink" />
              <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
                Upcoming Infra{" "}
                <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                  Meetups
                </span>
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-[var(--brand-ink)]/20 bg-white"
            >
              <a href="#">
                View All Events <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible hide-scrollbar">
            {displayEvents.map((e, i) => (
              <motion.article
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)] min-w-[85vw] shrink-0 snap-center md:min-w-0 md:shrink flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black shrink-0">
                  <div className="absolute inset-0">
                    {e.image ? (
                      <OptimizedImage
                        src={e.image}
                        alt={e.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        containerClassName="h-full w-full"
                      />
                    ) : (
                      <div className="flex h-full w-full place-items-center justify-center">
                        <Server className="h-16 w-16 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="absolute left-4 top-4 z-10 rounded-2xl bg-white px-3 py-2 text-center shadow-lg">
                    <div className="text-[10px] font-bold text-[var(--brand-orange)]">
                      {e.month}
                    </div>
                    <div className="text-2xl font-black leading-none text-[var(--brand-ink)]">
                      {e.day}
                    </div>
                  </div>
                  <div
                    className={`absolute right-4 top-4 z-10 rounded-full backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${e.status === "Upcoming" ? "bg-[var(--brand-orange)]/90" : e.status === "Live" ? "bg-green-500/90 animate-pulse" : "bg-black/50"}`}
                  >
                    {e.status}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[var(--brand-mint)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-green)]">
                      {e.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--brand-ink)]/60">
                      <Clock className="h-3 w-3" /> {e.time}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-snug">{e.title}</h3>
                  <p className="mt-2 text-sm text-[var(--brand-ink)]/60 line-clamp-3">{e.desc}</p>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-[var(--brand-ink)]/5 pt-4">
                      <span className="flex items-center gap-1 text-sm text-[var(--brand-ink)]/70 truncate max-w-[50%]">
                        <MapPin className="h-4 w-4 shrink-0" />{" "}
                        <span className="truncate">{e.city}</span>
                      </span>
                      {e.slug ? (
                        <a
                          href={`/community/events/${e.slug}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-glow)] transition-all shadow-md shrink-0"
                        >
                          View Details <ArrowRight className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="px-4 py-2 rounded-full text-xs font-bold text-[var(--brand-ink)]/40 bg-zinc-100">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERED IMPACT */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1b3b86] to-[#142966] py-20 px-8 md:px-16 text-center text-white shadow-2xl">
            {/* Constellation/Mesh Background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg width=\\'100%25\\' height=\\'100%25\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cdefs%3E%3Cpattern id=\\'dots\\' width=\\'40\\' height=\\'40\\' patternUnits=\\'userSpaceOnUse\\'%3E%3Ccircle cx=\\'2\\' cy=\\'2\\' r=\\'1.5\\' fill=\\'rgba(255,255,255,0.5)\\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'url(%23dots)\\'/%3E%3C/svg%3E')",
              }}
            />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4">
                Delivered Impact
              </h2>
              <p className="text-lg md:text-xl font-medium text-blue-100 mb-16">
                Every program is designed to create outcomes that matter to the business
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
                <div className="pt-6 md:pt-0">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl lg:text-5xl font-black">25K+</span>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white text-xs">
                      ▲
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-blue-100/90 leading-relaxed max-w-[200px] mx-auto">
                    Developers and builders engaged across each hackathon cycle
                  </p>
                </div>
                <div className="pt-6 md:pt-0">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl lg:text-5xl font-black">12K+</span>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white text-xs">
                      ▲
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-blue-100/90 leading-relaxed max-w-[200px] mx-auto">
                    Mentor hours delivered to teams each hackathon cycle across India
                  </p>
                </div>
                <div className="pt-6 md:pt-0">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl lg:text-5xl font-black">70%</span>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white text-xs rotate-180">
                      ▲
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-blue-100/90 leading-relaxed max-w-[200px] mx-auto">
                    Lower cost per validated hire versus traditional recruiting channels
                  </p>
                </div>
                <div className="pt-6 md:pt-0">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl lg:text-5xl font-black">3x</span>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white text-xs">
                      ▲
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-blue-100/90 leading-relaxed max-w-[200px] mx-auto">
                    More production ready solutions versus in house R&D sprints
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT PARTNERS SAY */}
      <section className="bg-[var(--brand-cream)] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              What Partners Say
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight text-[var(--brand-ink)]">
              Outcomes, not optics.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="relative rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute top-6 left-6 text-6xl text-blue-100 font-serif leading-none">
                "
              </div>
              <p className="relative z-10 mt-6 text-[var(--brand-ink)]/80 leading-relaxed">
                Partnering with OrigoHOST for the Digifest Hackathon was a game-changer for TiE.
                Their ability to mobilize and mentor tech talent at scale is exactly what India's
                'Bharat' startups need to go global.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                    alt="Mahavir Pratap Sharma"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--brand-ink)]">
                    Mahavir Pratap Sharma
                  </h4>
                  <p className="text-xs text-[var(--brand-ink)]/50 mt-0.5">
                    Past Chair, TiE Global Board of Trustees
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="relative rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute top-6 left-6 text-6xl text-blue-100 font-serif leading-none">
                "
              </div>
              <p className="relative z-10 mt-6 text-[var(--brand-ink)]/80 leading-relaxed">
                A big congratulations to OrigoHOST and OMOTEC (On My Own Technology) for envisioning
                this brilliant initiative and to the Microsoft Azure Developer Community for
                supporting it.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                    alt="Dr. Manish Malhotra"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--brand-ink)]">Dr. Manish Malhotra</h4>
                  <p className="text-xs text-[var(--brand-ink)]/50 mt-0.5">
                    Founder - Futred Innovation Studios
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="relative rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute top-6 left-6 text-6xl text-blue-100 font-serif leading-none">
                "
              </div>
              <p className="relative z-10 mt-6 text-[var(--brand-ink)]/80 leading-relaxed">
                OrigoHOST has been at fore front of technology evangelism for young students of our
                Country. Ritik and his team have created an exemplary ecosystem utilising their
                network effect at top notch organization like Facebook and Microsoft.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                    alt="Dr. Monit Kapoor"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--brand-ink)]">Dr. Monit Kapoor</h4>
                  <p className="text-xs text-[var(--brand-ink)]/50 mt-0.5">
                    Professor and Dean, CSE - Chitkara University
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-white to-[var(--brand-mint)]/40 p-8 shadow-[var(--shadow-soft)] md:p-14">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Pill icon={Send} label="Get In Touch" tone="ink" />
                <h2 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
                  Let's Build
                  <br />
                  Something
                  <br />
                  <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                    Extraordinary
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-glow)] bg-clip-text text-transparent">
                    Together
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-[var(--brand-ink)]/70">
                  Whether you're hosting an infra event, planning a cloud workshop, or exploring
                  platform partnerships — drop us a message. We're always up for meaningful
                  conversations.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: Instagram,
                      label: "@origohost",
                      href: "https://www.instagram.com/origohost?igsh=MWgxOWdhM2F1MGliMw==",
                    },
                    { icon: Twitter, label: "@origohost", href: "https://twitter.com/origohosts" },
                    {
                      icon: Linkedin,
                      label: "@origohost",
                      href: "https://linkedin.com/company/origohosts",
                    },
                    {
                      icon: MessageCircle,
                      label: "OrigoHOST",
                      href: "https://wa.me/message/origohost",
                    },
                  ].map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--brand-mint)]">
                          <s.icon className="h-4 w-4 text-[var(--brand-green)]" />
                        </span>
                        <span className="font-medium">{s.label}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[var(--brand-ink)]/40" />
                    </a>
                  ))}
                </div>
              </div>

              <form className="space-y-5 rounded-3xl bg-white p-8 shadow-[var(--shadow-soft)]">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-semibold">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    className="mt-2 h-12 rounded-xl bg-[var(--brand-cream)]/60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-semibold">
                    E-mail
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    className="mt-2 h-12 rounded-xl bg-[var(--brand-cream)]/60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-sm font-semibold">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us about your infrastructure vision..."
                    className="mt-2 min-h-[140px] rounded-xl bg-[var(--brand-cream)]/60"
                  />
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="w-full rounded-2xl bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink)]/90"
                >
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Pill({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: "ink" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
        tone === "ink"
          ? "bg-[var(--brand-ink)] text-[var(--brand-yellow)]"
          : "bg-white text-[var(--brand-ink)]"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
