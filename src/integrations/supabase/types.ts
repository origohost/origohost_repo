export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string
          author_role: string | null
          author_user_id: string | null
          category: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          id: string
          published_at: string | null
          reading_time: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          tags: string[]
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author_name?: string
          author_role?: string | null
          author_user_id?: string | null
          category?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          reading_time?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[]
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author_name?: string
          author_role?: string | null
          author_user_id?: string | null
          category?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          reading_time?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[]
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_number: string
          created_at: string
          event_id: string | null
          event_title: string
          id: string
          issued_by: string | null
          issued_on: string
          metadata: Json
          recipient_name: string
          registration_id: string | null
          revoked_at: string | null
          revoked_reason: string | null
          type: Database["public"]["Enums"]["certificate_type"]
          user_id: string | null
        }
        Insert: {
          certificate_number: string
          created_at?: string
          event_id?: string | null
          event_title: string
          id?: string
          issued_by?: string | null
          issued_on?: string
          metadata?: Json
          recipient_name: string
          registration_id?: string | null
          revoked_at?: string | null
          revoked_reason?: string | null
          type?: Database["public"]["Enums"]["certificate_type"]
          user_id?: string | null
        }
        Update: {
          certificate_number?: string
          created_at?: string
          event_id?: string | null
          event_title?: string
          id?: string
          issued_by?: string | null
          issued_on?: string
          metadata?: Json
          recipient_name?: string
          registration_id?: string | null
          revoked_at?: string | null
          revoked_reason?: string | null
          type?: Database["public"]["Enums"]["certificate_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "event_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_members: {
        Row: {
          chapter_id: string
          chapter_role: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          chapter_id: string
          chapter_role?: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          chapter_id?: string
          chapter_role?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_members_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          city: string | null
          contact_email: string | null
          created_at: string
          id: string
          institution: string | null
          lead_user_id: string | null
          links: Json
          logo_url: string | null
          name: string
          organization_id: string | null
          region: string | null
          slug: string
          status: Database["public"]["Enums"]["chapter_status"]
          summary: string | null
          type: Database["public"]["Enums"]["chapter_type"]
          updated_at: string
        }
        Insert: {
          city?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          institution?: string | null
          lead_user_id?: string | null
          links?: Json
          logo_url?: string | null
          name: string
          organization_id?: string | null
          region?: string | null
          slug: string
          status?: Database["public"]["Enums"]["chapter_status"]
          summary?: string | null
          type: Database["public"]["Enums"]["chapter_type"]
          updated_at?: string
        }
        Update: {
          city?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          institution?: string | null
          lead_user_id?: string | null
          links?: Json
          logo_url?: string | null
          name?: string
          organization_id?: string | null
          region?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["chapter_status"]
          summary?: string | null
          type?: Database["public"]["Enums"]["chapter_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attendance_marked_by: string | null
          attended: boolean
          attended_at: string | null
          event_id: string
          feedback: Json | null
          id: string
          notes: string | null
          registered_at: string
          status: Database["public"]["Enums"]["registration_state"]
          user_id: string
        }
        Insert: {
          attendance_marked_by?: string | null
          attended?: boolean
          attended_at?: string | null
          event_id: string
          feedback?: Json | null
          id?: string
          notes?: string | null
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_state"]
          user_id: string
        }
        Update: {
          attendance_marked_by?: string | null
          attended?: boolean
          attended_at?: string | null
          event_id?: string
          feedback?: Json | null
          id?: string
          notes?: string | null
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_state"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          agenda: Json
          audience: string[]
          capacity: number | null
          category: string | null
          certificate_note: string | null
          chapter_id: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          faqs: Json
          id: string
          learning_outcomes: string[]
          meeting_url: string | null
          mode: Database["public"]["Enums"]["event_mode"]
          organizer: string | null
          organizer_user_id: string | null
          partners: Json
          registration_status: Database["public"]["Enums"]["registration_status"]
          registration_url: string | null
          report: Json | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          speakers: Json
          starts_at: string
          status: Database["public"]["Enums"]["event_status"]
          summary: string | null
          tags: string[]
          time_label: string | null
          timezone: string
          title: string
          topics: string[]
          updated_at: string
          updated_by: string | null
          venue: string | null
          who_should_attend: string[]
        }
        Insert: {
          agenda?: Json
          audience?: string[]
          capacity?: number | null
          category?: string | null
          certificate_note?: string | null
          chapter_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          faqs?: Json
          id?: string
          learning_outcomes?: string[]
          meeting_url?: string | null
          mode?: Database["public"]["Enums"]["event_mode"]
          organizer?: string | null
          organizer_user_id?: string | null
          partners?: Json
          registration_status?: Database["public"]["Enums"]["registration_status"]
          registration_url?: string | null
          report?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          speakers?: Json
          starts_at: string
          status?: Database["public"]["Enums"]["event_status"]
          summary?: string | null
          tags?: string[]
          time_label?: string | null
          timezone?: string
          title: string
          topics?: string[]
          updated_at?: string
          updated_by?: string | null
          venue?: string | null
          who_should_attend?: string[]
        }
        Update: {
          agenda?: Json
          audience?: string[]
          capacity?: number | null
          category?: string | null
          certificate_note?: string | null
          chapter_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          faqs?: Json
          id?: string
          learning_outcomes?: string[]
          meeting_url?: string | null
          mode?: Database["public"]["Enums"]["event_mode"]
          organizer?: string | null
          organizer_user_id?: string | null
          partners?: Json
          registration_status?: Database["public"]["Enums"]["registration_status"]
          registration_url?: string | null
          report?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          speakers?: Json
          starts_at?: string
          status?: Database["public"]["Enums"]["event_status"]
          summary?: string | null
          tags?: string[]
          time_label?: string | null
          timezone?: string
          title?: string
          topics?: string[]
          updated_at?: string
          updated_by?: string | null
          venue?: string | null
          who_should_attend?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "events_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          location: string | null
          logo_url: string | null
          name: string
          partnership_stage:
            | Database["public"]["Enums"]["partnership_stage"]
            | null
          slug: string
          type: Database["public"]["Enums"]["org_type"]
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          location?: string | null
          logo_url?: string | null
          name: string
          partnership_stage?:
            | Database["public"]["Enums"]["partnership_stage"]
            | null
          slug: string
          type: Database["public"]["Enums"]["org_type"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          location?: string | null
          logo_url?: string | null
          name?: string
          partnership_stage?:
            | Database["public"]["Enums"]["partnership_stage"]
            | null
          slug?: string
          type?: Database["public"]["Enums"]["org_type"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      partnership_leads: {
        Row: {
          contact_email: string
          contact_name: string
          created_at: string
          follow_up_at: string | null
          id: string
          message: string | null
          notes: Json
          organization_id: string | null
          organization_name: string | null
          owner_user_id: string | null
          partnership_type: string | null
          stage: Database["public"]["Enums"]["partnership_stage"]
          updated_at: string
        }
        Insert: {
          contact_email: string
          contact_name: string
          created_at?: string
          follow_up_at?: string | null
          id?: string
          message?: string | null
          notes?: Json
          organization_id?: string | null
          organization_name?: string | null
          owner_user_id?: string | null
          partnership_type?: string | null
          stage?: Database["public"]["Enums"]["partnership_stage"]
          updated_at?: string
        }
        Update: {
          contact_email?: string
          contact_name?: string
          created_at?: string
          follow_up_at?: string | null
          id?: string
          message?: string | null
          notes?: Json
          organization_id?: string | null
          organization_name?: string | null
          owner_user_id?: string | null
          partnership_type?: string | null
          stage?: Database["public"]["Enums"]["partnership_stage"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partnership_leads_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          designation: string | null
          education: string | null
          email: string | null
          full_name: string
          headline: string | null
          id: string
          is_public: boolean
          links: Json
          location: string | null
          onboarded_at: string | null
          organization_name: string | null
          phone: string | null
          photo_url: string | null
          professional_interests: string[]
          skills: string[]
          technology_interests: string[]
          updated_at: string
          visibility: Database["public"]["Enums"]["profile_visibility"]
        }
        Insert: {
          bio?: string | null
          created_at?: string
          designation?: string | null
          education?: string | null
          email?: string | null
          full_name?: string
          headline?: string | null
          id: string
          is_public?: boolean
          links?: Json
          location?: string | null
          onboarded_at?: string | null
          organization_name?: string | null
          phone?: string | null
          photo_url?: string | null
          professional_interests?: string[]
          skills?: string[]
          technology_interests?: string[]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["profile_visibility"]
        }
        Update: {
          bio?: string | null
          created_at?: string
          designation?: string | null
          education?: string | null
          email?: string | null
          full_name?: string
          headline?: string | null
          id?: string
          is_public?: boolean
          links?: Json
          location?: string | null
          onboarded_at?: string | null
          organization_name?: string | null
          phone?: string | null
          photo_url?: string | null
          professional_interests?: string[]
          skills?: string[]
          technology_interests?: string[]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["profile_visibility"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_platform_admin: { Args: { _user_id: string }; Returns: boolean }
      log_audit: {
        Args: {
          _action: string
          _entity_id?: string
          _entity_type: string
          _metadata?: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "platform_admin"
        | "content_admin"
        | "crm_admin"
        | "events_admin"
        | "community_admin"
        | "chapter_admin"
        | "partnership_admin"
        | "certificate_admin"
        | "editor"
        | "reviewer"
        | "chapter_leader"
        | "mentor"
        | "ambassador"
        | "member"
      certificate_type:
        | "participant"
        | "speaker"
        | "volunteer"
        | "organizer"
        | "mentor"
        | "winner"
        | "runner_up"
        | "contributor"
        | "chapter_leader"
      chapter_status:
        | "application"
        | "review"
        | "approved"
        | "forming"
        | "active"
        | "paused"
        | "closed"
      chapter_type: "national" | "state" | "city" | "campus"
      event_mode: "online" | "offline" | "hybrid"
      event_status:
        | "proposal"
        | "review"
        | "approved"
        | "planning"
        | "published"
        | "live"
        | "completed"
        | "cancelled"
        | "archived"
      org_type:
        | "university"
        | "college"
        | "company"
        | "startup"
        | "community"
        | "ngo"
        | "industry"
        | "technology"
        | "media"
      partnership_stage:
        | "lead"
        | "qualified"
        | "discussion"
        | "proposal"
        | "negotiation"
        | "approved"
        | "active"
        | "renewal"
        | "closed"
        | "lost"
      post_status: "draft" | "published" | "archived"
      profile_visibility: "public" | "community_only" | "private"
      registration_state:
        | "registered"
        | "confirmed"
        | "attended"
        | "absent"
        | "cancelled"
      registration_status: "not_open" | "open" | "waitlist" | "full" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "platform_admin",
        "content_admin",
        "crm_admin",
        "events_admin",
        "community_admin",
        "chapter_admin",
        "partnership_admin",
        "certificate_admin",
        "editor",
        "reviewer",
        "chapter_leader",
        "mentor",
        "ambassador",
        "member",
      ],
      certificate_type: [
        "participant",
        "speaker",
        "volunteer",
        "organizer",
        "mentor",
        "winner",
        "runner_up",
        "contributor",
        "chapter_leader",
      ],
      chapter_status: [
        "application",
        "review",
        "approved",
        "forming",
        "active",
        "paused",
        "closed",
      ],
      chapter_type: ["national", "state", "city", "campus"],
      event_mode: ["online", "offline", "hybrid"],
      event_status: [
        "proposal",
        "review",
        "approved",
        "planning",
        "published",
        "live",
        "completed",
        "cancelled",
        "archived",
      ],
      org_type: [
        "university",
        "college",
        "company",
        "startup",
        "community",
        "ngo",
        "industry",
        "technology",
        "media",
      ],
      partnership_stage: [
        "lead",
        "qualified",
        "discussion",
        "proposal",
        "negotiation",
        "approved",
        "active",
        "renewal",
        "closed",
        "lost",
      ],
      post_status: ["draft", "published", "archived"],
      profile_visibility: ["public", "community_only", "private"],
      registration_state: [
        "registered",
        "confirmed",
        "attended",
        "absent",
        "cancelled",
      ],
      registration_status: ["not_open", "open", "waitlist", "full", "closed"],
    },
  },
} as const
