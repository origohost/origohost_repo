import React from "react";
import { CommunityProofData } from "../types/homepage.types";

interface CommunityProofProps {
  data: CommunityProofData;
}

export const CommunityProof: React.FC<CommunityProofProps> = ({ data }) => {
  return (
    <section className="bg-slate-900 border-y border-white/10 py-10 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {data.impactCounters.map((counter, idx) => (
            <div key={counter.label} className={idx > 0 ? "pl-4" : ""}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">{counter.label}</div>
              <div className="text-xs sm:text-sm font-bold text-blue-400 mt-1">{counter.value}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{counter.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
