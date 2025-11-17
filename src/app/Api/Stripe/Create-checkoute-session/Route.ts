// src/app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseServer } from '@/lib/supabase.server';
import { getUserFromRequest } from '@/lib/auth.server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-08-01' });

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { priceId, successUrl, cancelUrl } = await request.json();
  if (!priceId) return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });

  // Ensure we have a customer id in our users table or metadata
  const { data: appUser } = await supabaseServer.from('users').select('*').eq('email', user.email).single();

  let customerId = appUser?.stripe_customer_id as string | undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email, name: appUser?.full_name || undefined });
    customerId = customer.id;
    await supabaseServer.from('users').update({ stripe_customer_id: customerId }).eq('id', appUser.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/portal?checkout=success`,
    cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?checkout=cancel`
  });

  return NextResponse.json({ url: session.url });
}
