import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EventExperiencesData } from "../types/homepage.types";

interface EventExperiencesProps {
  data: EventExperiencesData;
}

export const EventExperiences: React.FC<EventExperiencesProps> = ({ data }) => {
  return (
    <section id="event-experiences" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3.5 py-1.5 rounded-full border border-blue-500/30">
              {data.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {data.title}
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/20 text-white hover:bg-white/10 font-bold text-sm"
          >
            <Link to="/events">
              Explore All Formats <Calendar className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* FEATURED POSTER BANNER + FORMAT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Featured Poster Banner (5 Columns) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative group bg-slate-900">
            <img
              src={data.flagshipPoster.posterUrl}
              alt={data.flagshipPoster.title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="p-6 bg-slate-900 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded border border-blue-500/30">
                {data.flagshipPoster.tag}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{data.flagshipPoster.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{data.flagshipPoster.subtitle}</p>
            </div>
          </div>

          {/* Format Cards (7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.formats.map((fmt) => (
              <div
                key={fmt.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
              >
                <h4 className="text-base font-bold text-white mb-1 flex items-center justify-between">
                  <span>{fmt.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 opacity-60" />
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
