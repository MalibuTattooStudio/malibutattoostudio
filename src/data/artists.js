/**
 * Canonical artist list — single source of truth for slug ↔ name ↔ handle ↔ portrait.
 * `slug` must match the keys in ArtistProfilePage and `gallery_items.artist_slug`.
 */
export const ARTISTS = [
  { slug: 'yenko', name: 'Yenko Tattoo', handle: 'yenko_freestyletatau', image: '/assets/artist_yenko.jpg' },
  { slug: 'iria', name: 'Iria Tattoo', handle: 'iria_tattoo', image: '/assets/artist_iria.jpg' },
  { slug: 'yaxtattoo', name: 'Yax Tattoo', handle: 'yaxtattoo', image: '/assets/artist_yax.jpg' },
  { slug: 'aurea', name: 'Aurea Tattoo', handle: 'aurea.tattoo_', image: '/assets/artist_aurea.jpg' },
  { slug: 'aditii', name: 'Aditii Tattoo', handle: 'aditii_tattoo', image: '/assets/artist_aditii.jpg' },
  { slug: 'pidol', name: 'Pidol BodyArt', handle: 'pidol_bodyart', image: '/assets/artist_pidol.jpg' },
  { slug: 'karitorres', name: 'Kari Torres', handle: 'karitorres.tattoo', image: '/assets/artist_karitorres.jpg' },
  { slug: 'honnari', name: 'Honnari Tattoo', handle: 'honnari_tattoo', image: '/assets/artist_honnari.jpg' },
  { slug: 'erios', name: 'EriOS Tattoo', handle: 'eriostattoo', image: '/assets/artist_erios.jpg' },
];

const BY_SLUG = Object.fromEntries(ARTISTS.map((a) => [a.slug, a]));

export function artistBySlug(slug) {
  return (slug && BY_SLUG[slug]) || null;
}
