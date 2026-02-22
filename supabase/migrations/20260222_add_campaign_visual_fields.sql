alter table public.campaigns
  add column if not exists primary_color text not null default '#22d3ee',
  add column if not exists text_color text not null default '#f8fafc',
  add column if not exists background_style text not null default 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  add column if not exists position text not null default 'top';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'campaigns_position_check'
  ) then
    alter table public.campaigns
      add constraint campaigns_position_check check (position in ('top', 'bottom', 'center'));
  end if;
end
$$;

create index if not exists campaigns_position_idx on public.campaigns (position);
