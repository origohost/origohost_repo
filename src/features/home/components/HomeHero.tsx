import React, { useState, useEffect } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Zap, Code2, Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HeroData } from "../types/homepage.types";

interface HomeHeroProps {
  data: HeroData;
}

const CYCLING_PHRASES = [
  "Hackathons",
  "Ideathons",
  "KSS Sessions",
  "Workshops",
  "Webinars",
  "Meetups",
];

const FLOATING_CHIPS = [
  { icon: Brain, label: "AI × AgriTech Ideathon", color: "border-purple-500/50 bg-purple-950/80 text-purple-300", delay: 0.4 },
  { icon: Code2, label: "CyberForge Hackathon", color: "border-blue-500/50 bg-blue-950/80 text-blue-300", delay: 0.55 },
  { icon: Zap, label: "DevOps KSS Live", color: "border-emerald-500/50 bg-emerald-950/80 text-emerald-300", delay: 0.7 },
];

export const HomeHero: React.FC<HomeHeroProps> = ({ data }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % CYCLING_PHRASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#030712] text-white min-h-[90vh] flex items-center pt-28 pb-20">
      {/* ── Animated dot-grid backdrop ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(59,130,246,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Radial fade mask so edges are dark */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_40%,#030712_100%)]" />
      </div>

      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/12 rounded-full blur-[140px] animate-orb-1" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[120px] animate-orb-2" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
      </div>

      {/* ── Background community image ── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-8">
        <img
          src={data.backgroundMediaUrl}
          alt="OrigoHOST Community"
          className="w-full h-full object-cover object-center filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-[#030712]/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7 space-y-8 max-w-2xl">

            {/* Live event eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-2 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-300">
                {data.eyebrow}
              </span>
            </motion.div>

            {/* Headline with cycling typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">Where Builders</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(37,99,235,0.5)]">
                  Become Innovators.
                </span>
              </h1>

              {/* Typewriter cycling phrase */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm sm:text-base font-semibold text-slate-400">
                  Discover
                </span>
                <div className="relative overflow-hidden h-8 flex items-center min-w-[180px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phraseIndex}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute text-sm sm:text-base font-black text-blue-400 whitespace-nowrap"
                    >
                      {CYCLING_PHRASES[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-400">
                  near you
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed"
            >
              {data.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              {/* Primary CTA — shimmer glow */}
              <Button
                asChild
                size="lg"
                className="relative w-full sm:w-auto h-14 rounded-full overflow-hidden bg-blue-600 hover:bg-blue-500 px-8 font-bold text-base text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_50px_rgba(37,99,235,0.75)] transition-all hover:scale-105 group"
              >
                <Link to={data.primaryCtaLink as any}>
                  {/* Shimmer sweep */}
                  <span className="absolute inset-0 translate-x-[-120%] skew-x-[-20deg] bg-white/20 group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {data.primaryCtaText} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>

              {/* Secondary CTA — glassmorphism */}
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto h-14 rounded-full border border-white/25 bg-white/8 hover:bg-white/15 text-white font-bold text-base px-8 backdrop-blur-md transition-all hover:border-white/40 shadow-md"
              >
                <Link to={data.secondaryCtaLink as any}>
                  <Users className="mr-2 h-4 w-4" />
                  {data.secondaryCtaText}
                </Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {[
                { icon: "✓", text: "Free to join" },
                { icon: "✓", text: "500+ active members" },
                { icon: "✓", text: "12+ tech domains" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400">
                  <span className="text-emerald-400 font-bold">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Monogram with Orbits ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px]">

            {/* Outer orbit ring 1 */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-blue-500/15 animate-spin-slow" style={{ animationDuration: "30s" }}>
              {/* Orbit dot */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_4px_rgba(37,99,235,0.5)]" />
            </div>

            {/* Outer orbit ring 2 */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/15 animate-spin-slow" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
              <div className="absolute -bottom-1.5 right-1/4 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_3px_rgba(16,185,129,0.5)]" />
            </div>

            {/* Radial glow backdrop */}
            <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-blue-600/25 via-cyan-500/15 to-emerald-500/15 rounded-full blur-3xl animate-orb-1" />

            {/* Main glass card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="relative z-10 w-full max-w-[380px] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl p-10 flex flex-col items-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] group overflow-hidden"
            >
              {/* Animated grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.15)_1px,transparent_1px)] [background-size:18px_18px] opacity-60" />

              {/* Gradient sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Live badge */}
              <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5 z-20">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>Official Emblem</span>
              </div>

              {/* Monogram with halo */}
              <div className="relative pt-6 pb-4 z-10">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl scale-150" />
                <img
                  src="/origohost-monogram.png"
                  alt="OrigoHOST Official Monogram"
                  className="w-40 sm:w-52 h-auto object-contain relative z-10 filter drop-shadow-[0_0_30px_rgba(37,99,235,0.6)] group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Brand info */}
              <div className="relative z-10 pt-4 border-t border-white/10 w-full space-y-1.5">
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
            </motion.div>

            {/* Floating tech chips */}
            {FLOATING_CHIPS.map((chip, i) => {
              const positions = [
                "absolute -top-4 -right-2 sm:right-0",
                "absolute top-1/2 -right-8 sm:-right-12 -translate-y-1/2",
                "absolute -bottom-4 -left-4 sm:-left-8",
              ];
              return (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: chip.delay, type: "spring", stiffness: 200 }}
                  className={`${positions[i]} ${chip.color} border px-3 py-2 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-2 z-20 text-xs font-bold whitespace-nowrap`}
                >
                  <chip.icon className="w-3.5 h-3.5" />
                  <span>{chip.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Curved bottom divider ── */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1440 100" className="w-full h-[80px] sm:h-[100px] block" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,60 C360,100 1080,20 1440,60 L1440,100 L0,100 Z" />
          <path fill="none" stroke="rgba(37,99,235,0.3)" strokeWidth="1.5" d="M0,60 C360,100 1080,20 1440,60" />
        </svg>
      </div>
    </section>
  );
};
