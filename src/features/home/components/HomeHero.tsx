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

          {/* Right Column: Composite Ecosystem Live Preview */}
          {data.liveActivityEvent && (
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden shadow-2xl relative group">
                <div className="aspect-16/10 overflow-hidden relative">
                  <img
                    src={data.liveActivityEvent.imageUrl}
                    alt={data.liveActivityEvent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                    ● {data.liveActivityEvent.tag}
                  </div>
                </div>

                <div className="p-6 bg-slate-900/90 border-t border-white/10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 block mb-1">
                    FEATURED ECOSYSTEM ACTIVITY
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{data.liveActivityEvent.title}</h3>
                  <p className="text-xs text-slate-300 font-medium">{data.liveActivityEvent.mode}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
