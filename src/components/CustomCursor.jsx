import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';

// Skip the whole custom-cursor system on touch / no-hover devices.
const isFinePointer =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function CustomCursor({ cursorText, isHovered, previewData }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isFinePointer) {
      // No custom cursor on touch/no-hover — make sure the native one is visible
      document.body.style.cursor = 'auto';
      return;
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isFinePointer || !isVisible) return null;

  const hasPhotoPreview = previewData && previewData.image;

  // Keep the preview card fully inside the viewport; flip to the left of the
  // cursor when there isn't room on the right.
  const CARD_W = 208;
  const CARD_H = 260;
  const vw = window.innerWidth;
  const previewX =
    mousePosition.x + 25 + CARD_W > vw - 12
      ? Math.max(12, mousePosition.x - 25 - CARD_W)
      : mousePosition.x + 25;
  const previewY = Math.min(
    Math.max(mousePosition.y - CARD_H + 60, 16),
    window.innerHeight - CARD_H - 16
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      {/* FLOATING ARTIST PHOTO PREVIEW CARD */}
      <AnimatePresence>
        {hasPhotoPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, x: previewX, y: previewY }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
            className="fixed left-0 top-0 z-[10000] pointer-events-none w-52 p-3 rounded-2xl bg-black/95 border border-[#ff5500]/60 shadow-[0_10px_35px_rgba(255,85,0,0.4)] text-left"
          >
            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-2.5 border border-white/10">
              <img
                src={previewData.image}
                alt={previewData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-black bg-[#ff5500] px-2 py-0.5 rounded-full font-mono truncate max-w-[75%]">
                  {previewData.badge || 'VER ARTISTA'}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
              </div>
            </div>

            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-white font-heading leading-tight">
                {previewData.name}
              </h4>
              <p className="text-[10px] text-pink-400 font-mono flex items-center gap-1">
                <Camera className="w-2.5 h-2.5" />
                <span>{previewData.handle}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer ring / capsule */}
      <motion.div
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border border-[#ff5500]/70 bg-[#ff5500]/10 transition-colors duration-300 pointer-events-none ${
          isHovered ? 'bg-[#ff5500] text-black border-[#ff5500] shadow-[0_0_30px_#ff5500]' : ''
        }`}
        animate={{
          x: mousePosition.x - (isHovered ? 45 : 20),
          y: mousePosition.y - (isHovered ? 45 : 20),
          width: isHovered ? 90 : 40,
          height: isHovered ? 90 : 40,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      >
        {isHovered && cursorText && !hasPhotoPreview && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-[80px] text-[10px] font-extrabold uppercase tracking-wider text-black text-center leading-tight px-1 font-heading line-clamp-2"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#ff5500] shadow-[0_0_12px_#ff5500]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 400, mass: 0.1 }}
      />
    </div>
  );
}
