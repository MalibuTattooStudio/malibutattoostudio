import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Camera, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioColor, studioMeta } from '../data/studios';
import { useArtists } from '../hooks/useArtists';

export default function ArtistSection({ setCursorHover, language }) {
  const isEs = language === 'es';
  const [selectedStudio, setSelectedStudio] = useState('all');

  const { artists, loading } = useArtists();

  const filteredArtists = selectedStudio === 'all'
    ? artists
    : artists.filter((artist) => artist.studio === selectedStudio);

  return (
    <section id="artists-section" className="py-24 bg-[#070709]/60 backdrop-blur-xs relative overflow-hidden border-t border-white/5">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-semibold uppercase tracking-widest font-mono">
            <UserCheck className="w-4 h-4 text-[#ff5500]" />
            <span>EQUIPO DE AUTOR MALIBU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading leading-tight overflow-visible">
            NUESTROS <span className="text-orange-gradient font-serif-title font-normal italic">ARTISTAS</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            {isEs ? 'Haz clic sobre cualquier artista para ver su ficha de cita directa y contacto.' : 'Resident and guest master artists assigned across Santa Cruz and Tabaiba.'}
          </p>
        </div>

        {/* STUDIO FILTER TABS */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none mb-12">
          <div className="flex items-center gap-2.5 w-max sm:w-auto sm:flex-wrap sm:justify-center">
            {[
              { id: 'all', label: isEs ? 'Todos los Artistas' : 'All Artists', icon: UserCheck },
              { id: 'santacruz', label: 'Santa Cruz', icon: MapPin },
              { id: 'tabaiba', label: 'Tabaiba Baja', icon: MapPin },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
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
                  className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    selectedStudio === tab.id
                      ? 'text-black'
                      : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 text-[#ff5500] animate-spin mx-auto" />
          </div>
        ) : (
          /* ARTISTS GRID */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredArtists.map((artist) => (
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        {/* Studio Assignment Badge */}
                        <div
                          style={{ backgroundColor: studioColor(artist.studio) }}
                          className="absolute top-4 left-4 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-black px-3 py-1 rounded-full shadow-lg font-mono"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>{studioMeta(artist.studio).badge}</span>
                        </div>

                        {artist.handle && (
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
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
                      {artist.specialties.length > 0 && (
                        <p className="text-xs text-slate-300 mt-3 font-light leading-relaxed">
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
                      <span>Ver Ficha & Cita</span>
                      <ExternalLink className="w-3 h-3 text-[#ff5500]" />
                    </Link>

                    <Link
                      to={`/artista/${artist.slug}`}
                      onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
                      onMouseLeave={() => setCursorHover(false)}
                      className="px-4 py-2 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-[0_0_15px_rgba(255,85,0,0.3)]"
                    >
                      {isEs ? 'Reservar Cita' : 'Book Session'}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
