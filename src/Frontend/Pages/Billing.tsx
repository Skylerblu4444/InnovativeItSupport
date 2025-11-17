import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Billing() {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function createCustomer() {
    setLoading(true);
    const res = await api("/billing/create-customer", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com" })
    });
    setCustomer(res.customer);
    setLoading(false);
  }

  async function subscribe(priceId: string) {
    setLoading(true);
    const res = await api("/billing/subscribe", {
      method: "POST",
      body: JSON.stringify({ customerId: customer.id, priceId })
    });
    alert("Subscription created: " + res.subscription.id);
    setLoading(false);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Billing</h1>

      {!customer && (
        <button onClick={createCustomer} disabled={loading}>
          Create Stripe Customer
        </button>
      )}

      {customer && (
        <div style={{ marginTop: 20 }}>
          <p>Customer: {customer.email}</p>
          <button onClick={() => subscribe("price_basic")}>
            Subscribe to Basic ($49/mo)
          </button>
          <br />
          <button onClick={() => subscribe("price_standard")}>
            Subscribe to Standard ($99/mo)
          </button>
          <br />
          <button onClick={() => subscribe("price_premium")}>
            Subscribe to Premium ($199/mo)
          </button>
        </div>
      )}
    </main>
  );
}
