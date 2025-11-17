// src/components/AnimatedCTA.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedCTA({ href = '/contact', children = 'Get a free consult' }: { href?: string; children?: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="mt-6 inline-block">
      <Link href={href} className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-horizon-500 to-horizon-700 text-white rounded-xl shadow-lg">
        {children}
      </Link>
    </motion.div>
  );
}
