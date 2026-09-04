import { supabase } from './supabase';
import { resizeToWebp } from './adminGallery';

/**
 * Admin-side helpers for managing the `artists` table from /admin.
 *
 * Permissions are enforced by RLS (see supabase/artists.sql):
 *   · admin  (row in `staff` with role='admin')  → full CRUD on every artist
 *   · artist (owns an `artists` row via user_id)  → UPDATE own row only;
 *     slug / studio / status / sort_order are pinned by a DB trigger.
 */

const BUCKET = 'gallery';

/* ------------------------------------------------------------------ who am I */

/** The signed-in user's staff row, or null if they are not staff. */
export async function getMyStaff() {
  if (!supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth?.user?.id;
  if (!uid) return null;

  const { data, error } = await supabase
    .from('staff')
    .select('role, artist_slug')
    .eq('user_id', uid)
    .maybeSingle();

  if (error) {
    console.warn('[adminArtists] staff lookup failed:', error.message);
    return null;
  }
  return data || null;
}

/** The `artists` row owned by the signed-in user (user_id match), or null. */
export async function getMyArtist() {
  if (!supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth?.user?.id;
  if (!uid) return null;

  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('user_id', uid)
    .maybeSingle();

  if (error) {
    console.warn('[adminArtists] own-artist lookup failed:', error.message);
    return null;
  }
  return data || null;
}

/* -------------------------------------------------------------------- reads */

/** Every artist, ordered for the manager list (admin sees drafts too). */
export async function listArtists() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .order('studio', { ascending: true })
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

/* ------------------------------------------------------------------- writes */

const CLEAN = (v) => {
  const s = (v ?? '').toString().trim();
  return s === '' ? null : s;
};

/** Shape a form object into a DB row patch. */
function toRow(form) {
  const row = {
    name: CLEAN(form.name),
    handle: CLEAN(form.handle)?.replace(/^@/, '') ?? null,
    instagram_url: CLEAN(form.instagram_url),
    role_title: CLEAN(form.role_title),
    bio_es: CLEAN(form.bio_es),
    bio_en: CLEAN(form.bio_en),
    whatsapp: CLEAN(form.whatsapp),
    email: CLEAN(form.email),
    portrait_url: CLEAN(form.portrait_url),
  };
  if (Array.isArray(form.specialties)) {
    row.specialties = form.specialties.map((s) => s.trim()).filter(Boolean);
  }
  // admin-only columns — only sent when present in the form
  if (form.slug !== undefined) row.slug = CLEAN(form.slug);
  if (form.studio !== undefined) row.studio = form.studio;
  if (form.status !== undefined) row.status = form.status;
  if (form.sort_order !== undefined) row.sort_order = Number(form.sort_order) || 0;
  return row;
}

/** Create a new artist (admin only). Needs at least slug + name + studio. */
export async function createArtist(form) {
  if (!supabase) throw new Error('Supabase no configurado');
  const row = toRow({ status: 'draft', sort_order: 100, ...form });
  const { data, error } = await supabase.from('artists').insert(row).select().single();
  if (error) throw error;
  return data;
}

/** Patch an existing artist by id. */
export async function updateArtist(id, form) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase
    .from('artists')
    .update(toRow(form))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Delete an artist (admin only). */
export async function deleteArtist(id) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { error } = await supabase.from('artists').delete().eq('id', id);
  if (error) throw error;
}

/* ------------------------------------------------------------------ portrait */

/**
 * Optimise a portrait to WebP and upload it to the `gallery` bucket.
 * Returns the public URL to store in `artists.portrait_url`.
 */
export async function uploadPortrait(file, slug) {
  if (!supabase) throw new Error('Supabase no configurado');
  const webp = await resizeToWebp(file);
  const path = `portraits/${slug || 'artist'}-${Date.now()}.webp`;

  const up = await supabase.storage.from(BUCKET).upload(path, webp, {
    contentType: 'image/webp',
    cacheControl: '31536000',
    upsert: true,
  });
  if (up.error) throw up.error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
