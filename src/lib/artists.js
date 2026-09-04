import { supabase } from './supabase';
import { ARTISTS as FALLBACK } from '../data/artists';

/**
 * Public data layer for tattoo artists.
 *
 * Source of truth: Supabase table `public.artists`
 *   (id, slug, name, handle, instagram_url, studio, role_title, bio_es, bio_en,
 *    specialties[], whatsapp, email, portrait_url, sort_order, status, user_id)
 *
 * Every public view (home team section, /artistas, /artista/:slug, /estudios
 * rosters) reads through here. If Supabase is unconfigured / unreachable / empty
 * we fall back to the static list in `src/data/artists.js` so the site never
 * renders an empty team.
 */

/** DB row -> the shape every component consumes. */
function normalize(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name || '',
    handle: (row.handle || '').replace(/^@/, ''),
    instagramUrl: row.instagram_url || '',
    studio: row.studio || 'santacruz',
    roleTitle: row.role_title || '',
    bioEs: row.bio_es || '',
    bioEn: row.bio_en || '',
    specialties: Array.isArray(row.specialties) ? row.specialties.filter(Boolean) : [],
    whatsapp: row.whatsapp || '',
    email: row.email || '',
    image: row.portrait_url || '',
    sortOrder: row.sort_order ?? 100,
    status: row.status || 'published',
  };
}

const bySort = (a, b) => (a.sortOrder - b.sortOrder) || a.name.localeCompare(b.name);

/**
 * All published artists, ordered by sort_order.
 * @param {{ studio?: 'santacruz'|'tabaiba' }} [opts]
 * @returns {Promise<Array>}
 */
export async function fetchArtists({ studio } = {}) {
  let list;

  if (supabase) {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('[artists] Supabase fetch error:', error.message);
      list = [...FALLBACK];
    } else {
      list = (data || []).map(normalize);
      if (list.length === 0) list = [...FALLBACK];
    }
  } else {
    list = [...FALLBACK];
  }

  list.sort(bySort);
  return studio ? list.filter((a) => a.studio === studio) : list;
}

/**
 * One artist by slug, or null if the slug is unknown.
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function fetchArtistBySlug(slug) {
  if (!slug) return null;

  if (supabase) {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.warn('[artists] Supabase fetch error:', error.message);
    } else if (data) {
      return normalize(data);
    } else {
      // no row -> fall through to the static list (covers pre-migration state)
    }
  }

  return FALLBACK.find((a) => a.slug === slug) || null;
}
