// src/components/FeatureGrid.tsx
import AnimatedCard from './AnimatedCard';
import { ShieldCheckIcon, CloudIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

export default function FeatureGrid() {
  const features = [
    { name: 'Enterprise Security', desc: 'SOC, SIEM, threat hunting, red team.', icon: ShieldCheckIcon },
    { name: 'Cloud Engineering', desc: 'Kubernetes, IaC, secure pipelines.', icon: CloudIcon },
    { name: 'Full-Stack Builds', desc: 'React, Next.js, mobile, AI integrations.', icon: CodeBracketIcon }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {features.map((f) => (
        <AnimatedCard key={f.name} title={f.name}>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-horizon-50 rounded">
              <f.icon className="w-6 h-6 text-horizon-700" />
            </div>
            <div className="text-sm text-slate-600">{f.desc}</div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
}
