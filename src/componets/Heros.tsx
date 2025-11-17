// src/components/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Hero() {
  return (
    <section className="hero-gradient rounded-xl p-8 md:p-12 relative overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            BluHorizon — Engineering secure & beautiful systems
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-xl">
            PhD-level full-stack engineering, cloud & DevSecOps, advanced penetration testing,
            and managed IT. We build production-grade systems designed for scale, resilience, and security.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/portal" className="inline-flex items-center gap-2 px-5 py-3 bg-horizon-500 text-white rounded-md shadow hover:translate-y-[-2px] transition-transform">
              Open Client Portal
              <ChevronRightIcon className="w-4 h-4 opacity-90" />
            </Link>

            <Link href="#services" className="inline-flex items-center gap-2 px-5 py-3 border rounded-md">
              View Services
            </Link>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            <span className="font-medium">Free consult:</span> Get a 30-minute discovery call and SOC review.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative"
        >
          {/* hero illustration box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 drop-shadow-hero">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-100">
                <h4 className="text-sm font-semibold">Managed Security</h4>
                <p className="mt-1 text-xs text-slate-500">24/7 SOC • SIEM • Threat Hunting</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-100">
                <h4 className="text-sm font-semibold">Cloud & DevSecOps</h4>
                <p className="mt-1 text-xs text-slate-500">K8s • CI/CD • IaC</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-100">
                <h4 className="text-sm font-semibold">Penetration Testing</h4>
                <p className="mt-1 text-xs text-slate-500">Red Team • API • Mobile</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-100">
                <h4 className="text-sm font-semibold">Full-stack Engineering</h4>
                <p className="mt-1 text-xs text-slate-500">Web, Mobile, AI Systems</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <div className="p-3 rounded-lg bg-horizon-50">
                <div className="text-xs text-slate-500">Clients</div>
                <div className="font-semibold">50+</div>
              </div>
              <div className="p-3 rounded-lg bg-horizon-50">
                <div className="text-xs text-slate-500">Avg SLO</div>
                <div className="font-semibold">99.99%</div>
              </div>
            </div>
          </div>

          {/* decorative floating circle */}
          <motion.div
            className="absolute -right-10 -top-6 w-44 h-44 rounded-full bg-gradient-to-tr from-horizon-300/20 to-transparent pointer-events-none"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
