import React from "react";
import { EcosystemPartnersData } from "../types/homepage.types";

interface EcosystemPartnersProps {
  data: EcosystemPartnersData;
}

export const EcosystemPartners: React.FC<EcosystemPartnersProps> = ({ data }) => {
  if (!data.partners || data.partners.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-950 text-white py-20 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">
            {data.eyebrow}
          </span>
          <h3 className="text-2xl font-black text-white">{data.title}</h3>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {data.partners.map((partner) => (
            <div
              key={partner.id}
              className="group relative px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-white font-bold text-sm mb-1 group-hover:text-blue-300 transition-colors">{partner.name}</div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{partner.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
