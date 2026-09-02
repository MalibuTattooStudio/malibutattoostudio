import React from 'react';
import { Link } from 'react-router-dom';
import { Hourglass, ArrowRight } from 'lucide-react';

/**
 * Branded "coming soon" panel. Used to park sections whose build is deferred
 * without removing them from the page or the nav.
 *
 * @param {object}   props
 * @param {string}  [props.eyebrow]     - small pill label
 * @param {string}   props.title
 * @param {string}  [props.description]
 * @param {Function}[props.icon]        - lucide icon component
 * @param {{label:string,to?:string,onClick?:Function}} [props.cta]
 */
export default function ComingSoon({
  eyebrow = 'Próximamente',
  title,
  description,
  icon: Icon = Hourglass,
  cta,
  className = '',
}) {
  return (
    <div
      className={`glass-panel-orange rounded-3xl border border-[#ff5500]/40 px-6 py-14 sm:px-10 sm:py-20 text-center relative overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent 0 13px, rgba(255,85,0,0.35) 13px 14px)',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#ff5500]/50 text-[#ff5500] text-[11px] font-extrabold uppercase tracking-[0.22em] font-mono">
          <span className="flex h-2 w-2 rounded-full bg-[#ff5500] animate-pulse" />
          {eyebrow}
        </div>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/40 flex items-center justify-center text-[#ff5500]">
          <Icon className="w-7 h-7" />
        </div>

        {title && (
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white font-heading leading-tight text-balance [overflow-wrap:anywhere]">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {description}
          </p>
        )}

        {cta &&
          (cta.to ? (
            <Link
              to={cta.to}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors"
            >
              <span>{cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={cta.onClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors cursor-pointer"
            >
              <span>{cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ))}
      </div>
    </div>
  );
}
