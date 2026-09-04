import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, X, ArrowUpRight, MessageSquareQuote } from 'lucide-react';
import GoogleIcon from './icons/GoogleIcon';
import { useReviews, useStudioStats } from '../hooks/useReviews';
import { studioColor, studioMeta } from '../data/studios';

/**
 * Home teaser for real, curated Google reviews — a dual-lane marquee, one
 * lane per studio, scrolling opposite directions. Cards stay short; the full
 * review (however long) opens in a modal with a link back to Google.
 * Renders nothing until reviews have been curated in /admin.
 */

function initialOf(name) {
  return (name || '?').trim().charAt(0).toUpperCase();
}

function Stars({ rating, color, size = 'w-3.5 h-3.5' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={size} style={{ color }} fill={i < rating ? color : 'none'} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export function ReviewCard({ review, accent, onOpen, setCursorHover, fluid = false }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(review)}
      onMouseEnter={() => setCursorHover?.(true, 'LEER')}
      onMouseLeave={() => setCursorHover?.(false)}
      className={`group text-left rounded-2xl border border-white/10 bg-black/40 hover:border-white/25 transition-colors p-5 flex flex-col gap-3 cursor-none ${
        fluid ? 'w-full' : 'shrink-0 w-[280px] sm:w-[300px]'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm shrink-0"
          style={{ background: `${accent}1f`, color: accent, border: `1px solid ${accent}55` }}
        >
          {initialOf(review.authorName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white truncate">{review.authorName}</p>
          <Stars rating={review.rating} color={accent} />
        </div>
        <GoogleIcon size={14} className="shrink-0 opacity-70" />
      </div>
      <p className="text-[13px] text-slate-300 font-light leading-relaxed line-clamp-4">
        {review.body}
      </p>
    </button>
  );
}

function MarqueeLane({ reviews, accent, reverse, onOpen, setCursorHover }) {
  if (reviews.length === 0) return null;
  const doubled = [...reviews, ...reviews]; // duplicate for a seamless loop
  return (
    <div className="marquee-row overflow-hidden">
      <div className={`marquee-track gap-4 ${reverse ? 'reverse' : ''}`}>
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} accent={accent} onOpen={onOpen} setCursorHover={setCursorHover} />
        ))}
      </div>
    </div>
  );
}

export function ReviewModal({ review, onClose, language }) {
  const isEs = language === 'es';
  const { stats } = useStudioStats();

  useEffect(() => {
    if (!review) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [review, onClose]);

  if (!review) return null;
  const accent = studioColor(review.studio);
  const googleUrl = review.googleUrl || stats[review.studio]?.url;

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] bg-[#08080a]/95 backdrop-blur-md flex items-center justify-center p-5 cursor-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0c0c10] border border-white/10 rounded-3xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label={isEs ? 'Cerrar' : 'Close'}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff5500] hover:text-black text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5 pr-10">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-black text-lg shrink-0"
            style={{ background: `${accent}1f`, color: accent, border: `1px solid ${accent}55` }}
          >
            {initialOf(review.authorName)}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{review.authorName}</p>
            <Stars rating={review.rating} color={accent} size="w-4 h-4" />
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed whitespace-pre-line">
          {review.body}
        </p>

        <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-white/10">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            {studioMeta(review.studio).badge}
          </span>
          {googleUrl && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors shrink-0"
            >
              <GoogleIcon size={14} />
              <span>{isEs ? 'Ver en Google' : 'View on Google'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function ReviewsSection({ setCursorHover, language }) {
  const isEs = language === 'es';
  const [openReview, setOpenReview] = useState(null);

  const { reviews: scReviews, loading: scLoading } = useReviews({ studio: 'santacruz', onLandingOnly: true });
  const { reviews: tbReviews, loading: tbLoading } = useReviews({ studio: 'tabaiba', onLandingOnly: true });
  const { stats } = useStudioStats();

  const sc = stats.santacruz;
  const tb = stats.tabaiba;
  const combinedCount = (sc?.count || 0) + (tb?.count || 0);
  const combinedRating = combinedCount
    ? ((sc?.rating || 0) * (sc?.count || 0) + (tb?.rating || 0) * (tb?.count || 0)) / combinedCount
    : 0;

  // nothing curated yet in /admin — stay invisible rather than show an empty shell
  if (!scLoading && !tbLoading && scReviews.length === 0 && tbReviews.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[#070709]/60 backdrop-blur-xs relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-semibold uppercase tracking-widest font-mono">
            <MessageSquareQuote className="w-4 h-4" />
            <span>{isEs ? 'Reseñas verificadas' : 'Verified reviews'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading leading-tight">
            {isEs ? 'LO QUE DICE ' : 'WHAT '}
            <span className="text-orange-gradient font-serif-title font-normal italic">
              {isEs ? 'NUESTRA GENTE' : 'OUR CLIENTS SAY'}
            </span>
          </h2>

          {combinedCount > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-heading flex items-center gap-1.5">
                {combinedRating.toFixed(1)}
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff5500]" fill="#ff5500" />
                <span className="text-sm text-slate-400 font-mono font-normal ml-1">
                  · {combinedCount} {isEs ? 'reseñas en Google' : 'Google reviews'}
                </span>
              </span>

              <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider">
                {sc?.url && (
                  <a href={sc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-[#ff5500] transition-colors">
                    <GoogleIcon size={12} /> Santa Cruz {sc.rating}★ <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {tb?.url && (
                  <a href={tb.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-[#00f0ff] transition-colors">
                    <GoogleIcon size={12} /> Tabaiba {tb.rating}★ <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <MarqueeLane reviews={scReviews} accent={studioColor('santacruz')} onOpen={setOpenReview} setCursorHover={setCursorHover} />
          <MarqueeLane reviews={tbReviews} accent={studioColor('tabaiba')} reverse onOpen={setOpenReview} setCursorHover={setCursorHover} />
        </div>
      </div>

      <ReviewModal review={openReview} onClose={() => setOpenReview(null)} language={language} />
    </section>
  );
}
