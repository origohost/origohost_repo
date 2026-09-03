/**
 * Partners persistence — backed by `public.partners` in Supabase.
 *
 * Public API kept identical to the previous localStorage version so the
 * admin editor and marquee do not need to change shape:
 *
 *   loadPartnersContent()   → sync bundled defaults (used for SSR + first paint)
 *   fetchPartnersContent()  → async source-of-truth from Supabase
 *   savePartnersContent()   → async: writes rows + reorders
 *   resetPartnersContent()  → async: wipes the table (admin only, RLS enforces)
 */
import type { PartnersContent, PartnerLogoEntry } from "../types";
import {
  PartnersContentOrderedSchema,
  PartnersContentDriftError,
  partnersContent as bundledDefaults,
  partnersContentDefaultsRaw,
} from "./partners";
import { supabase } from "@/integrations/supabase/client";

interface PartnerRow {
  id: string;
  kind: "logo" | "institute";
  name: string;
  domain: string | null;
  sort_order: number;
}

function rowsToContent(rows: PartnerRow[]): PartnersContent {
  const toEntry = (r: PartnerRow): PartnerLogoEntry => ({
    name: r.name,
    ...(r.domain ? { domain: r.domain } : {}),
  });
  const logos = rows
    .filter((r) => r.kind === "logo")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(toEntry);
  const institutes = rows
    .filter((r) => r.kind === "institute")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(toEntry);
  // If DB is empty, fall back to bundled defaults so the site never blanks.
  if (logos.length === 0 && institutes.length === 0) return bundledDefaults;
  return {
    meta: bundledDefaults.meta,
    tracks: bundledDefaults.tracks,
    logos,
    institutes,
  };
}

/** Sync bundled defaults — used by SSR and by the admin page's initial state. */
export function loadPartnersContent(): PartnersContent {
  return bundledDefaults;
}

/** Async: read from Supabase. Returns bundled defaults if the table is empty. */
export async function fetchPartnersContent(): Promise<PartnersContent> {
  const { data, error } = await supabase
    .from("partners")
    .select("id, kind, name, domain, sort_order")
    .order("kind", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) {
    console.warn("[partners-store] fetch failed, using bundled defaults:", error.message);
    return bundledDefaults;
  }
  return rowsToContent((data ?? []) as PartnerRow[]);
}

/**
 * Save: validates via Zod, then does a full replace of the two lists.
 * Admin-only (RLS enforces). Simple + correct: delete all rows, insert new.
 */
export async function savePartnersContent(next: PartnersContent): Promise<PartnersContent> {
  const result = PartnersContentOrderedSchema.safeParse(next);
  if (!result.success) throw new PartnersContentDriftError(result.error);
  const validated = result.data;

  const rows = [
    ...validated.logos.map((e, i) => ({
      kind: "logo" as const,
      name: e.name,
      domain: e.domain ?? null,
      sort_order: i,
    })),
    ...(validated.institutes ?? []).map((e, i) => ({
      kind: "institute" as const,
      name: e.name,
      domain: e.domain ?? null,
      sort_order: i,
    })),
  ];

  const { error: delErr } = await supabase
    .from("partners")
    .delete()
    .in("kind", ["logo", "institute"]);
  if (delErr) throw new Error(`Failed to clear partners: ${delErr.message}`);

  if (rows.length > 0) {
    const { error: insErr } = await supabase.from("partners").insert(rows);
    if (insErr) throw new Error(`Failed to save partners: ${insErr.message}`);
  }

  return validated;
}

/** Wipe all rows — admin-only via RLS. */
export async function resetPartnersContent(): Promise<PartnersContent> {
  const { error } = await supabase.from("partners").delete().in("kind", ["logo", "institute"]);
  if (error) throw new Error(`Failed to reset partners: ${error.message}`);
  return bundledDefaults;
}

export { partnersContentDefaultsRaw };
