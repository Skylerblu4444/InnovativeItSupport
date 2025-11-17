import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import TicketCard from "../../components/TicketCard";

export default function TechnicianJobs() {
  const [tickets, setTickets] = useState<any[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const res = await api("/tickets");
        setTickets(res.tickets || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);
  return (
    <main style={{ padding: 24 }}>
      <h1>Technician Jobs</h1>
      <p>Assigned and open tickets.</p>
      {tickets.map((t) => (
        <TicketCard key={t.id} ticket={t} />
      ))}
    </main>
  );
}
