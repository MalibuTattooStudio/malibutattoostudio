import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared shell for the three legal pages (Aviso Legal, Privacidad, Cookies) —
 * same hero treatment as the rest of the site's dedicated pages, but a single
 * readable prose column instead of a grid. Section markup (h2/h3/p/ul/strong)
 * is styled via the `.legal-prose` rules in index.css so each page's content
 * stays plain semantic JSX.
 */
export default function LegalPageLayout({ eyebrow, title, titleAccent, updated, children }) {
  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-24 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff5500]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-extrabold uppercase tracking-widest font-mono">
            {eyebrow}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading leading-tight">
            {title} <span className="text-orange-gradient font-serif-title italic font-normal">{titleAccent}</span>
          </h1>
          {updated && <p className="text-xs text-slate-500 font-mono">Última actualización: {updated}</p>}
        </div>

        <div className="legal-prose">{children}</div>
      </div>
    </div>
  );
}
