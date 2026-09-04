import React from "react";
import { Brain, Cloud, Shield, Bot, Cpu, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ExploreTechnologyData } from "../types/homepage.types";

interface ExploreTechnologyProps {
  data: ExploreTechnologyData;
}

const ICON_MAP: Record<string, any> = {
  Brain,
  Cloud,
  Shield,
  Bot,
  Cpu,
};

export const ExploreTechnology: React.FC<ExploreTechnologyProps> = ({ data }) => {
  return (
    <section id="explore-technology" className="bg-slate-900 py-24 text-white border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/20 px-3.5 py-1.5 rounded-full border border-cyan-500/30">
            {data.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {data.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.domains.map((domain) => {
            const Icon = ICON_MAP[domain.iconName] || Cpu;
            return (
              <div
                key={domain.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-white/10 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{domain.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{domain.desc}</p>
                </div>

                <div>
                  <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-white/10 mb-6 text-[10px] font-mono text-slate-300">
                    <div>
                      <span className="font-bold text-white block text-sm">{domain.eventCount}</span>
                      <span>Events</span>
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm">{domain.projectCount}</span>
                      <span>Projects</span>
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm">{domain.articleCount}</span>
                      <span>Articles</span>
                    </div>
                  </div>

                  <Link
                    to="/events"
                    className="inline-flex items-center justify-center w-full h-9 px-4 rounded-full border border-white/30 bg-transparent text-white text-xs font-bold gap-1.5 hover:bg-white/15 hover:border-cyan-400/60 transition-all duration-200"
                  >
                    Explore Domain <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
