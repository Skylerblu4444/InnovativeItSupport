// src/app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase.server';
import { getUserFromRequest } from '@/lib/auth.server';
import { isAdminByEmail } from '@/lib/rbac.server';

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const ok = await isAdminByEmail(user.email);
  if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data, error } = await supabaseServer.from('users').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
