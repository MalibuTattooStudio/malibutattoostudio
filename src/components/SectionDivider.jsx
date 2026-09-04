import React from 'react';

/**
 * Plain section break between the reviews wall and the footer — a hairline
 * fading in from each side into the studio emblem. No animation, no
 * layered backgrounds; just a simple, low-risk visual pause.
 */
export default function SectionDivider() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 sm:py-14 flex items-center gap-4 sm:gap-6" aria-hidden="true">
      <span className="flex-1 h-px bg-gradient-to-r from-transparent to-white/15" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#ff5500]/40 bg-black p-0.5 shrink-0">
        <img src="/assets/logo.jpg" alt="" className="w-full h-full object-cover rounded-full opacity-80" />
      </div>
      <span className="flex-1 h-px bg-gradient-to-l from-transparent to-white/15" />
    </div>
  );
}
