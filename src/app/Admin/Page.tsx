export default function AdminDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold">Admin Control Center</h1>

      <div className="grid grid-cols-4 gap-10 mt-16">
        <div className="p-10 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold">Active Tickets</h2>
        </div>

        <div className="p-10 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold">Security Alerts</h2>
        </div>

        <div className="p-10 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold">Users</h2>
        </div>

        <div className="p-10 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold">Billing</h2>
        </div>
      </div>
    </div>
  );
}
