-- ============================================================================
--  FIX: quedó una policy permisiva antigua que deja INSERTAR a cualquiera.
--  Esto borra TODAS las policies de gallery_items y las vuelve a crear limpias.
--  Correr una vez en Supabase → SQL Editor. Seguro de re-ejecutar.
-- ============================================================================

-- 0. limpiar la fila de prueba
delete from public.gallery_items where title = '__rls_test__';

-- 1. gallery_items: borrar cualquier policy existente (sea cual sea su nombre)
do $$
declare pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'gallery_items'
  loop
    execute format('drop policy %I on public.gallery_items', pol.policyname);
  end loop;
end $$;

alter table public.gallery_items enable row level security;

-- lectura pública: solo filas publicadas (sesión iniciada = ve todo)
create policy "gi_read" on public.gallery_items
  for select
  using (status = 'published' or auth.uid() is not null);

-- escritura: SOLO usuarios autenticados (el usuario de /admin)
create policy "gi_insert" on public.gallery_items
  for insert to authenticated
  with check (true);

create policy "gi_update" on public.gallery_items
  for update to authenticated
  using (true) with check (true);

create policy "gi_delete" on public.gallery_items
  for delete to authenticated
  using (true);

-- 2. storage: rehacer solo las policies del bucket `gallery`
do $$
declare pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname ilike '%gallery%'
  loop
    execute format('drop policy %I on storage.objects', pol.policyname);
  end loop;
end $$;

create policy "gallery_obj_read" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "gallery_obj_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery');

create policy "gallery_obj_update" on storage.objects
  for update to authenticated using (bucket_id = 'gallery');

create policy "gallery_obj_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery');

-- 3. comprobar cómo quedan (mira la salida: 'roles' debe ser {authenticated}
--    en insert/update/delete, y {public} solo en el select)
select tablename, policyname, cmd, roles
from pg_policies
where (schemaname = 'public'  and tablename = 'gallery_items')
   or (schemaname = 'storage' and tablename = 'objects' and policyname ilike '%gallery%')
order by tablename, cmd;
