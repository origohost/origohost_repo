import React from "react";
import { BookOpen, Code2, Users, Trophy, CheckCircle2 } from "lucide-react";
import { ParticipationPillar, CommunityProofData } from "../types/homepage.types";

interface ParticipationSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  pillars: ParticipationPillar[];
  mosaicImages: CommunityProofData["mosaicImages"];
}

const ICON_MAP: Record<string, any> = {
  BookOpen,
  Code2,
  Users,
  Trophy,
};

export const ParticipationSection: React.FC<ParticipationSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  pillars,
  mosaicImages,
}) => {
  return (
    <section id="participate" className="relative bg-white py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            {subtitle}
          </p>
        </div>

        {/* 2-COLUMN LAYOUT: PHOTO MOSAIC + 4 PILLARS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3-Photo Community Mosaic */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-16/10 group">
              <img
                src={mosaicImages.hero}
                alt="OrigoHOST Community Event Audience"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square group">
              <img
                src={mosaicImages.community}
                alt="OrigoHOST Organizers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square group">
              <img
                src={mosaicImages.workshop}
                alt="OrigoHOST Workshop Session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: 4 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = ICON_MAP[pillar.iconName] || BookOpen;
              return (
                <div
                  key={pillar.title}
                  className={`rounded-3xl border ${pillar.border} bg-slate-50/50 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-2xl ${pillar.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${pillar.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block mb-1">
                      PILLAR {pillar.title}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{pillar.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{pillar.desc}</p>

                    <ul className="space-y-1.5 text-xs font-bold text-slate-800 border-t border-slate-200/60 pt-3">
                      {pillar.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
