import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Camera, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioColor, studioMeta } from '../data/studios';
import { useArtists } from '../hooks/useArtists';

export default function ArtistsPage({ setCursorHover, language }) {
  const isEs = language === 'es';
  const [selectedStudio, setSelectedStudio] = useState('all');

  const { artists, loading } = useArtists();

  const filtered = selectedStudio === 'all'
    ? artists
    : artists.filter((a) => a.studio === selectedStudio);

  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans">

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff5500]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] text-xs font-extrabold uppercase tracking-widest font-mono">
            <UserCheck className="w-4 h-4" />
            <span>EQUIPO DE MAESTROS TATUADORES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-tight overflow-visible">
            NUESTROS <span className="text-orange-gradient font-serif-title italic font-normal">ARTISTAS</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {isEs ? 'Haz clic en cualquier tatuador para abrir su perfil individual y pedir cita directa por WhatsApp o Email.' : 'Meet the resident and guest master artists behind Malibu Tattoo Studio.'}
          </p>
        </div>

        {/* STUDIO FILTERS */}
        <div className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none mb-12">
          <div className="flex items-center gap-2.5 w-max sm:w-auto sm:flex-wrap sm:justify-center">
            {[
              { id: 'all', label: isEs ? 'Todos los Artistas' : 'All Artists' },
              { id: 'santacruz', label: 'Santa Cruz' },
              { id: 'tabaiba', label: 'Tabaiba Baja' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStudio(tab.id)}
                onMouseEnter={() => setCursorHover(true, 'FILTRAR')}
                onMouseLeave={() => setCursorHover(false)}
                style={
                  selectedStudio === tab.id
                    ? { backgroundColor: studioColor(tab.id), boxShadow: `0 0 20px ${studioColor(tab.id)}80` }
                    : undefined
                }
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  selectedStudio === tab.id
                    ? 'text-black'
                    : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 text-[#ff5500] animate-spin mx-auto" />
          </div>
        ) : (
          /* ARTISTS EXPANDED CARDS GRID */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {filtered.map((artist) => {
                const badge = studioMeta(artist.studio).badge;
                const bio = isEs ? artist.bioEs : artist.bioEn;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={artist.slug}
                    whileHover={{ y: -6 }}
                    className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between group text-left"
                  >
                    <div>
                      <Link
                        to={`/artista/${artist.slug}`}
                        onMouseEnter={() => setCursorHover(true, 'VER FICHA')}
                        onMouseLeave={() => setCursorHover(false)}
                        className="block cursor-none"
                      >
                        <div className="relative rounded-2xl overflow-hidden mb-6 h-64 border border-white/10 bg-black/40">
                          {artist.image ? (
                            <img
                              src={artist.image}
                              alt={artist.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <Camera className="w-8 h-8" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />

                          <div
                            style={{ backgroundColor: studioColor(artist.studio) }}
                            className="absolute top-4 left-4 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-black px-3 py-1 rounded-full font-mono"
                          >
                            <MapPin className="w-3 h-3" />
                            <span>{badge}</span>
                          </div>

                          {artist.handle && (
                            <div className="absolute bottom-4 left-4 right-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-400 text-xs font-mono font-bold">
                                <Camera className="w-3.5 h-3.5" />
                                <span>@{artist.handle}</span>
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl font-black text-white font-heading group-hover:text-[#ff5500] transition-colors">
                          {artist.name}
                        </h3>
                        {artist.roleTitle && (
                          <p className="text-xs font-semibold text-[#ff5500] uppercase tracking-wider mt-1 font-mono">
                            {artist.roleTitle}
                          </p>
                        )}

                        {bio && (
                          <p className="text-xs text-slate-300 mt-3 font-light leading-relaxed">
                            {bio}
                          </p>
                        )}

                        {artist.specialties.length > 0 && (
                          <p className="text-[11px] text-slate-400 mt-3 font-light">
                            <strong className="text-white font-semibold">Especialidades:</strong> {artist.specialties.join(', ')}
                          </p>
                        )}
                      </Link>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                      <Link
                        to={`/artista/${artist.slug}`}
                        className="text-xs text-slate-300 hover:text-white font-mono flex items-center gap-1 transition-colors"
                      >
                        <span>Ver Ficha</span>
                        <ExternalLink className="w-3 h-3 text-[#ff5500]" />
                      </Link>

                      <Link
                        to={`/artista/${artist.slug}`}
                        onMouseEnter={() => setCursorHover(true, 'CITA')}
                        onMouseLeave={() => setCursorHover(false)}
                        className="px-5 py-2 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-[0_0_15px_rgba(255,85,0,0.3)]"
                      >
                        {isEs ? 'Reservar Cita' : 'Book Session'}
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
