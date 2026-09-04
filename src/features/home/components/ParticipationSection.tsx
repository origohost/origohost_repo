import React from "react";
import { m as motion } from "framer-motion";
import { BookOpen, Code2, Users, Trophy, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ParticipationPillar, CommunityProofData } from "../types/homepage.types";

interface ParticipationSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  pillars: ParticipationPillar[];
  mosaicImages: CommunityProofData["mosaicImages"];
}

const ICON_MAP: Record<string, any> = { BookOpen, Code2, Users, Trophy };

const PILLAR_THEMES: Record<string, { gradient: string; glow: string; badge: string }> = {
  BookOpen: {
    gradient: "from-blue-600/20 to-blue-500/5",
    glow: "group-hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  Code2: {
    gradient: "from-purple-600/20 to-purple-500/5",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  },
  Users: {
    gradient: "from-emerald-600/20 to-emerald-500/5",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  Trophy: {
    gradient: "from-amber-600/20 to-amber-500/5",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const ParticipationSection: React.FC<ParticipationSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  pillars,
  mosaicImages,
}) => {
  return (
    <section id="participate" className="relative bg-white py-28 overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-blue-50 opacity-60 blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-50 opacity-40 blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {title}
          </h2>
          {/* Animated gradient underline */}
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 animate-aurora" />
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* ── 2-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: Mosaic Photo Stack */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Hero image */}
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group"
              style={{ height: "320px" }}
            >
              <img
                src={mosaicImages.hero}
                alt="OrigoHOST Community Event"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />

              {/* Live member badge */}
              <div className="absolute bottom-5 left-5">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg border border-white/60 flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_3px_rgba(34,197,94,0.5)] animate-pulse" />
                  <span className="text-xs font-bold text-slate-800">500+ Community Members</span>
                </div>
              </div>

              {/* Flagship badge */}
              <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Flagship Events
              </div>
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: mosaicImages.community, label: "Community" },
                { src: mosaicImages.workshop, label: "Workshops" },
              ].map((img) => (
                <div
                  key={img.label}
                  className="relative rounded-2xl overflow-hidden shadow-md border border-slate-100 group"
                  style={{ height: "180px" }}
                >
                  <img
                    src={img.src}
                    alt={`OrigoHOST ${img.label}`}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                      {img.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Animated quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "50+", label: "Events Hosted", color: "text-blue-600", bg: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
                { val: "12+", label: "Tech Domains", color: "text-purple-600", bg: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
                { val: "500+", label: "Builders", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className={`rounded-2xl border ${s.bg} p-4 text-center transition-all duration-300 cursor-default group`}
                >
                  <div className={`text-2xl font-black ${s.color} group-hover:scale-110 transition-transform`}>{s.val}</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5 uppercase tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: 4 Glassmorphism Pillar Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {pillars.map((pillar) => {
              const Icon = ICON_MAP[pillar.iconName] || BookOpen;
              const theme = PILLAR_THEMES[pillar.iconName] || PILLAR_THEMES.BookOpen;

              return (
                <motion.div
                  key={pillar.title}
                  variants={itemVariants}
                  className={`relative rounded-3xl border ${pillar.border} bg-white p-6 shadow-sm ${theme.glow} transition-all duration-300 flex flex-col group hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Gradient bg on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Top animated line accent */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ color: "inherit" }} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-13 h-13 rounded-2xl ${pillar.bg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${pillar.color}`} />
                      </div>
                      <span className={`text-[9px] font-mono font-black tracking-widest uppercase border px-2.5 py-1 rounded-full ${theme.badge}`}>
                        Pillar
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-slate-800">{pillar.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-5 flex-1">{pillar.desc}</p>

                    <ul className="space-y-2 border-t border-slate-100 pt-4 mb-5">
                      {pillar.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn more link */}
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 group/link"
                    >
                      Explore
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
