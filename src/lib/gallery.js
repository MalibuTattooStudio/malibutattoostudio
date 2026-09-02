import { supabase } from './supabase';

/**
 * Data layer for the tattoo portfolio gallery.
 *
 * Source of truth: Supabase table `gallery_items`
 *   (id, title, artist, artist_slug, style, image_url, caption, permalink,
 *    blur_data, status, featured, sort_order, created_at)
 * Images live in the public Storage bucket `gallery`.
 *
 * Filtering/sorting is done client-side so this keeps working even before the
 * schema migration in `supabase/schema.sql` has been applied (extra columns
 * simply come back undefined). Empty result → the UI shows its own
 * "coming soon" state.
 */

const BUCKET = 'gallery';

/**
 * Turn a `gallery_items.image_url` value into a usable <img> src.
 * Accepts either an absolute URL or a path inside the `gallery` bucket.
 */
export function resolveGalleryImage(imageUrl) {
  if (!imageUrl) return '';
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  if (!supabase) return '';
  const path = imageUrl.replace(/^\/+/, '').replace(new RegExp(`^${BUCKET}/`), '');
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl || '';
}

function normalize(row) {
  return {
    id: row.id,
    title: row.title || '',
    artist: row.artist || '',
    artistSlug: row.artist_slug || '',
    style: row.style || '',
    caption: row.caption || '',
    permalink: row.permalink || '',
    image: resolveGalleryImage(row.image_url),
    blur: row.blur_data || '',
    featured: !!row.featured,
    createdAt: row.created_at || null,
  };
}

/**
 * Fetch published portfolio pieces — featured first, then sort_order, then newest.
 * @param {{ artistSlug?: string }} [opts]
 * @returns {Promise<Array>}
 */
export async function fetchGalleryItems({ artistSlug } = {}) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[gallery] Supabase fetch error:', error.message);
    return [];
  }

  let rows = (data || []).filter((r) => (r.status ?? 'published') !== 'draft');
  if (artistSlug) rows = rows.filter((r) => r.artist_slug === artistSlug);

  // stable sort keeps the created_at-desc order from the query as the tiebreak
  rows = rows
    .map((r, i) => [r, i])
    .sort((a, b) => {
      const fa = a[0].featured ? 1 : 0;
      const fb = b[0].featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      const so = (a[0].sort_order ?? 0) - (b[0].sort_order ?? 0);
      if (so) return so;
      return a[1] - b[1];
    })
    .map(([r]) => r);

  return rows.map(normalize);
}
