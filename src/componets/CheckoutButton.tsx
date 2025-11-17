// src/components/CheckoutButton.tsx
'use client';
import { useState } from 'react';

export default function CheckoutButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);
  async function checkout() {
    setLoading(true);
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId })
    });
    const json = await res.json();
    if (json?.url) {
      window.location.href = json.url;
    } else {
      alert('Checkout failed');
      setLoading(false);
    }
  }
  return (
    <button disabled={loading} onClick={checkout} className="px-6 py-3 rounded bg-horizon-500 text-white">
      {loading ? 'Redirecting…' : 'Subscribe'}
    </button>
  );
}
