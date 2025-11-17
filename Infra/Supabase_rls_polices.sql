-- Enable RLS on key tables (run as admin)
alter table if exists profiles enable row level security;
alter table if exists tickets enable row level security;
alter table if exists hardware_inventory enable row level security;
alter table if exists subscriptions enable row level security;

-- Allow authenticated users to select their own profile
create policy "select own profile" on profiles
  for select
  using ( auth.uid() = id );

create policy "update own profile" on profiles
  for update
  using ( auth.uid() = id );

-- Tickets: clients can create, see their tickets; technicians/admins can see more
create policy "clients insert tickets" on tickets
  for insert
  with check ( client_id = auth.uid() );

create policy "clients select own tickets" on tickets
  for select
  using ( client_id = auth.uid() );

-- allow authenticated service roles (backend service key) to bypass checks
-- Note: carefully manage service key usage and only on server side
