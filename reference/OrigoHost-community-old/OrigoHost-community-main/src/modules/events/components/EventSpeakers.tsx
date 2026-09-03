import React from "react";
import { m as motion } from "framer-motion";
import { Linkedin, Twitter, Globe, Github } from "lucide-react";
import type { EventSpeaker } from "../types";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface EventSpeakersProps {
  speakers: EventSpeaker[];
}

export const EventSpeakers = React.memo(function EventSpeakers({ speakers }: EventSpeakersProps) {
  if (!speakers || speakers.length === 0) return null;

  return (
    <div className="py-12">
      <h2 className="text-3xl font-black text-gray-900 mb-8">Featured Speakers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {speakers.map((speaker, idx) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-gray-50 group-hover:border-blue-50 transition-colors">
                <OptimizedImage
                  src={
                    speaker.avatar_url ||
                    "https://ui-avatars.com/api/?name=" + encodeURIComponent(speaker.name)
                  }
                  alt={speaker.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  containerClassName="w-full h-full rounded-full"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
              <p className="text-blue-600 font-medium text-sm mb-1">{speaker.designation}</p>
              <p className="text-gray-500 text-sm mb-4">{speaker.organization}</p>

              {speaker.session_title && (
                <div className="w-full bg-gray-50 rounded-xl p-3 mb-4 text-left">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Session
                  </p>
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {speaker.session_title}
                  </p>
                  {speaker.speaking_time && (
                    <p className="text-xs text-gray-500 mt-1">{speaker.speaking_time}</p>
                  )}
                </div>
              )}

              {/* Social Links */}
              {speaker.social_links && (
                <div className="flex items-center gap-3 mt-auto">
                  {speaker.social_links.twitter && (
                    <a
                      href={speaker.social_links.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {speaker.social_links.linkedin && (
                    <a
                      href={speaker.social_links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {speaker.social_links.github && (
                    <a
                      href={speaker.social_links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {speaker.social_links.website && (
                    <a
                      href={speaker.social_links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});
