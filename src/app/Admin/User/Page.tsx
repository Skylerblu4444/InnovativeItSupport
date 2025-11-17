// src/app/admin/users/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => { fetchUsers(); }, []);
  async function fetchUsers() {
    const res = await fetch('/api/admin/users');
    if (res.ok) setUsers(await res.json());
  }

  async function changeRole(id: string, role: string) {
    const res = await fetch(`/api/admin/users/${id}`, { method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ role })});
    if (res.ok) fetchUsers();
    else alert('Failed');
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl">Users</h2>
      <div className="mt-4 space-y-3">
        {users.map(u => (
          <div key={u.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{u.email}</div>
              <div className="text-sm">{u.full_name}</div>
            </div>
            <div>
              <select defaultValue={u.role} onChange={(e)=> changeRole(u.id, e.target.value)}>
                <option value="client">client</option>
                <option value="engineer">engineer</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
