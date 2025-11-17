export type UserProfile = {
  id: string;
  full_name?: string;
  role?: "client" | "technician" | "admin";
  company?: string;
  created_at?: string;
};

export type Ticket = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: number;
  client_id?: string;
  assigned_to?: string;
  created_at?: string;
  updated_at?: string;
};
