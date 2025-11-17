import { Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { supabase } from "../supabase";
dotenv.config();

const router = Router();
const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-11-01" });

// raw body required for stripe signature verification — ensure in server.ts bodyParser raw is applied for /webhooks
router.post("/stripe", expressRawMiddleware(), async (req: any, res) => {
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig!, stripeSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // handle events
  switch (event.type) {
    case "invoice.payment_succeeded":
      {
        const invoice = event.data.object as Stripe.Invoice;
        // TODO: update subscription status in DB
        console.log("Payment succeeded for invoice", invoice.id);
      }
      break;
    case "customer.subscription.deleted":
    case "customer.subscription.updated":
      {
        const sub = event.data.object as Stripe.Subscription;
        // sync to subscriptions table in supabase
        await supabase.from("subscriptions").upsert({
          stripe_subscription_id: sub.id,
          status: sub.status,
          updated_at: new Date().toISOString()
        });
      }
      break;
    default:
      console.log(`Unhandled stripe event type ${event.type}`);
  }

  res.json({ received: true });
});

function expressRawMiddleware() {
  // small express middleware to get raw body for Stripe
  return (req: any, res: any, next: any) => {
    let data = Buffer.alloc(0);
    req.on("data", (chunk: Buffer) => {
      data = Buffer.concat([data, chunk]);
    });
    req.on("end", () => {
      req.rawBody = data.toString("utf8");
      // also parse JSON for convenience (careful: we already consumed stream)
      try {
        req.body = JSON.parse(req.rawBody);
      } catch (e) {
        req.body = {};
      }
      next();
    });
  };
}

export default router;
