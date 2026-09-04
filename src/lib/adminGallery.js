import { supabase } from './supabase';

/**
 * Admin-side helpers for the /admin gallery manager.
 * All writes require an authenticated Supabase session (RLS enforces it).
 */

const BUCKET = 'gallery';
const MAX_EDGE = 1600; // px — longest side of the stored image
const WEBP_QUALITY = 0.85;

/* ---------------------------------------------------------------- images -- */

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

function drawScaled(img, maxEdge) {
  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, w, h);
  return canvas;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
      type,
      quality
    );
  });
}

/** Resize a File to a web-friendly WebP Blob. */
export async function resizeToWebp(file, maxEdge = MAX_EDGE, quality = WEBP_QUALITY) {
  const img = await loadImage(file);
  const canvas = drawScaled(img, maxEdge);
  return canvasToBlob(canvas, 'image/webp', quality);
}

/** Tiny (~24px) blurred WebP data URI for the blur-up placeholder. */
export async function makeBlurData(file) {
  try {
    const img = await loadImage(file);
    const canvas = drawScaled(img, 24);
    const blob = await canvasToBlob(canvas, 'image/webp', 0.6);
    return await new Promise((resolve) => {
      const r = new FileReader();
      r.onloadend = () => resolve(r.result);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/* ----------------------------------------------------------------- rows --- */

function slugifyName(name = '') {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Optimize + upload one image and insert its gallery_items row.
 * @param {{file: File, artistName: string, artistSlug: string, style: string,
 *          title?: string, status?: 'draft'|'published'}} piece
 */
export async function uploadPiece({ file, artistName, artistSlug, style, title, status = 'published' }) {
  if (!supabase) throw new Error('Supabase no configurado');

  const [webp, blur] = await Promise.all([resizeToWebp(file), makeBlurData(file)]);

  const slug = artistSlug || slugifyName(artistName) || 'malibu';
  const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

  const up = await supabase.storage.from(BUCKET).upload(path, webp, {
    contentType: 'image/webp',
    cacheControl: '31536000',
    upsert: false,
  });
  if (up.error) throw up.error;

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

  const row = {
    title: (title || '').trim() || null,
    artist: (artistName || '').trim() || null,
    artist_slug: slug,
    style: (style || '').trim() || null,
    image_url: pub.publicUrl,
    blur_data: blur,
    source: 'manual',
    status,
  };

  const ins = await supabase.from('gallery_items').insert(row).select().single();
  if (ins.error) {
    // roll back the orphaned upload
    await supabase.storage.from(BUCKET).remove([path]);
    throw ins.error;
  }
  return ins.data;
}

/**
 * All pieces incl. drafts, newest first — for the admin table.
 * Pass `artistSlug` to scope the list to one artist (used by the per-artist panel).
 */
export async function listAllPieces({ artistSlug } = {}) {
  if (!supabase) return [];
  let q = supabase.from('gallery_items').select('*');
  if (artistSlug) q = q.eq('artist_slug', artistSlug);
  const { data, error } = await q
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updatePiece(id, patch) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase
    .from('gallery_items')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Delete a row and best-effort remove its file from storage. */
export async function deletePiece(id, imageUrl) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { error } = await supabase.from('gallery_items').delete().eq('id', id);
  if (error) throw error;

  const marker = `/object/public/${BUCKET}/`;
  const i = (imageUrl || '').indexOf(marker);
  if (i !== -1) {
    const path = decodeURIComponent(imageUrl.slice(i + marker.length));
    await supabase.storage.from(BUCKET).remove([path]);
  }
}

/* ----------------------------------------------------------------- auth --- */

export function onAuth(callback) {
  if (!supabase) {
    callback(null);
    return () => {};
  }
  supabase.auth.getSession().then(({ data }) => callback(data.session));
  const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => callback(session));
  return () => sub.subscription.unsubscribe();
}

export async function signIn(email, password) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  if (supabase) await supabase.auth.signOut();
}

/* ---------------------------------------------------------------- styles -- */

export const STYLES = [
  'Blackwork',
  'Fine Line',
  'Realismo',
  'Black & Grey',
  'Japonés / Irezumi',
  'Ornamental',
  'Dotwork',
  'Neo Tradicional',
  'Lettering',
  'Microrealismo',
  'Ilustrativo',
  'Chicano',
  'Freestyle',
  'Piercing',
];
