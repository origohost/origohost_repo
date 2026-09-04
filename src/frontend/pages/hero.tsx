import { m as motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  Cpu,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Counter, ScaleIn, Tilt } from "@/components/motion/primitives";

const CANONICAL_METRICS = [
  { value: 15, suffix: "K+", label: "Developers & learners reached", icon: Users },
  { value: 75, suffix: "+", label: "Colleges & institutions", icon: GraduationCap },
  { value: 35, suffix: "+", label: "Community meetups", icon: Calendar },
  { value: 120, suffix: "+", label: "Workshops & learning sessions", icon: BookOpen },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero"
      className="relative overflow-hidden bg-[#050505] text-white hero-editorial-cover"
    >
      {/* Background Community Image Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-25 mix-blend-luminosity">
        <img
          src="/team-group.webp"
          alt="OrigoHOST Community Group"
          className="w-full h-full object-cover filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-blue-600/15 rounded-full blur-[130px]" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side (7 Columns) */}
        <div className="lg:col-span-7 max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-[#0d1527]/90 px-4 py-1.5 mb-6 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-xs font-bold uppercase tracking-widest text-blue-300">
              TECHNOLOGY COMMUNITY • EVENTS • KNOWLEDGE • COLLABORATION
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6"
          >
            Where Technology Communities
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              Come Together.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8"
          >
            OrigoHOST brings developers, learners, innovators, educators, and practitioners together through meetups, seminars, hackathons, ideathons, webinars, KSS sessions, and workshops across technology domains and real-world industries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mb-8"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 rounded-full bg-blue-600 hover:bg-blue-700 px-8 font-bold text-base text-white shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] transition-all hover:scale-105"
            >
              <Link to="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 rounded-full border-white/25 bg-white/10 px-8 font-bold text-base text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 transition-all hover:-translate-y-1 group"
            >
              <Link to="/register">
                Join the Community{" "}
                <Users className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide flex items-center gap-2"
          >
            <span className="text-emerald-400">✓</span> A Technology Community Where Ideas, People & Possibilities Connect.
          </motion.div>
        </div>

        {/* Right Side: Official Monogram with 3D Tilt & Glowing Radial Backdrop (5 Columns) */}
        <div className="lg:col-span-5 relative min-h-[420px] flex items-center justify-center mt-6 lg:mt-0">
          {/* Glowing Radial Backdrop */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[350px] sm:w-[420px] h-[350px] sm:h-[420px] bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <Tilt className="w-full max-w-[420px]">
            <div className="relative z-10 w-full rounded-3xl border border-white/20 bg-slate-900/85 backdrop-blur-xl p-10 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden">
              {/* Background Grid Accent */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

              {/* Top Ecosystem Pill */}
              <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>Official Monogram</span>
              </div>

              {/* Official Monogram Image with Halo Glow */}
              <div className="relative pt-6 pb-4">
                <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-2xl scale-125" />
                <img
                  src="/origohost-monogram.png"
                  alt="OrigoHOST Official Monogram"
                  className="w-44 sm:w-52 h-auto object-contain relative z-10 filter drop-shadow-[0_15px_30px_rgba(37,99,235,0.6)] group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Emblem Details */}
              <div className="relative z-10 pt-4 border-t border-white/10 w-full space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-400">
                  ORIGOHOST TECH ECOSYSTEM
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Where Builders Connect
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Event Format × Technology Domain × Industry
                </p>
              </div>
            </div>
          </Tilt>

          {/* Floating Chip 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -top-4 -right-2 sm:right-2 bg-slate-900/95 border border-blue-500/40 text-white px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-2 z-20 text-xs font-bold"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
            <span>CyberForge Hackathon Live</span>
          </motion.div>

          {/* Floating Chip 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-4 -left-2 bg-slate-900/95 border border-emerald-500/40 text-white px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-2 z-20 text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI × AgriTech Ideathon</span>
          </motion.div>
        </div>
      </div>

      {/* Curved Bottom Divider */}
      <div className="relative w-full h-[80px] sm:h-[120px] lg:h-[160px] overflow-hidden leading-none z-10 mt-auto">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full block"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,240C840,256,960,256,1080,240C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
          <path
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_rgba(37,99,235,1)]"
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,240C840,256,960,256,1080,240C1200,224,1320,192,1380,176L1440,160"
          ></path>
        </svg>
      </div>

      {/* Impact Counter Grid */}
      <div className="relative bg-white z-20 pb-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-8 md:-mt-12">
            {CANONICAL_METRICS.map((s, i) => (
              <ScaleIn key={s.label} delay={i * 0.08} from={0.85} className="h-full">
                <Tilt className="group relative h-full flex flex-col items-center justify-center rounded-[2rem] bg-white p-6 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50">
                    <s.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-bold tracking-wide text-slate-700 relative inline-block">
                    {s.label}
                  </div>
                </Tilt>
              </ScaleIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
