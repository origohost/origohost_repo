import { supabase } from "@/integrations/supabase/client";

export interface EventFormat {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number;
}

export interface TechnologyDomain {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number;
}

export class TaxonomyService {
  /**
   * Fetch all event formats ordered by sort_order
   */
  static async getEventFormats(): Promise<EventFormat[]> {
    const { data, error } = await supabase
      .from("event_formats")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("TaxonomyService: Error fetching event_formats, using fallback:", error.message);
      return [];
    }
    return data || [];
  }

  /**
   * Fetch all technology domains ordered by sort_order
   */
  static async getTechnologyDomains(): Promise<TechnologyDomain[]> {
    const { data, error } = await supabase
      .from("technology_domains")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("TaxonomyService: Error fetching technology_domains, using fallback:", error.message);
      return [];
    }
    return data || [];
  }

  /**
   * Fetch all real-world industries ordered by sort_order
   */
  static async getIndustries(): Promise<Industry[]> {
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("TaxonomyService: Error fetching industries, using fallback:", error.message);
      return [];
    }
    return data || [];
  }
}
