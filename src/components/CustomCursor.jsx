import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';

export default function CustomCursor({ cursorText, isHovered, previewData }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const hasPhotoPreview = previewData && previewData.image;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      
      {/* FLOATING HD ARTIST PHOTO PREVIEW CARD ABOVE CURSOR */}
      <AnimatePresence>
        {hasPhotoPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: Math.min(mousePosition.x + 25, window.innerWidth - 220),
              y: Math.max(mousePosition.y - 200, 20),
            }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed z-[10000] pointer-events-none w-52 p-3 rounded-2xl bg-black/95 border border-[#ff5500]/60 shadow-[0_10px_35px_rgba(255,85,0,0.4)] text-left"
          >
            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-2.5 border border-white/10">
              <img
                src={previewData.image}
                alt={previewData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-black bg-[#ff5500] px-2 py-0.5 rounded-full font-mono">
                  VER ARTISTA
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
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

      {/* Standard Outer Ring / Capsule in Malibu Neon Orange */}
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
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.5,
        }}
      >
        {isHovered && cursorText && !hasPhotoPreview && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-extrabold uppercase tracking-wider text-black text-center px-1 font-heading"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#ff5500] shadow-[0_0_12px_#ff5500]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 400,
          mass: 0.1,
        }}
      />
    </div>
  );
}
