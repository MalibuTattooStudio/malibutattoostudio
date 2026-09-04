import { useEffect, useState } from 'react';
import { fetchArtists, fetchArtistBySlug } from '../lib/artists';

/**
 * Loads published artists from Supabase (with static fallback).
 * @param {{ studio?: 'santacruz'|'tabaiba' }} [opts]
 * @returns {{ artists: Array, loading: boolean, error: boolean }}
 */
export function useArtists({ studio } = {}) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);

    fetchArtists({ studio })
      .then((data) => {
        if (!alive) return;
        setArtists(data);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [studio]);

  return { artists, loading, error };
}

/**
 * Loads a single artist by slug.
 * @param {string} slug
 * @returns {{ artist: object|null, loading: boolean, error: boolean }}
 */
export function useArtist(slug) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);

    fetchArtistBySlug(slug)
      .then((data) => {
        if (!alive) return;
        setArtist(data);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  return { artist, loading, error };
}
