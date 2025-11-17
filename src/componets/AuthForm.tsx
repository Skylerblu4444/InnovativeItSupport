// src/components/AuthForm.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../lib/supabase';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setMessage(null);

    const { error } = await supabaseClient.auth.signInWithOtp({ email });

    if (error) {
      setStatus('error');
      setMessage(error.message);
    } else {
      setStatus('sent');
      setMessage('Check your email for the magic link. If it doesn’t appear, check spam.');
    }
  }

  async function signOut() {
    await supabaseClient.auth.signOut();
    // reload so client UI updates
    window.location.href = '/';
  }

  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      // we could forward session to server endpoints later
    });
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow">
      <form onSubmit={signInWithEmail} className="space-y-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="you@company.com"
        />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-horizon-500 text-white rounded">
            {status === 'sending' ? 'Sending…' : 'Send magic link'}
          </button>
          <button type="button" onClick={signOut} className="px-4 py-2 border rounded">
            Sign out
          </button>
        </div>
        {message && <div className="text-sm mt-2 text-slate-600">{message}</div>}
      </form>
    </div>
  );
}
