// src/app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-08-01' });
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // handle events of interest
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // TODO: link to Supabase user using session.client_reference_id or metadata
    // Example: store session in supabase.billing_sessions
    await supabase.from('stripe_sessions').insert([
      {
        stripe_session_id: session.id,
        customer: session.customer as string,
        amount_total: session.amount_total,
        created_at: new Date().toISOString()
      }
    ]);
  }

  // subscription events
  if (event.type.startsWith('customer.subscription.')) {
    const sub = event.data.object as Stripe.Subscription;
    // Upsert subscription into supabase.subscriptions table
    await supabase.from('subscriptions').upsert({
      id: sub.id,
      customer: sub.customer,
      status: sub.status,
      price_id: (sub.items.data[0].price?.id) || null,
      current_period_end: new Date((sub.current_period_end || 0) * 1000).toISOString()
    });
  }

  return NextResponse.json({ received: true });
}
