import React from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Phone, Mail, Sparkles } from 'lucide-react';
import InstagramFeed from '../components/InstagramFeed';

export default function ArtistProfilePage({ setCursorHover, language }) {
  const { slug } = useParams();
  const isEs = language === 'es';

  // Artists database with individual WhatsApp and Email ready for custom credentials
  const artistsData = {
    yenko: {
      name: 'Yenko Tattoo',
      handle: '@yenko_freestyletatau',
      role: 'Founder & Freestyle Master',
      studio: 'Tabaiba Baja Studio',
      studioType: 'tabaiba',
      instagramUrl: 'https://www.instagram.com/yenko_freestyletatau/',
      whatsappPhone: '+34600000001',
      email: 'yenko@malibutattoostudio.com',
      image: '/assets/artist_yenko.jpg',
      bio: isEs 
        ? 'Fundador y Maestro Tatuador de Malibu Tattoo Studio en Tabaiba Baja. Especializado en composiciones freestyle de gran formato, proyectos orgánicos en Blackwork y realismo oscuro de máxima expresión artística.'
        : 'Founder & Master Artist at Malibu Tattoo Studio in Tabaiba Baja. Specialized in large-scale freestyle blackwork and dark realism.',
      specialties: ['Freestyle Custom', 'Dark Realism', 'Large Scale Blackwork', 'Freehand Flow'],
      portfolio: ['/assets/artwork1.jpg', '/assets/artwork2.jpg', '/assets/artwork3.jpg', '/assets/artwork4.jpg']
    },
    iria: {
      name: 'Iria Tattoo',
      handle: '@iria_tattoo',
      role: 'Resident Fine Line Artist',
      studio: 'Tabaiba Baja Studio',
      studioType: 'tabaiba',
      instagramUrl: 'https://www.instagram.com/iria_tattoo/',
      whatsappPhone: '+34600000002',
      email: 'iria@malibutattoostudio.com',
      image: '/assets/artist_iria.jpg',
      bio: isEs
        ? 'Especialista en trazos ultra-finos, microrealismo botánico de máxima delicadeza e ilustración poética en el estudio boutique frente al mar de Tabaiba Baja.'
        : 'Specialist in ultra-fine line work, botanical illustrations and microrealism in Tabaiba Baja.',
      specialties: ['Fine Line Ultra-Delicado', 'Microrealismo', 'Ilustración Botánica', 'Minimalismo'],
      portfolio: ['/assets/artwork2.jpg', '/assets/artwork1.jpg', '/assets/artwork3.jpg']
    },
    aditii: {
      name: 'Aditii Tattoo',
      role: 'Resident Sacred Geometry Artist',
      handle: '@aditii_tattoo',
      studio: 'Santa Cruz Flagship Studio',
      studioType: 'santacruz',
      instagramUrl: 'https://www.instagram.com/aditii_tattoo/',
      whatsappPhone: '+34600000003',
      email: 'aditii@malibutattoostudio.com',
      image: '/assets/artist_aditii.jpg',
      bio: isEs
        ? 'Residente en nuestro estudio principal de Santa Cruz. Maestra del ornamentalismo corporal, simetría mística y geometría sagrada trazada en perfecta armonía con la anatomía.'
        : 'Resident at Santa Cruz flagship studio. Master of sacred geometry, ornamental flows, and custom lettering.',
      specialties: ['Geometría Sagrada', 'Ornamentalismo Corporal', 'MANDALAS & Simetría', 'Custom Lettering'],
      portfolio: ['/assets/artwork3.jpg', '/assets/artwork4.jpg', '/assets/artwork1.jpg']
    },
    pidol: {
      name: 'Pidol BodyArt',
      handle: '@pidol_bodyart',
      role: 'Specialist Tattoo & Piercing',
      studio: 'Santa Cruz & TattooTruck',
      studioType: 'santacruz',
      instagramUrl: 'https://www.instagram.com/pidol_bodyart/',
      whatsappPhone: '+34600000004',
      email: 'pidol@malibutattoostudio.com',
      image: '/assets/artist_pidol.jpg',
      bio: isEs
        ? 'Artista de Neo Tradicional y especialista de perforaciones corporales. Disponible en nuestro estudio principal de Santa Cruz y activaciones en el TattooTruck.'
        : 'Neo Traditional artist & body piercing specialist across Santa Cruz and TattooTruck.',
      specialties: ['Neo Tradicional Color', 'Piercing Profesional', 'Ilustración Custom', 'Cover-ups'],
      portfolio: ['/assets/artwork4.jpg', '/assets/artwork2.jpg', '/assets/artwork1.jpg']
    },
    yaxtattoo: {
      name: 'Yax Tattoo',
      handle: '@yaxtattoo',
      role: 'Custom Ink & Japanese Flash',
      studio: 'Tabaiba & TattooTruck',
      studioType: 'tabaiba',
      instagramUrl: 'https://www.instagram.com/yaxtattoo/',
      whatsappPhone: '+34600000005',
      email: 'yaxtattoo@malibutattoostudio.com',
      image: '/assets/artist_yax.jpg',
      bio: isEs
        ? 'Tatuador en Tabaiba Baja y artista estrella en activaciones móviles del TattooTruck. Diseños flash de inspiración japonesa e ilustración personalizada.'
        : 'Resident artist at Tabaiba Baja & mobile event activations in the TattooTruck.',
      specialties: ['Custom Ink', 'Japanese Flash', 'Blackwork', 'Illustrative Flash'],
      portfolio: ['/assets/artwork2.jpg', '/assets/artwork1.jpg', '/assets/artwork4.jpg']
    },
    aurea: {
      name: 'Aurea Tattoo',
      handle: '@aurea.tattoo_',
      role: 'Illustrative & Fine Line Artist',
      studio: 'Tabaiba Baja Studio',
      studioType: 'tabaiba',
      instagramUrl: 'https://www.instagram.com/aurea.tattoo_/',
      whatsappPhone: '+34600000006',
      email: 'aurea@malibutattoostudio.com',
      image: '/assets/artist_aurea.jpg',
      bio: isEs
        ? 'Especializada en arte ilustrativo, composición fina y motivos ornamentales únicos en nuestro estudio de Tabaiba Baja.'
        : 'Specialized in illustrative art, fine composition and unique ornamental motifs in Tabaiba Baja.',
      specialties: ['Illustrative Art', 'Fine Line', 'Ornamental Flow', 'Dotwork'],
      portfolio: ['/assets/artwork1.jpg', '/assets/artwork3.jpg', '/assets/artwork2.jpg']
    },
    karitorres: {
      name: 'Kari Torres',
      handle: '@karitorres.tattoo',
      role: 'Resident Fine Line Artist',
      studio: 'Santa Cruz Studio',
      studioType: 'santacruz',
      instagramUrl: 'https://www.instagram.com/karitorres.tattoo/',
      whatsappPhone: '+34600000007',
      email: 'karitorres@malibutattoostudio.com',
      image: '/assets/artist_karitorres.jpg',
      bio: isEs
        ? 'Estilo ilustrativo sutil, trazos minimalistas elegantes y alta precisión en el estudio urbano de Santa Cruz de Tenerife.'
        : 'Illustrative minimal fine line tattoos at our Santa Cruz flagship studio.',
      specialties: ['Minimal Fine Line', 'Micro Tattoos', 'Minimalist Art', 'Botanical Line'],
      portfolio: ['/assets/artwork2.jpg', '/assets/artwork3.jpg', '/assets/artwork1.jpg']
    },
    honnari: {
      name: 'Honnari Tattoo',
      handle: '@honnari_tattoo',
      role: 'Japanese Traditional Master',
      studio: 'Santa Cruz Studio',
      studioType: 'santacruz',
      instagramUrl: 'https://www.instagram.com/honnari_tattoo/',
      whatsappPhone: '+34600000008',
      email: 'honnari@malibutattoostudio.com',
      image: '/assets/artist_honnari.jpg',
      bio: isEs
        ? 'Especialista en tatuaje tradicional japonés Irezumi, composiciones orientales clásicas y piezas personalizadas de gran impacto visual en Santa Cruz.'
        : 'Specialist in traditional Japanese Irezumi and oriental compositions in Santa Cruz.',
      specialties: ['Irezumi Tradicional', 'Dragones y Carpas Koi', 'Oriental Blackwork', 'Sleeves Japonesas'],
      portfolio: ['/assets/artwork2.jpg', '/assets/artwork4.jpg', '/assets/artwork1.jpg']
    },
    erios: {
      name: 'EriOS Tattoo',
      handle: '@eriostattoo',
      role: 'Dark Realism & Blackwork',
      studio: 'Santa Cruz Studio',
      studioType: 'santacruz',
      instagramUrl: 'https://www.instagram.com/eriostattoo/',
      whatsappPhone: '+34600000009',
      email: 'erios@malibutattoostudio.com',
      image: '/assets/artist_erios.jpg',
      bio: isEs
        ? 'Especialista en realismo en sombras, técnica Black & Grey y sombreados de alta profundidad en nuestro estudio de Santa Cruz.'
        : 'Specialist in dark realism, Black & Grey shading and high contrast tattoo work in Santa Cruz.',
      specialties: ['Dark Realism', 'Black & Grey', 'Retratos en Sombra', 'Chicano Style'],
      portfolio: ['/assets/artwork3.jpg', '/assets/artwork1.jpg', '/assets/artwork4.jpg']
    }
  };

  const key = slug?.toLowerCase() || 'yenko';
  const artist = artistsData[key];

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
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 h-[400px] sm:h-[480px]">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full text-black font-mono shadow-md bg-[#ff5500]">
                {artist.studio}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-400 text-xs font-mono font-bold hover:bg-pink-500/20 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>{artist.handle}</span>
              </a>
            </div>
          </div>

          {/* Artist Bio & Contact Options */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff5500]">
                {artist.role}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-heading mt-1">
                {artist.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mt-4">
                {artist.bio}
              </p>
            </div>

            {/* Specialties */}
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

            {/* DIRECT CONTACT ACTION BUTTONS */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white font-mono">
                {isEs ? 'Pedir Cita Directa' : 'Direct Booking'}
              </h4>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Direct WhatsApp Contact */}
                <a
                  href={`https://wa.me/${artist.whatsappPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorHover(true, 'WHATSAPP')}
                  onMouseLeave={() => setCursorHover(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>WhatsApp Directo con {artist.name}</span>
                </a>

                {/* Direct Email */}
                <a
                  href={`mailto:${artist.email}?subject=Cita%20Directa%20Malibu%20Tattoo%20Studio&body=Hola%20${artist.name}`}
                  onMouseEnter={() => setCursorHover(true, 'EMAIL')}
                  onMouseLeave={() => setCursorHover(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:border-white text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#ff5500]" />
                  <span>Email Directo</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* ARTIST INDIVIDUAL PORTFOLIO GALLERY */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black uppercase text-white font-heading">
              PORTAFOLIO DE <span className="text-orange-gradient italic font-normal font-serif-title">{artist.name}</span>
            </h3>
            <a
              href={artist.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-pink-400 hover:underline flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4" />
              <span>Ver más en Instagram</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artist.portfolio.map((img, pIdx) => (
              <div key={pIdx} className="relative rounded-2xl overflow-hidden border border-white/10 h-72 group">
                <img src={img} alt={`Artwork by ${artist.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-white font-mono font-bold">Malibu Original Piece</span>
                </div>
              </div>
            ))}
          </div>

          {/* AUTOMATIC LIVE INSTAGRAM FEED FOR THIS ARTIST */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <InstagramFeed
              feedUrl={artist.instagramFeedUrl || 'https://feeds.behold.so/eEBBeqqjBcTrYjz4wrVS'}
              igHandle={artist.handle}
              igUrl={artist.instagramUrl}
              artistMention={artist.handle}
              language={language}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
