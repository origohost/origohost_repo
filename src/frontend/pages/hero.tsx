import { m as motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Users,
  GraduationCap,
  Code,
  Server,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tilt } from "@/components/motion/primitives";

const HERO_LABELS = [
  { icon: Server, label: "Enterprise Sandboxes" },
  { icon: Users, label: "3,000+ Active Builders" },
  { icon: ShieldCheck, label: "Chartered Chapters" },
  { icon: Award, label: "CyberForge Hackathons" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero"
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      {/* Background radial gradients & glow particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />

        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-[#111] px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-red-400">
              EMPOWERING THE NEXT GENERATION OF SOFTWARE BUILDERS & INNOVATORS
            </span>
          </motion.div>

          {/* Headline & Subheadline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-6xl mb-4"
          >
            Build Boldly. Connect Globally.
            <br />
            <span className="text-[#0066ff] drop-shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              Launch Production-Ready Systems.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6"
          >
            Welcome to OrigoHOST—India's premier developer ecosystem and cloud infrastructure
            platform designed to bridge the gap between classroom theory and real-world software
            engineering.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8 hidden sm:block"
          >
            Whether you are a student discovering systems design, a developer building open-source
            tools, or a campus leader cultivating tech talent, OrigoHOST provides the hands-on
            compute sandboxes, structured learning cohorts, and collaborative community network you
            need to turn ambitious ideas into deployed, production-ready software.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 rounded-full bg-blue-600 hover:bg-blue-700 px-8 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all hover:scale-105"
            >
              <Link to="/register">
                Join the Developer Community <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 rounded-full border-white/20 bg-white/5 px-8 font-bold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-1 group"
            >
              <a href="#pathways">
                Explore Cohorts & Programs{" "}
                <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:-rotate-12 group-hover:-translate-y-1" />
              </a>
            </Button>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10"
          >
            {HERO_LABELS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-xs font-semibold text-gray-300"
              >
                <item.icon className="h-4 w-4 text-blue-400 shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Orbits & Brand Graphic */}
        <div className="relative min-h-[380px] lg:min-h-[480px] flex items-center justify-center mt-8 lg:mt-0">
          <div className="absolute w-[150px] h-[3px] bg-red-500/80 blur-md rotate-45 z-0" />
          <div className="absolute w-[300px] h-[300px] bg-blue-600/10 blur-[80px] rounded-full z-0" />

          {/* Orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-orbit">
            <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-white/10 border-dashed" />
            <div className="absolute top-[calc(50%-140px)] sm:top-[calc(50%-160px)] w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-orbit-reverse">
            <div className="w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] rounded-full border border-white/5" />
            <div className="absolute right-[calc(50%-210px)] sm:right-[calc(50%-240px)] w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </div>

          {/* Logo Graphic */}
          <Tilt>
            <div className="relative z-10 w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[80px] -z-10" />
              <img
                src="/logo-transparent.png"
                alt="OrigoHOST Community"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              />
            </div>
          </Tilt>

          {/* Floating Feature Chips */}
          <motion.div
            className="absolute top-4 right-0 lg:-right-4 z-20 animate-float-card"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-3 bg-[#111]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
              <div className="bg-blue-500/10 p-2 rounded-xl">
                <GraduationCap className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-tight">Learn Systems</p>
                <p className="text-[10px] text-gray-400">Structured Cohorts</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-12 right-4 lg:-right-2 z-20 animate-float-card"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="flex items-center gap-3 bg-[#111]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
              <div className="bg-red-500/10 p-2 rounded-xl">
                <Code className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-tight">Build & Ship</p>
                <p className="text-[10px] text-gray-400">Production Code</p>
              </div>
            </div>
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
            stroke="#ef4444"
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_rgba(239,68,68,1)]"
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,240C840,256,960,256,1080,240C1200,224,1320,192,1380,176L1440,160"
          ></path>
        </svg>
      </div>
    </section>
  );
}
