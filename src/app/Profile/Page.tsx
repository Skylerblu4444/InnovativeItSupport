// src/app/profile/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabaseClient';

export default function ProfilePage() {
  const supabase = getBrowserSupabase();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    async function load() {
      const { data: sessionRes } = await supabase.auth.getSession();
      const user = sessionRes?.session?.user;
      setUser(user);
      // optionally fetch profile from `users` table for full_name
      const resp = await fetch('/api/user/me');
      if (resp.ok) {
        const j = await resp.json();
        setName(j.full_name || '');
      }
    }
    load();
  }, [supabase]);

  async function save() {
    // call API to update profile
    const res = await fetch('/api/user/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ full_name: name })});
    if (res.ok) alert('Saved');
    else {
      const j = await res.json(); alert(j?.error || 'Failed');
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="mt-4">
        <label className="text-sm">Email</label>
        <div className="mt-1 text-slate-700">{user?.email}</div>
      </div>

      <div className="mt-4">
        <label className="text-sm">Full name</label>
        <input value={name} onChange={(e)=> setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/>
      </div>

      <div className="mt-4">
        <button onClick={save} className="px-4 py-2 bg-horizon-500 text-white rounded">Save profile</button>
      </div>
    </div>
  );
}
