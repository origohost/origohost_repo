import { queryOptions } from "@tanstack/react-query";
import { partnersContentDriftError } from "./content/partners";
import { fetchPartnersContent } from "./content/partners.store";
import type { PartnersContent } from "./types";
import { queryKeys } from "@/lib/query-keys";

/**
 * Reads partner content from Supabase (public.partners). Falls back to the
 * bundled defaults inside the store when the table is empty, so the public
 * /partners page always renders.
 */
export async function fetchPartners(): Promise<PartnersContent> {
  if (partnersContentDriftError) throw partnersContentDriftError;
  return fetchPartnersContent();
}

export const partnersQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.partners.list(),
    queryFn: fetchPartners,
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
