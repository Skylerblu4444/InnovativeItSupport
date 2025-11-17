-- ticket_comments
create table if not exists ticket_comments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references tickets(id) on delete cascade,
  author_id uuid references profiles(id),
  body text not null,
  created_at timestamptz default now()
);

-- devices table for agent telemetry
create table if not exists devices (
  id text primary key, -- agent-provided device id (could be uuid or hostname+serial)
  hostname text,
  os text,
  cpu jsonb,
  memory jsonb,
  disk jsonb,
  client_id uuid references profiles(id),
  last_seen timestamptz,
  meta jsonb
);

-- small index for quick last_seen queries
create index if not exists idx_devices_last_seen on devices(last_seen desc);
