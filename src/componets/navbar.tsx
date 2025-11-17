// src/components/navbar.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import { getBrowserSupabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
    });
  }, []);

  return (
    <motion.nav initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white dark:bg-[#061824] border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">BluHorizon</Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6">
            <Link href="/#services" className="text-sm">Services</Link>
            <Link href="/#portfolio" className="text-sm">Portfolio</Link>
            <Link href="/pricing" className="text-sm">Pricing</Link>
          </div>

          <DarkModeToggle />

          <Link href={email ? '/portal' : '/signin'} className="ml-2 px-3 py-2 bg-horizon-500 text-white rounded text-sm">
            {email ? 'Portal' : 'Sign in'}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
