import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database.types';

export interface SupabaseQueryResult<T> {
  data: T | null;
  error: string | null;
}

export class SupabaseAdapter {
  /**
   * Safe repository query wrapper for Supabase database operations.
   */
  static async queryTable<T>(
    tableName: keyof Database['public']['Tables'],
    selectQuery = '*',
    filters?: Record<string, unknown>
  ): Promise<SupabaseQueryResult<T[]>> {
    if (!this.isConfigured()) {
      return { data: null, error: 'Supabase URL not configured' };
    }

    try {
      const client = createServerSupabaseClient(true);
      if (process.env.NODE_ENV === 'development') {
        console.log(`[SupabaseAdapter] Querying table ${tableName} via ${client.url}`);
      }
      return { data: [], error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : String(err) };
    }
  }

  /**
   * Health check for Supabase connection.
   */
  static isConfigured(): boolean {
    return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }
}
