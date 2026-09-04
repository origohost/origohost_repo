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
    <section id="participate" className="relative bg-white py-24 border-b border-slate-100 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-50 opacity-50 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
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

        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT: Editorial Photo Stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* HERO IMAGE — tall, cinematic 300px */}
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 group"
              style={{ height: "300px" }}
            >
              <img
                src={mosaicImages.hero}
                alt="OrigoHOST Community Event"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
              {/* Floating live stat chip */}
              <div className="absolute bottom-5 left-5">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg border border-white/60 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]" />
                  <span className="text-xs font-bold text-slate-800">500+ Community Members</span>
                </div>
              </div>
              {/* Top-right event tag */}
              <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Flagship Events
              </div>
            </div>

            {/* BOTTOM ROW: Two labeled thumbnails, 175px each */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group"
                style={{ height: "175px" }}
              >
                <img
                  src={mosaicImages.community}
                  alt="OrigoHOST Organizers"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                    Community
                  </span>
                </div>
              </div>

              <div
                className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group"
                style={{ height: "175px" }}
              >
                <img
                  src={mosaicImages.workshop}
                  alt="OrigoHOST Workshop Session"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                    Workshops
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "50+", label: "Events Hosted" },
                { val: "12+", label: "Tech Domains" },
                { val: "500+", label: "Builders" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center hover:border-blue-300 hover:bg-blue-50/60 transition-all duration-300 cursor-default"
                >
                  <div className="text-2xl font-black text-blue-600">{s.val}</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 4 Pillar Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar) => {
              const Icon = ICON_MAP[pillar.iconName] || BookOpen;
              return (
                <div
                  key={pillar.title}
                  className={`rounded-3xl border ${pillar.border} bg-slate-50/60 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.bg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${pillar.color}`} />
                    </div>
                    <span className="text-[9px] font-mono font-black tracking-widest text-slate-400 uppercase bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                      Pillar
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-1.5">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5 flex-1">{pillar.desc}</p>

                  <ul className="space-y-2 border-t border-slate-200/80 pt-4">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
