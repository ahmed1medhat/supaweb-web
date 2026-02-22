create extension if not exists pgcrypto;

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  type text not null check (type in ('top_bar', 'modal', 'slide_in')),
  status text not null default 'draft' check (status in ('draft', 'active', 'paused')),
  priority int not null default 100,
  title text null,
  message text null,
  cta_text text null,
  cta_url text null,
  pages_mode text not null default 'all' check (pages_mode in ('all', 'include')),
  include_paths text[] null,
  audience_mode text not null default 'all' check (audience_mode in ('all', 'guest', 'logged_in')),
  plan_mode text not null default 'all' check (plan_mode in ('all', 'free', 'pro', 'scale', 'enterprise')),
  frequency text not null default 'session' check (frequency in ('session', 'daily'))
);

create index if not exists campaigns_priority_idx on public.campaigns (priority asc, updated_at desc);
create index if not exists campaigns_status_idx on public.campaigns (status);

create or replace function public.set_campaigns_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists campaigns_set_updated_at on public.campaigns;
create trigger campaigns_set_updated_at
before update on public.campaigns
for each row
execute function public.set_campaigns_updated_at();

alter table public.campaigns enable row level security;

grant select, insert, update, delete on public.campaigns to authenticated;

drop policy if exists "Admin can select campaigns" on public.campaigns;
create policy "Admin can select campaigns"
  on public.campaigns
  for select
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can insert campaigns" on public.campaigns;
create policy "Admin can insert campaigns"
  on public.campaigns
  for insert
  to authenticated
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can update campaigns" on public.campaigns;
create policy "Admin can update campaigns"
  on public.campaigns
  for update
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com')
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can delete campaigns" on public.campaigns;
create policy "Admin can delete campaigns"
  on public.campaigns
  for delete
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');
