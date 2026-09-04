import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { OpportunitiesShowcaseData } from "../types/homepage.types";

interface OpportunitiesShowcaseProps {
  data: OpportunitiesShowcaseData;
}

export const OpportunitiesShowcase: React.FC<OpportunitiesShowcaseProps> = ({ data }) => {
  if (!data.opportunities || data.opportunities.length === 0) {
    return null;
  }

  return (
    <section id="opportunities-showcase" className="bg-white py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              {data.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {data.title}
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full border-slate-300 font-bold text-sm">
            <Link to="/opportunities">
              All Opportunities <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.opportunities.map((opp) => (
            <div
              key={opp.id}
              className="rounded-3xl border border-purple-100 bg-purple-50/30 p-8 hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded border border-purple-200">
                    {opp.type}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500">{opp.domain}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{opp.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{opp.desc}</p>
              </div>
              <Button asChild className="w-full rounded-full bg-purple-600 hover:bg-purple-700 font-bold text-xs">
                <Link to={opp.applyLink as any}>
                  Apply Now <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
