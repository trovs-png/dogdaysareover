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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          client_id: string
          current_state: string | null
          id: string
          is_paused: boolean | null
          last_ai_action_at: string | null
          memory_context: Json | null
          user_id: string
        }
        Insert: {
          client_id: string
          current_state?: string | null
          id?: string
          is_paused?: boolean | null
          last_ai_action_at?: string | null
          memory_context?: Json | null
          user_id: string
        }
        Update: {
          client_id?: string
          current_state?: string | null
          id?: string
          is_paused?: boolean | null
          last_ai_action_at?: string | null
          memory_context?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          client_id: string
          created_at: string | null
          deposit_paid: number | null
          end_time: string
          final_price: number | null
          id: string
          notes: string | null
          origin_message_id: string | null
          price_at_booking: number | null
          service_id: string
          start_time: string
          status: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          deposit_paid?: number | null
          end_time: string
          final_price?: number | null
          id?: string
          notes?: string | null
          origin_message_id?: string | null
          price_at_booking?: number | null
          service_id: string
          start_time: string
          status?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          deposit_paid?: number | null
          end_time?: string
          final_price?: number | null
          id?: string
          notes?: string | null
          origin_message_id?: string | null
          price_at_booking?: number | null
          service_id?: string
          start_time?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_origin_message_id_fkey"
            columns: ["origin_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          target_resource: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          target_resource: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          target_resource?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      availability_blocks: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          reason: string | null
          start_time: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id?: string
          reason?: string | null
          start_time: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          reason?: string | null
          start_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_blocks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          is_blocked: boolean | null
          last_message_at: string | null
          last_message_preview: string | null
          name: string
          notes: string | null
          phone: string
          tags: string[] | null
          unread_count: number | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          is_blocked?: boolean | null
          last_message_at?: string | null
          last_message_preview?: string | null
          name: string
          notes?: string | null
          phone: string
          tags?: string[] | null
          unread_count?: number | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          is_blocked?: boolean | null
          last_message_at?: string | null
          last_message_preview?: string | null
          name?: string
          notes?: string | null
          phone?: string
          tags?: string[] | null
          unread_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          client_id: string
          content: string | null
          created_at: string | null
          delete_media_at: string | null
          direction: string
          evolution_id: string | null
          id: string
          media_url: string | null
          message_type: string | null
          reply_to_message_id: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          content?: string | null
          created_at?: string | null
          delete_media_at?: string | null
          direction: string
          evolution_id?: string | null
          id?: string
          media_url?: string | null
          message_type?: string | null
          reply_to_message_id?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          content?: string | null
          created_at?: string | null
          delete_media_at?: string | null
          direction?: string
          evolution_id?: string | null
          id?: string
          media_url?: string | null
          message_type?: string | null
          reply_to_message_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_message_id_fkey"
            columns: ["reply_to_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address_city: string | null
          address_lat: number | null
          address_lng: number | null
          address_neighborhood: string | null
          address_number: string | null
          address_state: string | null
          address_street: string | null
          address_zip_code: string | null
          ai_settings: Json | null
          avatar_url: string | null
          business_avatar_url: string | null
          business_hours: Json | null
          business_knowledge_base: string | null
          business_name: string | null
          business_slug: string | null
          created_at: string | null
          current_onboarding_step: string | null
          deposit_config: Json | null
          full_name: string | null
          id: string
          owner_id: string | null
          phone_number: string | null
          role: string | null
          subscription_status: string | null
          timezone: string | null
          updated_at: string | null
          whatsapp_instance_name: string | null
          whatsapp_status: string | null
        }
        Insert: {
          address_city?: string | null
          address_lat?: number | null
          address_lng?: number | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          ai_settings?: Json | null
          avatar_url?: string | null
          business_avatar_url?: string | null
          business_hours?: Json | null
          business_knowledge_base?: string | null
          business_name?: string | null
          business_slug?: string | null
          created_at?: string | null
          current_onboarding_step?: string | null
          deposit_config?: Json | null
          full_name?: string | null
          id: string
          owner_id?: string | null
          phone_number?: string | null
          role?: string | null
          subscription_status?: string | null
          timezone?: string | null
          updated_at?: string | null
          whatsapp_instance_name?: string | null
          whatsapp_status?: string | null
        }
        Update: {
          address_city?: string | null
          address_lat?: number | null
          address_lng?: number | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          ai_settings?: Json | null
          avatar_url?: string | null
          business_avatar_url?: string | null
          business_hours?: Json | null
          business_knowledge_base?: string | null
          business_name?: string | null
          business_slug?: string | null
          created_at?: string | null
          current_onboarding_step?: string | null
          deposit_config?: Json | null
          full_name?: string | null
          id?: string
          owner_id?: string | null
          phone_number?: string | null
          role?: string | null
          subscription_status?: string | null
          timezone?: string | null
          updated_at?: string | null
          whatsapp_instance_name?: string | null
          whatsapp_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          buffer_minutes: number | null
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          price: number | null
          price_mode: string | null
          title: string
          user_id: string
        }
        Insert: {
          buffer_minutes?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes: number
          id?: string
          is_active?: boolean | null
          price?: number | null
          price_mode?: string | null
          title: string
          user_id: string
        }
        Update: {
          buffer_minutes?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          price?: number | null
          price_mode?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
