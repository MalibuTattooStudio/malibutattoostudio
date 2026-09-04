-- ============================================================================
--  Malibu Tattoo Studio — reseñas de Google  (verificadas, curadas a mano)
--  Correr una vez en Supabase → SQL Editor.  Seguro de re-ejecutar.
--  Depende de artists.sql (usa la función is_admin() y touch_updated_at()).
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. reviews — una fila por reseña
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  studio       text not null check (studio in ('santacruz','tabaiba')),
  author_name  text not null,
  rating       int  not null default 5 check (rating between 1 and 5),
  body         text not null,
  review_date  date,                     -- día opcional; si solo hay mes/año usa el día 1
  lang         text not null default 'es',
  google_url   text,                     -- enlace directo a la reseña; si no, se usa el del listado
  avatar_url   text,                     -- opcional; por defecto se pinta un monograma
  on_landing   boolean not null default false,  -- aparece en el muro de la portada
  status       text not null default 'published' check (status in ('draft','published')),
  sort_order   int  not null default 100,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists reviews_studio_idx  on public.reviews (studio, status, sort_order);
create index if not exists reviews_landing_idx on public.reviews (on_landing) where on_landing;

drop trigger if exists reviews_touch_updated_at_trg on public.reviews;
create trigger reviews_touch_updated_at_trg
  before update on public.reviews
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. studio_stats — nota media + nº total + enlace al listado, por estudio
--    (editable desde el panel; no hace falta deploy para actualizar el total)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.studio_stats (
  studio        text primary key check (studio in ('santacruz','tabaiba')),
  google_rating numeric(2,1) not null default 5.0,
  google_count  int not null default 0,
  google_url    text,
  updated_at    timestamptz not null default now()
);

drop trigger if exists studio_stats_touch_updated_at_trg on public.studio_stats;
create trigger studio_stats_touch_updated_at_trg
  before update on public.studio_stats
  for each row execute function public.touch_updated_at();

insert into public.studio_stats (studio, google_url) values
  ('santacruz', 'https://maps.app.goo.gl/rnNCgbFJCrsvSHgn9'),
  ('tabaiba',   'https://maps.app.goo.gl/QMaM94qw9J5eddYC7')
on conflict (studio) do update set google_url = excluded.google_url;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. RLS — público lee lo publicado; solo el admin escribe
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.reviews enable row level security;

drop policy if exists reviews_read  on public.reviews;
drop policy if exists reviews_write on public.reviews;

create policy reviews_read on public.reviews
  for select
  using (status = 'published' or public.is_admin());

create policy reviews_write on public.reviews
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

alter table public.studio_stats enable row level security;

drop policy if exists studio_stats_read  on public.studio_stats;
drop policy if exists studio_stats_write on public.studio_stats;

create policy studio_stats_read on public.studio_stats
  for select using (true);

create policy studio_stats_write on public.studio_stats
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── comprobación ────────────────────────────────────────────────────────────
--   select * from public.studio_stats;     -- 2 filas con sus enlaces de Maps
--   select count(*) from public.reviews;   -- 0 de momento; las cargamos luego
