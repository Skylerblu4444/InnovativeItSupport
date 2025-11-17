"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="w-full p-6 shadow-lg flex justify-between items-center bg-white/90 backdrop-blur-xl">
      <div className="text-3xl font-extrabold text-blue-600">
        bluHorizon IT
      </div>

      <nav className="hidden md:flex gap-10 text-lg font-semibold">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/portal" className="text-blue-600">
          Client Portal
        </Link>
      </nav>
    </header>
  );
}
