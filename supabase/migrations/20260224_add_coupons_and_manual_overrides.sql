create extension if not exists pgcrypto;

alter table public.profiles
  add column if not exists email text,
  add column if not exists admin_plan_override text,
  add column if not exists admin_override_expires_at timestamptz,
  add column if not exists admin_override_notes text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_admin_plan_override_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_admin_plan_override_check
      check (
        admin_plan_override is null
        or admin_plan_override in ('free', 'pro', 'scale', 'enterprise')
      );
  end if;
end
$$;

create index if not exists profiles_email_lower_idx on public.profiles (lower(email));

update public.profiles as p
set email = lower(u.email)
from auth.users as u
where u.id = p.user_id
  and coalesce(trim(p.email), '') = '';

create or replace function public.guard_profile_override_fields()
returns trigger
language plpgsql
as $$
declare
  is_admin boolean := lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com';
  override_fields_changed boolean;
begin
  if new.email is not null then
    new.email = lower(trim(new.email));
    if new.email = '' then
      new.email = null;
    end if;
  end if;

  if tg_op = 'INSERT' then
    override_fields_changed :=
      new.admin_plan_override is not null
      or new.admin_override_expires_at is not null
      or coalesce(new.admin_override_notes, '') <> '';
  else
    override_fields_changed :=
      new.admin_plan_override is distinct from old.admin_plan_override
      or new.admin_override_expires_at is distinct from old.admin_override_expires_at
      or new.admin_override_notes is distinct from old.admin_override_notes;
  end if;

  if override_fields_changed and not is_admin then
    raise exception 'Only admin can modify override fields.';
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_guard_override_fields on public.profiles;
create trigger profiles_guard_override_fields
before insert or update on public.profiles
for each row
execute function public.guard_profile_override_fields();

drop policy if exists "Admin can select all profiles" on public.profiles;
create policy "Admin can select all profiles"
  on public.profiles
  for select
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can update all profiles" on public.profiles;
create policy "Admin can update all profiles"
  on public.profiles
  for update
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com')
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  code text not null unique check (code = upper(code)),
  discount_type text not null check (discount_type in ('percent', 'fixed', 'free')),
  discount_value int null,
  applies_to_plan text not null default 'all' check (applies_to_plan in ('all', 'pro', 'scale', 'enterprise')),
  max_redemptions int null check (max_redemptions is null or max_redemptions > 0),
  redemption_count int not null default 0 check (redemption_count >= 0),
  expires_at timestamptz null,
  status text not null default 'active' check (status in ('active', 'paused')),
  notes text,
  constraint coupons_discount_value_check check (
    (discount_type = 'free' and discount_value is null)
    or (discount_type = 'percent' and discount_value between 1 and 100)
    or (discount_type = 'fixed' and discount_value is not null and discount_value > 0)
  )
);

create index if not exists coupons_status_idx on public.coupons (status);
create index if not exists coupons_expires_at_idx on public.coupons (expires_at);

create or replace function public.set_coupon_metadata()
returns trigger
language plpgsql
as $$
begin
  new.code = upper(trim(new.code));

  if new.code = '' then
    raise exception 'Coupon code is required.';
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists coupons_set_metadata on public.coupons;
create trigger coupons_set_metadata
before insert or update on public.coupons
for each row
execute function public.set_coupon_metadata();

create table if not exists public.coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  coupon_id uuid not null references public.coupons(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  applied_plan text not null,
  unique (coupon_id, user_id)
);

create index if not exists coupon_redemptions_user_idx on public.coupon_redemptions (user_id, created_at desc);
create index if not exists coupon_redemptions_coupon_idx on public.coupon_redemptions (coupon_id, created_at desc);

alter table public.coupons enable row level security;
alter table public.coupon_redemptions enable row level security;

revoke all on public.coupons from anon;
revoke all on public.coupon_redemptions from anon;

grant select, insert, update, delete on public.coupons to authenticated;
grant select on public.coupon_redemptions to authenticated;

drop policy if exists "Admin can select coupons" on public.coupons;
create policy "Admin can select coupons"
  on public.coupons
  for select
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can insert coupons" on public.coupons;
create policy "Admin can insert coupons"
  on public.coupons
  for insert
  to authenticated
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can update coupons" on public.coupons;
create policy "Admin can update coupons"
  on public.coupons
  for update
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com')
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can delete coupons" on public.coupons;
create policy "Admin can delete coupons"
  on public.coupons
  for delete
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

drop policy if exists "Admin can select coupon redemptions" on public.coupon_redemptions;
create policy "Admin can select coupon redemptions"
  on public.coupon_redemptions
  for select
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com');

create or replace function public.apply_coupon_to_user(
  p_code text,
  p_target_user_id uuid default auth.uid()
)
returns table (
  coupon_id uuid,
  coupon_code text,
  applied_plan text,
  subscription_status text
)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_actor_user_id uuid := auth.uid();
  v_target_user_id uuid := coalesce(p_target_user_id, auth.uid());
  v_is_admin boolean := lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmed@supaweblabs.com';
  v_code text := upper(trim(coalesce(p_code, '')));
  v_coupon public.coupons%rowtype;
  v_applied_plan text;
  v_redemption_id uuid;
  v_target_email text;
begin
  if v_actor_user_id is null then
    raise exception 'Authentication required.';
  end if;

  if v_target_user_id is null then
    raise exception 'Target user is required.';
  end if;

  if not v_is_admin and v_target_user_id <> v_actor_user_id then
    raise exception 'Only admin can apply a coupon to another user.';
  end if;

  if v_code = '' then
    raise exception 'Coupon code is required.';
  end if;

  perform 1
  from auth.users
  where id = v_target_user_id;

  if not found then
    raise exception 'Target user not found.';
  end if;

  select *
  into v_coupon
  from public.coupons
  where code = v_code
  for update;

  if not found then
    raise exception 'Coupon not found.';
  end if;

  if v_coupon.status <> 'active' then
    raise exception 'Coupon is paused.';
  end if;

  if v_coupon.expires_at is not null and v_coupon.expires_at <= now() then
    raise exception 'Coupon has expired.';
  end if;

  if v_coupon.max_redemptions is not null and v_coupon.redemption_count >= v_coupon.max_redemptions then
    raise exception 'Coupon redemption limit reached.';
  end if;

  v_applied_plan := case
    when v_coupon.applies_to_plan = 'all' then 'pro'
    else v_coupon.applies_to_plan
  end;

  insert into public.coupon_redemptions (coupon_id, user_id, applied_plan)
  values (v_coupon.id, v_target_user_id, v_applied_plan)
  on conflict (coupon_id, user_id) do nothing
  returning id
  into v_redemption_id;

  if v_redemption_id is null then
    raise exception 'Coupon already redeemed by this user.';
  end if;

  update public.coupons
  set redemption_count = redemption_count + 1,
      updated_at = now()
  where id = v_coupon.id;

  select lower(email)
  into v_target_email
  from auth.users
  where id = v_target_user_id;

  insert into public.profiles (user_id, email, plan, subscription_status, billing_cycle, updated_at)
  values (v_target_user_id, v_target_email, v_applied_plan, 'promo', null, now())
  on conflict (user_id) do update
  set email = coalesce(excluded.email, public.profiles.email),
      plan = excluded.plan,
      subscription_status = excluded.subscription_status,
      updated_at = now();

  return query
  select v_coupon.id, v_coupon.code, v_applied_plan, 'promo';
end;
$$;

revoke all on function public.apply_coupon_to_user(text, uuid) from public;
grant execute on function public.apply_coupon_to_user(text, uuid) to authenticated;
