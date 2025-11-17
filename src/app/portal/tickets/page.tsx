// src/app/portal/tickets/page.tsx
import Link from 'next/link';
import TicketCard from '../../../components/TicketCard';

async function getTickets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/tickets`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Tickets</h3>
        <Link href="/portal/tickets/new" className="px-3 py-2 bg-horizon-500 text-white rounded-md">Create ticket</Link>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets?.map((t: any) => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </section>
  );
}
