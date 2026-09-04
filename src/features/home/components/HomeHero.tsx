import React from "react";
import { ArrowRight, Sparkles, Calendar, Shield, Users, Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HeroData } from "../types/homepage.types";

interface HomeHeroProps {
  data: HeroData;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center pt-24 pb-16">
      {/* Background Image with Dark Editorial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.backgroundMediaUrl}
          alt="OrigoHOST Community Gathering"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Eyebrow, Title, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3.5 py-1.5 rounded-full border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.eyebrow}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {data.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {data.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 shadow-lg transition-all text-base h-13"
              >
                <Link to={data.primaryCtaLink as any}>
                  {data.primaryCtaText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/10 font-bold px-8 text-base h-13"
              >
                <Link to={data.secondaryCtaLink as any}>{data.secondaryCtaText}</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Official OrigoHOST Monogram Emblem & Ecosystem Halo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Ambient Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-1000" />

              {/* Monogram Glass Container */}
              <div className="relative rounded-3xl border border-white/20 bg-slate-900/80 backdrop-blur-xl p-10 flex flex-col items-center justify-center text-center shadow-2xl space-y-6 group overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                {/* Floating Ecosystem Status Badge */}
                <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span>Official Emblem</span>
                </div>

                {/* Monogram Image */}
                <div className="relative pt-4 pb-2">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl scale-125" />
                  <img
                    src="/origohost-monogram.png"
                    alt="OrigoHOST Official Monogram"
                    className="w-40 sm:w-48 h-auto object-contain relative z-10 filter drop-shadow-[0_12px_24px_rgba(59,130,246,0.4)] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Monogram Brand Details */}
                <div className="relative z-10 pt-2 border-t border-white/10 w-full space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-400">
                    ORIGOHOST TECH ECOSYSTEM
                  </span>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Where Builders Become Innovators
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Event Format × Technology Domain × Industry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
