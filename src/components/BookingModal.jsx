import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Truck, CheckCircle2, Send, Sparkles, UserCheck, Heart, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

// Placeholder credentials for future replacement
const CONTACT_CONFIG = {
  generalWhatsapp: '+34600000000',
  truckWhatsapp: '+34600000000',
  generalEmail: 'info@malibutattoostudio.com',
  truckEmail: 'truck@malibutattoostudio.com'
};

export default function BookingModal({ isOpen, onClose, initialLocation = 'santacruz', language }) {
  const isEs = language === 'es';

  // Modal active tab: 'studio' vs 'truck'
  const [bookingType, setBookingType] = useState(
    initialLocation.includes('truck') ? 'truck' : 'studio'
  );
  
  const [submitted, setSubmitted] = useState(false);

  // ─── STUDIO FORM STATE ───
  const [studioLoc, setStudioLoc] = useState(
    initialLocation.includes('tabaiba') ? 'tabaiba' : 'santacruz'
  );
  const [artist, setArtist] = useState('cualquiera');
  const [tattooStyle, setTattooStyle] = useState('Fine Line & Microrealismo');
  const [bodyArea, setBodyArea] = useState('');
  const [approxSize, setApproxSize] = useState('10x10 cm');
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ideaNotes, setIdeaNotes] = useState('');

  // ─── TATTOO TRUCK FORM STATE ───
  const [eventType, setEventType] = useState('boda');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [durationHours, setDurationHours] = useState('4');
  const [guestCount, setGuestCount] = useState('50 - 100 personas');
  const [includeLounge, setIncludeLounge] = useState(true);
  const [truckName, setTruckName] = useState('');
  const [truckPhone, setTruckPhone] = useState('');
  const [truckEmail, setTruckEmail] = useState('');
  const [truckNotes, setTruckNotes] = useState('');

  // Reset form states when modal opens/closes or initialLocation changes
  useEffect(() => {
    if (isOpen) {
      const isTruckInit = initialLocation.includes('truck');
      setBookingType(isTruckInit ? 'truck' : 'studio');
      setStudioLoc(initialLocation.includes('tabaiba') ? 'tabaiba' : 'santacruz');
      setSubmitted(false);

      // Reset studio form
      setArtist('cualquiera');
      setTattooStyle('Fine Line & Microrealismo');
      setBodyArea('');
      setApproxSize('10x10 cm');
      setDate('');
      setFullName('');
      setPhone('');
      setEmail('');
      setIdeaNotes('');

      // Reset truck form
      setEventType('boda');
      setEventLocation('');
      setEventDate('');
      setDurationHours('4');
      setGuestCount('50 - 100 personas');
      setIncludeLounge(true);
      setTruckName('');
      setTruckPhone('');
      setTruckEmail('');
      setTruckNotes('');
    }
  }, [isOpen, initialLocation]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#ff7700', '#ffffff', '#00f0ff']
    });
  };

  const handleSendWhatsApp = () => {
    if (bookingType === 'studio') {
      const locName = studioLoc === 'santacruz' ? 'Estudio Santa Cruz' : 'Estudio Tabaiba Baja';
      const msg = `Hola Malibu Tattoo! Deseo reservar cita en estudio:\n\n*Ubicación:* ${locName}\n*Tatuador:* ${artist === 'cualquiera' ? 'Primer disponible' : artist}\n*Cliente:* ${fullName}\n*Teléfono:* ${phone}\n*Email:* ${email || 'No proporcionado'}\n*Estilo:* ${tattooStyle}\n*Zona & Tamaño:* ${bodyArea || 'Sin especificar'} (~${approxSize})\n*Fecha orientativa:* ${date || 'Próxima fecha disponible'}\n*Notas:* ${ideaNotes || 'Sin notas'}`;
      window.open(`https://wa.me/${CONTACT_CONFIG.generalWhatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
      const typeLabel = eventType === 'boda' ? 'Boda / Wedding' : eventType === 'festival' ? 'Festival / Concierto' : eventType === 'privado' ? 'Fiesta Privada / Cumpleaños' : 'Evento de Marca / Empresa';
      const msg = `Hola Malibu Tattoo! Solicito información y alquiler del TattooTruck para un evento:\n\n*Tipo de Evento:* ${typeLabel}\n*Lugar en Tenerife:* ${eventLocation || 'Tenerife'}\n*Fecha del Evento:* ${eventDate || 'A determinar'}\n*Duración:* ${durationHours} Horas\n*Invitados aprox:* ${guestCount}\n*Lounge VIP:* ${includeLounge ? 'Sí, incluir zona chillout' : 'No'}\n*Organizador:* ${truckName}\n*Teléfono:* ${truckPhone}\n*Email:* ${truckEmail || 'No proporcionado'}\n*Detalles del Evento:* ${truckNotes || 'Sin detalles adicionales'}`;
      window.open(`https://wa.me/${CONTACT_CONFIG.truckWhatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl p-5 sm:p-8 border border-white/20 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto text-left"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* MODAL HEADER WITH EMBLEM */}
              <div className="mb-6 flex items-center gap-3.5 pb-5 border-b border-white/10">
                <img src="/assets/logo.jpg" alt="Logo" className="w-11 h-11 rounded-full border border-[#ff5500] shrink-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight leading-tight">
                    MALIBU <span className="text-orange-gradient font-serif-title italic font-normal">TATTOO STUDIO</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    {isEs ? 'Elige entre cita directa en nuestros estudios o alquiler de la caravana móvil.' : 'Choose studio booking or TattooTruck event rental.'}
                  </p>
                </div>
              </div>

              {/* TWO CONNECTED FORM TABS SWITCHER */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-1.5 rounded-2xl bg-black/60 border border-white/10">
                <button
                  type="button"
                  onClick={() => setBookingType('studio')}
                  className={`py-3 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    bookingType === 'studio'
                      ? 'bg-[#ff5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{isEs ? '1. Cita en Estudio' : '1. Studio Session'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType('truck')}
                  className={`py-3 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    bookingType === 'truck'
                      ? 'bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-black font-black shadow-[0_0_20px_rgba(255,85,0,0.6)]'
                      : 'text-[#ff5500] hover:bg-[#ff5500]/10 border border-[#ff5500]/30'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>{isEs ? '2. Alquiler TattooTruck' : '2. TattooTruck Event'}</span>
                </button>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                 FORM 1: CITA EN ESTUDIO (SANTA CRUZ / TABAIBA)
                 ───────────────────────────────────────────────────────────── */}
              {bookingType === 'studio' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* STUDIO LOCATION PICKER */}
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-2 font-mono">
                      Selecciona el Estudio en Tenerife
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setStudioLoc('santacruz')}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          studioLoc === 'santacruz'
                            ? 'border-[#ff5500] bg-[#ff5500]/15 text-white shadow-[0_0_15px_rgba(255,85,0,0.25)]'
                            : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black uppercase text-white font-heading">Santa Cruz</span>
                          <MapPin className="w-4 h-4 text-[#ff5500]" />
                        </div>
                        <p className="text-[10px] text-slate-300 font-light">Estudio Principal urbano en la capital</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStudioLoc('tabaiba')}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          studioLoc === 'tabaiba'
                            ? 'border-cyan-400 bg-cyan-400/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                            : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black uppercase text-white font-heading">Tabaiba Baja</span>
                          <MapPin className="w-4 h-4 text-cyan-400" />
                        </div>
                        <p className="text-[10px] text-slate-300 font-light">Santuario boutique frente al Atlántico</p>
                      </button>
                    </div>
                  </div>

                  {/* ARTIST & STYLE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Tatuador Preferido
                      </label>
                      <select
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      >
                        <option value="cualquiera">Cualquier Tatuador Disponible</option>
                        {studioLoc === 'tabaiba' ? (
                          <>
                            <option value="Yenko Tattoo">Yenko Tattoo (Master Freestyle)</option>
                            <option value="Iria Tattoo">Iria Tattoo (Fine Line / Microrealismo)</option>
                            <option value="Yax Tattoo">Yax Tattoo (Custom Ink / Japanese)</option>
                            <option value="Aurea Tattoo">Aurea Tattoo (Illustrative / Ornamental)</option>
                          </>
                        ) : (
                          <>
                            <option value="Aditii Tattoo">Aditii Tattoo (Geometría Sacra)</option>
                            <option value="Pidol BodyArt">Pidol BodyArt (Neo Trad / Piercing)</option>
                            <option value="Kari Torres">Kari Torres (Minimal Fine Line)</option>
                            <option value="Honnari Tattoo">Honnari Tattoo (Japonés Irezumi)</option>
                            <option value="EriOS Tattoo">EriOS Tattoo (Dark Realism)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Estilo de Tatuaje
                      </label>
                      <select
                        value={tattooStyle}
                        onChange={(e) => setTattooStyle(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      >
                        <option value="Fine Line & Microrealismo">Fine Line / Microrealismo</option>
                        <option value="Japonés Irezumi">Japonés / Irezumi</option>
                        <option value="Freestyle Blackwork">Freestyle Blackwork</option>
                        <option value="Geometría Sacra & Ornamental">Geometría Sacra & Ornamental</option>
                        <option value="Neo Tradicional">Neo Tradicional Color</option>
                        <option value="Dark Realism & Sombras">Dark Realism & Sombras</option>
                        <option value="Lettering de Autor">Lettering de Autor</option>
                      </select>
                    </div>
                  </div>

                  {/* BODY AREA & SIZE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Zona del Cuerpo
                      </label>
                      <input
                        type="text"
                        value={bodyArea}
                        onChange={(e) => setBodyArea(e.target.value)}
                        placeholder="Ej: Antebrazo, Gemelo, Espalda..."
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Tamaño Aprox.
                      </label>
                      <select
                        value={approxSize}
                        onChange={(e) => setApproxSize(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      >
                        <option value="5x5 cm (Pequeño / Micro)">Pequeño (~5x5 cm)</option>
                        <option value="10x10 cm (Mediano)">Mediano (~10x10 cm)</option>
                        <option value="15x20 cm (Grande)">Grande (~15x20 cm)</option>
                        <option value="Pieza Completa / Manga / Espalda">Pieza Completa / Manga / Espalda</option>
                      </select>
                    </div>
                  </div>

                  {/* CONTACT DETAILS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Fecha Deseada
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                      Detalles de la Idea
                    </label>
                    <textarea
                      rows="2"
                      value={ideaNotes}
                      onChange={(e) => setIdeaNotes(e.target.value)}
                      placeholder="Explica brevemente tu diseño, si tienes referencias visuales o si es un cover-up..."
                      className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#ff7700] transition-all shadow-[0_0_25px_rgba(255,85,0,0.5)] cursor-pointer"
                  >
                    Confirmar Pre-Reserva en Estudio
                  </button>

                </form>
              )}

              {/* ─────────────────────────────────────────────────────────────
                 FORM 2: ALQUILER & EVENTOS TATTOO TRUCK (CARAVANA MÓVIL)
                 ───────────────────────────────────────────────────────────── */}
              {bookingType === 'truck' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* EVENT TYPE PICKER */}
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-2 font-mono">
                      Tipo de Evento para el TattooTruck
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'boda', label: 'Boda / Wedding', icon: Heart },
                        { id: 'festival', label: 'Festival / Concierto', icon: Sparkles },
                        { id: 'privado', label: 'Fiesta Privada', icon: UserCheck },
                        { id: 'marca', label: 'Evento de Marca', icon: ShieldCheck }
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEventType(item.id)}
                            className={`p-2.5 rounded-2xl border text-center text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                              eventType === item.id
                                ? 'border-[#ff5500] bg-[#ff5500]/20 text-[#ff5500] shadow-[0_0_15px_rgba(255,85,0,0.3)]'
                                : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-[#ff5500]" />
                            <span className="text-[10px] uppercase font-mono">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* LOCATION & DATE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Lugar / Municipio en Tenerife *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="Ej: Finca San Diego (La Orotava), El Médano..."
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Fecha del Evento *
                      </label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* DURATION & GUESTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Horas de Servicio Requeridas
                      </label>
                      <select
                        value={durationHours}
                        onChange={(e) => setDurationHours(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      >
                        <option value="3">3 Horas (Sesión Express)</option>
                        <option value="4">4 Horas (Estándar Bodas)</option>
                        <option value="6">6 Horas (Media Jornada)</option>
                        <option value="8">8 Horas (Jornada Completa Festival)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Estimación de Invitados
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      >
                        <option value="Hasta 30 personas">Hasta 30 personas (Íntimo)</option>
                        <option value="50 - 100 personas">50 - 100 personas (Boda Mediana)</option>
                        <option value="100 - 250 personas">100 - 250 personas (Gran Boda / Fiesta)</option>
                        <option value="Más de 250 personas">Más de 250 personas (Festival)</option>
                      </select>
                    </div>
                  </div>

                  {/* ORGANIZER DETAILS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Nombre del Organizador / Novios *
                      </label>
                      <input
                        type="text"
                        required
                        value={truckName}
                        onChange={(e) => setTruckName(e.target.value)}
                        placeholder="Nombre o razón social"
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                        Teléfono / WhatsApp de Contacto *
                      </label>
                      <input
                        type="tel"
                        required
                        value={truckPhone}
                        onChange={(e) => setTruckPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                      Detalles del Evento o Requerimientos Especiales
                    </label>
                    <textarea
                      rows="2"
                      value={truckNotes}
                      onChange={(e) => setTruckNotes(e.target.value)}
                      placeholder="Cuéntanos el horario del evento, si disponen de toma eléctrica (220V) o si desean diseños flash personalizados..."
                      className="w-full bg-black/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-black font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_25px_rgba(255,85,0,0.6)] cursor-pointer"
                  >
                    Solicitar Presupuesto TattooTruck
                  </button>

                </form>
              )}

            </div>
          ) : (
            /* ─────────────────────────────────────────────────────────────
               SUCCESS CONFIRMATION SCREEN
               ───────────────────────────────────────────────────────────── */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#ff5500]/20 border border-[#ff5500] flex items-center justify-center mx-auto text-[#ff5500] shadow-[0_0_30px_rgba(255,85,0,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase font-heading">
                  {bookingType === 'studio' ? '¡PRE-RESERVA REGISTRADA!' : '¡SOLICITUD TATTOO TRUCK RECIBIDA!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Gracias <strong className="text-white">{bookingType === 'studio' ? fullName : truckName}</strong>. 
                  Hemos procesado tu solicitud para {bookingType === 'studio' ? (
                    <strong className="text-[#ff5500]">{studioLoc === 'santacruz' ? 'Estudio Santa Cruz' : 'Estudio Tabaiba Baja'}</strong>
                  ) : (
                    <strong className="text-[#ff5500]">alquiler del TattooTruck</strong>
                  )}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleSendWhatsApp}
                  className="px-6 py-3.5 rounded-full bg-[#25D366] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar por WhatsApp Ahora</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-full glass-panel border border-white/20 text-xs font-semibold text-white hover:bg-white/10 uppercase"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
