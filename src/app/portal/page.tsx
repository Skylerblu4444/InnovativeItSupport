// src/app/portal/page.tsx
import Link from 'next/link';
import TicketCard from '../../components/TicketCard';

async function fetchTickets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/tickets`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function PortalPage() {
  const tickets = await fetchTickets();

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Client Portal</h2>
        <div>
          <Link href="/portal/tickets/new" className="px-3 py-2 bg-horizon-500 text-white rounded-md">New Ticket</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets?.length ? tickets.map((t: any) => <TicketCard key={t.id} ticket={t} />) : <div className="text-slate-600">No tickets yet.</div>}
      </div>
    </section>
  );
}
