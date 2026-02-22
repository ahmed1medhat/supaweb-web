create extension if not exists pgcrypto;

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  domain text not null,
  public_key text not null unique default ('sw_site_' || encode(gen_random_bytes(18), 'hex')),
  is_default boolean not null default false
);

create or replace function public.set_sites_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists sites_set_updated_at on public.sites;
create trigger sites_set_updated_at
before update on public.sites
for each row
execute function public.set_sites_updated_at();

alter table public.sites enable row level security;

revoke all on public.sites from anon;
grant select, insert, update, delete on public.sites to authenticated;

drop policy if exists "Admin can select sites" on public.sites;
create policy "Admin can select sites"
  on public.sites
  for select
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can insert sites" on public.sites;
create policy "Admin can insert sites"
  on public.sites
  for insert
  to authenticated
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can update sites" on public.sites;
create policy "Admin can update sites"
  on public.sites
  for update
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com')
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can delete sites" on public.sites;
create policy "Admin can delete sites"
  on public.sites
  for delete
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

alter table public.campaigns
  add column if not exists site_id uuid;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'campaigns_site_id_fkey'
      and conrelid = 'public.campaigns'::regclass
  ) then
    alter table public.campaigns
      add constraint campaigns_site_id_fkey
      foreign key (site_id)
      references public.sites(id)
      on delete set null;
  end if;
end
$$;

insert into public.sites (name, domain, is_default)
select 'Supaweb Labs (Default)', 'supaweblabs.com', true
where not exists (
  select 1
  from public.sites
  where lower(domain) = 'supaweblabs.com'
);

with default_site as (
  select id
  from public.sites
  where lower(domain) = 'supaweblabs.com'
  order by created_at asc
  limit 1
)
update public.campaigns as c
set site_id = default_site.id
from default_site
where c.site_id is null;
