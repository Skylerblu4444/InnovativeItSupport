// src/app/api/user/update/route.ts
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth.server';
import { supabaseServer } from '@/lib/supabase.server';

export async function POST(request: Request) {
  const u = await getUserFromRequest(request);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await request.json();
  const { full_name } = payload;

  const { data, error } = await supabaseServer.from('users').upsert({ email: u.email, full_name }, { onConflict: 'email' }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
