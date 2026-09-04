import React from "react";
import { m as motion } from "framer-motion";
import { Calendar, ArrowRight, MapPin, Clock, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EventItem } from "@/domains/events/event.service";

interface FeaturedEventsProps {
  eyebrow: string;
  title: string;
  events: EventItem[];
}

function DaysAway({ dateStr }: { dateStr: string }) {
  const days = Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (days < 0) return null;
  if (days === 0) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
      <Flame className="w-2.5 h-2.5" /> TODAY
    </span>
  );
  if (days <= 7) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
      <Clock className="w-2.5 h-2.5" /> {days}d away
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
      <Calendar className="w-2.5 h-2.5" /> {days} days
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ eyebrow, title, events }) => {
  return (
    <section id="upcoming-events" className="relative bg-white py-28 overflow-hidden">
      {/* Soft background radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 opacity-70 blur-3xl translate-x-1/3 -translate-y-1/3 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 opacity-80 blur-3xl -translate-x-1/4 translate-y-1/4 rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {eyebrow}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {title}
            </h2>
            <div className="mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
          </div>
          <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-sm shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105">
            <Link to="/events">
              Browse Full Calendar <Calendar className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, i) => {
              const formattedDate = new Date(event.start_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <motion.div
                  key={event.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-400 flex flex-col hover:-translate-y-2"
                >
                  {/* Poster thumbnail */}
                  <div className="relative overflow-hidden" style={{ height: "270px" }}>
                    <img
                      src={event.banner_url || "/assets/events/kss2026ep03-poster.webp"}
                      alt={event.title}
                      className="w-full h-full object-cover object-top group-hover:scale-107 transition-transform duration-700 ease-out"
                      style={{ "--tw-scale-x": "1.07", "--tw-scale-y": "1.07" } as any}
                    />
                    {/* Shimmer sweep on hover */}
                    <div className="absolute inset-0 translate-x-[-100%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md">
                        {event.status || "Upcoming"}
                      </span>
                      <DaysAway dateStr={event.start_date} />
                    </div>

                    {/* Domain badge bottom */}
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-blue-700 px-2.5 py-1 rounded-full shadow-sm border border-blue-100">
                      {event.domain || event.format || "Tech Event"}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                      {event.description || "Join community builders and practitioners for an interactive technical session."}
                    </p>

                    <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{event.location || event.mode || "Online"}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs h-10 group/btn shadow-sm hover:shadow-blue-500/30 transition-all">
                      <Link to="/events">
                        Register Free
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50/50 p-14 text-center max-w-xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-5">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">New Events Being Scheduled</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Our community leads are curating the next set of workshops, hackathons, and webinars.
            </p>
            <Button asChild variant="outline" className="rounded-full font-bold text-xs border-blue-300 text-blue-600 hover:bg-blue-50">
              <Link to="/knowledge">Explore Knowledge Hub</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
