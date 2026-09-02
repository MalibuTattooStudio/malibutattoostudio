import React from 'react';
import { ImageOff, Camera, ArrowRight } from 'lucide-react';

/**
 * Shown when there are no `gallery_items` yet. Keeps the section looking
 * intentional instead of broken while the real portfolio is being loaded in.
 */
export default function GalleryEmptyState({ language = 'es', onOpenBooking, setCursorHover }) {
  const isEs = language === 'es';

  return (
    <div className="glass-panel-orange rounded-3xl border border-[#ff5500]/40 px-6 py-14 sm:py-20 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent 0 13px, rgba(255,85,0,0.35) 13px 14px)',
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#ff5500]/50 text-[#ff5500] text-[11px] font-extrabold uppercase tracking-[0.22em] font-mono">
          <span className="flex h-2 w-2 rounded-full bg-[#ff5500] animate-pulse" />
          {isEs ? 'Galería en preparación' : 'Gallery coming soon'}
        </div>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/40 flex items-center justify-center text-[#ff5500]">
          <ImageOff className="w-7 h-7" />
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white font-heading text-balance [overflow-wrap:anywhere]">
          {isEs ? 'Estamos montando el portafolio' : 'Building the portfolio'}
        </h3>

        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          {isEs
            ? 'Muy pronto verás aquí las piezas reales de nuestro equipo en Santa Cruz, Tabaiba y el TattooTruck. Mientras tanto, echa un vistazo en Instagram o pide tu cita.'
            : 'Real work from our team in Santa Cruz, Tabaiba and the TattooTruck is coming soon. In the meantime, take a look on Instagram or book your appointment.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <a
            href="https://www.instagram.com/malibutattoostudio/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorHover?.(true, 'INSTAGRAM')}
            onMouseLeave={() => setCursorHover?.(false)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-white/15 text-white text-xs font-bold uppercase tracking-wider hover:border-[#ff5500] transition-colors"
          >
            <Camera className="w-4 h-4 text-[#ff5500]" />
            <span>@malibutattoostudio</span>
          </a>

          {onOpenBooking && (
            <button
              type="button"
              onClick={() => onOpenBooking('gallery')}
              onMouseEnter={() => setCursorHover?.(true, 'CITA')}
              onMouseLeave={() => setCursorHover?.(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff5500] text-black text-xs font-extrabold uppercase tracking-wider hover:bg-[#ff7700] transition-colors cursor-pointer"
            >
              <span>{isEs ? 'Pedir cita' : 'Book now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
