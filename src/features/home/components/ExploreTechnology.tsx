import React from "react";
import { m as motion } from "framer-motion";
import { Brain, Cloud, Shield, Bot, Cpu, ArrowRight, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ExploreTechnologyData } from "../types/homepage.types";

interface ExploreTechnologyProps {
  data: ExploreTechnologyData;
}

const ICON_MAP: Record<string, any> = { Brain, Cloud, Shield, Bot, Cpu, Zap };

const DOMAIN_THEMES: Record<string, {
  icon: string; bg: string; border: string; glow: string;
  gradient: string; statColor: string; linkHover: string;
}> = {
  Brain: {
    icon: "text-purple-400",
    bg: "bg-purple-500/15",
    border: "border-purple-500/40",
    glow: "rgba(139,92,246,0.25)",
    gradient: "from-purple-600/15 via-transparent to-transparent",
    statColor: "text-purple-400",
    linkHover: "hover:border-purple-400/60 hover:text-purple-300",
  },
  Cloud: {
    icon: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/40",
    glow: "rgba(37,99,235,0.25)",
    gradient: "from-blue-600/15 via-transparent to-transparent",
    statColor: "text-blue-400",
    linkHover: "hover:border-blue-400/60 hover:text-blue-300",
  },
  Shield: {
    icon: "text-red-400",
    bg: "bg-red-500/15",
    border: "border-red-500/40",
    glow: "rgba(239,68,68,0.25)",
    gradient: "from-red-600/15 via-transparent to-transparent",
    statColor: "text-red-400",
    linkHover: "hover:border-red-400/60 hover:text-red-300",
  },
  Bot: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/15",
    border: "border-cyan-500/40",
    glow: "rgba(6,182,212,0.25)",
    gradient: "from-cyan-600/15 via-transparent to-transparent",
    statColor: "text-cyan-400",
    linkHover: "hover:border-cyan-400/60 hover:text-cyan-300",
  },
  Cpu: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/40",
    glow: "rgba(16,185,129,0.25)",
    gradient: "from-emerald-600/15 via-transparent to-transparent",
    statColor: "text-emerald-400",
    linkHover: "hover:border-emerald-400/60 hover:text-emerald-300",
  },
};

const getTheme = (iconName: string) =>
  DOMAIN_THEMES[iconName] || DOMAIN_THEMES.Cpu;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const ExploreTechnology: React.FC<ExploreTechnologyProps> = ({ data }) => {
  return (
    <section id="explore-technology" className="relative bg-[#040d1a] py-28 text-white overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(6,182,212,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/15 px-4 py-2 rounded-full border border-cyan-500/30">
            <Zap className="w-3.5 h-3.5" />
            {data.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {data.title}
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-20 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 animate-aurora" />
          <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Domain cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.domains.map((domain) => {
            const Icon = ICON_MAP[domain.iconName] || Cpu;
            const theme = getTheme(domain.iconName);

            return (
              <motion.div
                key={domain.id}
                variants={cardVariants}
                className="group relative rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2"
                style={{
                  ["--glow-color" as string]: theme.glow,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${theme.glow}, inset 0 0 30px ${theme.glow.replace("0.25", "0.06")}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Gradient sweep on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Animated border top */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${theme.icon}`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-13 h-13 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 0 20px ${theme.glow}` }}
                  >
                    <Icon className={`w-6 h-6 ${theme.icon}`} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{domain.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">{domain.desc}</p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-white/8 mb-5">
                    {[
                      { val: domain.eventCount, label: "Events" },
                      { val: domain.projectCount, label: "Projects" },
                      { val: domain.articleCount, label: "Articles" },
                    ].map((s) => (
                      <div key={s.label}>
                        <span className={`font-bold text-sm block ${theme.statColor}`}>{s.val}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/events"
                    className={`inline-flex items-center justify-center w-full h-9 px-4 rounded-full border border-white/20 bg-transparent text-white text-xs font-bold gap-1.5 transition-all duration-200 ${theme.linkHover}`}
                  >
                    Explore Domain <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
