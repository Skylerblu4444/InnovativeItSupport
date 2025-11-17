// src/app/admin/services/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);

  useEffect(()=> { load(); }, []);
  async function load() {
    const res = await fetch('/api/services');
    if (res.ok) setServices(await res.json());
  }

  async function create() {
    const res = await fetch('/api/services', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, price, description: ''})});
    if (res.ok) { setName(''); setPrice(0); load(); } else alert('Failed');
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl">Services</h2>
      <div className="mt-4 space-y-3">
        <div className="flex gap-2">
          <input value={name} onChange={(e)=> setName(e.target.value)} placeholder="Name" className="border rounded px-2 py-1" />
          <input value={price} onChange={(e)=> setPrice(Number(e.target.value))} type="number" className="border rounded px-2 py-1" />
          <button onClick={create} className="px-3 py-1 bg-horizon-500 text-white rounded">Create</button>
        </div>

        <div className="mt-4 space-y-2">
          {services.map(s => (
            <div key={s.id} className="p-3 border rounded flex justify-between">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm">${s.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
