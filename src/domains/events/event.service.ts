import { supabase } from "@/integrations/supabase/client";

export interface EventFilterOptions {
  search?: string;
  format?: string;
  domain?: string;
  industry?: string;
  mode?: "all" | "online" | "offline" | "hybrid";
  status?: "all" | "upcoming" | "live" | "past";
  limit?: number;
  offset?: number;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  mode: string | null;
  format: string | null;
  domain: string | null;
  industry: string | null;
  status: string | null;
  capacity: number | null;
  banner_url: string | null;
  tags: string[] | null;
  created_at: string;
}

export class EventService {
  /**
   * Fetch events matching taxonomy filters (Format x Domain x Industry)
   */
  static async getEvents(options: EventFilterOptions = {}): Promise<{ events: EventItem[]; total: number }> {
    try {
      let query = supabase.from("events").select("*", { count: "exact" });

      // Search term
      if (options.search && options.search.trim()) {
        const term = `%${options.search.trim()}%`;
        query = query.or(`title.ilike.${term},description.ilike.${term},location.ilike.${term}`);
      }

      // Mode filter
      if (options.mode && options.mode !== "all") {
        query = query.ilike("mode", `%${options.mode}%`);
      }

      // Format filter
      if (options.format && options.format !== "all") {
        query = query.or(`format.ilike.%${options.format}%,tags.cs.{${options.format}}`);
      }

      // Domain filter
      if (options.domain && options.domain !== "all") {
        query = query.or(`domain.ilike.%${options.domain}%,tags.cs.{${options.domain}}`);
      }

      // Industry filter
      if (options.industry && options.industry !== "all") {
        query = query.or(`industry.ilike.%${options.industry}%,tags.cs.{${options.industry}}`);
      }

      // Status filter
      const nowIso = new Date().toISOString();
      if (options.status === "upcoming") {
        query = query.gte("start_date", nowIso);
      } else if (options.status === "past") {
        query = query.lt("start_date", nowIso);
      }

      // Ordering & Pagination
      query = query.order("start_date", { ascending: options.status !== "past" });

      if (options.limit) {
        const offset = options.offset || 0;
        query = query.range(offset, offset + options.limit - 1);
      }

      const { data, count, error } = await query;

      if (error) {
        console.warn("EventService: Error querying events:", error.message);
        return { events: [], total: 0 };
      }

      return {
        events: data || [],
        total: count || (data?.length || 0),
      };
    } catch (err: any) {
      console.error("EventService: Exception fetching events:", err);
      return { events: [], total: 0 };
    }
  }

  /**
   * Fetch single event details by slug or id
   */
  static async getEventBySlug(slugOrId: string): Promise<EventItem | null> {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .maybeSingle();

    if (error || !data) {
      return null;
    }
    return data;
  }
}
