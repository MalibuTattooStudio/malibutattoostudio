import React, { useState, useRef } from 'react';
import { Truck, Zap, ShieldCheck, Music, CheckCircle2, ArrowRight, Sliders, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import TattooTruckBlueprint from '../components/TattooTruckBlueprint';
import UpcomingEventsSection from '../components/UpcomingEventsSection';

export default function TattooTruckPage({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Estimator state
  const [eventType, setEventType] = useState('boda');
  const [hours, setHours] = useState(4);
  const [locationZone, setLocationZone] = useState('santacruz');
  const [includeLounge, setIncludeLounge] = useState(true);

  const calculatePrice = () => {
    let base = 450;
    if (eventType === 'boda') base += 200;
    if (eventType === 'festival') base += 350;
    if (eventType === 'marca') base += 250;
    
    let hourlyRate = 120 * hours;
    let zoneTransport = locationZone === 'sur' ? 80 : locationZone === 'norte' ? 60 : 30;
    let loungeCost = includeLounge ? 100 : 0;

    return base + hourlyRate + zoneTransport + loungeCost;
  };

  const handleWhatsAppQuote = () => {
    const total = calculatePrice();
    const eventName = eventType === 'boda' ? 'Boda / Wedding' : eventType === 'festival' ? 'Festival' : eventType === 'marca' ? 'Evento de Marca' : 'Fiesta Privada';
    const text = `Hola Malibu Tattoo! Deseo alquilar el TattooTruck para un evento (${eventName}) en Tenerife.\n\nDuración: ${hours} horas\nZona: ${locationZone.toUpperCase()}\nEstimación Online: ~${total}€.\n\n¿Podemos confirmar disponibilidad?`;
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(text)}`, '_blank');
  };

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff5500]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* HERO TITLE HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
          
          {/* BADGE: #1 MOBILE TATTOO CARAVAN */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff5500]/20 via-[#ff5500]/10 to-transparent border border-[#ff5500]/60 shadow-[0_0_25px_rgba(255,85,0,0.35)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#ff5500] animate-pulse" />
            <span className="text-[#ff5500] text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
              🏆 {isEs ? 'LA #1 CARAVANA TATTOO MÓVIL DE CANARIAS' : '#1 MOBILE TATTOO STUDIO IN CANARY ISLANDS'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-none overflow-visible">
            THE <span className="text-orange-gradient font-serif-title italic font-normal">TATTOO TRUCK</span>
          </h1>

          <p className="text-base sm:text-xl font-light text-slate-200 leading-relaxed max-w-3xl mx-auto">
            {isEs ? (
              <>
                El primer <span className="text-[#ff5500] font-bold">estudio-caravana de tatuajes de lujo sobre ruedas</span> de Canarias.
                Llevamos la experiencia y el arte exclusivo de Malibu Tattoo directamente a tu <strong className="text-white font-semibold">boda</strong>, <strong className="text-white font-semibold">festival</strong> o <strong className="text-white font-semibold">evento VIP</strong> en cualquier punto de Tenerife.
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
              <Zap className="w-4 h-4 text-[#ff5500]" />
              {isEs ? '100% Autónoma & Sanitaria' : '100% Autonomous & Sanitary'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              {isEs ? 'Tatuajes In-Situ para Invitados' : 'On-Site Tattoos for Guests'}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-mono flex items-center gap-2 shadow-sm">
              <Truck className="w-4 h-4 text-[#ff5500]" />
              {isEs ? 'Bodas, Festivales & Fiestas VIP' : 'Weddings, Festivals & VIP Parties'}
            </span>
          </div>
        </div>

        {/* CINEMATIC VIDEO PLAYER SHOWCASE */}
        <div className="relative rounded-3xl overflow-hidden border border-[#ff5500]/40 shadow-[0_0_50px_rgba(255,85,0,0.25)] mb-20 group">
          <video
            ref={videoRef}
            src="/assets/video_truck.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-[400px] sm:h-[550px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Video Control Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                onMouseEnter={() => setCursorHover(true, isPlaying ? 'PAUSA' : 'PLAY')}
                onMouseLeave={() => setCursorHover(false)}
                className="p-3 rounded-full bg-[#ff5500] text-black hover:bg-[#ff7700] transition-all shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                onMouseEnter={() => setCursorHover(true, isMuted ? 'SONIDO' : 'MUTED')}
                onMouseLeave={() => setCursorHover(false)}
                className="p-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:border-[#ff5500] transition-all"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-[#ff5500]" />}
              </button>

              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hidden sm:inline-block">
                LIVE EXPERIENCE • MALIBU TATTOO TRUCK
              </span>
            </div>

            <button
              onClick={() => onOpenBooking('truck')}
              onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
              onMouseLeave={() => setCursorHover(false)}
              className="px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-[0_0_25px_rgba(255,85,0,0.5)]"
            >
              {isEs ? 'Reservar Fecha' : 'Book Truck Date'}
            </button>
          </div>
        </div>

        {/* INTERACTIVE CYBERPUNK TECH BLUEPRINT / ASSEMBLY SVG */}
        <TattooTruckBlueprint setCursorHover={setCursorHover} language={language} />

        {/* SPECIFICATIONS & FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left space-y-3">
            <div className="p-3 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">{isEs ? 'Energía 100% Autónoma' : '100% Autonomous Power'}</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {isEs ? 'Equipada con acumuladores de litio de alta densidad y silenciosos. Tatuamos en cualquier localización sin necesitar conexión eléctrica externa.' : 'High capacity silent lithium power stations. Tattoo anywhere without grid connection.'}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left space-y-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">{isEs ? 'Sanidad Quirúrgica Homologada' : 'Surgical Grade Sanitation'}</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {isEs ? 'Autoclave de grado clínico, sistema de tratamiento de aire HEPA y protocolo sanitario acreditado por el Servicio Canario de la Salud.' : 'Clinical grade autoclaves, HEPA air filtering, fully licensed.'}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">{isEs ? 'Experiencia Sensorial VIP' : 'VIP Sensory Experience'}</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {isEs ? 'Equipo de sonido insonorizado de alta fidelidad, toldo desplegable con zona lounge exterior y refrigerio gourmet para el cliente.' : 'Hi-Fi sound system, panoramic awning lounge, gourmet drinks for clients.'}
            </p>
          </div>
        </div>

        {/* UPCOMING EVENTS & TOUR DATES ROADMAP */}
        <UpcomingEventsSection
          onOpenBooking={onOpenBooking}
          setCursorHover={setCursorHover}
          language={language}
        />

        {/* DEDICATED PRESUPUESTADOR ONLINE */}
        <div className="glass-panel-orange rounded-3xl p-6 sm:p-10 border border-[#ff5500]/60 relative text-left mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff5500] bg-black/70 px-3 py-1 rounded-full border border-[#ff5500]/40 font-mono">
                CALCULADORA DE ALQUILER ONLINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-2 flex items-center gap-2">
                <Sliders className="w-6 h-6 text-[#ff5500]" />
                <span>{isEs ? 'Presupuesta tu Evento con el TattooTruck' : 'Calculate TattooTruck Rental'}</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-semibold">{isEs ? 'Estimación aproximada' : 'Estimated Total'}</span>
              <div className="text-3xl sm:text-4xl font-black text-orange-gradient font-heading">
                ~{calculatePrice()}€
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Event Type */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                {isEs ? 'Tipo de Evento' : 'Event Type'}
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-[#ff5500] focus:outline-none"
              >
                <option value="boda">Boda / Wedding (Flash Tattoos invitados)</option>
                <option value="festival">Festival / Concierto</option>
                <option value="marca">Evento de Marca / VIP Launch</option>
                <option value="privada">Fiesta Privada / Cumpleaños</option>
              </select>
            </div>

            {/* Hours */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                {isEs ? `Horas de Servicio (${hours}h)` : `Service Hours (${hours}h)`}
              </label>
              <input
                type="range"
                min="3"
                max="12"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-[#ff5500] cursor-pointer mt-3"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold font-mono">
                <span>3 HORAS</span>
                <span>6 HORAS</span>
                <span>12 HORAS</span>
              </div>
            </div>

            {/* Location Zone */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                {isEs ? 'Zona de Tenerife' : 'Island Region'}
              </label>
              <select
                value={locationZone}
                onChange={(e) => setLocationZone(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-[#ff5500] focus:outline-none"
              >
                <option value="santacruz">Santa Cruz / La Laguna / Anaga</option>
                <option value="norte">Puerto de la Cruz / Valle de La Orotava</option>
                <option value="sur">Costa Adeje / Arona / Los Cristianos</option>
                <option value="isla">Isla Baja / El Médano</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#ff5500]" />
              <span>{isEs ? 'Incluye 2 Tatuadores Profesionales + Lámina de Flashes a Medida' : 'Includes 2 Artists + Custom Event Flash Sheet'}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleWhatsAppQuote}
                onMouseEnter={() => setCursorHover(true, 'WHATSAPP')}
                onMouseLeave={() => setCursorHover(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{isEs ? 'Pedir Cita WhatsApp' : 'Book via WhatsApp'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenBooking('truck')}
                onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
                onMouseLeave={() => setCursorHover(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)]"
              >
                {isEs ? 'Reserva Formal' : 'Formal Booking'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
