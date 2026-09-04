import React from "react";
import { m as motion } from "framer-motion";
import {
  ArrowRight, Calendar, Mic, Lightbulb, Code2, Video, Users, Layers, BookOpen
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { EventExperiencesData } from "../types/homepage.types";

interface EventExperiencesProps {
  data: EventExperiencesData;
}

const FORMAT_ICONS: Record<string, any> = {
  Hackathon: Code2,
  Ideathon: Lightbulb,
  Meetup: Users,
  Webinar: Video,
  KSS: Mic,
  Workshop: BookOpen,
  Seminar: Layers,
};

const FORMAT_COLORS: Record<string, { icon: string; border: string; bg: string }> = {
  Hackathon: { icon: "text-purple-400", border: "border-l-purple-500", bg: "hover:bg-purple-500/8" },
  Ideathon:  { icon: "text-amber-400",  border: "border-l-amber-500",  bg: "hover:bg-amber-500/8" },
  Meetup:    { icon: "text-emerald-400",border: "border-l-emerald-500",bg: "hover:bg-emerald-500/8" },
  Webinar:   { icon: "text-blue-400",   border: "border-l-blue-500",   bg: "hover:bg-blue-500/8" },
  KSS:       { icon: "text-cyan-400",   border: "border-l-cyan-500",   bg: "hover:bg-cyan-500/8" },
  Workshop:  { icon: "text-rose-400",   border: "border-l-rose-500",   bg: "hover:bg-rose-500/8" },
  Seminar:   { icon: "text-indigo-400", border: "border-l-indigo-500", bg: "hover:bg-indigo-500/8" },
};

function getFormatTheme(name: string) {
  // Try to find the best matching key
  for (const key of Object.keys(FORMAT_COLORS)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return { icon: FORMAT_ICONS[key], colors: FORMAT_COLORS[key] };
  }
  return { icon: Layers, colors: FORMAT_COLORS.Seminar };
}

export const EventExperiences: React.FC<EventExperiencesProps> = ({ data }) => {
  return (
    <section id="event-experiences" className="relative bg-[#030712] py-28 text-white overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-3 pointer-events-none noise-overlay" />

      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-blue-700/8 rounded-full blur-[120px] animate-orb-2" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[400px] bg-purple-700/8 rounded-full blur-[100px] animate-orb-1" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/15 px-4 py-2 rounded-full border border-blue-500/30">
              <Calendar className="w-3.5 h-3.5" />
              {data.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {data.title}
            </h2>
            <div className="mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-white/20 bg-white/5 text-white text-sm font-bold hover:bg-white/12 hover:border-blue-400/50 transition-all duration-200 group"
          >
            Explore All Formats
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* FEATURED POSTER BANNER + FORMAT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Featured Poster (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden border border-white/12 shadow-2xl relative group bg-slate-900 flex flex-col"
          >
            {/* Glow ring on hover */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-blue-500/30 via-cyan-500/10 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative overflow-hidden" style={{ maxHeight: "400px" }}>
              <img
                src={data.flagshipPoster.posterUrl}
                alt={data.flagshipPoster.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

              {/* Live badge if applicable */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {data.flagshipPoster.tag}
                </div>
              </div>
            </div>

            <div className="relative z-10 p-6 bg-slate-900 border-t border-white/8">
              <h3 className="text-xl font-bold text-white mt-1">{data.flagshipPoster.title}</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{data.flagshipPoster.subtitle}</p>
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
              >
                Register Now <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Format Cards (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {data.formats.map((fmt, i) => {
              const { icon: Icon, colors } = getFormatTheme(fmt.name);
              return (
                <motion.div
                  key={fmt.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`group relative rounded-2xl border-l-4 ${colors.border} border border-white/8 bg-white/3 p-5 backdrop-blur-sm ${colors.bg} transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-white/15`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-5 h-5 ${colors.icon} shrink-0`} />
                      <h4 className="text-sm font-bold text-white">{fmt.name}</h4>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 ${colors.icon} opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-7">{fmt.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
