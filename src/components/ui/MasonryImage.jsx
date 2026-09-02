import React, { useState } from 'react';

/**
 * Image that keeps its natural aspect ratio (for masonry layouts).
 *
 * The tiny `blurData` image doubles as the layout spacer *and* the blur-up
 * placeholder — it reserves the correct height immediately, so there's no
 * layout shift when the full image loads on top of it. Falls back to a 4:5
 * box when no blur data is available.
 */
export default function MasonryImage({ src, blurData = '', alt = '', className = '', imgClassName = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`relative w-full overflow-hidden bg-white/[0.03] ${className}`}>
      {blurData ? (
        <img
          src={blurData}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`block w-full h-auto scale-[1.06] blur-xl transition-opacity duration-700 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <div className="w-full aspect-[4/5]" />
      )}

      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
          Sin imagen
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
