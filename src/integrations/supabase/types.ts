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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_assignments: {
        Row: {
          created_at: string
          district_id: string | null
          id: string
          mandal_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          district_id?: string | null
          id?: string
          mandal_id?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          district_id?: string | null
          id?: string
          mandal_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_assignments_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_assignments_mandal_id_fkey"
            columns: ["mandal_id"]
            isOneToOne: false
            referencedRelation: "mandals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      association_settings: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          full_name: string | null
          id: string
          logo_url: string | null
          name: string
          tagline: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          full_name?: string | null
          id?: string
          logo_url?: string | null
          name: string
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          full_name?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      blood_donors: {
        Row: {
          approx_location: string | null
          available: boolean
          blood_group: string
          consent: boolean
          contact_preference: string | null
          created_at: string
          district_id: string | null
          id: string
          mandal_id: string | null
          member_id: string | null
        }
        Insert: {
          approx_location?: string | null
          available?: boolean
          blood_group: string
          consent?: boolean
          contact_preference?: string | null
          created_at?: string
          district_id?: string | null
          id?: string
          mandal_id?: string | null
          member_id?: string | null
        }
        Update: {
          approx_location?: string | null
          available?: boolean
          blood_group?: string
          consent?: boolean
          contact_preference?: string | null
          created_at?: string
          district_id?: string | null
          id?: string
          mandal_id?: string | null
          member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blood_donors_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_donors_mandal_id_fkey"
            columns: ["mandal_id"]
            isOneToOne: false
            referencedRelation: "mandals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_donors_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          code: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      emergency_requests: {
        Row: {
          assigned_coordinator: string | null
          consent_location: boolean
          created_at: string
          description: string | null
          district_id: string | null
          id: string
          location: string | null
          member_id: string | null
          requester_mobile: string
          requester_name: string
          status: string
          user_id: string | null
        }
        Insert: {
          assigned_coordinator?: string | null
          consent_location?: boolean
          created_at?: string
          description?: string | null
          district_id?: string | null
          id?: string
          location?: string | null
          member_id?: string | null
          requester_mobile: string
          requester_name: string
          status?: string
          user_id?: string | null
        }
        Update: {
          assigned_coordinator?: string | null
          consent_location?: boolean
          created_at?: string
          description?: string | null
          district_id?: string | null
          id?: string
          location?: string | null
          member_id?: string | null
          requester_mobile?: string
          requester_name?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_requests_assigned_coordinator_fkey"
            columns: ["assigned_coordinator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_requests_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_requests_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attended: boolean
          created_at: string
          event_id: string
          id: string
          member_id: string
        }
        Insert: {
          attended?: boolean
          created_at?: string
          event_id: string
          id?: string
          member_id: string
        }
        Update: {
          attended?: boolean
          created_at?: string
          event_id?: string
          id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          district_id: string | null
          ends_at: string | null
          id: string
          location: string | null
          photo_path: string | null
          published: boolean
          starts_at: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          district_id?: string | null
          ends_at?: string | null
          id?: string
          location?: string | null
          photo_path?: string | null
          published?: boolean
          starts_at?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          district_id?: string | null
          ends_at?: string | null
          id?: string
          location?: string | null
          photo_path?: string | null
          published?: boolean
          starts_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      mandals: {
        Row: {
          created_at: string
          district_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          district_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          district_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "mandals_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          approved_at: string | null
          created_at: string
          district_id: string | null
          email: string | null
          experience_years: number | null
          full_name: string
          id: string
          mandal_id: string | null
          membership_number: string | null
          mobile: string | null
          photo_path: string | null
          specialization: string | null
          status: Database["public"]["Enums"]["membership_app_status"]
          updated_at: string
          user_id: string | null
          village_id: string | null
          workshop_name: string | null
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          district_id?: string | null
          email?: string | null
          experience_years?: number | null
          full_name: string
          id?: string
          mandal_id?: string | null
          membership_number?: string | null
          mobile?: string | null
          photo_path?: string | null
          specialization?: string | null
          status?: Database["public"]["Enums"]["membership_app_status"]
          updated_at?: string
          user_id?: string | null
          village_id?: string | null
          workshop_name?: string | null
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          district_id?: string | null
          email?: string | null
          experience_years?: number | null
          full_name?: string
          id?: string
          mandal_id?: string | null
          membership_number?: string | null
          mobile?: string | null
          photo_path?: string | null
          specialization?: string | null
          status?: Database["public"]["Enums"]["membership_app_status"]
          updated_at?: string
          user_id?: string | null
          village_id?: string | null
          workshop_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_mandal_id_fkey"
            columns: ["mandal_id"]
            isOneToOne: false
            referencedRelation: "mandals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_applications: {
        Row: {
          address: string | null
          consent: boolean
          created_at: string
          district_id: string | null
          document_path: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          experience_years: number | null
          full_name: string
          id: string
          mandal_id: string | null
          member_id: string | null
          mobile: string
          nominee_name: string | null
          nominee_phone: string | null
          photo_path: string | null
          plan_id: string | null
          reference_no: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          specialization: string | null
          status: Database["public"]["Enums"]["membership_app_status"]
          updated_at: string
          user_id: string | null
          village_id: string | null
          workshop_address: string | null
          workshop_name: string | null
        }
        Insert: {
          address?: string | null
          consent?: boolean
          created_at?: string
          district_id?: string | null
          document_path?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          full_name: string
          id?: string
          mandal_id?: string | null
          member_id?: string | null
          mobile: string
          nominee_name?: string | null
          nominee_phone?: string | null
          photo_path?: string | null
          plan_id?: string | null
          reference_no: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialization?: string | null
          status?: Database["public"]["Enums"]["membership_app_status"]
          updated_at?: string
          user_id?: string | null
          village_id?: string | null
          workshop_address?: string | null
          workshop_name?: string | null
        }
        Update: {
          address?: string | null
          consent?: boolean
          created_at?: string
          district_id?: string | null
          document_path?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          full_name?: string
          id?: string
          mandal_id?: string | null
          member_id?: string | null
          mobile?: string
          nominee_name?: string | null
          nominee_phone?: string | null
          photo_path?: string | null
          plan_id?: string | null
          reference_no?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialization?: string | null
          status?: Database["public"]["Enums"]["membership_app_status"]
          updated_at?: string
          user_id?: string | null
          village_id?: string | null
          workshop_address?: string | null
          workshop_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_applications_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_applications_mandal_id_fkey"
            columns: ["mandal_id"]
            isOneToOne: false
            referencedRelation: "mandals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_applications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_applications_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_applications_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_cards: {
        Row: {
          created_at: string
          id: string
          issued_at: string
          member_id: string
          qr_token: string
          revoked: boolean
          revoked_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          issued_at?: string
          member_id: string
          qr_token: string
          revoked?: boolean
          revoked_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          issued_at?: string
          member_id?: string
          qr_token?: string
          revoked?: boolean
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_cards_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_plans: {
        Row: {
          amount_paise: number
          created_at: string
          description: string | null
          duration_months: number
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          amount_paise: number
          created_at?: string
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          amount_paise?: number
          created_at?: string
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      notices: {
        Row: {
          body: string | null
          category: string
          created_at: string
          created_by: string | null
          district_id: string | null
          expires_at: string | null
          id: string
          published: boolean
          published_at: string | null
          title: string
        }
        Insert: {
          body?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          district_id?: string | null
          expires_at?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          title: string
        }
        Update: {
          body?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          district_id?: string | null
          expires_at?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notices_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          email_enabled: boolean
          sms_enabled: boolean
          updated_at: string
          user_id: string
          whatsapp_enabled: boolean
        }
        Insert: {
          email_enabled?: boolean
          sms_enabled?: boolean
          updated_at?: string
          user_id: string
          whatsapp_enabled?: boolean
        }
        Update: {
          email_enabled?: boolean
          sms_enabled?: boolean
          updated_at?: string
          user_id?: string
          whatsapp_enabled?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          contact: string | null
          created_at: string
          description: string | null
          eligibility: string | null
          id: string
          partner_id: string | null
          redemption: string | null
          title: string
          valid_from: string | null
          valid_until: string | null
          verified: boolean
        }
        Insert: {
          contact?: string | null
          created_at?: string
          description?: string | null
          eligibility?: string | null
          id?: string
          partner_id?: string | null
          redemption?: string | null
          title: string
          valid_from?: string | null
          valid_until?: string | null
          verified?: boolean
        }
        Update: {
          contact?: string | null
          created_at?: string
          description?: string | null
          eligibility?: string | null
          id?: string
          partner_id?: string | null
          redemption?: string | null
          title?: string
          valid_from?: string | null
          valid_until?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "offers_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          logo_path: string | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_path?: string | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_path?: string | null
          name?: string
        }
        Relationships: []
      }
      payment_receipts: {
        Row: {
          created_at: string
          id: string
          receipt_no: string
          transaction_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          receipt_no: string
          transaction_id: string
        }
        Update: {
          created_at?: string
          id?: string
          receipt_no?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_receipts_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: true
            referencedRelation: "payment_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount_paise: number
          created_at: string
          currency: string
          gateway: string
          gateway_order_id: string | null
          gateway_payment_id: string | null
          id: string
          member_id: string | null
          mode: string
          notes: string | null
          plan_id: string | null
          purpose: string
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_id: string | null
          verified_by: string | null
        }
        Insert: {
          amount_paise: number
          created_at?: string
          currency?: string
          gateway?: string
          gateway_order_id?: string | null
          gateway_payment_id?: string | null
          id?: string
          member_id?: string | null
          mode?: string
          notes?: string | null
          plan_id?: string | null
          purpose?: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string | null
          verified_by?: string | null
        }
        Update: {
          amount_paise?: number
          created_at?: string
          currency?: string
          gateway?: string
          gateway_order_id?: string | null
          gateway_payment_id?: string | null
          id?: string
          member_id?: string | null
          mode?: string
          notes?: string | null
          plan_id?: string | null
          purpose?: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          preferred_language: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          preferred_language?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string
          updated_at?: string
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount_paise: number
          created_at: string
          id: string
          processed_by: string | null
          reason: string | null
          status: Database["public"]["Enums"]["payment_status"]
          transaction_id: string
        }
        Insert: {
          amount_paise: number
          created_at?: string
          id?: string
          processed_by?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          transaction_id: string
        }
        Update: {
          amount_paise?: number
          created_at?: string
          id?: string
          processed_by?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "refunds_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "payment_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          label: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          description?: string | null
          label: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          description?: string | null
          label?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      training_courses: {
        Row: {
          created_at: string
          description: string | null
          duration_text: string | null
          id: string
          published: boolean
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_text?: string | null
          id?: string
          published?: boolean
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_text?: string | null
          id?: string
          published?: boolean
          title?: string
        }
        Relationships: []
      }
      training_enrollments: {
        Row: {
          certificate_no: string | null
          course_id: string
          created_at: string
          id: string
          member_id: string
          score: number | null
          status: string
        }
        Insert: {
          certificate_no?: string | null
          course_id: string
          created_at?: string
          id?: string
          member_id: string
          score?: number | null
          status?: string
        }
        Update: {
          certificate_no?: string | null
          course_id?: string
          created_at?: string
          id?: string
          member_id?: string
          score?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "training_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_enrollments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      villages: {
        Row: {
          created_at: string
          id: string
          mandal_id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          mandal_id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          mandal_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "villages_mandal_id_fkey"
            columns: ["mandal_id"]
            isOneToOne: false
            referencedRelation: "mandals"
            referencedColumns: ["id"]
          },
        ]
      }
      welfare_applications: {
        Row: {
          assigned_officer: string | null
          created_at: string
          decision_notes: string | null
          id: string
          member_id: string
          reason: string | null
          reference_no: string
          requested_amount_paise: number | null
          scheme_id: string
          status: Database["public"]["Enums"]["welfare_app_status"]
          updated_at: string
        }
        Insert: {
          assigned_officer?: string | null
          created_at?: string
          decision_notes?: string | null
          id?: string
          member_id: string
          reason?: string | null
          reference_no?: string
          requested_amount_paise?: number | null
          scheme_id: string
          status?: Database["public"]["Enums"]["welfare_app_status"]
          updated_at?: string
        }
        Update: {
          assigned_officer?: string | null
          created_at?: string
          decision_notes?: string | null
          id?: string
          member_id?: string
          reason?: string | null
          reference_no?: string
          requested_amount_paise?: number | null
          scheme_id?: string
          status?: Database["public"]["Enums"]["welfare_app_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "welfare_applications_assigned_officer_fkey"
            columns: ["assigned_officer"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welfare_applications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welfare_applications_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "welfare_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      welfare_disbursements: {
        Row: {
          amount_paise: number
          application_id: string
          created_at: string
          disbursed_at: string | null
          disbursed_by: string | null
          id: string
          utr_reference: string | null
        }
        Insert: {
          amount_paise: number
          application_id: string
          created_at?: string
          disbursed_at?: string | null
          disbursed_by?: string | null
          id?: string
          utr_reference?: string | null
        }
        Update: {
          amount_paise?: number
          application_id?: string
          created_at?: string
          disbursed_at?: string | null
          disbursed_by?: string | null
          id?: string
          utr_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "welfare_disbursements_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "welfare_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welfare_disbursements_disbursed_by_fkey"
            columns: ["disbursed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      welfare_documents: {
        Row: {
          application_id: string
          doc_type: string | null
          file_path: string
          id: string
          uploaded_at: string
        }
        Insert: {
          application_id: string
          doc_type?: string | null
          file_path: string
          id?: string
          uploaded_at?: string
        }
        Update: {
          application_id?: string
          doc_type?: string | null
          file_path?: string
          id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "welfare_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "welfare_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      welfare_schemes: {
        Row: {
          created_at: string
          description: string | null
          eligibility: string | null
          id: string
          is_active: boolean
          max_amount_paise: number | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          eligibility?: string | null
          id?: string
          is_active?: boolean
          max_amount_paise?: number | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          eligibility?: string | null
          id?: string
          is_active?: boolean
          max_amount_paise?: number | null
          name?: string
        }
        Relationships: []
      }
      workshops: {
        Row: {
          address: string | null
          approved_by: string | null
          contact_phone: string | null
          created_at: string
          district_id: string | null
          id: string
          listing_consent: boolean
          mandal_id: string | null
          mechanic_name: string | null
          owner_member_id: string | null
          services: string | null
          shop_name: string
          status: string
          village_id: string | null
          working_hours: string | null
        }
        Insert: {
          address?: string | null
          approved_by?: string | null
          contact_phone?: string | null
          created_at?: string
          district_id?: string | null
          id?: string
          listing_consent?: boolean
          mandal_id?: string | null
          mechanic_name?: string | null
          owner_member_id?: string | null
          services?: string | null
          shop_name: string
          status?: string
          village_id?: string | null
          working_hours?: string | null
        }
        Update: {
          address?: string | null
          approved_by?: string | null
          contact_phone?: string | null
          created_at?: string
          district_id?: string | null
          id?: string
          listing_consent?: boolean
          mandal_id?: string | null
          mechanic_name?: string | null
          owner_member_id?: string | null
          services?: string | null
          shop_name?: string
          status?: string
          village_id?: string | null
          working_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workshops_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workshops_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workshops_mandal_id_fkey"
            columns: ["mandal_id"]
            isOneToOne: false
            referencedRelation: "mandals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workshops_owner_member_id_fkey"
            columns: ["owner_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workshops_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_manage_area: {
        Args: { _district: string; _mandal: string; _uid: string }
        Returns: boolean
      }
      can_manage_district: {
        Args: { _district: string; _uid: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _uid: string }; Returns: boolean }
      is_super_admin: { Args: { _uid: string }; Returns: boolean }
      my_member_id: { Args: never; Returns: string }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "district_admin"
        | "mandal_admin"
        | "member"
        | "welfare_officer"
        | "finance_officer"
      membership_app_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "more_info_required"
        | "approved"
        | "rejected"
        | "suspended"
        | "inactive"
      payment_status:
        | "created"
        | "pending"
        | "success"
        | "failed"
        | "refunded"
        | "cancelled"
      welfare_app_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "additional_info_required"
        | "approved"
        | "rejected"
        | "disbursement_pending"
        | "disbursed"
        | "closed"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
        "district_admin",
        "mandal_admin",
        "member",
        "welfare_officer",
        "finance_officer",
      ],
      membership_app_status: [
        "draft",
        "submitted",
        "under_review",
        "more_info_required",
        "approved",
        "rejected",
        "suspended",
        "inactive",
      ],
      payment_status: [
        "created",
        "pending",
        "success",
        "failed",
        "refunded",
        "cancelled",
      ],
      welfare_app_status: [
        "draft",
        "submitted",
        "under_review",
        "additional_info_required",
        "approved",
        "rejected",
        "disbursement_pending",
        "disbursed",
        "closed",
      ],
    },
  },
} as const
