import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UpcomingEventsSection({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';

  const upcomingEvents = [
    {
      id: 1,
      date: '18 - 20 OCT 2026',
      status: 'CONFIRMADO',
      statusColor: 'bg-emerald-500',
      title: 'Tenerife Urban Ink Convention',
      host: 'Organizado por Expo Eventos Canarias',
      location: 'Recinto Ferial de Santa Cruz de Tenerife',
      city: 'Santa Cruz de Tenerife',
      descriptionEs: 'La TattooTruck estará instalada dentro del pavellón principal como espacio de demostración en vivo de gran formato.',
      descriptionEn: 'The TattooTruck caravan will be showcased live inside the main pavilion.',
      artists: [
        { name: 'Yenko Tattoo', handle: '@yenko_freestyletatau', slug: 'yenko', image: '/assets/artist_yenko.jpg' },
        { name: 'Pidol BodyArt', handle: '@pidol_bodyart', slug: 'pidol', image: '/assets/artist_pidol.jpg' },
        { name: 'Yax Tattoo', handle: '@yaxtattoo', slug: 'yaxtattoo', image: '/assets/artist1.jpg' }
      ]
    },
    {
      id: 2,
      date: '07 - 09 NOV 2026',
      status: 'ÚLTIMAS PLAZAS',
      statusColor: 'bg-[#ff5500]',
      title: 'El Médano Surf & Tattoo Weekender',
      host: 'Colaboración con Surfcamp El Médano',
      location: 'Paseo Marítimo de El Médano',
      city: 'Granadilla de Abona (Sur)',
      descriptionEs: 'Estudio móvil aparcado frente a la playa con sesiones flash de estilo marino, fine line y blackwork con vistas al mar.',
      descriptionEn: 'Mobile studio parked oceanfront featuring coastal fine line & blackwork flash sessions.',
      artists: [
        { name: 'Iria Tattoo', handle: '@iria_tattoo', slug: 'iria', image: '/assets/artist_iria.jpg' },
        { name: 'Yax Tattoo', handle: '@yaxtattoo', slug: 'yaxtattoo', image: '/assets/artist1.jpg' }
      ]
    },
    {
      id: 3,
      date: '04 - 05 DIC 2026',
      status: 'CITA PRIVADA',
      statusColor: 'bg-cyan-400',
      title: 'Boda Exclusiva Finca San Diego',
      host: 'Evento Privado Boda & Pop-Up Ink',
      location: 'Finca San Diego, Valle de La Orotava',
      city: 'La Orotava',
      descriptionEs: 'Activación privada VIP de la caravana con tatuajes finos y micro-tatuajes de recuerdo para los novios e invitados.',
      descriptionEn: 'Exclusive private wedding activation featuring keepsake micro tattoos for guests.',
      artists: [
        { name: 'Aditii Tattoo', handle: '@aditii_tattoo', slug: 'aditii', image: '/assets/artist_aditii.jpg' },
        { name: 'Iria Tattoo', handle: '@iria_tattoo', slug: 'iria', image: '/assets/artist_iria.jpg' }
      ]
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Calendar className="w-4 h-4" />
              <span>CALENDARIO DE RUTA & ACTIVACIONES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading leading-tight">
              PRÓXIMOS <span className="text-orange-gradient font-serif-title italic font-normal">EVENTOS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light mt-2 max-w-xl">
              {isEs 
                ? 'Descubre dónde estará la TattooTruck, en qué festivales o bodas estará aparcada y qué tatuadores estarán a bordo.'
                : 'Discover upcoming stops, festivals, and resident artists on board the TattooTruck.'}
            </p>
          </div>

          <button
            onClick={() => onOpenBooking('truck')}
            onMouseEnter={() => setCursorHover(true, 'SOLICITAR')}
            onMouseLeave={() => setCursorHover(false)}
            className="px-6 py-3.5 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-[0_0_25px_rgba(255,85,0,0.4)] shrink-0"
          >
            {isEs ? 'Contratar TattooTruck para mi Evento' : 'Hire TattooTruck for Event'}
          </button>
        </div>

        {/* EVENTS LIST GRID */}
        <div className="space-y-6">
          {upcomingEvents.map(event => (
            <motion.div
              key={event.id}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 group hover:border-[#ff5500]/40 transition-all duration-300"
            >
              {/* Event Date & Location Info */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#ff5500] px-3.5 py-1 rounded-full">
                    {event.date}
                  </span>
                  <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest text-black px-3 py-1 rounded-full ${event.statusColor}`}>
                    {event.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {event.host}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white font-heading group-hover:text-[#ff5500] transition-colors">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {isEs ? event.descriptionEs : event.descriptionEn}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
                  <MapPin className="w-4 h-4 text-[#ff5500]" />
                  <span className="text-white font-semibold">{event.location}</span>
                  <span>({event.city})</span>
                </div>
              </div>

              {/* Resident Artists on Board */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>TATUADORES A BORDO</span>
                  </span>
                  <div className="flex items-center gap-3">
                    {event.artists.map((artist, aIdx) => (
                      <Link
                        key={aIdx}
                        to={`/artista/${artist.slug}`}
                        onMouseEnter={() => setCursorHover(true, artist.handle, artist)}
                        onMouseLeave={() => setCursorHover(false)}
                        className="group/avatar flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#ff5500] transition-colors cursor-none"
                      >
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-6 h-6 rounded-full object-cover border border-white/20 group-hover/avatar:scale-110 transition-transform"
                        />
                        <span className="text-xs font-mono font-bold text-slate-200 group-hover/avatar:text-white">
                          {artist.name.split(' ')[0]}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Booking Button for specific event */}
                <button
                  onClick={() => onOpenBooking(`event-${event.title}`)}
                  onMouseEnter={() => setCursorHover(true, 'PEDIR CITA')}
                  onMouseLeave={() => setCursorHover(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#ff5500]/50 hover:bg-[#ff5500] hover:text-black text-[#ff5500] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
                >
                  {isEs ? 'Pedir Cita en Evento' : 'Book Event Slot'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
