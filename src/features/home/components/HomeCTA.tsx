import React from "react";
import { m as motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Shield, CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HomeCtaData } from "../types/homepage.types";

interface HomeCTAProps {
  data: HomeCtaData;
}

const TRUST_ITEMS = [
  { icon: CheckCircle, text: "Free to join" },
  { icon: Shield, text: "No credit card required" },
  { icon: Users, text: "500+ active builders" },
];

export const HomeCTA: React.FC<HomeCTAProps> = ({ data }) => {
  return (
    <section
      id="final-cta"
      className="relative py-32 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020917 0%, #050d22 30%, #030b1e 60%, #020917 100%)",
      }}
    >
      {/* ── Noise texture ── */}
      <div className="absolute inset-0 opacity-3 pointer-events-none noise-overlay" />

      {/* ── Floating orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[140px] animate-orb-1" />
        {/* Top-left */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-orb-2" />
        {/* Bottom-right */}
        <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] bg-emerald-600/10 rounded-full blur-[100px] animate-orb-1" style={{ animationDelay: "5s" }} />
      </div>

      {/* ── Grid pattern ── */}
      <div
        className="absolute inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Gradient border top ── */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">

        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/15 px-4 py-1.5 rounded-full border border-blue-500/30 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Join the Ecosystem
        </motion.div>

        {/* Headline — gradient shimmer */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {data.title}
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
        >
          {data.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          {/* Primary — white with shimmer */}
          <Button
            asChild
            size="lg"
            className="relative w-full sm:w-auto h-14 rounded-full bg-white text-slate-900 hover:bg-blue-50 font-bold px-10 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all hover:scale-105 text-base group overflow-hidden"
          >
            <Link to={data.primaryCtaLink as any}>
              <span className="absolute inset-0 translate-x-[-120%] skew-x-[-20deg] bg-blue-100/60 group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                {data.primaryCtaText}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>

          {/* Secondary — glassmorphism */}
          <Link
            to={data.secondaryCtaLink as any}
            className="inline-flex items-center justify-center w-full sm:w-auto h-14 rounded-full border border-white/25 bg-white/8 text-white text-base font-semibold px-8 hover:bg-white/15 hover:border-white/40 backdrop-blur-md transition-all duration-200"
          >
            {data.secondaryCtaText}
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {TRUST_ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-slate-300">
              <Icon className="w-4 h-4 text-emerald-400" />
              <span className="font-normal">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>
    </section>
  );
};
