import React from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Phone, Mail, Sparkles, Loader2 } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import { useArtist } from '../hooks/useArtists';
import { studioColor, studioMeta } from '../data/studios';
import GalleryGrid from '../components/gallery/GalleryGrid';

export default function ArtistProfilePage({ onOpenBooking, setCursorHover, language }) {
  const { slug } = useParams();
  const isEs = language === 'es';
  const key = slug?.toLowerCase() || 'yenko';

  const { artist, loading } = useArtist(key);

  // Portfolio pieces for this artist, from Supabase (empty → "coming soon")
  const { items: artistWorks, loading: worksLoading } = useGallery({ artistSlug: key });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709]/60 text-white pt-32 sm:pt-36 lg:pt-40 pb-20 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#ff5500] animate-spin" />
      </div>
    );
  }

  // Show 404 for invalid artist slugs
  if (!artist) {
    return (
      <div className="min-h-screen bg-[#070709]/60 text-white pt-32 sm:pt-36 lg:pt-40 pb-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-black font-heading text-white">404</h1>
          <p className="text-slate-300 text-lg">Artista no encontrado</p>
          <a href="/artistas" className="inline-block px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-colors">
            Ver Todos los Artistas
          </a>
        </div>
      </div>
    );
  }

  const studio = studioMeta(artist.studio);
  const accent = studioColor(artist.studio);
  const bio = isEs ? artist.bioEs : artist.bioEn;
  const hasWhatsapp = !!artist.whatsapp;
  const hasEmail = !!artist.email;

  const whatsappMessage = encodeURIComponent(
    `Hola ${artist.name}, quisiera consultar disponibilidad y pedir cita directa contigo para un tatuaje en Malibu Tattoo Studio.`
  );

  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans">

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff5500]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* ARTIST DEDICATED PROFILE HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 text-left mb-16">

          {/* HD Artist Portrait */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 h-[400px] sm:h-[480px] bg-black/40">
            {artist.image ? (
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">
                <Camera className="w-10 h-10" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span
                className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full text-black font-mono shadow-md"
                style={{ backgroundColor: accent }}
              >
                {studio.badge}
              </span>
            </div>
            {artist.instagramUrl && (
              <div className="absolute bottom-4 left-4 right-4">
                <a
                  href={artist.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-400 text-xs font-mono font-bold hover:bg-pink-500/20 transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>@{artist.handle}</span>
                </a>
              </div>
            )}
          </div>

          {/* Artist Bio & Contact Options */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {artist.roleTitle && (
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff5500]">
                  {artist.roleTitle}
                </span>
              )}
              <h1 className="text-3xl sm:text-5xl font-black text-white font-heading mt-1">
                {artist.name}
              </h1>
              {bio && (
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mt-4">
                  {bio}
                </p>
              )}
            </div>

            {/* Specialties */}
            {artist.specialties.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff5500]" />
                  <span>Especialidades del Artista</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {artist.specialties.map((spec, sIdx) => (
                    <span key={sIdx} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 font-mono">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* DIRECT CONTACT ACTION BUTTONS */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white font-mono">
                {isEs ? 'Pedir Cita Directa' : 'Direct Booking'}
              </h4>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {hasWhatsapp && (
                  <a
                    href={`https://wa.me/${artist.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorHover(true, 'WHATSAPP')}
                    onMouseLeave={() => setCursorHover(false)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>WhatsApp Directo con {artist.name}</span>
                  </a>
                )}

                {hasEmail && (
                  <a
                    href={`mailto:${artist.email}?subject=Cita%20Directa%20Malibu%20Tattoo%20Studio&body=Hola%20${encodeURIComponent(artist.name)}`}
                    onMouseEnter={() => setCursorHover(true, 'EMAIL')}
                    onMouseLeave={() => setCursorHover(false)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:border-white text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all"
                  >
                    <Mail className="w-4 h-4 text-[#ff5500]" />
                    <span>Email Directo</span>
                  </a>
                )}

                {!hasWhatsapp && !hasEmail && (
                  <button
                    type="button"
                    onClick={() => onOpenBooking?.(artist.studio)}
                    onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
                    onMouseLeave={() => setCursorHover(false)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff7700] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isEs ? `Pedir cita con ${artist.name}` : `Book with ${artist.name}`}</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* ARTIST INDIVIDUAL PORTFOLIO GALLERY */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-2xl font-black uppercase text-white font-heading">
              {isEs ? 'PORTAFOLIO DE ' : 'PORTFOLIO — '}
              <span className="text-orange-gradient italic font-normal font-serif-title">{artist.name}</span>
            </h3>
            {artist.instagramUrl && (
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorHover?.(true, 'INSTAGRAM')}
                onMouseLeave={() => setCursorHover?.(false)}
                className="text-xs font-mono text-pink-400 hover:underline flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>{isEs ? 'Ver más en Instagram' : 'More on Instagram'}</span>
              </a>
            )}
          </div>

          <GalleryGrid
            items={artistWorks}
            loading={worksLoading}
            onOpenBooking={onOpenBooking}
            setCursorHover={setCursorHover}
            language={language}
            masonry="columns-2 lg:columns-3"
            showFilters={false}
            skeletonCount={6}
          />
        </div>

      </div>
    </div>
  );
}
