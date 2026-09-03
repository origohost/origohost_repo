import { CONSENT_VERSION, DEFAULT_PREFERENCES, type StoredConsent } from "./types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Cookie consent storage.
 *
 * localStorage is the fast synchronous cache. Supabase is the source of
 * truth so the same visitor sees the same decision across devices/browsers
 * once they sign in (rows can later be re-keyed to auth.uid()).
 *
 * Table: public.cookie_consents  (visitor_id uuid PK)
 */

export const STORAGE_KEY = "origohosts.cookie-consent";
export const VISITOR_KEY = "origohosts.cookie-consent-visitor";
const TABLE = "cookie_consents";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getVisitorId(): string | null {
  if (!isBrowser()) return null;
  try {
    let id = window.localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function readLocal(): StoredConsent | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      ...parsed,
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...parsed.preferences,
        essential: true,
      },
    };
  } catch {
    return null;
  }
}

function writeLocal(record: StoredConsent): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* noop */
  }
}

function clearLocal(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export async function loadConsent(): Promise<StoredConsent | null> {
  const local = readLocal();
  const visitorId = getVisitorId();
  if (!visitorId) return local;

  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("preferences, decision, version, decided_at")
      .eq("visitor_id", visitorId)
      .maybeSingle();
    if (error || !data) return local;
    if (data.version !== CONSENT_VERSION) {
      clearLocal();
      return null;
    }
    const merged: StoredConsent = {
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...(data.preferences as Partial<StoredConsent["preferences"]>),
        essential: true,
      },
      decision: data.decision as StoredConsent["decision"],
      decidedAt: data.decided_at as string,
      version: data.version,
    };
    writeLocal(merged);
    return merged;
  } catch {
    return local;
  }
}

export function saveConsent(record: StoredConsent): void {
  writeLocal(record);
  const visitorId = getVisitorId();
  if (!visitorId) return;
  void supabase
    .from(TABLE)
    .upsert(
      {
        visitor_id: visitorId,
        preferences: record.preferences,
        decision: record.decision,
        version: record.version,
        decided_at: new Date().toISOString(),
      },
      { onConflict: "visitor_id" },
    )
    .then(({ error }) => {
      if (error) console.warn("[cookie-consent] save failed:", error.message);
    });
}

export function clearConsent(): void {
  clearLocal();
  const visitorId = getVisitorId();
  if (!visitorId) return;
  void supabase.from(TABLE).delete().eq("visitor_id", visitorId);
}
