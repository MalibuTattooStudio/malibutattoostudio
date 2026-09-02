import React, { useMemo, useState } from 'react';
import GalleryCard from './GalleryCard';
import GalleryLightbox from './GalleryLightbox';
import GalleryEmptyState from './GalleryEmptyState';

/**
 * Masonry portfolio wall: artist + style filter chips, a CSS-columns image
 * wall, and a cinematic lightbox with prev/next navigation over the filtered
 * set. Loading + empty states included.
 */
export default function GalleryGrid({
  items = [],
  loading = false,
  onOpenBooking,
  setCursorHover,
  language = 'es',
  masonry = 'columns-2 md:columns-3 xl:columns-4',
  showFilters = true,
  showArtistFilter = false,
  limit = 0,
  skeletonCount = 8,
  emptyState,
}) {
  const isEs = language === 'es';
  const [style, setStyle] = useState('all');
  const [artist, setArtist] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const styles = useMemo(
    () => Array.from(new Set(items.map((i) => i.style).filter(Boolean))),
    [items]
  );

  const artists = useMemo(() => {
    const seen = new Map();
    items.forEach((i) => {
      if (i.artistSlug && !seen.has(i.artistSlug)) seen.set(i.artistSlug, i.artist || i.artistSlug);
    });
    return [...seen.entries()]; // [slug, name][]
  }, [items]);

  const filtered = useMemo(() => {
    let r = items;
    if (style !== 'all') r = r.filter((i) => i.style === style);
    if (artist !== 'all') r = r.filter((i) => i.artistSlug === artist);
    return limit > 0 ? r.slice(0, limit) : r;
  }, [items, style, artist, limit]);

  if (loading) {
    return (
      <div className={masonry} style={{ columnGap: '1.25rem' }}>
        {Array.from({ length: skeletonCount }).map((_, n) => (
          <div
            key={n}
            className="mb-5 break-inside-avoid rounded-2xl glass-panel border border-white/10 bg-white/[0.04] animate-pulse"
            style={{ height: 170 + ((n * 53) % 170) }}
          />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      emptyState ?? (
        <GalleryEmptyState language={language} onOpenBooking={onOpenBooking} setCursorHover={setCursorHover} />
      )
    );
  }

  const Chips = ({ options, value, onChange }) => (
    <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            onMouseEnter={() => setCursorHover?.(true, isEs ? 'FILTRAR' : 'FILTER')}
            onMouseLeave={() => setCursorHover?.(false)}
            className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-300 cursor-none ${
              value === o.id
                ? 'bg-[#ff5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.45)]'
                : 'glass-panel text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  const hasArtistRow = showArtistFilter && artists.length > 1;
  const hasStyleRow = styles.length > 1;

  return (
    <div className="space-y-6">
      {showFilters && (hasArtistRow || hasStyleRow) && (
        <div className="space-y-3">
          {hasArtistRow && (
            <Chips
              value={artist}
              onChange={setArtist}
              options={[
                { id: 'all', label: isEs ? 'Todos los artistas' : 'All artists' },
                ...artists.map(([slug, name]) => ({ id: slug, label: name })),
              ]}
            />
          )}
          {hasStyleRow && (
            <Chips
              value={style}
              onChange={setStyle}
              options={[
                { id: 'all', label: isEs ? 'Todos los estilos' : 'All styles' },
                ...styles.map((s) => ({ id: s, label: s })),
              ]}
            />
          )}
        </div>
      )}

      <div key={`${style}|${artist}`} className={masonry} style={{ columnGap: '1.25rem' }}>
        {filtered.map((item, idx) => (
          <GalleryCard
            key={item.id || idx}
            item={item}
            index={idx}
            onOpen={() => setLightboxIdx(idx)}
            setCursorHover={setCursorHover}
            language={language}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-500 py-8">
          {isEs ? 'No hay piezas con este filtro.' : 'Nothing matches this filter.'}
        </p>
      )}

      <GalleryLightbox
        items={filtered}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onIndex={setLightboxIdx}
        onOpenBooking={onOpenBooking}
        language={language}
      />
    </div>
  );
}
