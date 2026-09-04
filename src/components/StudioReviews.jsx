import React, { useState } from 'react';
import { MessageSquareQuote, ArrowUpRight, ChevronDown } from 'lucide-react';
import GoogleIcon from './icons/GoogleIcon';
import { ReviewCard, ReviewModal } from './ReviewsSection';
import { useReviews, useStudioStats } from '../hooks/useReviews';

/**
 * Per-studio reviews block for /estudios — a grid (not the landing marquee),
 * showing 6 by default with a "ver todas" expand so the page doesn't turn
 * into a wall of testimonials.
 */
export default function StudioReviews({ studio, accent, setCursorHover, language }) {
  const isEs = language === 'es';
  const { reviews, loading } = useReviews({ studio });
  const { stats } = useStudioStats();
  const [expanded, setExpanded] = useState(false);
  const [openReview, setOpenReview] = useState(null);

  if (!loading && reviews.length === 0) return null;

  const s = stats[studio];
  const visible = expanded ? reviews : reviews.slice(0, 6);

  return (
    <div className="pt-6 border-t border-white/10 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-white font-mono flex items-center gap-2">
          <MessageSquareQuote className="w-4 h-4 shrink-0" style={{ color: accent }} />
          <span>{isEs ? 'Reseñas verificadas' : 'Verified reviews'}</span>
        </h4>
        {s?.url && (
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors pl-6 sm:pl-0"
          >
            <GoogleIcon size={13} />
            <span>{s.rating}★ · {s.count} {isEs ? 'en Google' : 'on Google'}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visible.map((r) => (
          <ReviewCard key={r.id} review={r} accent={accent} onOpen={setOpenReview} setCursorHover={setCursorHover} fluid />
        ))}
      </div>

      {reviews.length > 6 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mx-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
        >
          <span>
            {expanded
              ? (isEs ? 'Ver menos' : 'Show less')
              : `${isEs ? 'Ver todas' : 'Show all'} (${reviews.length})`}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}

      <ReviewModal review={openReview} onClose={() => setOpenReview(null)} language={language} />
    </div>
  );
}
