import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Calendar, Navigation } from 'lucide-react';

const TattooTruckMap = ({ language = 'es', setCursorHover = () => {} }) => {
  const isEs = language === 'es';

  useEffect(() => {
    // Inject custom CSS for Leaflet popups
    const style = document.createElement('style');
    style.innerHTML = `
      .leaflet-popup-content-wrapper {
        background: rgba(12, 12, 16, 0.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 85, 0, 0.3);
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 85, 0, 0.15);
        color: white;
        padding: 0;
        overflow: hidden;
      }
      .leaflet-popup-content {
        margin: 0;
        width: 280px !important;
      }
      .leaflet-popup-tip-container {
        overflow: visible;
      }
      .leaflet-popup-tip {
        background: rgba(12, 12, 16, 0.92);
        border-bottom: 1px solid rgba(255, 85, 0, 0.3);
        border-right: 1px solid rgba(255, 85, 0, 0.3);
        box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
      }
      .leaflet-container a.leaflet-popup-close-button {
        color: rgba(255, 255, 255, 0.6);
        padding: 8px 12px 0 0;
        font-size: 20px;
        z-index: 10;
        transition: color 0.3s ease;
      }
      .leaflet-container a.leaflet-popup-close-button:hover {
        color: #ff5500;
        background: transparent;
      }
      .custom-marker-pulse {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .pulse-dot {
        width: 12px;
        height: 12px;
        background-color: #ff5500;
        border-radius: 50%;
        position: absolute;
        box-shadow: 0 0 15px #ff5500;
      }
      .pulse-ring {
        width: 30px;
        height: 30px;
        border: 2px solid #ff5500;
        border-radius: 50%;
        position: absolute;
        animation: pulsing 2s infinite ease-out;
      }
      @keyframes pulsing {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
      .studio-dot-tabaiba { background-color: #00f0ff; box-shadow: 0 0 15px #00f0ff; }
      .studio-dot-santacruz { background-color: #ff5500; box-shadow: 0 0 15px #ff5500; }
      .glass-map-container {
        border-radius: 24px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        position: relative;
      }
      .leaflet-control-zoom {
        border: none !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;
        background: transparent !important;
      }
      .leaflet-control-zoom a {
        background-color: rgba(20, 20, 25, 0.8) !important;
        backdrop-filter: blur(10px);
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        transition: all 0.3s ease !important;
      }
      .leaflet-control-zoom a:hover {
        background-color: rgba(255, 85, 0, 0.8) !important;
        color: black !important;
      }
      .leaflet-control-attribution {
        background: rgba(0,0,0,0.5) !important;
        backdrop-filter: blur(5px);
        color: rgba(255,255,255,0.5) !important;
      }
      .leaflet-control-attribution a {
        color: rgba(255,85,0,0.8) !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const createCustomIcon = (colorType) => {
    let dotClass = 'pulse-dot';
    let ringClass = 'pulse-ring';
    let ringStyle = {};
    
    if (colorType === 'cyan') {
      dotClass += ' studio-dot-tabaiba';
      ringStyle = { borderColor: '#00f0ff', animation: 'none', borderStyle: 'solid', borderWidth: '3px', width: '20px', height: '20px' };
    } else if (colorType === 'orange-static') {
      dotClass += ' studio-dot-santacruz';
      ringStyle = { borderColor: '#ff5500', animation: 'none', borderStyle: 'solid', borderWidth: '3px', width: '20px', height: '20px' };
    }

    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="custom-marker-pulse">
          <div class="${dotClass}"></div>
          <div class="${ringClass}" style="${colorType !== 'pulse' ? `border-color: ${ringStyle.borderColor}; animation: ${ringStyle.animation}; border-width: ${ringStyle.borderWidth}; width: ${ringStyle.width}; height: ${ringStyle.height};` : ''}"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  const studios = [
    {
      id: 'studio-sc',
      name: 'Santa Cruz Studio',
      desc: isEs ? 'Nuestro estudio principal en la capital.' : 'Our main studio in the capital.',
      position: [28.4636, -16.2518],
      icon: createCustomIcon('orange-static'),
      type: 'studio'
    },
    {
      id: 'studio-tb',
      name: 'Tabaiba Studio',
      desc: isEs ? 'Estudio boutique frente al mar.' : 'Boutique studio facing the sea.',
      position: [28.4142, -16.3422],
      icon: createCustomIcon('cyan'),
      type: 'studio'
    }
  ];

  const events = [
    {
      id: 'event-1',
      title: 'Tenerife Urban Ink Convention',
      date: '18-20 OCT 2026',
      location: 'Santa Cruz Recinto Ferial',
      position: [28.4520, -16.2650],
      status: 'CONFIRMADO',
      statusColor: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      id: 'event-2',
      title: 'Surf & Tattoo Weekender',
      date: '07-09 NOV 2026',
      location: 'El Médano Beach',
      position: [28.0445, -16.5367],
      status: 'ÚLTIMAS PLAZAS',
      statusColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    },
    {
      id: 'event-3',
      title: 'Boda Exclusiva',
      date: '04-05 DIC 2026',
      location: 'La Orotava - Finca San Diego',
      position: [28.3903, -16.5231],
      status: 'CITA PRIVADA',
      statusColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    }
  ];

  const routePositions = events.map(e => e.position);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full relative glass-map-container"
      onMouseEnter={() => setCursorHover(true, 'DRAG')}
      onMouseLeave={() => setCursorHover(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10" />
      
      {/* Legend Box */}
      <div className="absolute bottom-6 left-6 z-[400] bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl">
        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 pb-2 border-b border-white/10">
          {isEs ? 'Leyenda' : 'Legend'}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ff5500] shadow-[0_0_8px_#ff5500] relative">
              <div className="absolute inset-0 rounded-full border border-[#ff5500] animate-ping opacity-50" />
            </div>
            <span className="text-slate-300 text-xs font-medium">{isEs ? 'Eventos Truck' : 'Truck Events'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] border-2 border-transparent" />
            <span className="text-slate-300 text-xs font-medium">{isEs ? 'Estudios Fijos' : 'Permanent Studios'}</span>
          </div>
        </div>
      </div>

      <MapContainer 
        center={[28.29, -16.52]} 
        zoom={10} 
        scrollWheelZoom={false}
        className="w-full h-[450px] md:h-[550px] bg-[#0c0c10]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <Polyline 
          positions={routePositions} 
          pathOptions={{ color: '#ff5500', weight: 2, dashArray: '8, 8', opacity: 0.6 }} 
        />

        {studios.map(studio => (
          <Marker key={studio.id} position={studio.position} icon={studio.icon}>
            <Popup>
              <div className="p-5 flex flex-col gap-2 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff5500]/10 blur-2xl rounded-full -z-10" />
                <h3 className="text-xl font-black uppercase text-white font-heading tracking-tight">{studio.name}</h3>
                <p className="text-slate-300 text-sm font-light">{studio.desc}</p>
                <div className="mt-2 inline-flex items-center gap-2 text-[#00f0ff] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{isEs ? 'Estudio Permanente' : 'Permanent Studio'}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {events.map((event, idx) => (
          <Marker key={event.id} position={event.position} icon={createCustomIcon('pulse')}>
            <Popup>
              <div className="p-0 flex flex-col">
                <div className="px-5 py-4 bg-gradient-to-r from-[#ff5500]/10 to-transparent border-b border-[#ff5500]/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff5500] to-transparent" />
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest border mb-2 uppercase ${event.statusColor}`}>
                    {event.status}
                  </div>
                  <h3 className="text-lg font-black text-white font-heading leading-tight uppercase tracking-tight">{event.title}</h3>
                </div>
                
                <div className="p-5 space-y-3 bg-black/40">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Calendar className="w-4 h-4 text-[#ff5500]" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Navigation className="w-4 h-4 text-[#ff5500]" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  );
};

export default TattooTruckMap;
