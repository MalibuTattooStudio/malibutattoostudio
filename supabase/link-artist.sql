-- ============================================================================
--  Malibu Tattoo Studio — dar acceso al panel a un tatuador  (Fase 2)
--  Correr una vez para instalar el helper; luego una línea por artista.
-- ============================================================================

-- 1. Instalar el helper (idempotente).
create or replace function public.link_artist(p_slug text, p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
begin
  select id into uid from auth.users where lower(email) = lower(p_email);
  if uid is null then
    raise exception 'No hay ningún usuario de Auth con el email %', p_email;
  end if;

  update public.artists set user_id = uid where slug = p_slug;
  if not found then
    raise exception 'No hay ningún artista con slug %', p_slug;
  end if;

  insert into public.staff (user_id, role, artist_slug)
  values (uid, 'artist', p_slug)
  on conflict (user_id) do update
    set role = 'artist', artist_slug = excluded.artist_slug;
end;
$$;

-- Solo se puede llamar desde aquí (SQL Editor), nunca desde la web.
revoke execute on function public.link_artist(text, text) from public, anon, authenticated;

-- ============================================================================
-- 2. Para dar de alta a un tatuador en el panel:
--
--    a) Supabase → Authentication → Users → "Add user"
--         · email + contraseña  ·  ✅ Auto Confirm User
--    b) Aquí abajo, una línea con su slug y ese mismo email:
--
--    select public.link_artist('iria',  'iria@ejemplo.com');
--    select public.link_artist('yenko', 'yenko@ejemplo.com');
--
--  A partir de ahí ese usuario entra en /admin y ve SOLO su ficha y su galería.
--  Para quitarle el acceso:
--    update public.artists set user_id = null where slug = 'iria';
--    delete from public.staff where artist_slug = 'iria';
-- ============================================================================
