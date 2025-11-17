# Innovative IT Support - Starter

This repository contains a starter skeleton for an IT Support / MSP SaaS:
- Express + TypeScript backend
- Supabase as DB & auth
- Stripe billing hooks
- OpenAI assistant stub
- SQL schema for Supabase

## Getting started

1. Duplicate `.env.example` to `.env` and fill values.
2. Start local Postgres or Supabase and apply `infra/supabase_schema.sql`.
3. Install deps: `npm install`
4. Run dev server: `npm run dev`

## Structure
- `src/backend` - API server
- `src/frontend` - Next-like frontend skeleton
- `infra/supabase_schema.sql` - DB schema for tables we use.

## Next steps (priority)
1. Add robust auth & RBAC (Supabase policies).
2. Build React/Next frontend dashboards.
3. Add CI with tests & linting.
4. Add monitoring and Sentry.
