// src/app/api/admin/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase.server';
import { getUserFromRequest } from '@/lib/auth.server';
import { isAdminByEmail } from '@/lib/rbac.server';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const ok = await isAdminByEmail(user.email);
  if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await request.json();
  const { role } = body;
  if (!role) return NextResponse.json({ error: 'role required' }, { status: 400 });

  const { data, error } = await supabaseServer.from('users').update({ role }).eq('id', params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
