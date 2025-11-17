// src/app/api/emergency/trigger/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase.server';
import { sendEmergencySms } from '@/lib/twilio.server';

export async function POST() {
  const { data, error } = await supabaseServer.from('tickets').insert([{
    title: 'EMERGENCY: Immediate Assistance Requested',
    description: 'Client opened emergency request via site Emergency button.',
    priority: 'critical',
    category: 'emergency'
  }]).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // log activity
  await supabaseServer.from('activity_logs').insert([{ action: 'emergency_ticket_created', metadata: { ticket_id: data.id } }]);

  // notify via SMS in background
  try {
    const notifyNumber = process.env.EMERGENCY_NOTIFY_NUMBER;
    if (notifyNumber) {
      await sendEmergencySms(notifyNumber, `EMERGENCY ticket created: ${data.id} - ${data.title}`);
    }
  } catch (err) {
    console.error('Twilio send failed', err);
  }

  return NextResponse.json({ ticket: data }, { status: 201 });
}
