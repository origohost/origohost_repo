import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client — your own self-hosted project.
 *
 * Env vars (see `.env`, which is gitignored):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY   (or VITE_SUPABASE_PUBLISHABLE_KEY)
 *
 * Import from anywhere in the client:
 *   import { supabase } from "@/integrations/supabase/client";
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined);

function build(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — set them in .env");
    return createClient("https://fallback.supabase.co", "fallback_key", {
      auth: {
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        fetch: async () =>
          new Response(JSON.stringify([]), {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
      },
    });
  }
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _client: SupabaseClient | undefined;
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_t, prop, recv) {
    if (!_client) _client = build();
    return Reflect.get(_client, prop, recv);
  },
});
