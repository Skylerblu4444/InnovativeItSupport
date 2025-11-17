// src/app/sitemap.ts
import { SITE } from './lib/constants';

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const staticPages = ['', 'signin', 'portal', 'pricing', 'contact', 'about'].map((p) => `${base}/${p}`);
  const routes = staticPages.map((loc) => ({ loc, lastmod: new Date().toISOString() }));
  return routes;
}
