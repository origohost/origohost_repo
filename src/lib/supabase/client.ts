import { getSupabaseConfig } from '@/services/integrations/supabase/client';

/**
 * Browser-safe Supabase Client Factory.
 * Subject to PostgreSQL Row Level Security (RLS) policies.
 * Never uses privileged service-role credentials.
 */
export function createBrowserSupabaseClient() {
  const config = getSupabaseConfig();
  return {
    url: config.url,
    anonKey: config.anonKey,
    isConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  };
}
