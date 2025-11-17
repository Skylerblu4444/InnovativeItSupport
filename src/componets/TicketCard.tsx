// src/components/TicketCard.tsx
import { Ticket } from '../lib/types';

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <article className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{ticket.title}</h4>
          <p className="text-sm text-slate-600 mt-1">{ticket.description}</p>
        </div>
        <div className="text-xs text-slate-500">
          {new Date(ticket.created_at).toLocaleString()}
          <div className="mt-2 text-sm">{ticket.priority}</div>
        </div>
      </div>

      <div className="mt-3">
        <span className={`inline-block px-2 py-1 text-xs rounded ${ticket.status === 'open' ? 'bg-green-50 text-green-700' : ticket.status === 'in_progress' ? 'bg-yellow-50 text-yellow-700' : 'bg-slate-100 text-slate-700'}`}>
          {ticket.status}
        </span>
      </div>
    </article>
  );
}
