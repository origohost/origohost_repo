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

          {/* Right Column: Official Community Monogram & Ecosystem Live Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 via-slate-900/60 to-slate-950/90 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(59,130,246,0.25)] relative group text-center flex flex-col items-center justify-between">
              {/* Glowing Ambient Halo behind Monogram */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-purple-600/10 opacity-50 filter blur-xl group-hover:opacity-75 transition-opacity" />

              {/* Official Monogram Badge */}
              <div className="relative z-10 my-4 p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/origohost-monogram.png"
                  alt="OrigoHOST Official Monogram"
                  className="w-36 h-36 object-contain filter drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                />
              </div>

              {/* Floating Activity Chips */}
              <div className="relative z-10 w-full space-y-3 pt-2">
                <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    CyberForge Hackathon
                  </span>
                  <span className="text-slate-400 text-[10px]">LIVE SPRINT</span>
                </div>

                <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                  <span className="text-blue-400 font-bold">AI × AgriTech Ideathon</span>
                  <span className="text-slate-400 text-[10px]">UPCOMING</span>
                </div>
              </div>

              {/* Ecosystem Label */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 w-full text-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 block mb-1">
                  OFFICIAL COMMUNITY MONOGRAM
                </span>
                <p className="text-xs text-slate-300 font-semibold">
                  OrigoHOST Technology Community Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
