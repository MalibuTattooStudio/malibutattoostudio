import { supabase } from './supabase';

/**
 * Admin-side helpers for the "Reseñas" tab in /admin.
 * Both tables are admin-only for writes (see supabase/reviews.sql) — artists
 * don't manage reviews, only the studio owner does.
 */

export async function listReviews() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('studio', { ascending: true })
    .order('review_date', { ascending: false, nullsFirst: false });
  if (error) throw error;
  return data || [];
}

export async function createReview(row) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase.from('reviews').insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function updateReview(id, patch) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase.from('reviews').update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteReview(id) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw error;
}

export async function listStudioStats() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('studio_stats').select('*').order('studio', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function updateStudioStats(studio, patch) {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase
    .from('studio_stats')
    .update(patch)
    .eq('studio', studio)
    .select()
    .single();
  if (error) throw error;
  return data;
}
