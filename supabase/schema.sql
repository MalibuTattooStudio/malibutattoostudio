-- ============================================================================
--  Malibu Tattoo Studio — gallery ingest backbone
--  Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--  Safe to re-run: everything is "if not exists" / "drop … create".
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. gallery_items: extra columns for the admin / import workflow
-- ---------------------------------------------------------------------------
alter table public.gallery_items
  add column if not exists artist_slug text,                  -- 'yenko', 'iria', … (used for filtering)
  add column if not exists source      text default 'manual', -- 'manual' | 'instagram-export' | 'apify'
  add column if not exists source_id   text,                  -- IG shortcode, for de-dupe
  add column if not exists permalink   text,                  -- original IG post URL
  add column if not exists caption     text,
  add column if not exists status      text default 'published', -- 'draft' | 'published'
  add column if not exists featured    boolean default false,
  add column if not exists blur_data   text,                  -- tiny base64 webp for blur-up
  add column if not exists sort_order  int default 0;

-- de-dupe key for imported posts (null source_id rows are unaffected)
create unique index if not exists gallery_items_source_id_key
  on public.gallery_items (source_id) where source_id is not null;

create index if not exists gallery_items_feed_idx
  on public.gallery_items (status, featured desc, sort_order, created_at desc);

create index if not exists gallery_items_artist_idx
  on public.gallery_items (artist_slug);

-- ---------------------------------------------------------------------------
-- 2. Row Level Security on gallery_items
--    public: can read PUBLISHED rows only
--    signed-in (the /admin user): full read + write
-- ---------------------------------------------------------------------------
alter table public.gallery_items enable row level security;

drop policy if exists "gallery_items read"    on public.gallery_items;
drop policy if exists "gallery_items insert"  on public.gallery_items;
drop policy if exists "gallery_items update"  on public.gallery_items;
drop policy if exists "gallery_items delete"  on public.gallery_items;

create policy "gallery_items read" on public.gallery_items
  for select
  using (status = 'published' or auth.uid() is not null);

create policy "gallery_items insert" on public.gallery_items
  for insert to authenticated
  with check (true);

create policy "gallery_items update" on public.gallery_items
  for update to authenticated
  using (true) with check (true);

create policy "gallery_items delete" on public.gallery_items
  for delete to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 3. Storage policies for the public `gallery` bucket
--    public read, authenticated write/replace/delete
-- ---------------------------------------------------------------------------
drop policy if exists "gallery bucket read"   on storage.objects;
drop policy if exists "gallery bucket insert" on storage.objects;
drop policy if exists "gallery bucket update" on storage.objects;
drop policy if exists "gallery bucket delete" on storage.objects;

create policy "gallery bucket read" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "gallery bucket insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery');

create policy "gallery bucket update" on storage.objects
  for update to authenticated using (bucket_id = 'gallery');

create policy "gallery bucket delete" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery');

-- ---------------------------------------------------------------------------
-- 4. Create the admin user
--    Dashboard → Authentication → Users → "Add user"
--      · email:    (tu email)
--      · password: (una fuerte)
--      · ✅ Auto Confirm User
--    No hace falta SMTP. Ese usuario es el único que puede entrar en /admin.
-- ---------------------------------------------------------------------------
