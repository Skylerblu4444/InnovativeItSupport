// components/EmergencyButton.tsx
'use client';

export function EmergencyButton() {
  return (
    <a
      href="tel:+4794068378"
      className="fixed bottom-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white p-6 rounded-full shadow-2xl animate-pulse"
    >
      <span className="text-4xl">EMERGENCY CALL</span>
    </a>
  );
}
