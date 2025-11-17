import React, { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import { api } from "../lib/api";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api("/tickets");
      setTickets(res.tickets || []);
    }
    load();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Tickets</h1>

      {tickets.map((ticket: any) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </main>
  );
}
