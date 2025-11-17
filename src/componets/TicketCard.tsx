import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function TicketCard({ ticket }) {
  return (
    <Card className="w-full shadow-md hover:shadow-xl transition-all cursor-pointer">
      <CardHeader>
        <h2 className="text-xl font-bold">{ticket.title}</h2>
        <p className="text-sm text-gray-500">{ticket.status.toUpperCase()}</p>
      </CardHeader>
      <CardContent>
        <p>{ticket.description}</p>

        <div className="mt-4 flex gap-4">
          <span className="text-blue-600 font-semibold">
            Priority: {ticket.priority}
          </span>
          <span className="text-gray-600">
            Created: {new Date(ticket.created_at).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
