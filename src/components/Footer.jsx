import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Heart, ExternalLink } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

// Isolated clock component to prevent full Footer re-renders every second
function TenerifeClock() {
  const [tenerifeTime, setTenerifeTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Atlantic/Canary',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTenerifeTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[10px] font-mono text-slate-400">
      TENERIFE LOCAL TIME: <strong className="text-[#ff5500]">{tenerifeTime || '12:00:00'}</strong> (WET/GMT+1)
    </span>
  );
}

export default function Footer({ onOpenBooking, language }) {
  const isEs = language === 'es';

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-16 pb-12 relative z-10 overflow-hidden text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 pb-12 border-b border-white/10">
          
          {/* COL 1: BRAND WITH LOGO EMBLEM */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border-2 border-[#ff5500] bg-black p-0.5 shadow-[0_0_20px_rgba(255,85,0,0.5)] overflow-hidden">
                <img src="/assets/logo.jpg" alt="Malibu Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="font-heading font-black text-xl text-white tracking-widest">
                MALIBU
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              {isEs ? 'Arte corporal de autor. Dos estudios de alta gama en Santa Cruz y Tabaiba Baja, más el TattooTruck para eventos.' : 'Flagship studio locations in Tenerife and the mobile TattooTruck caravan.'}
            </p>

            <a
              href="https://www.instagram.com/malibutattoostudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-400 hover:bg-pink-500/20 transition-all font-mono"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@malibutattoostudio</span>
            </a>

            <div className="block pt-2">
              <TenerifeClock />
            </div>
          </div>

          {/* COL 2: SANTA CRUZ */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#ff5500] font-heading flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5" />
              SANTA CRUZ DE TENERIFE
            </h4>
            <p className="text-xs text-slate-300">Estudio Principal Centro Urbano</p>
            <p className="text-xs text-slate-400">Santa Cruz de Tenerife, Canarias</p>
            <a
              href="https://maps.app.goo.gl/rnNCgbFJCrsvSHgn9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase text-[#ff5500] hover:underline flex items-center gap-1 pt-1"
            >
              <span>Ver Ubicación en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* COL 3: TABAIBA BAJA */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-heading flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5" />
              TABAIBA BAJA (COSTA)
            </h4>
            <p className="text-xs text-slate-300">Estudio Boutique Vista Al Mar</p>
            <p className="text-xs text-slate-400">Tabaiba Baja, El Rosario, Tenerife</p>
            <a
              href="https://maps.app.goo.gl/QMaM94qw9J5eddYC7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase text-cyan-400 hover:underline flex items-center gap-1 pt-1"
            >
              <span>Ver Ubicación en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* COL 4: TATTOO TRUCK */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#ff5500] font-heading flex items-center gap-1.5 font-mono">
              <Truck className="w-3.5 h-3.5" />
              TATTOO TRUCK MOVIL
            </h4>
            <p className="text-xs text-slate-300">Caravana Estudio Autónomo</p>
            <p className="text-xs text-slate-400">Alquiler para Bodas, Festivales y Eventos</p>
            <button
              onClick={() => onOpenBooking('truck')}
              className="px-4 py-2 rounded-full bg-[#ff5500] text-black font-extrabold text-[10px] uppercase tracking-wider hover:bg-[#ff7700] transition-colors inline-block mt-1 shadow-[0_0_15px_rgba(255,85,0,0.3)]"
            >
              Alquilar para Evento
            </button>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & MADEDIGITAL SIGNATURE */}
        <div className="pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 text-xs text-slate-400 font-mono">
          <p className="madedigital-container text-center sm:text-left leading-relaxed">
            © {new Date().getFullYear()} MALIBU TATTOO STUDIO • TENERIFE. Todos los derechos reservados.
            <span className="mt-1 block sm:mt-0 sm:inline">
              <span className="hidden sm:inline"> · </span>
              Hecho con{' '}
              <Heart className="w-3.5 h-3.5 text-[#ff3366] fill-current heartbeat-icon inline-block align-[-0.15em]" />
              {' '}por{' '}
              <a href="https://madedigital.es" target="_blank" rel="noopener noreferrer" className="madedigital-link">
                madedigital.es
              </a>
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-[11px] shrink-0">
            <a href="https://www.instagram.com/malibutattoostudio/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">Instagram</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Sanidad Homologada</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
