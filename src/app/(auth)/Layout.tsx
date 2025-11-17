// src/app/(auth)/layout.tsx
'use client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { getBrowserSupabase } from '@/lib/supabaseClient';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <SessionContextProvider supabaseClient={getBrowserSupabase()} initialSession={null}>{children}</SessionContextProvider>;
}
