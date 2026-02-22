create extension if not exists pgcrypto;

create or replace function public.generate_site_public_key()
returns text
language sql
as $$
  select 'sw_site_' || encode(gen_random_bytes(18), 'hex');
$$;

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  domain text not null,
  public_key text not null default public.generate_site_public_key(),
  is_default boolean not null default false
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'sites_public_key_key'
      and conrelid = 'public.sites'::regclass
  ) then
    alter table public.sites
      add constraint sites_public_key_key unique (public_key);
  end if;
end
$$;

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

insert into public.sites (name, domain, is_default)
select 'Supaweb Labs (Default)', 'supaweblabs.com', true
where not exists (
  select 1
  from public.sites
  where lower(domain) = 'supaweblabs.com'
);

with target_default as (
  select id
  from public.sites
  where lower(domain) = 'supaweblabs.com'
  order by created_at asc
  limit 1
)
update public.sites as s
set is_default = s.id = target_default.id
from target_default;

create unique index if not exists sites_single_default_idx
  on public.sites (is_default)
  where is_default = true;

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

create index if not exists campaigns_site_id_idx on public.campaigns (site_id);

with default_site as (
  select id
  from public.sites
  where is_default = true
  limit 1
)
update public.campaigns as c
set site_id = default_site.id
from default_site
where c.site_id is null;

create or replace function public.attach_default_site_to_campaign()
returns trigger
language plpgsql
as $$
begin
  if new.site_id is null then
    select id
    into new.site_id
    from public.sites
    where is_default = true
    order by created_at asc
    limit 1;
  end if;

  return new;
end;
$$;

drop trigger if exists campaigns_attach_default_site on public.campaigns;
create trigger campaigns_attach_default_site
before insert on public.campaigns
for each row
execute function public.attach_default_site_to_campaign();
