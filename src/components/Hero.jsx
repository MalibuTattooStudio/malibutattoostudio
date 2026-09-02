import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, ChevronDown } from 'lucide-react';

export default function Hero({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ff5500]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 text-center">
        
        {/* BRAND TAGLINE BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-zinc-400 font-mono">
            Tenerife · Santa Cruz · Tabaiba · Mobile Studio
          </span>
        </motion.div>

        {/* HERO TITLE & OFFICIAL EMBLEM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 mb-10"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-extrabold uppercase tracking-tight text-white font-heading leading-[0.95] max-w-full px-2 overflow-visible">
            MALIBU
            <br />
            <span className="text-orange-gradient font-serif-title italic font-normal tracking-tight">
              Tattoo Studio
            </span>
          </h1>

          {/* SPECTACULAR EMBLEM SEAL INTEGRATION */}
          <div className="relative inline-flex items-center justify-center my-4">
            {/* Outer rotating neon dash ring */}
            <svg className="absolute w-32 h-32 sm:w-36 sm:h-36 animate-spin pointer-events-none" style={{ animationDuration: '24s' }} viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#ff5500"
                strokeWidth="1.2"
                strokeDasharray="6 8"
                opacity="0.6"
              />
            </svg>

            {/* Glowing background halo */}
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 bg-[#ff5500]/25 rounded-full blur-xl pointer-events-none animate-pulse-orange" />

            {/* Emblem Seal Card */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onMouseEnter={() => setCursorHover(true, 'EMBLEMA')}
              onMouseLeave={() => setCursorHover(false)}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#ff5500] p-1 bg-black/90 shadow-[0_0_30px_rgba(255,85,0,0.5)] cursor-none group overflow-hidden"
            >
              <img
                src="/assets/logo.jpg"
                alt="Malibu Tattoo Studio Official Seal"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
          
          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-400 font-light leading-relaxed pt-1">
            {isEs ? (
              <>
                Dos estudios de autor en <span className="text-white font-medium">Santa Cruz</span> y{' '}
                <span className="text-white font-medium">Tabaiba Baja</span>, más el innovador{' '}
                <span className="text-[#ff5500] font-semibold">TattooTruck</span> — nuestra caravana móvil de lujo para eventos en toda la isla.
              </>
            ) : (
              <>
                Flagship studios in <span className="text-white font-medium">Santa Cruz</span> &{' '}
                <span className="text-white font-medium">Tabaiba Baja</span>, plus the bespoke{' '}
                <span className="text-[#ff5500] font-semibold">TattooTruck</span> mobile studio across Tenerife.
              </>
            )}
          </p>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {/* Primary CTA */}
          <button
            onClick={() => onOpenBooking('studio')}
            onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
            onMouseLeave={() => setCursorHover(false)}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-black bg-[#ff5500] hover:bg-[#ff7700] transition-all duration-300 cta-glow flex items-center justify-center gap-2.5 group"
          >
            <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{isEs ? 'Pedir Cita en Estudio' : 'Book Studio Appointment'}</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => document.getElementById('tattootruck-section')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCursorHover(true, 'TRUCK')}
            onMouseLeave={() => setCursorHover(false)}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white border border-white/[0.1] bg-white/[0.02] hover:border-[#ff5500]/40 hover:bg-[#ff5500]/[0.06] transition-all duration-300 flex items-center justify-center gap-2.5 group"
          >
            <Truck className="w-4 h-4 text-[#ff5500] group-hover:rotate-6 transition-transform" />
            <span>{isEs ? 'Descubrir TattooTruck' : 'Explore TattooTruck'}</span>
          </button>
        </motion.div>

        {/* THREE LOCATION PILLARS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
        >
          {/* Santa Cruz */}
          <div 
            onClick={() => document.getElementById('studios-section')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCursorHover(true, 'VER')}
            onMouseLeave={() => setCursorHover(false)}
            className="glass-card p-5 text-left cursor-none group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#ff5500] font-mono">
                01
              </span>
              <MapPin className="w-4 h-4 text-zinc-600 group-hover:text-[#ff5500] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#ff5500] transition-colors font-heading tracking-wide">
              Santa Cruz
            </h3>
            <p className="text-[0.7rem] text-zinc-500 mt-1.5 font-light leading-relaxed">
              {isEs ? 'Estudio urbano en la capital. Ambiente creativo de autor y boxes privados.' : 'Urban flagship in the capital. Creative vibe & private rooms.'}
            </p>
          </div>

          {/* Tabaiba */}
          <div 
            onClick={() => document.getElementById('studios-section')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCursorHover(true, 'VER')}
            onMouseLeave={() => setCursorHover(false)}
            className="glass-card p-5 text-left cursor-none group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-cyan-500 font-mono">
                02
              </span>
              <MapPin className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-heading tracking-wide">
              Tabaiba Baja
            </h3>
            <p className="text-[0.7rem] text-zinc-500 mt-1.5 font-light leading-relaxed">
              {isEs ? 'Santuario costero boutique con vistas al Atlántico. Calma e intimidad.' : 'Oceanfront boutique sanctuary. Calming coastal privacy.'}
            </p>
          </div>

          {/* TattooTruck */}
          <div 
            onClick={() => document.getElementById('tattootruck-section')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCursorHover(true, 'EVENTOS')}
            onMouseLeave={() => setCursorHover(false)}
            className="glass-card p-5 text-left cursor-none group border-[#ff5500]/20 hover:border-[#ff5500]/50"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-black bg-[#ff5500] px-2 py-0.5 font-mono">
                MÓVIL
              </span>
              <Truck className="w-4 h-4 text-[#ff5500]" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#ff5500] transition-colors font-heading tracking-wide">
              TattooTruck
            </h3>
            <p className="text-[0.7rem] text-zinc-500 mt-1.5 font-light leading-relaxed">
              {isEs ? 'Caravana de lujo para bodas, festivales y eventos privados en toda la isla.' : 'Luxury mobile caravan for weddings, festivals & events.'}
            </p>
          </div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-20 inline-flex flex-col items-center gap-2 text-zinc-600 text-[0.65rem] tracking-[0.25em] uppercase font-mono"
        >
          <span>{isEs ? 'Descubre más' : 'Scroll'}</span>
          <ChevronDown className="w-4 h-4 text-[#ff5500]/60" />
        </motion.div>

      </div>
    </section>
  );
}
