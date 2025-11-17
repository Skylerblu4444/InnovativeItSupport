// src/lib/supabaseClient.ts
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabase-types';

let supabase: SupabaseClient<Database> | null = null;

export function getBrowserSupabase() {
  if (!supabase) {
    supabase = createBrowserSupabaseClient<Database>();
  }
  return supabase;
}
