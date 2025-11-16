'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = '/portal/dashboard';
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-900 p-10 rounded-2xl border border-cyan-500">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Client Portal</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="client@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-xl rounded-lg hover:scale-105 transition"
          >
            {loading ? 'Logging in...' : 'ENTER PORTAL →'}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          New client? <a href="mailto:skyler@bluhorizonit.com" className="text-cyan-400">Request Access</a>
        </p>
      </div>
    </div>
  );
}
