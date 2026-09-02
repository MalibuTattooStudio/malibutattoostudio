import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Camera, MapPin, Truck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArtistSection({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const [selectedStudio, setSelectedStudio] = useState('all');

  const artists = [
    // Tabaiba Team
    {
      id: 1,
      slug: 'yenko',
      name: 'Yenko Tattoo',
      role: 'Freestyle & Master Artist',
      specialties: 'Freestyle Tattoo, Blackwork & Dark Realism',
      studios: ['tabaiba'],
      studioBadge: 'Tabaiba Baja Studio',
      igHandle: '@yenko_freestyletatau',
      igUrl: 'https://www.instagram.com/yenko_freestyletatau/',
      image: '/assets/artist_yenko.jpg'
    },
    {
      id: 2,
      slug: 'iria',
      name: 'Iria Tattoo',
      role: 'Fine Line & Microrealismo',
      specialties: 'Fine Line, Microrealismo, Botánico',
      studios: ['tabaiba'],
      studioBadge: 'Tabaiba Baja Studio',
      igHandle: '@iria_tattoo',
      igUrl: 'https://www.instagram.com/iria_tattoo/',
      image: '/assets/artist_iria.jpg'
    },
    {
      id: 3,
      slug: 'yaxtattoo',
      name: 'Yax Tattoo',
      role: 'Custom Ink & Japanese Flash',
      specialties: 'Custom Ink, Blackwork, Japanese Flash',
      studios: ['tabaiba', 'tattootruck'],
      studioBadge: 'Tabaiba & TattooTruck',
      igHandle: '@yaxtattoo',
      igUrl: 'https://www.instagram.com/yaxtattoo/',
      image: '/assets/artist_yax.jpg'
    },
    {
      id: 4,
      slug: 'aurea',
      name: 'Aurea Tattoo',
      role: 'Illustrative & Ornamental',
      specialties: 'Illustrative Art, Fine Line, Ornamental',
      studios: ['tabaiba'],
      studioBadge: 'Tabaiba Baja Studio',
      igHandle: '@aurea.tattoo_',
      igUrl: 'https://www.instagram.com/aurea.tattoo_/',
      image: '/assets/artist_aurea.jpg'
    },
    // Santa Cruz Team
    {
      id: 5,
      slug: 'aditii',
      name: 'Aditii Tattoo',
      role: 'Sacred Geometry & Ornamental',
      specialties: 'Ornamental, Geometría Sacra, Lettering',
      studios: ['santacruz'],
      studioBadge: 'Santa Cruz Studio',
      igHandle: '@aditii_tattoo',
      igUrl: 'https://www.instagram.com/aditii_tattoo/',
      image: '/assets/artist_aditii.jpg'
    },
    {
      id: 6,
      slug: 'pidol',
      name: 'Pidol BodyArt',
      role: 'Neo Tradicional & Piercing',
      specialties: 'Body Art, Neo Tradicional, Piercing',
      studios: ['santacruz', 'tattootruck'],
      studioBadge: 'Santa Cruz & TattooTruck',
      igHandle: '@pidol_bodyart',
      igUrl: 'https://www.instagram.com/pidol_bodyart/',
      image: '/assets/artist_pidol.jpg'
    },
    {
      id: 7,
      slug: 'karitorres',
      name: 'Kari Torres',
      role: 'Minimal Fine Line',
      specialties: 'Illustrative, Minimal Fine Line',
      studios: ['santacruz'],
      studioBadge: 'Santa Cruz Studio',
      igHandle: '@karitorres.tattoo',
      igUrl: 'https://www.instagram.com/karitorres.tattoo/',
      image: '/assets/artist_karitorres.jpg'
    },
    {
      id: 8,
      slug: 'honnari',
      name: 'Honnari Tattoo',
      role: 'Japanese Traditional Master',
      specialties: 'Irezumi, Japanese Traditional, Custom Flash',
      studios: ['santacruz'],
      studioBadge: 'Santa Cruz Studio',
      igHandle: '@honnari_tattoo',
      igUrl: 'https://www.instagram.com/honnari_tattoo/',
      image: '/assets/artist_honnari.jpg'
    },
    {
      id: 9,
      slug: 'erios',
      name: 'EriOS Tattoo',
      role: 'Dark Realism & Blackwork',
      specialties: 'Dark Realism, Black & Grey, Chicano',
      studios: ['santacruz'],
      studioBadge: 'Santa Cruz Studio',
      igHandle: '@eriostattoo',
      igUrl: 'https://www.instagram.com/eriostattoo/',
      image: '/assets/artist_erios.jpg'
    }
  ];

  const filteredArtists = selectedStudio === 'all'
    ? artists
    : artists.filter(artist => artist.studios.includes(selectedStudio));

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
            {isEs ? 'Haz clic sobre cualquier artista para ver su ficha de cita directa y contacto.' : 'Resident and guest master artists assigned across Santa Cruz, Tabaiba, and TattooTruck.'}
          </p>
        </div>

        {/* STUDIO FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { id: 'all', label: isEs ? 'Todos los Artistas' : 'All Artists', icon: UserCheck },
            { id: 'santacruz', label: 'Santa Cruz', icon: MapPin },
            { id: 'tabaiba', label: 'Tabaiba Baja', icon: MapPin },
            { id: 'tattootruck', label: 'TattooTruck', icon: Truck }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStudio(tab.id)}
                onMouseEnter={() => setCursorHover(true, 'FILTRAR')}
                onMouseLeave={() => setCursorHover(false)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  selectedStudio === tab.id
                    ? 'bg-[#ff5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.5)]'
                    : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ARTISTS GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredArtists.map(artist => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={artist.id}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between group text-left"
              >
                <div>
                  <Link
                    to={`/artista/${artist.slug}`}
                    onMouseEnter={() => setCursorHover(true, 'VER FICHA', artist)}
                    onMouseLeave={() => setCursorHover(false)}
                    className="block cursor-none"
                  >
                    <div className="relative rounded-2xl overflow-hidden mb-6 h-64 border border-white/10">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      
                      {/* Studio Assignment Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-black bg-[#ff5500] px-3 py-1 rounded-full shadow-lg font-mono">
                        {artist.studios.includes('tattootruck') ? <Truck className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        <span>{artist.studioBadge}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-400 text-xs font-mono font-bold">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{artist.igHandle}</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-white font-heading group-hover:text-[#ff5500] transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#ff5500] uppercase tracking-wider mt-1 font-mono">
                      {artist.role}
                    </p>
                    <p className="text-xs text-slate-300 mt-3 font-light leading-relaxed">
                      <strong className="text-white font-semibold">Especialidades:</strong> {artist.specialties}
                    </p>
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

      </div>
    </section>
  );
}
