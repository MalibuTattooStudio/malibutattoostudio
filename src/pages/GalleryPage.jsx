import React from 'react';
import { Sparkles } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import GalleryGrid from '../components/gallery/GalleryGrid';

/**
 * /galeria — full portfolio, backed by Supabase `gallery_items`.
 */
export default function GalleryPage({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const { items, loading } = useGallery();

  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans text-left">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ff5500]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] text-xs font-extrabold uppercase tracking-widest font-mono">
            <Sparkles className="w-4 h-4" />
            <span>{isEs ? 'Portafolio oficial' : 'Official portfolio'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-tight">
            {isEs ? 'GALERÍA DE ' : 'GALLERY OF '}
            <span className="text-orange-gradient font-serif-title italic font-normal">
              {isEs ? 'TRABAJOS' : 'WORK'}
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {isEs
              ? 'Todas las obras y sesiones reales de nuestros artistas residentes en Santa Cruz, Tabaiba y el TattooTruck.'
              : 'Every real piece and session by our resident artists across Santa Cruz, Tabaiba and the TattooTruck.'}
          </p>
        </div>

        <GalleryGrid
          items={items}
          loading={loading}
          onOpenBooking={onOpenBooking}
          setCursorHover={setCursorHover}
          language={language}
          masonry="columns-2 md:columns-3 lg:columns-4 xl:columns-5"
          showArtistFilter
          skeletonCount={12}
        />
      </div>
    </div>
  );
}
