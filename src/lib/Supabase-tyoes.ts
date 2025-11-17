// src/lib/supabase-types.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: string | null;
          company: string | null;
          phone: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          role?: string | null;
          company?: string | null;
          phone?: string | null;
          created_at?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          role?: string | null;
          company?: string | null;
          phone?: string | null;
          created_at?: string | null;
        };
      };
      tickets: {
        Row: {
          id: string;
          user_id: string | null;
          title: string | null;
          description: string | null;
          status: string | null;
          priority: string | null;
          category: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: any;
        Update: any;
      };
      // Add others minimally if required (ticket_messages, services, invoices)
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    Views: Record<string, never>;
  };
}
