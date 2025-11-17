// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export const metadata = {
  title: 'BluHorizon — Innovative IT & Cybersecurity',
  description: 'Managed IT, Cybersecurity, Pen Testing, Cloud, DevSecOps, and Full-Stack Engineering'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
