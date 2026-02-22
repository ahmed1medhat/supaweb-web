-- 1) Create campaigns table
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null,
  type text not null check (type in ('top_bar','modal','slide_in')),
  status text not null default 'draft' check (status in ('draft','active','paused')),
  priority int not null default 100,

  title text,
  message text,
  cta_text text,
  cta_url text,

  pages_mode text not null default 'all' check (pages_mode in ('all','include')),
  include_paths text[],

  audience_mode text not null default 'all' check (audience_mode in ('all','guest','logged_in')),
  plan_mode text not null default 'all' check (plan_mode in ('all','free','pro','scale','enterprise')),
  frequency text not null default 'session' check (frequency in ('session','daily'))
);

-- optional: auto-update updated_at on update
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_campaigns_updated_at on public.campaigns;
create trigger trg_campaigns_updated_at
before update on public.campaigns
for each row execute function public.set_updated_at();

-- 2) Enable RLS
alter table public.campaigns enable row level security;

-- 3) Policies: admin-only via email allowlist
-- Note: uses email claim from JWT; works when user is authenticated.
drop policy if exists "campaigns_admin_select" on public.campaigns;
create policy "campaigns_admin_select"
on public.campaigns
for select
to authenticated
using ( (auth.jwt() ->> 'email') = 'ahmed@supaweblabs.com' );

drop policy if exists "campaigns_admin_insert" on public.campaigns;
create policy "campaigns_admin_insert"
on public.campaigns
for insert
to authenticated
with check ( (auth.jwt() ->> 'email') = 'ahmed@supaweblabs.com' );

drop policy if exists "campaigns_admin_update" on public.campaigns;
create policy "campaigns_admin_update"
on public.campaigns
for update
to authenticated
using ( (auth.jwt() ->> 'email') = 'ahmed@supaweblabs.com' )
with check ( (auth.jwt() ->> 'email') = 'ahmed@supaweblabs.com' );

drop policy if exists "campaigns_admin_delete" on public.campaigns;
create policy "campaigns_admin_delete"
on public.campaigns
for delete
to authenticated
using ( (auth.jwt() ->> 'email') = 'ahmed@supaweblabs.com' );