// src/app/portal/tickets/new.page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewTicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority })
    });

    if (res.ok) {
      router.push('/portal');
    } else {
      const json = await res.json();
      alert(json?.error || 'Failed to create ticket');
      setLoading(false);
    }
  }

  return (
    <section>
      <h3 className="text-xl font-semibold">New Ticket</h3>
      <form onSubmit={onSubmit} className="mt-4 space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={5} />
        </div>

        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="mt-1 border rounded px-3 py-2">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-horizon-500 text-white rounded">
            {loading ? 'Creating...' : 'Create Ticket'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </section>
  );
}
