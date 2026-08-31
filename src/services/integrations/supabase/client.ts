/**
 * OrigoHOST Supabase Client Integration Adapter
 * Provides a decoupled integration boundary for Supabase database, auth, and storage.
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getSupabaseConfig(): SupabaseConfig {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nzsjvuoxxyjrownuruwo.supabase.co',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable__2MMq8ZT7mAOK1popiGOkQ_gYyF5nPa',
  };
}


export async function isSupabaseConfigured(): Promise<boolean> {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
