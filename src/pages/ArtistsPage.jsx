import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Camera, MapPin, Truck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArtistsPage({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const [selectedStudio, setSelectedStudio] = useState('all');

  const artists = [
    // Tabaiba Studio Team
    {
      id: 1,
      slug: 'yenko',
      name: 'Yenko Tattoo',
      role: 'Freestyle & Master Artist',
      specialties: 'Freestyle Tattoo, Blackwork & Dark Realism',
      studios: ['tabaiba'],
      studioBadge: 'Tabaiba Baja Studio',
      bioEs: 'Fundador y Maestro Tatuador de Malibu Tattoo Studio en Tabaiba Baja. Especializado en piezas freestyle únicas de gran formato, composiciones orgánicas y lirismo oscuro en Blackwork.',
      bioEn: 'Founder & Master Artist at Malibu Tattoo Studio in Tabaiba Baja. Specialized in large scale freestyle blackwork and dark realism.',
      igHandle: '@yenko_freestyletatau',
      igUrl: 'https://www.instagram.com/yenko_freestyletatau/',
      image: '/assets/artist_yenko.jpg'
    },
    {
      id: 2,
      slug: 'iria',
      name: 'Iria Tattoo',
      role: 'Resident Fine Line Artist',
      specialties: 'Fine Line, Microrealismo, Botánico',
      studios: ['tabaiba'],
      studioBadge: 'Tabaiba Baja Studio',
      bioEs: 'Especialista en trazos ultra-finos, ilustración botánica de alta precisión y microrealismo poético en el estudio boutique frente al mar de Tabaiba Baja.',
      bioEn: 'Specialist in ultra-fine line work, botanical illustrations and microrealism in Tabaiba Baja.',
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
      bioEs: 'Tatuador en Tabaiba Baja y artista estrella en activaciones móviles del TattooTruck. Diseños flash de inspiración japonesa e ilustración personalizada.',
      bioEn: 'Resident artist at Tabaiba Baja & mobile event activations in the TattooTruck.',
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
      bioEs: 'Especializada en arte ilustrativo, composición fina y motivos ornamentales únicos en nuestro estudio de Tabaiba Baja.',
      bioEn: 'Specialized in illustrative art, fine composition and unique ornamental motifs in Tabaiba Baja.',
      igHandle: '@aurea.tattoo_',
      igUrl: 'https://www.instagram.com/aurea.tattoo_/',
      image: '/assets/artist_aurea.jpg'
    },
    // Santa Cruz Studio Team
    {
      id: 5,
      slug: 'aditii',
      name: 'Aditii Tattoo',
      role: 'Resident Sacred Geometry Artist',
      specialties: 'Ornamental, Geometría Sacra, Lettering',
      studios: ['santacruz'],
      studioBadge: 'Santa Cruz Studio',
      bioEs: 'Residente en el estudio principal de Santa Cruz. Maestra del ornamentalismo corporal, simetría mística y geometría sagrada trazada sobre la anatomía.',
      bioEn: 'Resident at Santa Cruz. Master of sacred geometry, ornamental flows, and custom lettering.',
      igHandle: '@aditii_tattoo',
      igUrl: 'https://www.instagram.com/aditii_tattoo/',
      image: '/assets/artist_aditii.jpg'
    },
    {
      id: 6,
      slug: 'pidol',
      name: 'Pidol BodyArt',
      role: 'Specialist Tattoo & Piercing',
      specialties: 'Body Art, Neo Tradicional, Piercing',
      studios: ['santacruz', 'tattootruck'],
      studioBadge: 'Santa Cruz & TattooTruck',
      bioEs: 'Artista versátil de Neo Tradicional con colores vibrantes y especialista de perforaciones corporales en Santa Cruz y eventos en TattooTruck.',
      bioEn: 'Vibrant Neo Traditional artist & body piercing specialist across Santa Cruz and TattooTruck.',
      igHandle: '@pidol_bodyart',
      igUrl: 'https://www.instagram.com/pidol_bodyart/',
      image: '/assets/artist_pidol.jpg'
    },
    {
      id: 7,
      slug: 'karitorres',
      name: 'Kari Torres',
      role: 'Resident Fine Line Artist',
      specialties: 'Illustrative, Minimal Fine Line',
      studios: ['santacruz'],
      studioBadge: 'Santa Cruz Studio',
      bioEs: 'Estilo ilustrativo sutil, trazos minimalistas elegantes y alta precisión en el estudio urbano de Santa Cruz de Tenerife.',
      bioEn: 'Illustrative minimal fine line tattoos at our Santa Cruz flagship studio.',
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
      bioEs: 'Especialista en tatuaje tradicional japonés Irezumi, composiciones orientales clásicas y piezas personalizadas de gran impacto visual en Santa Cruz.',
      bioEn: 'Specialist in traditional Japanese Irezumi and oriental compositions in Santa Cruz.',
      igHandle: '@honnari_tattoo',
      igUrl: 'https://www.instagram.com/honnari_tattoo/',
      image: '/assets/artist_honnari.jpg'
    },
    {
      id: 9,
      slug: 'erios',
      name: 'EriOS Tattoo',
      role: 'Dark Realism & Black & Grey',
      specialties: 'Dark Realism, Black & Grey, Chicano',
      studios: ['santacruz'],
      studioBadge: 'Santa Cruz Studio',
      bioEs: 'Especialista en realismo en sombras, técnica Black & Grey y sombreados de alta profundidad en nuestro estudio de Santa Cruz.',
      bioEn: 'Specialist in dark realism, Black & Grey shading and high contrast tattoo work in Santa Cruz.',
      igHandle: '@eriostattoo',
      igUrl: 'https://www.instagram.com/eriostattoo/',
      image: '/assets/artist_erios.jpg'
    }
  ];

  const filtered = selectedStudio === 'all'
    ? artists
    : artists.filter(a => a.studios.includes(selectedStudio));

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
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { id: 'all', label: isEs ? 'Todos los Artistas' : 'All Artists' },
            { id: 'santacruz', label: 'Santa Cruz' },
            { id: 'tabaiba', label: 'Tabaiba Baja' },
            { id: 'tattootruck', label: 'TattooTruck' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedStudio(tab.id)}
              onMouseEnter={() => setCursorHover(true, 'FILTRAR')}
              onMouseLeave={() => setCursorHover(false)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                selectedStudio === tab.id
                  ? 'bg-[#ff5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.5)]'
                  : 'glass-panel text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ARTISTS EXPANDED CARDS GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence>
            {filtered.map(artist => (
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                      
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-black bg-[#ff5500] px-3 py-1 rounded-full font-mono">
                        {artist.studios.includes('tattootruck') ? <Truck className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        <span>{artist.studioBadge}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
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
                      {isEs ? artist.bioEs : artist.bioEn}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-3 font-light">
                      <strong className="text-white font-semibold">Especialidades:</strong> {artist.specialties}
                    </p>
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
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
