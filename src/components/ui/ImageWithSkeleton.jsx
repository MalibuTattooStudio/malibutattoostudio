import React, { useState } from 'react';

/**
 * <img> with a blur-up placeholder (or shimmer skeleton), a soft fade-in, and a
 * graceful "sin imagen" fallback on error / missing src.
 *
 * Give the component a sized box via `className` (e.g. "aspect-[4/5]" or "h-96").
 * Pass `blurData` (a tiny base64 data URI) for the blur-up effect.
 */
export default function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  blurData = '',
  eager = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`relative overflow-hidden bg-white/[0.03] ${className}`}>
      {!loaded && !failed && (
        blurData ? (
          <div
            className="absolute inset-0 scale-110 blur-xl"
            style={{ backgroundImage: `url(${blurData})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ) : (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent" />
        )
      )}

      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
          Sin imagen
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
