import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import GalleryGrid from './gallery/GalleryGrid';

/**
 * Home portfolio teaser. Reads real pieces from Supabase (`gallery_items`);
 * renders a "coming soon" state until content is loaded in.
 */
export default function GallerySection({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const { items, loading } = useGallery();

  return (
    <section
      id="gallery-section"
      className="py-20 sm:py-28 bg-[#08080c]/80 backdrop-blur-xs relative overflow-hidden border-t border-white/5 text-left"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff5500]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-semibold uppercase tracking-widest font-mono">
            <Sparkles className="w-4 h-4" />
            <span>{isEs ? 'Portafolio del estudio' : 'Studio portfolio'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-heading leading-tight">
            {isEs ? 'GALERÍA DE ' : 'GALLERY OF '}
            <span className="text-orange-gradient font-serif-title font-normal italic">
              {isEs ? 'TRABAJOS' : 'WORK'}
            </span>
          </h2>
          <p className="text-slate-300 text-base font-light max-w-2xl mx-auto">
            {isEs
              ? 'Piezas reales de autor realizadas por nuestro equipo en Santa Cruz, Tabaiba y el TattooTruck.'
              : 'Real bespoke pieces crafted by our team in Santa Cruz, Tabaiba and the TattooTruck.'}
          </p>
        </div>

        <GalleryGrid
          items={items}
          loading={loading}
          onOpenBooking={onOpenBooking}
          setCursorHover={setCursorHover}
          language={language}
          masonry="columns-2 md:columns-3 lg:columns-4"
          showFilters={false}
          limit={12}
          skeletonCount={8}
        />

        {items.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/galeria"
              onMouseEnter={() => setCursorHover?.(true, isEs ? 'VER GALERÍA' : 'VIEW GALLERY')}
              onMouseLeave={() => setCursorHover?.(false)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel border border-white/15 text-white text-xs font-extrabold uppercase tracking-wider hover:border-[#ff5500] transition-colors"
            >
              <span>{isEs ? 'Ver galería completa' : 'View full gallery'}</span>
              <ArrowRight className="w-4 h-4 text-[#ff5500]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
