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
  { value: 90, suffix: "K+", label: "Developers & learners reached", icon: Users },
  { value: 500, suffix: "+", label: "Colleges & institutions", icon: GraduationCap },
  { value: 50, suffix: "+", label: "Community meetups", icon: Calendar },
  { value: 400, suffix: "+", label: "Workshops & learning sessions", icon: BookOpen },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero"
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      {/* Background glow radial */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-[#111] px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-xs font-bold uppercase tracking-widest text-blue-400">
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
            <span className="text-[#0066ff] drop-shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              Come Together.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8"
          >
            OrigoHOST is a technology community bringing people together through meetups, seminars,
            hackathons, ideathons, tech marathons, webinars, KSS sessions, workshops, and other
            experiences across technology domains and real-world industries.
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
              className="w-full sm:w-auto h-14 rounded-full bg-blue-600 hover:bg-blue-700 px-8 font-bold text-base text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all hover:scale-105"
            >
              <Link to="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 rounded-full border-white/20 bg-white/5 px-8 font-bold text-base text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-1 group"
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
            className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wide"
          >
            ✓ A Technology Community Where Ideas, People & Possibilities Connect.
          </motion.div>
        </div>

        {/* Right Graphic */}
        <div className="relative min-h-[360px] lg:min-h-[440px] flex items-center justify-center mt-6 lg:mt-0">
          <Tilt>
            <div className="relative z-10 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] flex items-center justify-center transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[80px] -z-10" />
              <img
                src="/logo-transparent.png"
                alt="OrigoHOST Tech Community"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              />
            </div>
          </Tilt>
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
                  <div className="mt-2 text-xs sm:text-sm font-bold tracking-wide text-slate-600 relative inline-block">
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
