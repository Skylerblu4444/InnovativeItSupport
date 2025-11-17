-- Users table (Supabase auth will manage primary auth; here is profile)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'client', -- client, technician, admin
  company text,
  created_at timestamptz default now()
);

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text default 'open', -- open, in_progress, resolved, closed
  priority int default 3,
  client_id uuid references profiles(id),
  assigned_to uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists hardware_inventory (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id),
  vendor text,
  model text,
  serial text,
  purchase_date date,
  warranty_expires date,
  status text default 'active', -- active, retired, in_repair
  notes text
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id),
  tier text,
  stripe_subscription_id text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  action text,
  metadata jsonb,
  created_at timestamptz default now()
);
