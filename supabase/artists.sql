-- ============================================================================
--  Malibu Tattoo Studio — artists backbone  (Fase 1 + 2)
--  Correr una vez en Supabase → SQL Editor → New query.  Seguro de re-ejecutar.
--
--  Crea:
--    · public.artists  — 1 fila por tatuador, fuente de verdad de TODA vista pública
--    · public.staff    — quién tiene cuenta y con qué permiso (admin | artist)
--    · RLS para que cada artista solo pueda tocar SU ficha y SUS fotos
--    · te marca a ti como admin (por email, al final del script)
--    · siembra los 9 tatuadores actuales (fotos + nombres de /assets)
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. artists
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.artists (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,                 -- 'yenko', 'iria', …
  name          text not null,                        -- 'Yenko Tattoo'
  handle        text,                                 -- handle de IG, sin @
  instagram_url text,
  studio        text not null default 'santacruz'
                check (studio in ('santacruz','tabaiba')),
  role_title    text,                                 -- 'Resident Fine Line Artist' — texto libre
  bio_es        text,
  bio_en        text,
  specialties   text[] not null default '{}',
  whatsapp      text,                                 -- vacío por ahora, editable en el panel
  email         text,                                 -- vacío por ahora, editable en el panel
  portrait_url  text,                                 -- '/assets/artist_x.jpg' o URL de storage
  sort_order    int  not null default 100,
  status        text not null default 'published'
                check (status in ('draft','published')),
  user_id       uuid references auth.users(id) on delete set null,  -- se enlaza en Fase 2
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists artists_studio_idx on public.artists (studio);
create index if not exists artists_feed_idx   on public.artists (status, sort_order);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. staff  — quién tiene cuenta y con qué rol
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.staff (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'artist' check (role in ('admin','artist')),
  artist_slug text references public.artists(slug) on delete set null,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. helpers
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff where user_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- un tatuador editando SU propia fila no puede tocar estas columnas
create or replace function public.artists_lock_protected()
returns trigger language plpgsql as $$
begin
  if public.is_admin() then
    return new;
  end if;
  new.slug       := old.slug;
  new.user_id    := old.user_id;
  new.studio     := old.studio;
  new.status     := old.status;
  new.sort_order := old.sort_order;
  return new;
end $$;

drop trigger if exists artists_lock_protected_trg on public.artists;
create trigger artists_lock_protected_trg
  before update on public.artists
  for each row execute function public.artists_lock_protected();

drop trigger if exists artists_touch_updated_at_trg on public.artists;
create trigger artists_touch_updated_at_trg
  before update on public.artists
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. RLS — artists
--    público: lee solo filas 'published'
--    admin: todo
--    tatuador: lee/edita SU fila (columnas protegidas via trigger de arriba)
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.artists enable row level security;

drop policy if exists artists_read   on public.artists;
drop policy if exists artists_insert on public.artists;
drop policy if exists artists_update on public.artists;
drop policy if exists artists_delete on public.artists;

create policy artists_read on public.artists
  for select
  using (status = 'published' or public.is_admin() or user_id = auth.uid());

create policy artists_insert on public.artists
  for insert to authenticated
  with check (public.is_admin());

create policy artists_update on public.artists
  for update to authenticated
  using      (public.is_admin() or user_id = auth.uid())
  with check (public.is_admin() or user_id = auth.uid());

create policy artists_delete on public.artists
  for delete to authenticated
  using (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. RLS — staff  (lee lo propio; escribe solo admin)
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.staff enable row level security;

drop policy if exists staff_read_self  on public.staff;
drop policy if exists staff_admin_write on public.staff;

create policy staff_read_self on public.staff
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy staff_admin_write on public.staff
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. RLS — gallery_items: la ESCRITURA pasa a ser "admin o dueño del slug".
--    La policy de LECTURA existente (gi_read / "gallery_items read") se deja igual.
-- ─────────────────────────────────────────────────────────────────────────────
drop policy if exists "gi_insert" on public.gallery_items;
drop policy if exists "gi_update" on public.gallery_items;
drop policy if exists "gi_delete" on public.gallery_items;
drop policy if exists "gallery_items insert" on public.gallery_items;
drop policy if exists "gallery_items update" on public.gallery_items;
drop policy if exists "gallery_items delete" on public.gallery_items;

create policy gi_insert on public.gallery_items
  for insert to authenticated
  with check (
    public.is_admin()
    or artist_slug in (select slug from public.artists where user_id = auth.uid())
  );

create policy gi_update on public.gallery_items
  for update to authenticated
  using (
    public.is_admin()
    or artist_slug in (select slug from public.artists where user_id = auth.uid())
  )
  with check (
    public.is_admin()
    or artist_slug in (select slug from public.artists where user_id = auth.uid())
  );

create policy gi_delete on public.gallery_items
  for delete to authenticated
  using (
    public.is_admin()
    or artist_slug in (select slug from public.artists where user_id = auth.uid())
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. SEED — los 9 tatuadores actuales.  bios simples por estudio; edítalas
--    luego desde el panel.  Re-ejecutar no duplica (on conflict do nothing).
-- ─────────────────────────────────────────────────────────────────────────────
insert into public.artists
  (slug, name, handle, instagram_url, studio, role_title, bio_es, bio_en, specialties, portrait_url, sort_order)
values
  ('yenko','Yenko Tattoo','yenko_freestyletatau','https://www.instagram.com/yenko_freestyletatau/','tabaiba',
   'Freestyle & Master Artist',
   'Artista residente en el estudio de Tabaiba Baja.','Resident artist at the Tabaiba Baja studio.',
   array['Freestyle Custom','Dark Realism','Large Scale Blackwork','Freehand Flow'],
   '/assets/artist_yenko.jpg', 10),

  ('iria','Iria Tattoo','iria_tattoo','https://www.instagram.com/iria_tattoo/','tabaiba',
   'Resident Fine Line Artist',
   'Artista residente en el estudio de Tabaiba Baja.','Resident artist at the Tabaiba Baja studio.',
   array['Fine Line Ultra-Delicado','Microrealismo','Ilustración Botánica','Minimalismo'],
   '/assets/artist_iria.jpg', 20),

  ('yaxtattoo','Yax Tattoo','yaxtattoo','https://www.instagram.com/yaxtattoo/','tabaiba',
   'Custom Ink & Japanese Flash',
   'Artista residente en el estudio de Tabaiba Baja.','Resident artist at the Tabaiba Baja studio.',
   array['Custom Ink','Japanese Flash','Blackwork','Illustrative Flash'],
   '/assets/artist_yax.jpg', 30),

  ('aurea','Aurea Tattoo','aurea.tattoo_','https://www.instagram.com/aurea.tattoo_/','tabaiba',
   'Illustrative & Fine Line Artist',
   'Artista residente en el estudio de Tabaiba Baja.','Resident artist at the Tabaiba Baja studio.',
   array['Illustrative Art','Fine Line','Ornamental Flow','Dotwork'],
   '/assets/artist_aurea.jpg', 40),

  ('aditii','Aditii Tattoo','aditii_tattoo','https://www.instagram.com/aditii_tattoo/','santacruz',
   'Resident Sacred Geometry Artist',
   'Artista residente en el estudio de Santa Cruz.','Resident artist at the Santa Cruz studio.',
   array['Geometría Sagrada','Ornamentalismo Corporal','Mandalas & Simetría','Custom Lettering'],
   '/assets/artist_aditii.jpg', 50),

  ('pidol','Pidol BodyArt','pidol_bodyart','https://www.instagram.com/pidol_bodyart/','santacruz',
   'Specialist Tattoo & Piercing',
   'Artista residente en el estudio de Santa Cruz.','Resident artist at the Santa Cruz studio.',
   array['Neo Tradicional Color','Piercing Profesional','Ilustración Custom','Cover-ups'],
   '/assets/artist_pidol.jpg', 60),

  ('karitorres','Kari Torres','karitorres.tattoo','https://www.instagram.com/karitorres.tattoo/','santacruz',
   'Resident Fine Line Artist',
   'Artista residente en el estudio de Santa Cruz.','Resident artist at the Santa Cruz studio.',
   array['Minimal Fine Line','Micro Tattoos','Minimalist Art','Botanical Line'],
   '/assets/artist_karitorres.jpg', 70),

  ('honnari','Honnari Tattoo','honnari_tattoo','https://www.instagram.com/honnari_tattoo/','santacruz',
   'Japanese Traditional Master',
   'Artista residente en el estudio de Santa Cruz.','Resident artist at the Santa Cruz studio.',
   array['Irezumi Tradicional','Dragones y Carpas Koi','Oriental Blackwork','Sleeves Japonesas'],
   '/assets/artist_honnari.jpg', 80),

  ('erios','EriOS Tattoo','eriostattoo','https://www.instagram.com/eriostattoo/','santacruz',
   'Dark Realism & Blackwork',
   'Artista residente en el estudio de Santa Cruz.','Resident artist at the Santa Cruz studio.',
   array['Dark Realism','Black & Grey','Retratos en Sombra','Chicano Style'],
   '/assets/artist_erios.jpg', 90)
on conflict (slug) do nothing;

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. TÚ como admin.
--    Usa el email de tu usuario en Supabase → Authentication → Users.
--    Si no es este, cambia el email de la línea de abajo antes de correr.
-- ─────────────────────────────────────────────────────────────────────────────
insert into public.staff (user_id, role)
select id, 'admin' from auth.users where email = 'miguemade86@gmail.com'
on conflict (user_id) do update set role = 'admin';

-- ── comprobación rápida ─────────────────────────────────────────────────────
--   select * from public.staff;                                  -- tu fila, role = admin
--   select slug, name, studio, sort_order from public.artists order by sort_order;
