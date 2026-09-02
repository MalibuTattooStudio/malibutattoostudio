import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, ExternalLink, CheckCircle2, Sparkles, Layers, Camera, UserCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudiosPage({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'santacruz', 'tabaiba'

  // Exact real artists list as specified by user with profile slugs
  const tabaibaArtists = [
    { name: 'Yenko Tattoo', slug: 'yenko', handle: '@yenko_freestyletatau', url: 'https://www.instagram.com/yenko_freestyletatau/', image: '/assets/artist_yenko.jpg', initial: 'Y' },
    { name: 'Iria Tattoo', slug: 'iria', handle: '@iria_tattoo', url: 'https://www.instagram.com/iria_tattoo/', image: '/assets/artist_iria.jpg', initial: 'I' },
    { name: 'Yax Tattoo', slug: 'yaxtattoo', handle: '@yaxtattoo', url: 'https://www.instagram.com/yaxtattoo/', image: '/assets/artist_yax.jpg', initial: 'Y' },
    { name: 'Aurea Tattoo', slug: 'aurea', handle: '@aurea.tattoo_', url: 'https://www.instagram.com/aurea.tattoo_/', image: '/assets/artist_aurea.jpg', initial: 'A' }
  ];

  const santaCruzArtists = [
    { name: 'Aditii Tattoo', slug: 'aditii', handle: '@aditii_tattoo', url: 'https://www.instagram.com/aditii_tattoo/', image: '/assets/artist_aditii.jpg', initial: 'A' },
    { name: 'Pidol BodyArt', slug: 'pidol', handle: '@pidol_bodyart', url: 'https://www.instagram.com/pidol_bodyart/', image: '/assets/artist_pidol.jpg', initial: 'P' },
    { name: 'Kari Torres', slug: 'karitorres', handle: '@karitorres.tattoo', url: 'https://www.instagram.com/karitorres.tattoo/', image: '/assets/artist_karitorres.jpg', initial: 'K' },
    { name: 'Honnari Tattoo', slug: 'honnari', handle: '@honnari_tattoo', url: 'https://www.instagram.com/honnari_tattoo/', image: '/assets/artist_honnari.jpg', initial: 'H' },
    { name: 'EriOS Tattoo', slug: 'erios', handle: '@eriostattoo', url: 'https://www.instagram.com/eriostattoo/', image: '/assets/artist_erios.jpg', initial: 'E' }
  ];

  const studiosData = [
    {
      id: 'santacruz',
      name: 'Santa Cruz Flagship Studio',
      subtitle: isEs ? 'Estudio Urbano en la Capital' : 'Capital Urban Flagship',
      city: 'Santa Cruz de Tenerife',
      mapsUrl: 'https://maps.app.goo.gl/rnNCgbFJCrsvSHgn9',
      image: '/assets/santacruz.jpg',
      artists: santaCruzArtists,
      primaryColor: '#ff5500',
      badgeText: isEs ? 'SANTA CRUZ DE TENERIFE' : 'SANTA CRUZ FLAGSHIP',
      description: isEs 
        ? 'Nuestro estudio principal en el corazón de Santa Cruz de Tenerife. Un espacio diáfano abovedado con vigas de madera noble, mostrador retroiluminado con el emblema Malibu Tattoo y boxes de trabajo cerrados de máxima privacidad.'
        : 'Our flagship studio in central Santa Cruz de Tenerife. A spacious vaulted venue featuring timber beams, custom backlit reception counter and private tattoo suites.',
      features: [
        isEs ? 'Boxes privados climatizados e insonorizados' : 'Climate controlled private booths',
        isEs ? 'Estación de esterilización autoclave hospitalaria' : 'Clinical autoclave sterilization station',
        isEs ? 'Música ambient personalizada por box' : 'Individual sound systems per suite',
        isEs ? 'Zona Lounge de espera VIP con café gourmet' : 'VIP waiting lounge with artisanal coffee',
        isEs ? 'Conexión Wi-Fi de alta velocidad para clientes' : 'High speed Wi-Fi for clients'
      ]
    },
    {
      id: 'tabaiba',
      name: 'Tabaiba Baja Oceanfront Sanctuary',
      subtitle: isEs ? 'Santuario Boutique Vista al Atlántico' : 'Oceanfront Boutique Sanctuary',
      city: 'Tabaiba Baja, El Rosario',
      mapsUrl: 'https://maps.app.goo.gl/QMaM94qw9J5eddYC7',
      image: '/assets/tabaiba.jpg',
      artists: tabaibaArtists,
      primaryColor: '#00f0ff',
      badgeText: isEs ? 'TABAIBA BAJA (COSTA)' : 'TABAIBA BOUTIQUE',
      description: isEs
        ? 'Un refugio boutique frente al mar en la costa de Tabaiba Baja. Ambiente intimista de paredes de ladrillo visto, una moto custom sobre la tarima de exposición y grandes ventanales con luz natural del Atlántico.'
        : 'An oceanfront boutique sanctuary on the Tabaiba coast. Exposed brick styling, custom motorcycle display loft and natural Atlantic daylight.',
      features: [
        isEs ? 'Vistas panorámicas al océano Atlántico' : 'Panoramic Atlantic ocean views',
        isEs ? 'Ambiente costero de calma y máxima privacidad' : 'Calming oceanfront privacy',
        isEs ? 'Decoración industrial noble con ladrillo visto y moto custom' : 'Exposed brick industrial design',
        isEs ? 'Equipamiento ergonómico de alta gama' : 'Premium ergonomic tattoo furniture',
        isEs ? 'Aparcamiento gratuito para clientes' : 'Dedicated client parking'
      ]
    }
  ];

  const visibleStudios = filterMode === 'all' 
    ? studiosData 
    : studiosData.filter(s => s.id === filterMode);

  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#ff5500]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] text-xs font-extrabold uppercase tracking-widest font-mono">
            <Compass className="w-4 h-4" />
            <span>NUESTROS DOS ESPACIOS EN TENERIFE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-tight overflow-visible">
            NUESTROS <span className="text-orange-gradient font-serif-title italic font-normal">ESTUDIOS</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {isEs ? 'Dos localizaciones físicas exclusivas en Tenerife, cada una con su ambiente y su equipo de artistas residentes.' : 'Two physical flagship studios in Tenerife, each with its own vibe and resident artists.'}
          </p>
        </div>

        {/* INTERACTIVE MODE SWITCHER */}
        <div className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none mb-16">
          <div className="flex items-center gap-3 w-max sm:w-auto sm:flex-wrap sm:justify-center">
          <button
            onClick={() => setFilterMode('all')}
            onMouseEnter={() => setCursorHover(true, 'AMBOS')}
            onMouseLeave={() => setCursorHover(false)}
            className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              filterMode === 'all'
                ? 'bg-[#ff5500] text-black shadow-[0_0_25px_rgba(255,85,0,0.5)]'
                : 'glass-panel text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isEs ? 'Ver Ambos Estudios' : 'Both Studios'}</span>
          </button>

          <button
            onClick={() => setFilterMode('santacruz')}
            onMouseEnter={() => setCursorHover(true, 'SANTA CRUZ')}
            onMouseLeave={() => setCursorHover(false)}
            className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              filterMode === 'santacruz'
                ? 'bg-[#ff5500] text-black shadow-[0_0_25px_rgba(255,85,0,0.5)]'
                : 'glass-panel text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#ff5500]" />
            <span>Santa Cruz (Capital)</span>
          </button>

          <button
            onClick={() => setFilterMode('tabaiba')}
            onMouseEnter={() => setCursorHover(true, 'TABAIBA')}
            onMouseLeave={() => setCursorHover(false)}
            className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              filterMode === 'tabaiba'
                ? 'bg-[#00f0ff] text-black shadow-[0_0_25px_rgba(0,240,255,0.5)]'
                : 'glass-panel text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#00f0ff]" />
            <span>Tabaiba Baja (Costa)</span>
          </button>
          </div>
        </div>

        {/* STUDIOS CARDS WITH PROMINENT CIRCULAR ARTIST AVATAR SLOTS ROW */}
        <motion.div layout className="space-y-16">
          <AnimatePresence mode="popLayout">
            {visibleStudios.map((studio, index) => {
              const isExpanded = filterMode === studio.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={studio.id}
                  className={`glass-panel p-6 sm:p-10 rounded-3xl border text-left relative overflow-hidden transition-all duration-500 space-y-10 ${
                    isExpanded ? 'ring-2 shadow-[0_0_40px_rgba(255,85,0,0.2)]' : 'hover:border-white/20'
                  }`}
                  style={{
                    borderColor: isExpanded ? studio.primaryColor : 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* TOP MAIN CONTENT GRID (IMAGE + DETAILS) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Studio Main Photo */}
                    <div className={`lg:col-span-7 relative group rounded-2xl overflow-hidden border border-white/15 h-[360px] sm:h-[460px] ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}>
                      <img
                        src={studio.image}
                        alt={studio.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                      
                      {/* Top Studio Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full text-black font-mono shadow-md" style={{ backgroundColor: studio.primaryColor }}>
                          {studio.badgeText}
                        </span>
                      </div>

                      {/* Bottom Title */}
                      <div className="absolute bottom-6 left-6 right-6 z-10">
                        <span className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" style={{ color: studio.primaryColor }} />
                          <span>{studio.city}</span>
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
                          {studio.name}
                        </h3>
                      </div>
                    </div>

                    {/* Studio Information & Features */}
                    <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4" style={{ color: studio.primaryColor }} />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                            {studio.subtitle}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 font-light leading-relaxed">
                          {studio.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-1">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                          <Sparkles className="w-4 h-4" style={{ color: studio.primaryColor }} />
                          <span>{isEs ? 'Instalaciones y Equipamiento' : 'Studio Amenities'}</span>
                        </h4>
                        {studio.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: studio.primaryColor }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Maps & Booking Actions */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 border-t border-white/10">
                        <a
                          href={studio.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorHover(true, 'MAPS')}
                          onMouseLeave={() => setCursorHover(false)}
                          className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:border-white text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all"
                        >
                          <MapPin className="w-4 h-4" style={{ color: studio.primaryColor }} />
                          <span>Google Maps</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => onOpenBooking(studio.id)}
                          onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
                          onMouseLeave={() => setCursorHover(false)}
                          className="w-full sm:w-auto px-6 py-3 rounded-full text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg"
                          style={{ backgroundColor: studio.primaryColor }}
                        >
                          {isEs ? 'Pedir Cita en este Estudio' : 'Book Studio Appointment'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* EXTRAORDINARY CIRCULAR ARTIST AVATARS ROUTING TO /artista/:slug */}
                  <div className="pt-6 border-t border-white/10 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-white font-mono flex items-center gap-2">
                        <UserCheck className="w-4 h-4 shrink-0" style={{ color: studio.primaryColor }} />
                        <span>{isEs ? 'Tatuadores residentes' : 'Resident artists'}</span>
                      </h4>
                      <span className="text-xs font-mono text-slate-400 pl-6 sm:pl-0">
                        {studio.artists.length} {isEs ? 'residentes' : 'artists'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-start sm:justify-between gap-6 sm:gap-8 pt-2">
                      {studio.artists.map((artist, aIdx) => (
                        <Link
                          key={aIdx}
                          to={`/artista/${artist.slug}`}
                          onMouseEnter={() => setCursorHover(true, 'VER FICHA', artist)}
                          onMouseLeave={() => setCursorHover(false)}
                          className="group flex flex-col items-center text-center space-y-2.5 cursor-none relative"
                        >
                          {/* EXTRAORDINARY CIRCLE AVATAR CONTAINER */}
                          <motion.div 
                            whileHover={{ scale: 1.15, rotate: 2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
                          >
                            {/* Outer Spinning Dash Ring */}
                            <svg className="absolute inset-0 w-full h-full animate-spin pointer-events-none" style={{ animationDuration: '18s' }} viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="46"
                                fill="none"
                                stroke={studio.primaryColor}
                                strokeWidth="2"
                                strokeDasharray="8 6"
                                opacity="0.75"
                              />
                            </svg>

                            {/* Backlight Neon Glow Halo */}
                            <div 
                              className="absolute inset-1 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{ backgroundColor: studio.primaryColor }}
                            />

                            {/* Inner Circle Frame */}
                            <div 
                              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 p-0.5 bg-black/90 shadow-xl overflow-hidden group-hover:border-pink-500 transition-colors"
                              style={{ borderColor: studio.primaryColor }}
                            >
                              {artist.image ? (
                                <img
                                  src={artist.image}
                                  alt={artist.name}
                                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center flex-col text-zinc-400 group-hover:text-white transition-colors">
                                  <Camera className="w-5 h-5 text-pink-400 mb-0.5 group-hover:scale-110 transition-transform" />
                                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">
                                    {artist.initial}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Live Online Badge Dot */}
                            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black animate-pulse z-20" />
                          </motion.div>

                          {/* Artist Name & Handle */}
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-extrabold text-white group-hover:text-[#ff5500] transition-colors leading-tight">
                              {artist.name}
                            </span>
                            <span className="text-[10px] text-pink-400 font-mono leading-tight mt-0.5">
                              {artist.handle}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
