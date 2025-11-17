import React from "react";

export default function TicketCard({ ticket }: any) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: 12,
        border: "1px solid #eee",
        marginBottom: 12
      }}
    >
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <small>Status: {ticket.status}</small>
    </div>
  );
}
