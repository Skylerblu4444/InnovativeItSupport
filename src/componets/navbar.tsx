// src/components/navbar.tsx
import Link from 'next/link';
import { SITE } from '../lib/constants';

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          BluHorizon
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/#services" className="text-sm">Services</Link>
          <Link href="/#portfolio" className="text-sm">Portfolio</Link>
          <Link href="/portal" className="text-sm font-medium">Client Portal</Link>
        </div>

        <div className="flex items-center gap-3">
          <a href={`tel:${SITE.phone}`} className="text-sm">{SITE.phone}</a>
          <Link href="/contact" className="ml-2 inline-block px-3 py-2 bg-horizon-500 text-white rounded-md text-sm">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
