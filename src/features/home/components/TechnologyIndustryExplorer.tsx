import React from "react";
import { Brain, Cloud, Shield, Bot, Sprout, HeartPulse, Coins, Landmark } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TechnologyIndustryData } from "../types/homepage.types";

interface TechnologyIndustryExplorerProps {
  data: TechnologyIndustryData;
}

const ICON_MAP: Record<string, any> = {
  Brain,
  Cloud,
  Shield,
  Bot,
  Sprout,
  HeartPulse,
  Coins,
  Landmark,
};

export const TechnologyIndustryExplorer: React.FC<TechnologyIndustryExplorerProps> = ({ data }) => {
  return (
    <section id="taxonomy-matrix" className="bg-white py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            {data.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            {data.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.highlights.map((item) => {
            const IndustryIcon = ICON_MAP[item.industryIconName] || Landmark;
            return (
              <div
                key={item.title}
                className="rounded-3xl bg-slate-50/50 p-6 shadow-xs border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block border mb-4 ${item.tagColor}`}
                  >
                    {item.title}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.tech}</h3>
                  <div className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                    <span>In</span> <IndustryIcon className="w-3.5 h-3.5 text-blue-600" /> <span>{item.industry}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                </div>
                <Button asChild variant="outline" className="w-full rounded-full border-slate-300 text-xs font-bold">
                  <Link to="/events">Explore Intersection</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
