// src/lib/rbac.server.ts
import { supabaseServer } from './supabase.server';

export async function isAdminByEmail(email: string | null) {
  if (!email) return false;
  const { data } = await supabaseServer.from('users').select('role').eq('email', email).single();
  return data?.role === 'admin';
}
