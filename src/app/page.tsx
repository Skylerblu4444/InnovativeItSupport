// snippet for pricing card
import AnimatedCard from '@/components/AnimatedCard';

<AnimatedCard title="Business Pro" className={plan.popular ? 'border-2 border-horizon-500' : ''}>
  <div className="text-4xl font-extrabold">${1499}</div>
  <div className="mt-4 text-sm text-slate-600">24/7 monitoring, priority support</div>
  <div className="mt-6">
    <button className="px-4 py-2 rounded bg-horizon-500 text-white">Subscribe</button>
  </div>
</AnimatedCard>
// src/app/page.tsx
import Hero from '@/components/Hero';
import FeatureGrid from '@/components/FeatureGrid';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedCTA from '@/components/AnimatedCTA';

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mt-8">What we do</h2>
        <FeatureGrid />

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <AnimatedCard title="Penetration Testing">
            High-skill red-team and vulnerability discovery. Includes executive report and remediation plan.
          </AnimatedCard>

          <AnimatedCard title="Managed Security (SOC)">
            24/7 monitoring, SIEM, threat intel ingestion and automated triage.
          </AnimatedCard>

          <AnimatedCard title="Cloud & DevSecOps">
            Production readiness, IaC, secure pipelines, multi-region architectures.
          </AnimatedCard>
        </div>

        <div className="mt-12 text-center">
          <AnimatedCTA href="/contact">Get your free engineering audit</AnimatedCTA>
        </div>
      </section>
    </div>
  );
}
