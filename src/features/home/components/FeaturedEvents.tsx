import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EventItem } from "@/domains/events/event.service";

interface FeaturedEventsProps {
  eyebrow: string;
  title: string;
  events: EventItem[];
}

export const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ eyebrow, title, events }) => {
  return (
    <section id="upcoming-events" className="bg-slate-50 py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {title}
            </h2>
          </div>
          <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-sm">
            <Link to="/events">
              Browse Full Calendar <Calendar className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => {
              const formattedDate = new Date(event.start_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={event.id}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={event.banner_url || "/assets/events/kss2026ep03-poster.webp"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md">
                        {event.status || "Upcoming"}
                      </span>
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                        {event.domain || event.format || "Technology Event"}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {event.description || "Join community builders and practitioners for an interactive technical session."}
                      </p>
                      <div className="text-xs text-slate-500 font-semibold space-y-1">
                        <div>📅 Date: {formattedDate}</div>
                        <div>📍 Mode: {event.location || event.mode || "Online"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs">
                      <Link to="/events">
                        Register Free <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-xl mx-auto">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">New Events Being Scheduled</h3>
            <p className="text-xs text-slate-600 mb-6">
              Our community leads are curating the next set of workshops, hackathons, and webinars. Explore knowledge resources in the meantime.
            </p>
            <Button asChild variant="outline" className="rounded-full font-bold text-xs">
              <Link to="/knowledge">Explore Knowledge Hub</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
