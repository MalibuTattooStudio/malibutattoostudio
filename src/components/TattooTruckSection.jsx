import React, { useRef, useState } from 'react';
import { Truck, Sparkles, Zap, ShieldCheck, Music, ArrowRight, Play, Pause, Calendar, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import TattooTruckMap from './TattooTruckMap';

export default function TattooTruckSection({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="tattootruck-section" className="relative py-24 bg-[#08080c]/60 backdrop-blur-xs overflow-hidden border-t border-white/5">
      
      {/* Background Glow in Malibu Neon Orange */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff5500]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          
          {/* BADGE: #1 MOBILE TATTOO CARAVAN */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff5500]/20 via-[#ff5500]/10 to-transparent border border-[#ff5500]/60 shadow-[0_0_25px_rgba(255,85,0,0.35)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#ff5500] animate-pulse" />
            <span className="text-[#ff5500] text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
              🏆 {isEs ? 'LA #1 CARAVANA TATTOO MÓVIL DE CANARIAS' : '#1 MOBILE TATTOO STUDIO IN CANARY ISLANDS'}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-none overflow-visible">
            THE <span className="text-orange-gradient font-serif-title italic font-normal">TATTOO TRUCK</span>
          </h2>

          <p className="text-base sm:text-xl font-light text-slate-200 leading-relaxed max-w-3xl mx-auto">
            {isEs ? (
              <>
                El primer <span className="text-[#ff5500] font-bold">estudio-caravana de tatuajes de lujo sobre ruedas</span> de Canarias.
                Llevamos la experiencia y el arte exclusivo de Malibu Tattoo directamente a tu <strong className="text-white font-semibold">boda</strong>, <strong className="text-white font-semibold">festival</strong> o <strong className="text-white font-semibold">evento VIP</strong> en cualquier rincón de Tenerife.
              </>
            ) : (
              <>
                The Canary Islands' premier <span className="text-[#ff5500] font-bold">luxury mobile tattoo caravan on wheels</span>.
                Bringing Malibu Tattoo's exclusive craftsmanship directly to your <strong className="text-white font-semibold">wedding</strong>, <strong className="text-white font-semibold">festival</strong>, or <strong className="text-white font-semibold">VIP event</strong> anywhere across Tenerife.
              </>
            )}
          </p>

          {/* HIGHLIGHT BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#ff5500]" />
              {isEs ? '100% Autónoma & Sanitaria' : '100% Autonomous & Sanitary'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2 shadow-sm">
              <Zap className="w-4 h-4 text-cyan-400" />
              {isEs ? 'Tatuajes In-Situ para Invitados' : 'On-Site Tattoos for Guests'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
              {isEs ? 'Bodas, Festivales & Fiestas VIP' : 'Weddings, Festivals & VIP Parties'}
            </span>
          </div>
        </div>

        {/* HERO CARAVAN VIDEO SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Video Player */}
          <div 
            className="lg:col-span-7 relative group rounded-3xl overflow-hidden border border-[#ff5500]/50 shadow-[0_0_50px_rgba(255,85,0,0.2)] text-left"
            onMouseEnter={() => setCursorHover(true, 'TATTOO TRUCK')}
            onMouseLeave={() => setCursorHover(false)}
          >
            <video 
              ref={videoRef}
              src="/assets/video_truck.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[400px] sm:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute top-4 right-4">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:border-[#ff5500] transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-[#ff5500] fill-current" />}
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] bg-black/90 px-3 py-1 rounded-full border border-[#ff5500]/40 font-mono">
                  MOBILE STUDIO EXPERIENCE
                </span>
                <h3 className="text-2xl font-extrabold text-white font-heading mt-2">
                  MALIBU TATTOO TRUCK
                </h3>
              </div>

              <Link
                to="/tattootruck"
                className="px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-[0_0_20px_rgba(255,85,0,0.4)] flex items-center gap-2"
              >
                <span>{isEs ? 'Ver Página del Truck' : 'Visit Truck Page'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-2xl font-bold uppercase text-white font-heading flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#ff5500]" />
              <span>{isEs ? 'Equipamiento de Autor' : 'Bespoke Amenities'}</span>
            </h3>

            <div className="space-y-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-heading">{isEs ? 'Autonomía Energética 100%' : 'Autonomous Power'}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    {isEs ? 'Baterías de litio silenciosas de alta potencia. Tatuamos en cualquier enclave natural o privado.' : 'Quiet lithium power station. Tattoos anywhere.'}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-heading">{isEs ? 'Higiene Quirúrgica Acreditada' : 'Sanitation & Sterilization'}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    {isEs ? 'Estación sanitaria autoclave, iluminación médica LED y cumplimiento de normativa autonómica.' : 'Hospital grade autoclaves, surgical LED.'}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-heading">{isEs ? 'Climatización & Lounge VIP' : 'Climate Control & Lounge'}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    {isEs ? 'Climatización centralizada, mobiliario ergonómico noble y ambiente sonoro envolvente.' : 'Central AC, custom leather chairs.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/tattootruck"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-black font-extrabold text-xs uppercase tracking-widest text-center shadow-[0_0_25px_rgba(255,85,0,0.5)] flex items-center justify-center gap-2"
              >
                <span>{isEs ? 'Página Oficial TattooTruck & Presupuestador' : 'Dedicated TattooTruck Page & Estimator'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

        {/* INTERACTIVE TENERIFE ROUTE MAP */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] text-xs font-extrabold uppercase tracking-widest font-mono">
              <Calendar className="w-4 h-4" />
              <span>{isEs ? 'MAPA DE RUTA EN VIVO' : 'LIVE ROUTE MAP'}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
              {isEs ? '¿DÓNDE ESTARÁ LA ' : 'WHERE WILL THE '}
              <span className="text-orange-gradient font-serif-title italic font-normal">TATTOO TRUCK</span>
              {isEs ? '?' : ' BE?'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto">
              {isEs
                ? 'Explora el mapa interactivo con las próximas paradas, festivales y eventos privados del TattooTruck por toda Tenerife.'
                : 'Explore the interactive map with upcoming stops, festivals and private events across Tenerife.'}
            </p>
          </div>

          <TattooTruckMap language={language} setCursorHover={setCursorHover} />

          <div className="text-center pt-4">
            <Link
              to="/tattootruck"
              onMouseEnter={() => setCursorHover(true, 'VER EVENTOS')}
              onMouseLeave={() => setCursorHover(false)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff5500] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#ff7700] hover:scale-105 transition-all shadow-[0_0_35px_rgba(255,85,0,0.6)]"
            >
              <Ticket className="w-5 h-5 fill-current" />
              <span>{isEs ? 'VER PRÓXIMOS EVENTOS COMPLETOS & RUTA' : 'VIEW FULL UPCOMING EVENTS & TOUR DATES'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
