import { m as motion } from "framer-motion";
import { ArrowRight, Calendar, Users, GraduationCap, Code } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Counter, ScaleIn, Tilt } from "@/components/motion/primitives";

const STATS: Array<{ value: number; suffix?: string; label: string }> = [
  { value: 90, suffix: "K+", label: "Developers" },
  { value: 500, suffix: "+", label: "Teams Onboarded" },
  { value: 50, suffix: "+", label: "Meetups Hosted" },
  { value: 400, suffix: "+", label: "Workshops" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero"
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      {/* Dark background particles & gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle red highlight radial gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />

        {/* Tiny glowing particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-12 sm:pt-40 sm:pb-20 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-[#111] px-3 py-1 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
              Live
            </span>
            <span className="text-red-500/30">&middot;</span>
            <span className="text-xs text-red-400 font-medium">
              Pioneering hosting & platform engineering in India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl mb-6"
          >
            India's Leading
            <br />
            <span className="text-[#0066ff] drop-shadow-[0_0_15px_rgba(0,102,255,0.3)]">
              Hosting
            </span>{" "}
            Community
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl"
          >
            Uniting developers, learners, and innovators to connect, collaborate, and create the
            future of technology together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 rounded-full bg-blue-600 hover:bg-blue-700 px-8 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] animate-breathe transition-all hover:scale-105"
            >
              <Link to="/register">
                Join Community <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 rounded-full border-white/20 bg-white/5 px-8 font-bold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] group"
            >
              <Link to="/community/events">
                Explore Events{" "}
                <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:-rotate-12 group-hover:-translate-y-1" />
              </Link>
            </Button>

            <div className="w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-red-600 hover:bg-red-700 text-white border border-red-500/50 font-semibold px-8 h-14 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:scale-105"
              >
                <Link to="/community/ambassadors">Become Ambassador</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Side (Orbits & Logo) */}
        <div className="relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center mt-12 lg:mt-0">
          {/* Red streak / light effect behind logo */}
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

          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none animate-orbit"
            style={{ animationDuration: "35s" }}
          >
            <div className="w-[560px] h-[560px] sm:w-[640px] sm:h-[640px] rounded-full border border-white/5" />
            <div className="absolute bottom-[calc(50%-280px)] sm:bottom-[calc(50%-320px)] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>

          {/* Logo */}
          <Tilt>
            <div className="relative z-10 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] flex items-center justify-center transition-transform duration-500 hover:scale-110">
              {/* Soft "sun" glow from behind */}
              <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-[80px] sm:blur-[120px] scale-125 -z-10" />

              <img
                src="/logo-transparent.png"
                alt="OrigoHOST"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              />
            </div>
          </Tilt>

          {/* Floating Cards */}
          <motion.div
            className="absolute top-4 right-0 lg:-right-8 z-20 animate-float-card"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-3 bg-[#111]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
              <div className="bg-red-500/10 p-2 rounded-xl">
                <GraduationCap className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-tight tracking-wide">
                  Learn
                </p>
                <p className="text-[10px] text-gray-400">New Technologies</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-16 right-4 lg:-right-4 z-20 animate-float-card"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="flex items-center gap-3 bg-[#111]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
              <div className="bg-red-500/10 p-2 rounded-xl">
                <Code className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-tight tracking-wide">
                  Build
                </p>
                <p className="text-[10px] text-gray-400">Amazing Projects</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/4 -left-4 lg:-left-16 z-20 animate-float-card"
            style={{ animationDelay: "3s" }}
          >
            <div className="flex items-center gap-3 bg-[#111]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
              <div className="bg-blue-500/10 p-2 rounded-xl">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-tight tracking-wide">
                  Connect
                </p>
                <p className="text-[10px] text-gray-400">With Developers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Curved Divider */}
      <div className="relative w-full h-[120px] sm:h-[180px] lg:h-[250px] overflow-hidden leading-none z-10 mt-auto">
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
          {/* Glowing Red Line following the curve */}
          <path
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_rgba(239,68,68,1)]"
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,240C840,256,960,256,1080,240C1200,224,1320,192,1380,176L1440,160"
          ></path>
        </svg>
      </div>

      {/* Stats Section on White Background */}
      <div className="relative bg-white z-20 pb-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible hide-scrollbar -mt-8 md:-mt-12">
            {STATS.map((s, i) => {
              const StatIcon = i === 0 || i === 1 ? Users : i === 2 ? Calendar : Code;
              return (
                <div
                  key={s.label}
                  className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink md:flex-1"
                >
                  <ScaleIn delay={i * 0.08} from={0.85} className="h-full">
                    <Tilt className="group relative h-full flex flex-col items-center justify-center rounded-[2rem] bg-white p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200">
                      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50">
                        <StatIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="relative z-10 text-4xl font-black tracking-tight text-[#0a0a0a] sm:text-5xl">
                        <Counter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-2 text-sm font-semibold tracking-wide text-gray-500 relative inline-block pb-1">
                        {s.label}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff] rounded-full" />
                      </div>
                    </Tilt>
                  </ScaleIn>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
