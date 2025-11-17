// src/lib/types.ts
export type Ticket = {
  id: string;
  title: string;
  description: string | null;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  created_by: string | null;
};
