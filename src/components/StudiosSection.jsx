import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Compass, Sparkles, Navigation, Waves, ExternalLink, UserCheck, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudiosSection({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const [selectedStudio, setSelectedStudio] = useState('santacruz');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const tabaibaArtists = [
    { name: 'Yenko Tattoo', slug: 'yenko', handle: '@yenko_freestyletatau', image: '/assets/artist_yenko.jpg' },
    { name: 'Iria Tattoo', slug: 'iria', handle: '@iria_tattoo', image: '/assets/artist_iria.jpg' },
    { name: 'Yax Tattoo', slug: 'yaxtattoo', handle: '@yaxtattoo', image: '/assets/artist_yax.jpg' },
    { name: 'Aurea Tattoo', slug: 'aurea', handle: '@aurea.tattoo_', image: '/assets/artist_aurea.jpg' }
  ];

  const santaCruzArtists = [
    { name: 'Aditii Tattoo', slug: 'aditii', handle: '@aditii_tattoo', image: '/assets/artist_aditii.jpg' },
    { name: 'Pidol BodyArt', slug: 'pidol', handle: '@pidol_bodyart', image: '/assets/artist_pidol.jpg' },
    { name: 'Kari Torres', slug: 'karitorres', handle: '@karitorres.tattoo', image: '/assets/artist_karitorres.jpg' },
    { name: 'Honnari Tattoo', slug: 'honnari', handle: '@honnari_tattoo', image: '/assets/artist_honnari.jpg' },
    { name: 'EriOS Tattoo', slug: 'erios', handle: '@eriostattoo', image: '/assets/artist_erios.jpg' }
  ];

  const studiosData = {
    santacruz: {
      id: 'santacruz',
      name: 'Santa Cruz Flagship Studio',
      tagline: isEs ? 'Estudio Principal & Vanguardia Urbana' : 'Flagship Urban Art Studio',
      address: 'Santa Cruz de Tenerife, España',
      hours: isEs ? 'Lunes a Sábado: 10:30 - 20:30' : 'Mon - Sat: 10:30 - 20:30',
      vibe: isEs ? 'Espacio metropolitano moderno de autor, boxes privados y área de esterilización de grado clínico.' : 'Modern metropolitan flagship studio with private boxes & clinical sterilization unit.',
      image: '/assets/santacruz.jpg',
      badge: 'SANTA CRUZ STUDIO',
      mapsUrl: 'https://maps.app.goo.gl/rnNCgbFJCrsvSHgn9',
      phone: '+34 922 00 11 22',
      primaryColor: '#ff5500',
      artists: santaCruzArtists,
      features: [
        isEs ? 'Especialistas en Microrealismo y Fine Line' : 'Fine Line & Microrealism Specialists',
        isEs ? 'Boxes privados insonorizados' : 'Soundproof private rooms',
        isEs ? 'Fácil acceso en tranvía y párking centro' : 'Tram access & downtown parking'
      ]
    },
    tabaiba: {
      id: 'tabaiba',
      name: 'Tabaiba Baja Oceanview',
      tagline: isEs ? 'Santuario Boutique Frente al Océano' : 'Coastal Oceanfront Sanctuary',
      address: 'Tabaiba Baja, El Rosario, Tenerife, España',
      hours: isEs ? 'Cita Previa & VIP Sessions: 11:00 - 19:00' : 'By Appointment Only: 11:00 - 19:00',
      vibe: isEs ? 'Estudio privado exclusivo frente al mar Atlántico. Brisa marina natural y máxima intimidad.' : 'Private oceanfront studio. Natural wave sounds, panoramic light, complete privacy.',
      image: '/assets/tabaiba.jpg',
      badge: 'TABAIBA OCEANVIEW',
      mapsUrl: 'https://maps.app.goo.gl/QMaM94qw9J5eddYC7',
      phone: '+34 922 00 33 44',
      primaryColor: '#00f0ff',
      artists: tabaibaArtists,
      features: [
        isEs ? 'Vistas panorámicas al mar Atlántico' : 'Panoramic ocean view & coastal breeze',
        isEs ? 'Privacidad absoluta para piezas de gran formato' : 'Total privacy for large sleeves & backpieces',
        isEs ? 'Aparcamiento reservado clientes VIP' : 'Reserved VIP parking spot'
      ]
    }
  };

  const keys = ['santacruz', 'tabaiba'];

  // Auto-slide carousel interval
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setSelectedStudio(prev => prev === 'santacruz' ? 'tabaiba' : 'santacruz');
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const switchStudio = (key) => {
    if (key === selectedStudio) return;
    setDirection(key === 'tabaiba' ? 1 : -1);
    setSelectedStudio(key);
  };

  const nextStudio = () => {
    setDirection(1);
    setSelectedStudio(prev => prev === 'santacruz' ? 'tabaiba' : 'santacruz');
  };

  const prevStudio = () => {
    setDirection(-1);
    setSelectedStudio(prev => prev === 'santacruz' ? 'tabaiba' : 'santacruz');
  };

  const activeStudio = studiosData[selectedStudio];

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 })
  };

  return (
    <section 
      id="studios-section" 
      className="py-24 bg-[#070709]/60 backdrop-blur-xs relative overflow-hidden border-t border-white/5"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-semibold uppercase tracking-widest font-mono">
            <Compass className="w-4 h-4 text-[#ff5500]" />
            <span>NUESTROS DOS ESTUDIOS EN TENERIFE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-heading leading-tight overflow-visible">
            SANTA CRUZ <span className="text-orange-gradient font-serif-title font-normal italic">&</span> TABAIBA
          </h2>
          <p className="text-slate-300 text-base font-light">
            {isEs ? 'Dos localizaciones físicas en Tenerife con personalidad y experiencia propia.' : 'Two physical flagship studios in Tenerife with distinct coastal and urban vibes.'}
          </p>
        </div>

        {/* STUDIO SELECTOR TABS + SLIDER CAROUSEL CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 max-w-4xl mx-auto">
          
          {/* Previous Studio Arrow Button */}
          <button
            onClick={prevStudio}
            onMouseEnter={() => setCursorHover(true, 'ANTERIOR')}
            onMouseLeave={() => setCursorHover(false)}
            className="p-3 rounded-full glass-panel border border-white/15 text-slate-300 hover:text-white hover:border-[#ff5500] hover:bg-[#ff5500]/10 transition-all cursor-pointer hidden sm:flex"
            title="Estudio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Interactive Selector Pills */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchStudio('santacruz')}
              onMouseEnter={() => setCursorHover(true, 'SANTA CRUZ')}
              onMouseLeave={() => setCursorHover(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedStudio === 'santacruz'
                  ? 'bg-[#ff5500] text-black shadow-[0_0_30px_rgba(255,85,0,0.5)]'
                  : 'glass-panel text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Santa Cruz de Tenerife</span>
            </button>

            <button
              onClick={() => switchStudio('tabaiba')}
              onMouseEnter={() => setCursorHover(true, 'TABAIBA')}
              onMouseLeave={() => setCursorHover(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedStudio === 'tabaiba'
                  ? 'bg-cyan-400 text-black shadow-[0_0_30px_rgba(0,240,255,0.4)]'
                  : 'glass-panel text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <Waves className="w-4 h-4" />
              <span>Tabaiba Baja (Costa)</span>
            </button>
          </div>

          {/* Next Studio Arrow Button */}
          <button
            onClick={nextStudio}
            onMouseEnter={() => setCursorHover(true, 'SIGUIENTE')}
            onMouseLeave={() => setCursorHover(false)}
            className="p-3 rounded-full glass-panel border border-white/15 text-slate-300 hover:text-white hover:border-[#ff5500] hover:bg-[#ff5500]/10 transition-all cursor-pointer hidden sm:flex"
            title="Siguiente estudio"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* ACTIVE STUDIO SLIDE CONTAINER */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selectedStudio}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-3xl p-6 sm:p-10 border text-left space-y-10 shadow-2xl relative overflow-hidden"
            style={{
              borderColor: activeStudio.primaryColor
            }}
          >
            
            {/* TOP MAIN CONTENT GRID (IMAGE + DETAILS) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Studio Main Photo Visual */}
              <Link
                to="/estudios"
                onMouseEnter={() => setCursorHover(true, 'EXPLORAR ESTUDIO')}
                onMouseLeave={() => setCursorHover(false)}
                className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-white/15 cursor-none block"
              >
                <img
                  src={activeStudio.image}
                  alt={activeStudio.name}
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                {/* Studio Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full text-black font-mono shadow-md" style={{ backgroundColor: activeStudio.primaryColor }}>
                    {activeStudio.badge}
                  </span>
                </div>
              </Link>

              {/* Studio Info & Details */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading">
                    {activeStudio.name}
                  </h3>
                  <p className="text-sm font-semibold mt-1" style={{ color: activeStudio.primaryColor }}>
                    {activeStudio.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {activeStudio.vibe}
                </p>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: activeStudio.primaryColor }} />
                    <span>{activeStudio.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <Clock className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>{activeStudio.hours}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-2">
                  {activeStudio.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: activeStudio.primaryColor }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onOpenBooking(selectedStudio)}
                    onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
                    onMouseLeave={() => setCursorHover(false)}
                    className="px-6 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-black transition-all cursor-pointer shadow-lg"
                    style={{ backgroundColor: activeStudio.primaryColor }}
                  >
                    {isEs ? `Pedir Cita en ${selectedStudio === 'santacruz' ? 'Santa Cruz' : 'Tabaiba'}` : 'Book This Location'}
                  </button>

                  <a
                    href={activeStudio.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorHover(true, 'MAPS')}
                    onMouseLeave={() => setCursorHover(false)}
                    className="px-5 py-3.5 rounded-full glass-panel border border-white/20 text-xs font-bold uppercase text-slate-300 hover:text-white hover:border-white transition-all flex items-center gap-2"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* BOTTOM CAROUSEL PROGRESS INDICATORS */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {keys.map((key) => (
            <button
              key={key}
              onClick={() => switchStudio(key)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                selectedStudio === key
                  ? 'w-10 bg-[#ff5500] shadow-[0_0_12px_#ff5500]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={key === 'santacruz' ? 'Santa Cruz' : 'Tabaiba Baja'}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
