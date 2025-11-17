import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-11-01" });

export async function createCustomer(email: string, name?: string) {
  const customer = await stripe.customers.create({ email, name });
  return customer;
}

export async function createSubscription(customerId: string, priceId: string) {
  const sub = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    expand: ["latest_invoice.payment_intent"]
  });
  return sub;
}
