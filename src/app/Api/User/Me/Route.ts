// src/app/api/user/me/route.ts
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth.server';
import { supabaseServer } from '@/lib/supabase.server';

export async function GET(request: Request) {
  const u = await getUserFromRequest(request);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data } = await supabaseServer.from('users').select('*').eq('email', u.email).single();
  return NextResponse.json(data);
}
