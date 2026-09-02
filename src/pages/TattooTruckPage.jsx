import React, { useState, useRef } from 'react';
import { Truck, Zap, ShieldCheck, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import ComingSoon from '../components/ui/ComingSoon';

export default function TattooTruckPage({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff5500]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* HERO TITLE HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff5500]/20 via-[#ff5500]/10 to-transparent border border-[#ff5500]/60 shadow-[0_0_25px_rgba(255,85,0,0.35)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#ff5500] animate-pulse" />
            <span className="text-[#ff5500] text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
              🏆 {isEs ? 'LA #1 CARAVANA TATTOO MÓVIL DE CANARIAS' : '#1 MOBILE TATTOO STUDIO IN CANARY ISLANDS'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-[1.05]">
            THE <span className="text-orange-gradient font-serif-title italic font-normal">TATTOO TRUCK</span>
          </h1>

          <p className="text-base sm:text-xl font-light text-slate-200 leading-relaxed max-w-3xl mx-auto">
            {isEs ? (
              <>
                El primer <span className="text-[#ff5500] font-bold">estudio-caravana de tatuajes de lujo sobre ruedas</span> de Canarias.
                Llevamos el arte exclusivo de Malibu Tattoo a tu <strong className="text-white font-semibold">boda</strong>, <strong className="text-white font-semibold">festival</strong> o <strong className="text-white font-semibold">evento VIP</strong> en cualquier punto de Tenerife.
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
              <Zap className="w-4 h-4 text-[#ff5500]" />
              {isEs ? '100% Autónoma & Sanitaria' : '100% Autonomous & Sanitary'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              {isEs ? 'Tatuajes In-Situ para Invitados' : 'On-Site Tattoos for Guests'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#ff5500]" />
              {isEs ? 'Bodas, Festivales & Fiestas VIP' : 'Weddings, Festivals & VIP Parties'}
            </span>
          </div>
        </div>

        {/* CINEMATIC VIDEO PLAYER */}
        <div className="relative rounded-3xl overflow-hidden border border-[#ff5500]/40 shadow-[0_0_50px_rgba(255,85,0,0.25)] mb-14 group">
          <video
            ref={videoRef}
            src="/assets/video_truck.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-[320px] sm:h-[520px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                onMouseEnter={() => setCursorHover?.(true, isPlaying ? 'PAUSA' : 'PLAY')}
                onMouseLeave={() => setCursorHover?.(false)}
                className="p-3 rounded-full bg-[#ff5500] text-black hover:bg-[#ff7700] transition-colors shadow-lg cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                onMouseEnter={() => setCursorHover?.(true, isMuted ? 'SONIDO' : 'MUTED')}
                onMouseLeave={() => setCursorHover?.(false)}
                className="p-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:border-[#ff5500] transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-[#ff5500]" />}
              </button>

              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hidden sm:inline-block">
                LIVE EXPERIENCE • MALIBU TATTOO TRUCK
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenBooking?.('truck')}
              onMouseEnter={() => setCursorHover?.(true, 'RESERVAR')}
              onMouseLeave={() => setCursorHover?.(false)}
              className="px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-[0_0_25px_rgba(255,85,0,0.5)] cursor-pointer"
            >
              {isEs ? 'Reservar Fecha' : 'Book Truck Date'}
            </button>
          </div>
        </div>

        {/* DEFERRED: blueprint, specs grid, events roadmap & rental estimator */}
        <ComingSoon
          title={isEs ? 'Presupuesto, ruta y equipo' : 'Estimator, route & amenities'}
          description={
            isEs
              ? 'Estamos afinando el configurador de alquiler del TattooTruck, el mapa de ruta en vivo y el calendario de eventos. Mientras tanto, escríbenos y te contamos disponibilidad y presupuesto para tu fecha.'
              : "We're fine-tuning the TattooTruck rental configurator, the live route map and the events calendar. In the meantime, message us for availability and a quote for your date."
          }
          cta={{ label: isEs ? 'Reservar fecha' : 'Book a date', onClick: () => onOpenBooking?.('truck') }}
        />
      </div>
    </div>
  );
}
