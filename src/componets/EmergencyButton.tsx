// src/components/EmergencyButton.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function EmergencyButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/portal/tickets/new')}
      className="fixed right-6 bottom-6 bg-red-600 text-white px-4 py-3 rounded-full shadow-lg"
      title="Open emergency ticket"
    >
      Emergency
    </button>
  );
}
