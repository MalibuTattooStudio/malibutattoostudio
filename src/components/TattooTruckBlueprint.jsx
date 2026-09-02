import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, RefreshCw, ChevronRight, Activity } from 'lucide-react';

export default function TattooTruckBlueprint({ setCursorHover, language }) {
  const isEs = language === 'es';
  const [activeHotspot, setActiveHotspot] = useState(1);
  const [assemblyKey, setAssemblyKey] = useState(0);

  const hotspots = [
    {
      id: 1,
      x: '24%',
      y: '48%',
      titleEs: '01. FURGONETA TRACTORA MATTE BLACK 4x4',
      titleEn: '01. MATTE BLACK 4x4 TOWING VAN',
      badge: 'FURGONETA 4x4',
      descEs: 'Unidad de tracción 4x4 en acabado negro mate equipada para trasladar el estudio itinerante a cualquier evento, playa o festival de Tenerife.',
      descEn: 'Matte black 4x4 towing van engineered to haul the mobile studio to any event or festival in Tenerife.',
      spec: 'Good Ink • Good Vibes • Good Times • Tracción 4WD'
    },
    {
      id: 2,
      x: '52%',
      y: '22%',
      titleEs: '02. SISTEMA AUTÓNOMO SOLAR & LITIO 8.4 kWh',
      titleEn: '02. SOLAR & LITHIUM POWERHOUSE 8.4 kWh',
      badge: '100% AUTÓNOMO',
      descEs: 'Paneles solares de silicio en el techo conectados a un banco de baterías de litio de 8.4 kWh. Cero ruido de motor y cero emisiones durante las sesiones de tatuaje.',
      descEn: 'Monocrystalline solar roof panels connected to an 8.4 kWh lithium battery bank. 0% emissions and zero engine noise during sessions.',
      spec: '8.4 kWh Litio • 1200W Solar • 48h Autonomía Continua'
    },
    {
      id: 3,
      x: '68%',
      y: '55%',
      titleEs: '03. CARAVANA ESTUDIO VIP & AUTOCLAVE CLÍNICO',
      titleEn: '03. CLINICAL VIP CARAVAN SUITE',
      badge: 'CLÍNICA DE AUTOR',
      descEs: 'Caravana redondeada de gran volumen con el distintivo circular de Malibu Tattoo Studio. Interior con camilla ergonómica, autoclave y filtrado HEPA H14.',
      descEn: 'Vaulted rear caravan with ergonomic tattoo suite, hospital grade autoclave sterilization and HEPA H14 air purification.',
      spec: 'Esterilización Autoclave Class B • Clima HVAC 24°C'
    },
    {
      id: 4,
      x: '88%',
      y: '40%',
      titleEs: '04. TOLDO RETRÁCTIL & RECEPCIÓ VIP EXTERIOR',
      titleEn: '04. PANORAMIC AWNING & VIP LOUNGE',
      badge: 'EVENTOS & BODAS',
      descEs: 'Toldo automático lateral de 6 metros con iluminación ambiental regulable y espacio Lounge de recepción exterior para invitados.',
      descEn: '6-meter automatic lateral awning with ambient dimmable lighting and outdoor VIP reception lounge for events and weddings.',
      spec: '6m Toldo Motorizado • Iluminación Cálida LED'
    }
  ];

  const activeData = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  const handleReassemble = () => {
    setAssemblyKey(prev => prev + 1);
  };

  return (
    <div className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 text-left relative overflow-hidden my-12">
      
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>ARQUITECTURA MÓVIL ESQUEMÁTICA 3D</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
            DIBUJO TÉCNICO <span className="text-orange-gradient italic font-normal font-serif-title">ENSAMBLABLE</span>
          </h3>
        </div>

        <button
          onClick={handleReassemble}
          onMouseEnter={() => setCursorHover(true, 'DIBUJAR')}
          onMouseLeave={() => setCursorHover(false)}
          className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 hover:border-[#ff5500] hover:bg-[#ff5500]/10 text-xs font-bold font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-all flex items-center gap-2 group"
        >
          <RefreshCw className="w-4 h-4 text-[#ff5500] group-hover:rotate-180 transition-transform duration-700" />
          <span>{isEs ? 'Re-ensamblar Dibujo' : 'Reassemble Blueprint'}</span>
        </button>
      </div>

      {/* INTERACTIVE VECTOR BLUEPRINT CANVAS (VAN + TRAILER CARAVAN) */}
      <div className="relative w-full h-[320px] sm:h-[440px] bg-black/85 rounded-2xl border border-white/15 overflow-hidden flex items-center justify-center p-4">
        
        {/* Grid Background Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* SVG Animated Assembly Vector (Furgoneta + Caravana) */}
        <svg
          key={assemblyKey}
          className="w-full h-full max-w-5xl relative z-10"
          viewBox="0 0 1000 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chassis Ground Line */}
          <motion.path
            d="M 50 420 L 950 420"
            stroke="#ff5500"
            strokeWidth="2"
            strokeDasharray="8 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 0.8 }}
          />

          {/* FRONT TOWING VAN CHASSIS & CABIN (Furgoneta 4x4) */}
          <g className="van-unit">
            {/* Hood & Windshield */}
            <motion.path
              d="M 100 400 L 100 320 L 180 260 L 320 260 L 360 400 Z"
              stroke="#00f0ff"
              strokeWidth="2.5"
              fill="rgba(0, 240, 255, 0.04)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            {/* Van Wheels */}
            <motion.circle
              cx="160" cy="400" r="32"
              stroke="#00f0ff" strokeWidth="2.5" fill="#070709"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring' }}
            />
            <motion.circle
              cx="300" cy="400" r="32"
              stroke="#00f0ff" strokeWidth="2.5" fill="#070709"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: 'spring' }}
            />
            {/* Headlight Beam */}
            <motion.path
              d="M 100 340 L 40 330 L 40 370 Z"
              fill="rgba(0, 240, 255, 0.15)" stroke="#00f0ff" strokeWidth="1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            />
            <text x="160" y="315" fill="#00f0ff" fontSize="12" fontFamily="monospace" fontWeight="bold">FURGONETA MATTE BLACK</text>
          </g>

          {/* ARTICULATED HITCH COUPLER (Enganche) */}
          <motion.path
            d="M 360 380 L 420 380"
            stroke="#ff5500" strokeWidth="4" strokeDasharray="4 2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0 }}
          />

          {/* REAR LUXURY CARAVAN STUDIO (Caravana Airstream de Lujo) */}
          <g className="caravan-unit">
            {/* Rounded Aerodynamic Airstream Shell */}
            <motion.path
              d="M 420 400 L 420 220 Q 420 160 480 160 L 880 160 Q 940 160 940 240 L 940 400 Z"
              stroke="#ff5500" strokeWidth="3" fill="rgba(255, 85, 0, 0.05)"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
            />
            {/* Double Axle Caravan Wheels */}
            <motion.circle
              cx="640" cy="400" r="34"
              stroke="#ff5500" strokeWidth="3" fill="#070709"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: 'spring' }}
            />
            <motion.circle
              cx="720" cy="400" r="34"
              stroke="#ff5500" strokeWidth="3" fill="#070709"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}
            />
            {/* Roof Solar Array */}
            <motion.rect
              x="480" y="145" width="360" height="15" rx="3"
              stroke="#00f0ff" strokeWidth="2" fill="rgba(0, 240, 255, 0.2)"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4 }}
            />
            <text x="600" y="135" fill="#00f0ff" fontSize="11" fontFamily="monospace" fontWeight="bold">PANELES SOLARES 1200W</text>

            {/* Interior Vaulted Window & Studio Chair Schematic */}
            <motion.rect
              x="520" y="220" width="180" height="95" rx="8"
              stroke="#ff5500" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(255, 85, 0, 0.05)"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            />
            <text x="545" y="270" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold">BOX TATTOO VIP</text>

            {/* Retractable Lateral Awning Line */}
            <motion.path
              d="M 880 160 L 980 220"
              stroke="#ffaa66" strokeWidth="2" strokeDasharray="6 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6 }}
            />
          </g>
        </svg>

        {/* INTERACTIVE HOTSPOT BUTTONS OVERLAY */}
        {hotspots.map(spot => {
          const isActive = spot.id === activeHotspot;
          return (
            <motion.button
              key={spot.id}
              onClick={() => setActiveHotspot(spot.id)}
              onMouseEnter={() => setCursorHover(true, spot.badge)}
              onMouseLeave={() => setCursorHover(false)}
              className="absolute z-20 group cursor-none -translate-x-1/2 -translate-y-1/2"
              style={{ left: spot.x, top: spot.y }}
              whileHover={{ scale: 1.3 }}
            >
              {/* Outer Pulsing Ring */}
              <span className={`absolute -inset-2 rounded-full animate-ping opacity-75 ${
                isActive ? 'bg-[#ff5500]' : 'bg-[#00f0ff]'
              }`} />

              {/* Center Hotspot Marker */}
              <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono font-extrabold text-xs shadow-lg transition-all ${
                isActive
                  ? 'bg-[#ff5500] text-black border-white shadow-[0_0_20px_#ff5500]'
                  : 'bg-black/90 text-white border-[#00f0ff] hover:border-white'
              }`}>
                0{spot.id}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ACTIVE HOTSPOT SPECIFICATION BREAKDOWN PANEL */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeData.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-5 sm:p-6 rounded-2xl bg-black/70 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-black font-mono bg-[#ff5500]">
                {activeData.badge}
              </span>
              <h4 className="text-lg font-bold text-white font-heading">
                {isEs ? activeData.titleEs : activeData.titleEn}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {isEs ? activeData.descEs : activeData.descEn}
            </p>

            <p className="text-xs font-mono font-semibold text-[#ff5500] flex items-center gap-1.5 pt-1">
              <Zap className="w-3.5 h-3.5" />
              <span>{activeData.spec}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Haz clic en 01-04 para inspeccionar partes</span>
            <ChevronRight className="w-4 h-4 text-[#ff5500]" />
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
