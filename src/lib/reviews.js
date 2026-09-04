import { supabase } from './supabase';

/**
 * Public data layer for Google reviews.
 *
 * Source of truth: Supabase tables `public.reviews` and `public.studio_stats`
 * (see supabase/reviews.sql). Curated by hand in /admin — not a live API call,
 * so there's nothing to fall back to; an empty result just means no reviews yet.
 */

function normalize(row) {
  return {
    id: row.id,
    studio: row.studio,
    authorName: row.author_name || '',
    rating: row.rating || 5,
    body: row.body || '',
    reviewDate: row.review_date || null,
    lang: row.lang || 'es',
    googleUrl: row.google_url || '',
    avatarUrl: row.avatar_url || '',
    onLanding: !!row.on_landing,
  };
}

/**
 * Published reviews.
 * @param {{ studio?: 'santacruz'|'tabaiba', onLandingOnly?: boolean }} [opts]
 */
export async function fetchReviews({ studio, onLandingOnly } = {}) {
  if (!supabase) return [];

  let q = supabase.from('reviews').select('*').eq('status', 'published');
  if (studio) q = q.eq('studio', studio);
  if (onLandingOnly) q = q.eq('on_landing', true);

  const { data, error } = await q
    .order('sort_order', { ascending: true })
    .order('review_date', { ascending: false, nullsFirst: false });

  if (error) {
    console.warn('[reviews] Supabase fetch error:', error.message);
    return [];
  }
  return (data || []).map(normalize);
}

/** { santacruz: {rating, count, url}, tabaiba: {...} } */
export async function fetchStudioStats() {
  if (!supabase) return {};
  const { data, error } = await supabase.from('studio_stats').select('*');
  if (error) {
    console.warn('[reviews] studio_stats fetch error:', error.message);
    return {};
  }
  return Object.fromEntries(
    (data || []).map((r) => [
      r.studio,
      { rating: Number(r.google_rating) || 5, count: r.google_count || 0, url: r.google_url || '' },
    ]),
  );
}
