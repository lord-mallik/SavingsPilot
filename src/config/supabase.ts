import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database schema types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          persona_id: string;
          level: number;
          experience: number;
          streak_days: number;
          total_saved: number;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>;
      };
      financial_data: {
        Row: {
          id: string;
          user_id: string;
          monthly_income: number;
          expenses: any[];
          emergency_fund: number;
          current_savings: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['financial_data']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['financial_data']['Insert']>;
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          unlocked_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_badges']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['user_badges']['Insert']>;
      };
      learning_progress: {
        Row: {
          id: string;
          user_id: string;
          module_id: string;
          completed: boolean;
          score: number;
          completed_at: string;
        };
        Insert: Omit<Database['public']['Tables']['learning_progress']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['learning_progress']['Insert']>;
      };
      ai_conversations: {
        Row: {
          id: string;
          user_id: string;
          conversation_data: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ai_conversations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['ai_conversations']['Insert']>;
      };
    };
  };
}