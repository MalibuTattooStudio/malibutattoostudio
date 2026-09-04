import { useEffect, useState } from 'react';
import { fetchReviews, fetchStudioStats } from '../lib/reviews';

/**
 * Loads published reviews.
 * @param {{ studio?: 'santacruz'|'tabaiba', onLandingOnly?: boolean }} [opts]
 */
export function useReviews({ studio, onLandingOnly } = {}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchReviews({ studio, onLandingOnly })
      .then((data) => alive && setReviews(data))
      .catch(() => alive && setReviews([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [studio, onLandingOnly]);

  return { reviews, loading };
}

/** Google rating + review count per studio, for headers / stat chips. */
export function useStudioStats() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchStudioStats()
      .then((data) => alive && setStats(data))
      .catch(() => alive && setStats({}))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return { stats, loading };
}
