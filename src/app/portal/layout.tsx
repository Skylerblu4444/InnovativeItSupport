// src/app/portal/layout.tsx
'use client';
import { ReactNode, useEffect, useState } from 'react';
import { supabaseClient } from '../../lib/supabase';
import { redirect } from 'next/navigation';

export default function PortalLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function check() {
      const { data } = await supabaseClient.auth.getSession();
      if (!data.session) {
        // client redirect
        window.location.href = '/signin';
      } else {
        setLoading(false);
      }
    }
    check();
    // subscribe to auth changes -> redirect on sign out
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        window.location.href = '/signin';
      }
    });
    return () => listener?.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center p-12">Loading...</div>;
  }

  return <div className="space-y-6">{children}</div>;
}
