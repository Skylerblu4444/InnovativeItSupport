// src/app/page.tsx
import Link from 'next/link';
import { SITE } from '../lib/constants';

export default function Home() {
  return (
    <section className="space-y-8">
      <header className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold">BluHorizon — Trusted engineering & security</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Full-stack engineering, cloud & DevSecOps, managed IT, and advanced penetration testing. We help startups and enterprises secure,
            scale, and innovate.
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="/portal" className="inline-block px-5 py-3 bg-horizon-500 text-white rounded-md shadow">
              Client Portal
            </Link>
            <Link href="/#services" className="inline-block px-5 py-3 border border-slate-200 rounded-md">
              Services & Pricing
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-gradient-to-tr from-horizon-50 to-white p-6 rounded-lg h-full">
            <h3 className="font-medium">Get started</h3>
            <p className="mt-2 text-sm text-slate-600">Book a free consult or open an emergency ticket anytime.</p>
            <div className="mt-4">
              <a href="tel:+14794068375" className="block font-medium text-horizon-700">Call {SITE.phone}</a>
              <p className="text-xs text-slate-500 mt-1">{SITE.address}</p>
            </div>
          </div>
        </div>
      </header>

      <section id="services" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold">Managed IT (MSP)</h4>
          <p className="mt-2 text-sm text-slate-600">Full remote management, patching, backups, and 24/7 support.</p>
          <div className="mt-4 font-medium">$99/user / month</div>
        </div>

        <div className="card p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold">Security & PenTesting</h4>
          <p className="mt-2 text-sm text-slate-600">Red team, web/mobile/API testing, forensics, IR.</p>
          <div className="mt-4 font-medium">$3,500+</div>
        </div>

        <div className="card p-6 bg-white rounded-lg shadow">
          <h4 className="font-semibold">Cloud & DevSecOps</h4>
          <p className="mt-2 text-sm text-slate-600">Kubernetes, CI/CD, infra-as-code, secure pipelines.</p>
          <div className="mt-4 font-medium">$4,500 / month</div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">Featured work</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white rounded-lg shadow p-4">
            <h5 className="font-medium">FinTech: PCI-DSS</h5>
            <p className="text-sm text-slate-600 mt-2">End-to-end PCI compliance and microservices redesign for payments scale.</p>
          </article>

          <article className="bg-white rounded-lg shadow p-4">
            <h5 className="font-medium">Healthcare: HIPAA</h5>
            <p className="text-sm text-slate-600 mt-2">Secure telehealth integration and EHR migration.</p>
          </article>

          <article className="bg-white rounded-lg shadow p-4">
            <h5 className="font-medium">Travel platform: Recovery</h5>
            <p className="text-sm text-slate-600 mt-2">Breach response, recovery, and re-architecture for availability.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
