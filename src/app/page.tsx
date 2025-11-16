'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Server, Headphones, Laptop, Lock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-cyan-900/20"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <h1 className="text-6xl md:text-9xl font-black text-white mb-6 leading-tight">
            INNOVATIVE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              IT SUPPORT
            </span>
          </h1>
          <p className="text-2xl md:text-4xl text-cyan-300 mb-10 font-light">
            Managed IT • Cybersecurity • 24/7 Emergency • Hardware Store
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/portal" className="px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-black text-2xl font-bold rounded-xl shadow-2xl transform hover:scale-110 transition">
              CLIENT PORTAL →
            </Link>
            <a href="tel:+15551234567" className="px-12 py-6 bg-red-600 hover:bg-red-500 text-white text-2xl font-bold rounded-xl shadow-2xl animate-pulse">
              EMERGENCY CALL NOW
            </a>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-bold text-center text-white mb-20">One-Stop IT Domination</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: "Managed IT", desc: "Unlimited support. Zero downtime.", price: "$499/mo" },
              { icon: Zap, title: "Emergency 24/7", desc: "We arrive in <1 hour", price: "$199/hr" },
              { icon: Lock, title: "Penetration Testing", desc: "Certified ethical hacker", price: "From $5,000" },
              { icon: Server, title: "Cloud Migration", desc: "AWS • Azure • On-Prem", price: "Quote" },
              { icon: Laptop, title: "Web Development", desc: "Full-Stack React/Node", price: "From $3,000" },
              { icon: Headphones, title: "Help Desk", desc: "Real humans. No bots.", price: "Included" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-gray-800 hover:border-cyan-500 transition-all"
              >
                <s.icon className="w-16 h-16 text-cyan-400 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">{s.title}</h3>
                <p className="text-gray-400 mb-6">{s.desc}</p>
                <p className="text-2xl font-bold text-cyan-400">{s.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
