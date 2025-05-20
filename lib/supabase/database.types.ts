export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string
          address: string | null
          city: string | null
          country: string | null
          profile_image: string | null
          pin: string | null
          language: string
          theme: string
          voice_assistant_id: string | null
          is_demo: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email?: string | null
          phone: string
          address?: string | null
          city?: string | null
          country?: string | null
          profile_image?: string | null
          pin?: string | null
          language?: string
          theme?: string
          voice_assistant_id?: string | null
          is_demo?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string
          address?: string | null
          city?: string | null
          country?: string | null
          profile_image?: string | null
          pin?: string | null
          language?: string
          theme?: string
          voice_assistant_id?: string | null
          is_demo?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          phone: string
          email: string | null
          recent: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          phone: string
          email?: string | null
          recent?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          phone?: string
          email?: string | null
          recent?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          recipient_id: string | null
          recipient_phone: string | null
          name: string
          amount: number
          type: "sent" | "received" | "paid"
          date: string
          time: string
          category: string
          description: string | null
          status: "pending" | "completed" | "failed"
          fee: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recipient_id?: string | null
          recipient_phone?: string | null
          name: string
          amount: number
          type: "sent" | "received" | "paid"
          date?: string
          time?: string
          category: string
          description?: string | null
          status?: "pending" | "completed" | "failed"
          fee?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recipient_id?: string | null
          recipient_phone?: string | null
          name?: string
          amount?: number
          type?: "sent" | "received" | "paid"
          date?: string
          time?: string
          category?: string
          description?: string | null
          status?: "pending" | "completed" | "failed"
          fee?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_recipient_id_fkey"
            columns: ["recipient_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          }
        ]
      }
      savings_groups: {
        Row: {
          id: string
          name: string
          members_count: number
          total_saved: number
          goal_amount: number
          goal_name: string
          next_meeting: string | null
          progress: number
          is_active: boolean
          chairperson_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          members_count?: number
          total_saved?: number
          goal_amount: number
          goal_name: string
          next_meeting?: string | null
          progress?: number
          is_active?: boolean
          chairperson_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          members_count?: number
          total_saved?: number
          goal_amount?: number
          goal_name?: string
          next_meeting?: string | null
          progress?: number
          is_active?: boolean
          chairperson_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "savings_groups_chairperson_id_fkey"
            columns: ["chairperson_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group_members: {
        Row: {
          user_id: string
          group_id: string
          role: "Chairperson" | "Treasurer" | "Secretary" | "Member"
          contribution: number
          joined_at: string
        }
        Insert: {
          user_id: string
          group_id: string
          role?: "Chairperson" | "Treasurer" | "Secretary" | "Member"
          contribution?: number
          joined_at?: string
        }
        Update: {
          user_id?: string
          group_id?: string
          role?: "Chairperson" | "Treasurer" | "Secretary" | "Member"
          contribution?: number
          joined_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "savings_groups"
            referencedColumns: ["id"]
          }
        ]
      }
      group_discussions: {
        Row: {
          id: string
          group_id: string
          author_id: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          author_id: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          author_id?: string
          message?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_discussions_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "savings_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_discussions_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      voice_assistants: {
        Row: {
          id: string
          name: string
          gender: string
          language: string
          preview: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          gender: string
          language: string
          preview: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          gender?: string
          language?: string
          preview?: string
          created_at?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          user_id: string
          voice_notifications: boolean
          transaction_alerts: boolean
          marketing_messages: boolean
          push_enabled: boolean
          email_enabled: boolean
          sms_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          voice_notifications?: boolean
          transaction_alerts?: boolean
          marketing_messages?: boolean
          push_enabled?: boolean
          email_enabled?: boolean
          sms_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          voice_notifications?: boolean
          transaction_alerts?: boolean
          marketing_messages?: boolean
          push_enabled?: boolean
          email_enabled?: boolean
          sms_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      security_settings: {
        Row: {
          user_id: string
          biometric_auth: boolean
          pin_required: boolean
          last_pin_change: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          biometric_auth?: boolean
          pin_required?: boolean
          last_pin_change?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          biometric_auth?: boolean
          pin_required?: boolean
          last_pin_change?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "security_settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      connected_devices: {
        Row: {
          id: string
          user_id: string
          device_name: string
          device_type: string
          last_active: string
          is_current_device: boolean
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          device_name: string
          device_type: string
          last_active?: string
          is_current_device?: boolean
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          device_name?: string
          device_type?: string
          last_active?: string
          is_current_device?: boolean
          location?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connected_devices_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      linked_accounts: {
        Row: {
          id: string
          user_id: string
          account_type: "mobile_money" | "bank" | "card"
          provider: string
          account_number: string | null
          is_connected: boolean
          last_sync: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_type: "mobile_money" | "bank" | "card"
          provider: string
          account_number?: string | null
          is_connected?: boolean
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_type?: "mobile_money" | "bank" | "card"
          provider?: string
          account_number?: string | null
          is_connected?: boolean
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "linked_accounts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_demo_user: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      transaction_type: "sent" | "received" | "paid"
      transaction_status: "pending" | "completed" | "failed"
      account_type: "mobile_money" | "bank" | "card"
      group_role: "Chairperson" | "Treasurer" | "Secretary" | "Member"
    }
  }
}
