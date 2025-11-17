// src/components/footer.tsx
import { SITE } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="font-medium">Innovative Information Technology Resolutions LLC</div>
          <div className="text-sm text-slate-600">{SITE.address}</div>
        </div>

        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} BluHorizon — All rights reserved
        </div>
      </div>
    </footer>
  );
}
