/**
 * OrigoHOST Strongly Typed PostgreSQL Database Schema Definitions.
 * Generated / maintained for Supabase operational database queries.
 */

export interface Database {
  public: {
    Tables: {
      crm_contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          role: string;
          organization: string | null;
          status: string;
          lifecycle_stage: string;
          tags: string[];
          notes: string | null;
          owner_id: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['crm_contacts']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['crm_contacts']['Insert']>;
      };

      crm_leads: {
        Row: {
          id: string;
          contact_name: string;
          email: string;
          organization: string | null;
          title: string | null;
          source: string;
          status: string;
          score: number;
          assigned_to: string;
          notes: string | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['crm_leads']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['crm_leads']['Insert']>;
      };

      crm_applications: {
        Row: {
          id: string;
          applicant_name: string;
          email: string;
          pathway: string;
          status: string;
          chapter_name: string | null;
          notes: string | null;
          reviewed_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['crm_applications']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['crm_applications']['Insert']>;
      };

      events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          description: string | null;
          start_date: string;
          end_date: string;
          format: string;
          status: string;
          location: string | null;
          registration_url: string | null;
          capacity: number;
          featured: boolean;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };

      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string | null;
          name: string;
          email: string;
          status: string;
          check_in_status: string;
          registered_at: string;
        };
        Insert: Omit<Database['public']['Tables']['event_registrations']['Row'], 'id' | 'registered_at'> & {
          id?: string;
          registered_at?: string;
        };
        Update: Partial<Database['public']['Tables']['event_registrations']['Insert']>;
      };

      community_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          chapter_name: string | null;
          avatar: string | null;
          bio: string | null;
          email: string | null;
          status: string;
          joined_date: string;
        };
        Insert: Omit<Database['public']['Tables']['community_members']['Row'], 'joined_date'> & {
          joined_date?: string;
        };
        Update: Partial<Database['public']['Tables']['community_members']['Insert']>;
      };

      audit_logs: {
        Row: {
          id: string;
          actor_id: string;
          actor_name: string;
          action: string;
          entity_type: string;
          entity_id: string;
          details: Record<string, unknown>;
          timestamp: string;
        };
        Insert: Omit<Database['public']['Tables']['audit_logs']['Row'], 'id' | 'timestamp'> & {
          id?: string;
          timestamp?: string;
        };
        Update: Partial<Database['public']['Tables']['audit_logs']['Insert']>;
      };
    };
  };
}
