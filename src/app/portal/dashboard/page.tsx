import { supabase } from '@/lib/supabase';
import { EmergencyButton } from '@/components/EmergencyButton';

export default async function Dashboard() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data: tickets } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-black text-white">
      <EmergencyButton />
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-5xl font-bold mb-2">Welcome back, {user?.email}</h1>
        <p className="text-xl text-cyan-400 mb-10">Your IT Command Center</p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-900 to-black p-8 rounded-2xl border border-purple-600">
            <h3 className="text-2xl font-bold">Active Tickets</h3>
            <p className="text-6xl font-bold text-cyan-400">{tickets?.length || 0}</p>
          </div>
          <a href="/portal/tickets/new" className="bg-red-900 p-8 rounded-2xl border-2 border-red-500 hover:bg-red-800 transition text-center">
            <h3 className="text-3xl font-bold">NEW EMERGENCY TICKET</h3>
          </a>
          <a href="/booking" className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-2xl text-center hover:scale-105 transition">
            <h3 className="text-3xl font-bold">Book On-Site Visit</h3>
          </a>
        </div>

        <h2 className="text-3xl font-bold mb-6">Recent Tickets</h2>
        <div className="space-y-4">
          {tickets?.map((ticket) => (
            <div key={ticket.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{ticket.title}</h3>
                  <p className="text-gray-400">{new Date(ticket.created_at).toLocaleString()}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  ticket.priority === 'urgent' ? 'bg-red-600' : 'bg-yellow-600'
                }`}>
                  {ticket.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
