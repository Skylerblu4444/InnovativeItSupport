import React from "react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome to your IT Support Dashboard.</p>

      <div style={{ marginTop: 24 }}>
        <Link href="/tickets">View Tickets</Link>
      </div>

      <div style={{ marginTop: 12 }}>
        <Link href="/billing">Manage Subscription</Link>
      </div>
    </main>
  );
}
