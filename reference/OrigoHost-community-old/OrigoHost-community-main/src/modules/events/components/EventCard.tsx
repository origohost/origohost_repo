import React from "react";
import { Link } from "@tanstack/react-router";
import { m as motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import type { EventV2 } from "../types";

interface EventCardProps {
  event: EventV2;
}

export const EventCard = React.memo(function EventCard({ event }: EventCardProps) {
  const isLive = event.status === "Live";
  const isPast = event.status === "Past";
  const isUpcoming = event.status === "Upcoming";

  // Parse date for the calendar badge
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString("default", { month: "short" }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <Link
      to="/community/events/$eventId"
      params={{ eventId: event.slug }}
      className="block w-full h-full group"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border ${
          isLive ? "border-red-500/50 hover:shadow-red-500/20" : "border-gray-100"
        }`}
      >
        {/* Glow effect for LIVE events */}
        {isLive && (
          <div className="absolute inset-0 rounded-3xl shadow-[0_0_30px_rgba(239,68,68,0.3)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Thumbnail & Badges */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <motion.img
            loading="lazy"
            decoding="async"
            src={
              event.thumbnail_url ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
            }
            alt={event.title}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              isPast ? "grayscale opacity-80" : ""
            }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {/* Date Badge */}
            <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-2xl px-4 py-2 flex flex-col items-center shadow-lg border border-white/20">
              <span className="text-xs font-bold text-blue-600 leading-none mb-1">{month}</span>
              <span className="text-2xl font-black leading-none">{day}</span>
            </div>

            {/* Status Badge */}
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full backdrop-blur-md shadow-sm border ${
                  isLive
                    ? "bg-red-500 text-white border-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    : isPast
                      ? "bg-gray-800/80 text-gray-300 border-gray-600"
                      : "bg-blue-600 text-white border-blue-500 shadow-blue-500/30"
                }`}
              >
                {isLive && (
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                )}
                {event.status}
              </span>

              {event.category && (
                <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10">
                  {event.category}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Banner inside Image (Location/Mode) */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 text-white/90 text-sm font-medium">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <MapPin className="w-4 h-4" />
              <span className="capitalize">{event.mode}</span>
            </div>
            {event.max_seats && (
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <Users className="w-4 h-4" />
                <span>{event.max_seats} Seats</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>
                {event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)} {event.timezone}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
            {event.short_description}
          </p>

          {/* Footer Action */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-400">
              {event.organizers && event.organizers.length > 0
                ? `By ${event.organizers.map((o) => o.name).join(", ")}`
                : "By OrigoHOST"}
            </span>

            <div
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all shadow-md hover:shadow-lg ${
                isLive
                  ? "bg-red-600 hover:bg-red-700 shadow-red-500/30"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"
              }`}
            >
              {isLive ? "Join Event" : "View Details"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});
