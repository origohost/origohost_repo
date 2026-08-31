/**
 * Server-only Supabase Client Factory for Next.js App Router & API Route Handlers.
 * Guarded against browser leakage via typeof window === 'undefined'.
 */
export function createServerSupabaseClient(useServiceRole = false) {
  if (typeof window !== 'undefined') {
    throw new Error('createServerSupabaseClient must only be invoked on the server.');
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nzsjvuoxxyjrownuruwo.supabase.co';
  const key = useServiceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable__2MMq8ZT7mAOK1popiGOkQ_gYyF5nPa'
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable__2MMq8ZT7mAOK1popiGOkQ_gYyF5nPa';


  return {
    url,
    key,
    isServiceRole: useServiceRole && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    isConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  };
}
