import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import MasonryImage from '../ui/MasonryImage';
import { artistBySlug } from '../../data/artists';

/**
 * One portfolio piece in the masonry wall. A clean image by default; on hover
 * (desktop) a wash + the title / open affordance slide in. The artist name
 * stays visible so a portfolio always reads as attributable.
 */
export default function GalleryCard({ item, index = 0, onOpen, setCursorHover, language = 'es' }) {
  const isEs = language === 'es';

  const open = () => onOpen(item);

  // hovering a piece floats the artist's portrait next to the cursor
  const who = artistBySlug(item.artistSlug);
  const preview = who
    ? { name: who.name, handle: `@${who.handle}`, image: who.image, badge: item.style || (isEs ? 'AMPLIAR' : 'VIEW') }
    : null;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.35) }}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      onMouseEnter={() => setCursorHover?.(true, isEs ? 'AMPLIAR' : 'VIEW', preview)}
      onMouseLeave={() => setCursorHover?.(false)}
      className="group relative block w-full mb-4 sm:mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 hover:border-[#ff5500]/60 transition-colors duration-500 cursor-none focus:outline-none focus-visible:border-[#ff5500]"
    >
      <MasonryImage
        src={item.image}
        blurData={item.blur}
        alt={item.title || item.artist || 'Malibu Tattoo'}
        imgClassName="group-hover:scale-[1.05] transition-transform duration-[900ms] ease-out"
      />

      {/* permanent foot gradient so the artist chip stays legible */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* style tag — always visible */}
      {item.style && (
        <span className="absolute top-3 left-3 text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#ff5500] border border-[#ff5500]/30">
          {item.style}
        </span>
      )}

      {/* hover wash + open affordance */}
      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#ff5500] text-black flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 pointer-events-none">
        <Plus className="w-4 h-4" />
      </div>

      {/* bottom text */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 pointer-events-none">
        {item.title && (
          <p className="text-sm font-bold text-white font-heading leading-snug line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            {item.title}
          </p>
        )}
        {item.artist && (
          <p className="mt-0.5 text-[11px] font-mono text-slate-300">{item.artist}</p>
        )}
      </div>
    </motion.div>
  );
}
