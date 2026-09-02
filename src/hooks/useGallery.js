import { useEffect, useState } from 'react';
import { fetchGalleryItems } from '../lib/gallery';

/**
 * Loads published portfolio pieces from Supabase.
 * @param {{ artistSlug?: string }} [opts]
 * @returns {{ items: Array, loading: boolean, error: boolean }}
 */
export function useGallery({ artistSlug } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);

    fetchGalleryItems({ artistSlug })
      .then((data) => {
        if (!alive) return;
        setItems(data);
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
  }, [artistSlug]);

  return { items, loading, error };
}
