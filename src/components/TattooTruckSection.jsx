import React, { useRef, useState } from 'react';
import { Sparkles, Zap, ShieldCheck, ArrowRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComingSoon from './ui/ComingSoon';

export default function TattooTruckSection({ setCursorHover, language }) {
  const isEs = language === 'es';
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      id="tattootruck-section"
      className="relative py-20 sm:py-28 bg-[#08080c]/60 backdrop-blur-xs overflow-hidden border-t border-white/5"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff5500]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff5500]/20 via-[#ff5500]/10 to-transparent border border-[#ff5500]/60 shadow-[0_0_25px_rgba(255,85,0,0.35)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#ff5500] animate-pulse" />
            <span className="text-[#ff5500] text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
              🏆 {isEs ? 'LA #1 CARAVANA TATTOO MÓVIL DE CANARIAS' : '#1 MOBILE TATTOO STUDIO IN CANARY ISLANDS'}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-[1.05]">
            THE <span className="text-orange-gradient font-serif-title italic font-normal">TATTOO TRUCK</span>
          </h2>

          <p className="text-base sm:text-xl font-light text-slate-200 leading-relaxed max-w-3xl mx-auto">
            {isEs ? (
              <>
                El primer <span className="text-[#ff5500] font-bold">estudio-caravana de tatuajes de lujo sobre ruedas</span> de Canarias.
                Llevamos el arte exclusivo de Malibu Tattoo a tu <strong className="text-white font-semibold">boda</strong>, <strong className="text-white font-semibold">festival</strong> o <strong className="text-white font-semibold">evento VIP</strong> en cualquier rincón de Tenerife.
              </>
            ) : (
              <>
                The Canary Islands' premier <span className="text-[#ff5500] font-bold">luxury mobile tattoo caravan on wheels</span>.
                Bringing Malibu Tattoo's craftsmanship to your <strong className="text-white font-semibold">wedding</strong>, <strong className="text-white font-semibold">festival</strong>, or <strong className="text-white font-semibold">VIP event</strong> across Tenerife.
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff5500]" />
              {isEs ? '100% Autónoma & Sanitaria' : '100% Autonomous & Sanitary'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              {isEs ? 'Tatuajes In-Situ para Invitados' : 'On-Site Tattoos for Guests'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
              {isEs ? 'Bodas, Festivales & Fiestas VIP' : 'Weddings, Festivals & VIP Parties'}
            </span>
          </div>
        </div>

        {/* HERO CARAVAN VIDEO */}
        <div
          className="max-w-4xl mx-auto relative group rounded-3xl overflow-hidden border border-[#ff5500]/50 shadow-[0_0_50px_rgba(255,85,0,0.2)] text-left mb-12"
          onMouseEnter={() => setCursorHover?.(true, 'TATTOO TRUCK')}
          onMouseLeave={() => setCursorHover?.(false)}
        >
          <video
            ref={videoRef}
            src="/assets/video_truck.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[300px] sm:h-[460px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={togglePlay}
            className="absolute top-4 right-4 p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:border-[#ff5500] transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-[#ff5500] fill-current" />}
          </button>

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] bg-black/90 px-3 py-1 rounded-full border border-[#ff5500]/40 font-mono">
                MOBILE STUDIO EXPERIENCE
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading mt-2">MALIBU TATTOO TRUCK</h3>
            </div>

            <Link
              to="/tattootruck"
              onMouseEnter={() => setCursorHover?.(true, isEs ? 'VER TRUCK' : 'VIEW TRUCK')}
              onMouseLeave={() => setCursorHover?.(false)}
              className="px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-[0_0_20px_rgba(255,85,0,0.4)] flex items-center gap-2"
            >
              <span>{isEs ? 'Ver Página del Truck' : 'Visit Truck Page'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* DEFERRED: equipment, live route map, estimator & events */}
        <ComingSoon
          className="max-w-4xl mx-auto"
          title={isEs ? 'Ruta, equipo y presupuesto' : 'Route, amenities & estimator'}
          description={
            isEs
              ? 'Estamos afinando el mapa de ruta en vivo, el detalle del equipamiento y el configurador de alquiler del TattooTruck. Muy pronto disponible.'
              : "We're fine-tuning the live route map, the amenities breakdown and the TattooTruck rental estimator. Coming very soon."
          }
          cta={{ label: isEs ? 'Ver página del Truck' : 'Visit Truck page', to: '/tattootruck' }}
        />
      </div>
    </section>
  );
}
