import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="w-full relative z-10">
        {/* Dazzling Cyber Shutter Curtain */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#070709] origin-top pointer-events-none flex items-center justify-center border-b-2 border-[#ff5500] shadow-[0_10px_50px_rgba(255,85,0,0.8)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 1, 0], scale: [0.7, 1, 1.15] }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center justify-center space-y-2 text-center"
          >
            <div className="w-16 h-16 rounded-full border-2 border-[#ff5500] p-1 bg-black overflow-hidden shadow-[0_0_35px_#ff5500] animate-pulse">
              <img src="/assets/logo.jpg" alt="Malibu Emblem" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] text-white font-heading">
              MALIBU TATTOO STUDIO
            </span>
          </motion.div>
        </motion.div>

        {/* Animated Page Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
