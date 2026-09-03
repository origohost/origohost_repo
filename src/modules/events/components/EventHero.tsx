import { useEffect, useState } from "react";
import { m as motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Share2, Plus, Clock } from "lucide-react";
import type { EventV2 } from "../types";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface EventHeroProps {
  event: EventV2;
  onRegisterClick: () => void;
}

export function EventHero({ event, onRegisterClick }: EventHeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const isLive = event.status === "Live";
  const isPast = event.status === "Past";

  // Simple countdown logic
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(
    null,
  );

  useEffect(() => {
    if (isPast) return;

    // Combining date and time for JS Date parser
    // E.g. "2024-05-10" and "09:00:00" => "2024-05-10T09:00:00Z" (We assume local time for simplicity here)
    const target = new Date(`${event.date}T${event.start_time}`);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event.date, event.start_time, isPast]);

  const bannerImg =
    event.banner_url ||
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-black flex items-center justify-center pt-24 lg:pt-32">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <OptimizedImage
          priority
          src={bannerImg}
          alt={event.title}
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <span
              className={`px-3 py-1 backdrop-blur-md border rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider ${
                isLive
                  ? "bg-red-500/80 border-red-400 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                  : isPast
                    ? "bg-gray-800/80 border-gray-600 text-gray-300"
                    : "bg-blue-600/80 border-blue-400 text-white"
              }`}
            >
              {isLive && (
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
              )}
              {isPast ? "Completed" : event.status}
            </span>
            {event.category && (
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                {event.category}
              </span>
            )}
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
              {event.mode}
            </span>
            {/* @ts-ignore */}
            {event.seo_metadata?.badges?.map((badge: string) => (
              <span
                key={badge}
                className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6"
          >
            {event.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
          >
            {event.short_description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 mb-10 text-white/90 font-medium"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>
                {event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)} {event.timezone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="capitalize">
                {event.mode === "offline" ? event.venue_name || "In-Person" : event.mode}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {!isPast && (
              <button
                onClick={onRegisterClick}
                className="px-8 py-4 bg-white text-black rounded-full font-black text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                {isLive ? "Join Now" : "Register Now"}
              </button>
            )}

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="flex items-center gap-2 px-6 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>

            {!isPast && (
              <button
                onClick={() => {
                  const start = new Date(`${event.date}T${event.start_time}`)
                    .toISOString()
                    .replace(/-|:|\.\d\d\d/g, "");
                  const end = event.end_time
                    ? new Date(`${event.date}T${event.end_time}`)
                        .toISOString()
                        .replace(/-|:|\.\d\d\d/g, "")
                    : start;
                  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&location=${encodeURIComponent(event.venue_name || event.mode)}`;
                  window.open(url, "_blank");
                }}
                className="flex items-center gap-2 px-6 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Calendar
              </button>
            )}
          </motion.div>
        </div>

        {/* Countdown Overlay */}
        {!isPast && timeLeft && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-[-40px] bg-black/60 backdrop-blur-2xl border border-white/10 p-4 sm:p-6 rounded-3xl shadow-2xl flex justify-around sm:justify-start sm:gap-6"
          >
            {[
              { label: "DAYS", value: timeLeft.d },
              { label: "HOURS", value: timeLeft.h },
              { label: "MINS", value: timeLeft.m },
              { label: "SECS", value: timeLeft.s },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                  {unit.value.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
