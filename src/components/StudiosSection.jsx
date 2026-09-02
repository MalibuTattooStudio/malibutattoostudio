import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, ArrowUpRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from './ui/ImageWithSkeleton';

/**
 * Home teaser for the two physical studios. Both shown at once as equal
 * cards (no carousel) — full detail lives on /estudios.
 */
export default function StudiosSection({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';

  const studios = [
    {
      id: 'santacruz',
      shortName: 'Santa Cruz',
      kicker: isEs ? 'Estudio principal' : 'Flagship studio',
      tagline: isEs ? 'Vanguardia urbana en la capital' : 'Urban art studio in the capital',
      vibe: isEs
        ? 'Espacio metropolitano de autor con boxes privados insonorizados y área de esterilización de grado clínico.'
        : 'Metropolitan flagship studio with soundproof private booths and a clinical sterilization unit.',
      city: 'Santa Cruz de Tenerife',
      hours: isEs ? 'Lun–Sáb · 10:30–20:30' : 'Mon–Sat · 10:30–20:30',
      image: '/assets/santacruz.jpg',
      badge: 'SANTA CRUZ',
      mapsUrl: 'https://maps.app.goo.gl/rnNCgbFJCrsvSHgn9',
      color: '#ff5500',
    },
    {
      id: 'tabaiba',
      shortName: 'Tabaiba Baja',
      kicker: isEs ? 'Santuario costero' : 'Coastal sanctuary',
      tagline: isEs ? 'Boutique frente al Atlántico' : 'Boutique studio facing the Atlantic',
      vibe: isEs
        ? 'Estudio privado frente al mar Atlántico. Brisa marina, luz natural y máxima intimidad para piezas de gran formato.'
        : 'Private oceanfront studio. Sea breeze, natural light and total privacy for large-scale work.',
      city: 'Tabaiba Baja, El Rosario',
      hours: isEs ? 'Cita previa · 11:00–19:00' : 'By appointment · 11:00–19:00',
      image: '/assets/tabaiba.jpg',
      badge: 'TABAIBA',
      mapsUrl: 'https://maps.app.goo.gl/QMaM94qw9J5eddYC7',
      color: '#00f0ff',
    },
  ];

  return (
    <section
      id="studios-section"
      className="py-16 sm:py-24 bg-[#070709]/60 backdrop-blur-xs relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-semibold uppercase tracking-widest font-mono">
            <Compass className="w-4 h-4" />
            <span>{isEs ? 'Dos estudios en Tenerife' : 'Two studios in Tenerife'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading leading-[1.1] text-balance">
            SANTA CRUZ <span className="text-orange-gradient font-serif-title font-normal italic">&</span> TABAIBA
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            {isEs
              ? 'Dos localizaciones físicas con personalidad propia: la ciudad y la costa.'
              : 'Two physical locations, each with its own character: city and coast.'}
          </p>
        </div>

        {/* TWO STUDIO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {studios.map((studio, idx) => (
            <motion.article
              key={studio.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-white/25 flex flex-col transition-colors duration-500"
            >
              {/* Photo with overlaid identity */}
              <Link
                to="/estudios"
                onMouseEnter={() => setCursorHover?.(true, isEs ? 'VER ESTUDIO' : 'VIEW STUDIO')}
                onMouseLeave={() => setCursorHover?.(false)}
                className="relative block cursor-none"
              >
                <ImageWithSkeleton
                  src={studio.image}
                  alt={studio.shortName}
                  className="aspect-[4/3] sm:aspect-[16/11]"
                  imgClassName="group-hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5 pointer-events-none" />

                <span
                  className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-black font-mono shadow-md"
                  style={{ backgroundColor: studio.color }}
                >
                  {studio.badge}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p
                    className="text-[11px] font-mono font-bold uppercase tracking-[0.15em]"
                    style={{ color: studio.color }}
                  >
                    {studio.kicker}
                  </p>
                  <h3 className="mt-0.5 text-2xl sm:text-3xl font-black uppercase text-white font-heading leading-none">
                    {studio.shortName}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 font-light">{studio.tagline}</p>
                </div>
              </Link>

              {/* Compact info + actions */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <p className="text-sm text-slate-300 font-light leading-relaxed line-clamp-3">
                  {studio.vibe}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-400 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: studio.color }} />
                    {studio.city}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: studio.color }} />
                    {studio.hours}
                  </span>
                </div>

                <div className="pt-1 mt-auto space-y-3">
                  <button
                    type="button"
                    onClick={() => onOpenBooking?.(studio.id)}
                    onMouseEnter={() => setCursorHover?.(true, 'RESERVAR')}
                    onMouseLeave={() => setCursorHover?.(false)}
                    className="w-full px-4 py-3 rounded-full text-black font-extrabold text-[11px] uppercase tracking-wider transition-[filter] hover:brightness-110 cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                    style={{ backgroundColor: studio.color }}
                  >
                    <span>{isEs ? 'Pedir cita' : 'Book now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    to="/estudios"
                    onMouseEnter={() => setCursorHover?.(true, isEs ? 'VER ESTUDIO' : 'VIEW STUDIO')}
                    onMouseLeave={() => setCursorHover?.(false)}
                    className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                  >
                    <span>{isEs ? 'Ver estudio completo' : 'View full studio'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
