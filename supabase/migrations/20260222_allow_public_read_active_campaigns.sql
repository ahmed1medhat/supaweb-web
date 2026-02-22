drop policy if exists "Public can read active campaigns" on public.campaigns;

create policy "Public can read active campaigns"
  on public.campaigns
  for select
  to anon, authenticated
  using (status = 'active');
