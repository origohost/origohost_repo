import React from "react";
import { Sparkles, ArrowRight, Star, Mic } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { OpportunitiesShowcaseData } from "../types/homepage.types";

interface OpportunitiesShowcaseProps {
  data: OpportunitiesShowcaseData;
}

const OPP_ICONS: Record<string, any> = {
  LEADERSHIP: Star,
  MENTORSHIP: Mic,
  SPEAKING: Mic,
};

export const OpportunitiesShowcase: React.FC<OpportunitiesShowcaseProps> = ({ data }) => {
  if (!data.opportunities || data.opportunities.length === 0) {
    return null;
  }

  return (
    <section id="opportunities-showcase" className="bg-white py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              {data.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              {data.title}
            </h2>
          </div>
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shrink-0"
          >
            All Opportunities <Sparkles className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.opportunities.map((opp) => {
            const OppIcon = OPP_ICONS[opp.type?.toUpperCase()] || Star;
            return (
              <div
                key={opp.id}
                className="rounded-3xl border border-slate-200 bg-slate-50/60 p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Icon + Type badges */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <OppIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
                      {opp.type}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {opp.domain}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{opp.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-1">{opp.desc}</p>

                <Link
                  to={opp.applyLink as any}
                  className="inline-flex items-center justify-center w-full h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
