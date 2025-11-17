// src/app/portal/tickets/[id]/page.tsx
import { getBrowserSupabase } from '@/lib/supabaseClient';
import TicketCard from '@/components/TicketCard';
import { supabaseServer } from '@/lib/supabase.server';
import { summarizeText } from '@/lib/openai.server';
import FileUpload from '@/components/FileUpload';

type Props = { params: { id: string } };

async function getTicket(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function TicketPage({ params }: Props) {
  const ticket = await getTicket(params.id);
  // server-side summarization example (non-blocking)
  const summary = ticket ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/summarize-ticket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ text: ticket.description })
  }).then((r)=> r.json()).then(j=> j.summary).catch(()=> null) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Ticket</h1>
      <div>
        <TicketCard ticket={ticket} />
      </div>

      {summary && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">AI Summary & Next Steps</h3>
          <p className="text-sm text-slate-600 mt-2">{summary}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold">Messages</h4>
        <div id="messages" className="mt-4">
          {/* messages will be loaded client-side for simplicity */}
          <MessageThread ticketId={params.id} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold">Add Message / Attachment</h4>
        <MessageComposer ticketId={params.id} />
      </div>
    </div>
  );
}

// Client components below must be separate files. We'll include them inline here for ease.

import React, { useEffect, useState } from 'react';

// MessageThread client component
function MessageThread({ ticketId }: { ticketId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/messages?ticket_id=${ticketId}`);
      const j = await res.json();
      setMessages(j || []);
    }
    load();
  }, [ticketId]);

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div key={m.id} className="p-3 bg-slate-50 rounded">
          <div className="text-sm text-slate-700">{m.message}</div>
          {m.attachment_url && <a href={m.attachment_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Attachment</a>}
          <div className="text-xs text-slate-400 mt-1">{new Date(m.created_at).toLocaleString()}</div>
        </div>
      ))}
      {!messages.length && <div className="text-sm text-slate-500">No messages yet.</div>}
    </div>
  );
}

// MessageComposer client component
function MessageComposer({ ticketId }: { ticketId: string }) {
  const [text, setText] = useState('');
  const [attachUrl, setAttachUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticket_id: ticketId, message: text, attachment_url: attachUrl })
    });
    if (res.ok) {
      setText('');
      // reload messages area
      window.location.reload();
    } else {
      const j = await res.json();
      alert(j?.error || 'Failed to send');
    }
    setLoading(false);
  }

  return (
    <div className="space-y-3">
      <textarea value={text} onChange={(e)=> setText(e.target.value)} className="w-full border rounded p-2" rows={4} />
      <FileUpload onUploaded={(url) => setAttachUrl(url)} />
      <div className="flex gap-3">
        <button onClick={submit} disabled={loading} className="px-4 py-2 bg-horizon-500 text-white rounded">{loading ? 'Sending…' : 'Send'}</button>
      </div>
    </div>
  );
            }
