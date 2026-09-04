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
    <section className="bg-slate-900 text-white py-16 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
          {data.eyebrow}
        </span>
        <h3 className="text-xl font-bold text-white mb-8">{data.title}</h3>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {data.partners.map((partner) => (
            <div
              key={partner.id}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:border-blue-500/50 hover:text-white transition-all"
            >
              <div className="text-white font-bold">{partner.name}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{partner.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
