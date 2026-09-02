import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowRight, ChevronLeft, ChevronRight, Camera, ArrowUpRight } from 'lucide-react';
import { artistBySlug } from '../../data/artists';

/**
 * Full-screen viewer. The image fills the stage; a glass info bar sits at the
 * bottom with the artist, style and actions. Navigate the *filtered* set with
 * the arrows / ← → keys, close with the X / Esc / backdrop.
 */
export default function GalleryLightbox({ items = [], index, onClose, onIndex, onOpenBooking, language = 'es' }) {
  const isEs = language === 'es';
  const isOpen = index != null && !!items[index];

  const idxRef = useRef(index);
  idxRef.current = index;
  const go = (delta) => onIndex((idxRef.current + delta + items.length) % items.length);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const item = items[index];
  const many = items.length > 1;
  const who = artistBySlug(item.artistSlug);

  const stop = (e) => e.stopPropagation();

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      style={{ cursor: 'auto' }}
      className="fixed inset-0 z-[9998] bg-[#08080a]/98 backdrop-blur-xl flex flex-col"
      onClick={onClose}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0" onClick={stop}>
        <span className="text-xs font-mono font-bold text-slate-400 tracking-widest">
          {String(index + 1).padStart(2, '0')}
          <span className="text-slate-600"> / {String(items.length).padStart(2, '0')}</span>
        </span>
        <div className="flex items-center gap-3">
          {many && (
            <span className="hidden sm:block text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              ← → {isEs ? 'navegar' : 'navigate'}
            </span>
          )}
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#ff5500] hover:text-black text-white border border-white/20 grid place-items-center transition-colors"
            aria-label={isEs ? 'Cerrar' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* image stage */}
      <div
        className="flex-1 min-h-0 relative flex items-center justify-center px-3 sm:px-20 pb-3"
        onClick={stop}
      >
        <img
          key={item.id}
          src={item.image}
          alt={item.title || item.artist || ''}
          className="max-w-full object-contain rounded-xl shadow-[0_20px_80px_-10px_rgba(0,0,0,0.8)] max-h-[calc(100dvh-11.5rem)] sm:max-h-[calc(100dvh-9rem)]"
        />

        {many && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#ff5500] hover:text-black text-white border border-white/15 backdrop-blur grid place-items-center transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#ff5500] hover:text-black text-white border border-white/15 backdrop-blur grid place-items-center transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* info bar */}
      <div
        className="shrink-0 border-t border-white/10 bg-gradient-to-t from-black via-black/80 to-black/30 backdrop-blur-md px-4 sm:px-8 py-4"
        onClick={stop}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {/* identity */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {who?.image && (
              <img
                src={who.image}
                alt={item.artist}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#ff5500]/60 shrink-0"
              />
            )}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {item.style && (
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#ff5500] bg-[#ff5500]/10 px-2.5 py-0.5 rounded-full border border-[#ff5500]/30">
                    {item.style}
                  </span>
                )}
              </div>
              {item.title && (
                <p className="text-sm sm:text-base font-bold text-white font-heading leading-tight line-clamp-1">
                  {item.title}
                </p>
              )}
              <p className="text-[11px] font-mono text-slate-400 truncate">
                {isEs ? 'por ' : 'by '}
                <span className="text-slate-200">{item.artist || (isEs ? 'Malibu Tattoo' : 'Malibu Tattoo')}</span>
              </p>
              {item.caption && (
                <p className="hidden sm:block text-[11px] text-slate-500 line-clamp-1 max-w-lg">{item.caption}</p>
              )}
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center gap-2 shrink-0 overflow-x-auto scrollbar-none -mx-1 px-1">
            {who && (
              <Link
                to={`/artista/${who.slug}`}
                onClick={onClose}
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full glass-panel border border-white/15 text-slate-300 hover:text-white hover:border-white/40 text-[10px] font-bold uppercase tracking-wider transition-colors"
              >
                <span>{isEs ? 'Ver artista' : 'View artist'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
            {item.permalink && (
              <a
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full glass-panel border border-white/15 text-slate-300 hover:text-white hover:border-white/40 text-[10px] font-bold uppercase tracking-wider transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            )}
            {onOpenBooking && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking(`gallery-${item.style || item.id}`);
                }}
                className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ff5500] text-black font-extrabold text-[10px] uppercase tracking-widest hover:bg-[#ff7700] transition-colors shadow-[0_0_25px_rgba(255,85,0,0.35)]"
              >
                <span>{isEs ? 'Reservar este estilo' : 'Book this style'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}
