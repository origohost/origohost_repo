import { getSupabaseConfig } from '@/services/integrations/supabase/client';
import type { Database } from '@/types/database.types';

export interface SupabaseQueryResult<T> {
  data: T | null;
  error: string | null;
}

export class SupabaseAdapter {
  private static getHeaders() {
    const config = getSupabaseConfig();
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || config.anonKey;
    return {
      'Content-Type': 'application/json',
      apikey: config.anonKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: 'return=representation',
    };
  }

  /**
   * Health check for Supabase connection configuration.
   */
  static isConfigured(): boolean {
    const config = getSupabaseConfig();
    return Boolean(config.url && config.anonKey && !config.url.includes('placeholder'));
  }

  /**
   * Query records from a Supabase table.
   */
  static async queryTable<T>(
    tableName: keyof Database['public']['Tables'],
    selectQuery = '*',
    filters?: Record<string, string>
  ): Promise<SupabaseQueryResult<T[]>> {
    if (!this.isConfigured()) {
      return { data: null, error: 'Supabase URL or Key not configured' };
    }

    try {
      const config = getSupabaseConfig();
      const urlParams = new URLSearchParams({ select: selectQuery });
      if (filters) {
        Object.entries(filters).forEach(([key, val]) => urlParams.append(key, val));
      }

      const res = await fetch(`${config.url}/rest/v1/${tableName}?${urlParams.toString()}`, {
        headers: this.getHeaders(),
        cache: 'no-store',
      });

      if (!res.ok) {
        const errText = await res.text();
        return { data: null, error: `Supabase HTTP ${res.status}: ${errText}` };
      }

      const data = (await res.json()) as T[];
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : String(err) };
    }
  }

  /**
   * Insert a new record into a Supabase table.
   */
  static async insertRow<T>(
    tableName: keyof Database['public']['Tables'],
    row: Record<string, unknown>
  ): Promise<SupabaseQueryResult<T>> {
    if (!this.isConfigured()) {
      return { data: null, error: 'Supabase URL or Key not configured' };
    }

    try {
      const config = getSupabaseConfig();
      const res = await fetch(`${config.url}/rest/v1/${tableName}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(row),
      });

      if (!res.ok) {
        const errText = await res.text();
        return { data: null, error: `Supabase HTTP ${res.status}: ${errText}` };
      }

      const inserted = (await res.json()) as T[];
      return { data: inserted[0] || null, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : String(err) };
    }
  }

  /**
   * Update an existing record in a Supabase table by ID.
   */
  static async updateRow<T>(
    tableName: keyof Database['public']['Tables'],
    id: string,
    updates: Record<string, unknown>
  ): Promise<SupabaseQueryResult<T>> {
    if (!this.isConfigured()) {
      return { data: null, error: 'Supabase URL or Key not configured' };
    }

    try {
      const config = getSupabaseConfig();
      const res = await fetch(`${config.url}/rest/v1/${tableName}?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const errText = await res.text();
        return { data: null, error: `Supabase HTTP ${res.status}: ${errText}` };
      }

      const updated = (await res.json()) as T[];
      return { data: updated[0] || null, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : String(err) };
    }
  }

  /**
   * Delete a record from a Supabase table by ID.
   */
  static async deleteRow(
    tableName: keyof Database['public']['Tables'],
    id: string
  ): Promise<{ success: boolean; error: string | null }> {
    if (!this.isConfigured()) {
      return { success: false, error: 'Supabase URL or Key not configured' };
    }

    try {
      const config = getSupabaseConfig();
      const res = await fetch(`${config.url}/rest/v1/${tableName}?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!res.ok) {
        const errText = await res.text();
        return { success: false, error: `Supabase HTTP ${res.status}: ${errText}` };
      }

      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }
}
