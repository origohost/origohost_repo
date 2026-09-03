import { supabase } from "@/integrations/supabase/client";
import type { EventV2, EventStatus } from "../types";

export function calculateEventStatus(
  startDate: string,
  startTime: string,
  endTime: string,
  tz: string,
): EventStatus {
  // Use Date objects for robust comparison regardless of string format (e.g. DD-MM-YYYY vs YYYY-MM-DD)
  const eventDateObj = new Date(startDate);
  const now = new Date();

  // Strip time for pure date comparison
  eventDateObj.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  if (eventDateObj > now) {
    return "Upcoming";
  } else if (eventDateObj < now) {
    return "Past";
  } else {
    // Event is today.
    const currentNow = new Date();
    const currentTime = currentNow.toTimeString().slice(0, 5); // "HH:MM"
    if (currentTime < startTime) return "Upcoming";
    if (currentTime > endTime) return "Past";
    return "Live";
  }
}

import { createServerFn } from "@tanstack/react-start";
import { fetchWithCache } from "@/lib/redis";

const getEventsFn = createServerFn({ method: "GET" })
  .validator((d: { limit?: number }) => d)
  .handler(async ({ data: { limit = 100 } }) => {
    return fetchWithCache(
      `public:events:list:${limit}`,
      async () => {
        const { data, error } = await supabase
          .from("events_v2")
          .select(
            `
          id, slug, title, short_description, date, start_time, end_time, mode, venue_name, thumbnail_url, is_published, timezone,
          speakers:event_speakers (speaker:speakers (id, name, avatar_url)),
          organizers:event_organizers (id, logo_url)
        `,
          )
          .order("date", { ascending: true })
          .limit(limit);

        if (error) throw error;

        return (data || []).map((event: any) => ({
          ...event,
          status: calculateEventStatus(
            event.date,
            event.start_time,
            event.end_time,
            event.timezone,
          ),
        })) as EventV2[];
      },
      300,
    ); // 5 min edge/redis cache
  });

const getEventBySlugFn = createServerFn({ method: "GET" })
  .validator((d: { slug: string }) => d)
  .handler(async ({ data: { slug } }) => {
    return fetchWithCache(
      `public:event:${slug}`,
      async () => {
        const { data, error } = await supabase
          .from("events_v2")
          .select(
            `
          *,
          speakers:event_speakers (
            session_title,
            speaking_time,
            speaker:speakers (*)
          ),
          organizers:event_organizers (*),
          agenda:event_agenda (*),
          faqs:event_faqs (*),
          gallery:event_gallery (*),
          downloads:event_downloads (*)
        `,
          )
          .eq("slug", slug)
          .single();

        if (error && error.code !== "PGRST116") throw error;
        if (!data) return null;

        const formattedEvent = {
          ...data,
          speakers: data.speakers?.map((s: any) => ({
            ...s.speaker,
            session_title: s.session_title,
            speaking_time: s.speaking_time,
          })),
          status: calculateEventStatus(data.date, data.start_time, data.end_time, data.timezone),
        };

        return formattedEvent as EventV2;
      },
      300,
    );
  });

export const eventApi = {
  async getEvents(limit = 100): Promise<EventV2[]> {
    return getEventsFn({ data: { limit } });
  },

  async getEventBySlug(slug: string): Promise<EventV2 | null> {
    return getEventBySlugFn({ data: { slug } });
  },
};
