// src/components/AnimatedCard.tsx
'use client';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import clsx from 'clsx';

export default function AnimatedCard({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, translateY: -6 }}
      whileTap={{ scale: 0.995 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx('ui-card', className)}
    >
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="mt-3 text-slate-600">{children}</div>
    </motion.article>
  );
}
