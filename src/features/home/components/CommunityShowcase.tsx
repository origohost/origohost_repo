import React from "react";
import { CommunityShowcaseData } from "../types/homepage.types";

interface CommunityShowcaseProps {
  data: CommunityShowcaseData;
}

export const CommunityShowcase: React.FC<CommunityShowcaseProps> = ({ data }) => {
  return (
    <section id="community-people" className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/20 px-3.5 py-1.5 rounded-full border border-purple-500/30">
            {data.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {data.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {data.leaders.map((leader) => (
            <div
              key={leader.name}
              className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-400/50 mb-4 group-hover:scale-105 transition-transform duration-500 shadow-xl">
                <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white">{leader.name}</h3>
              <span className="text-xs font-bold text-purple-400 mt-0.5">{leader.role}</span>
              <span className="text-[11px] text-slate-400 block mb-3">{leader.org}</span>
              <p className="text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                Focus: {leader.focus}
              </p>
            </div>
          ))}
        </div>

        {/* VERIFIED CERTIFICATION PROOF BANNER */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900 p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
              {data.verifiedCertificate.tag}
            </span>
            <h3 className="text-2xl font-bold text-white">{data.verifiedCertificate.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.verifiedCertificate.desc}
            </p>
          </div>
          <div className="w-full lg:w-72 h-44 rounded-2xl overflow-hidden border border-white/20 shadow-xl shrink-0">
            <img
              src={data.verifiedCertificate.certImageUrl}
              alt="OrigoHOST Certificate Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
