import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, ExternalLink, Camera, Heart, MessageCircle, Eye, X, ChevronLeft, ChevronRight, Sparkles, Layers, Video, Filter } from 'lucide-react';

export default function GalleryPage({ onOpenBooking, setCursorHover, language }) {
  const isEs = language === 'es';
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    fetch('https://feeds.behold.so/eEBBeqqjBcTrYjz4wrVS')
      .then(res => res.json())
      .then(data => {
        setProfile({
          username: data.username || 'malibutattoostudio',
          profilePictureUrl: data.profilePictureUrl,
          followersCount: data.followersCount || 9700,
          biography: data.biography || 'Malibu Tattoo Studio Tenerife'
        });
        const items = data.posts || data.data || (Array.isArray(data) ? data : []);
        setPosts(items);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Gallery page Instagram feed notice:', err);
        setLoading(false);
      });
  }, []);

  // View mode: 'all_photos' (unpacks all 18+ carousel children) or 'posts' (grouped albums)
  const [viewMode, setViewMode] = useState('all_photos');

  // Build flattened items when viewMode is 'all_photos'
  const displayItems = React.useMemo(() => {
    if (viewMode === 'posts') {
      return posts.map(p => ({
        id: p.id,
        imageUrl: p.sizes?.large?.mediaUrl || p.sizes?.medium?.mediaUrl || p.mediaUrl || p.thumbnail_url,
        mediaType: p.mediaType,
        caption: p.caption,
        mentions: p.mentions,
        permalink: p.permalink,
        likeCount: p.likeCount,
        commentsCount: p.commentsCount,
        children: p.children,
        isAlbum: p.mediaType === 'CAROUSEL_ALBUM',
        parentPost: p,
        slideIndex: 0
      }));
    }

    // Flatten all carousel photos into individual gallery pieces
    const items = [];
    posts.forEach(p => {
      if (p.children && p.children.length > 0) {
        p.children.forEach((child, cIdx) => {
          items.push({
            id: `${p.id}_child_${cIdx}`,
            imageUrl: child.sizes?.large?.mediaUrl || child.sizes?.medium?.mediaUrl || child.mediaUrl,
            mediaType: child.mediaType || 'IMAGE',
            caption: p.caption,
            mentions: p.mentions,
            permalink: p.permalink,
            likeCount: p.likeCount,
            commentsCount: p.commentsCount,
            children: p.children,
            isAlbum: true,
            photoNumber: cIdx + 1,
            totalPhotos: p.children.length,
            parentPost: p,
            slideIndex: cIdx
          });
        });
      } else {
        items.push({
          id: p.id,
          imageUrl: p.sizes?.large?.mediaUrl || p.sizes?.medium?.mediaUrl || p.mediaUrl || p.thumbnail_url,
          mediaType: p.mediaType,
          caption: p.caption,
          mentions: p.mentions,
          permalink: p.permalink,
          likeCount: p.likeCount,
          commentsCount: p.commentsCount,
          children: [],
          isAlbum: false,
          parentPost: p,
          slideIndex: 0
        });
      }
    });
    return items;
  }, [posts, viewMode]);

  // Filter items
  const filteredItems = displayItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'carousel') return item.isAlbum;
    if (activeFilter === 'video') return item.mediaType === 'VIDEO';
    if (activeFilter === 'image') return item.mediaType === 'IMAGE' && !item.isAlbum;
    const text = ((item.caption || '') + ' ' + (item.mentions || []).join(' ')).toLowerCase();
    if (activeFilter === 'ornamental') return text.includes('ornamental') || text.includes('dotwork') || text.includes('botan');
    if (activeFilter === 'blackwork') return text.includes('blackwork') || text.includes('black & grey') || text.includes('realis');
    return true;
  });

  const openLightbox = (item) => {
    setSelectedPost(item.parentPost || item);
    setCurrentSlideIndex(item.slideIndex || 0);
  };

  const nextSlide = () => {
    if (!selectedPost?.children?.length) return;
    setCurrentSlideIndex(prev => (prev + 1) % selectedPost.children.length);
  };

  const prevSlide = () => {
    if (!selectedPost?.children?.length) return;
    setCurrentSlideIndex(prev => (prev - 1 + selectedPost.children.length) % selectedPost.children.length);
  };

  return (
    <div className="min-h-screen bg-[#070709]/60 backdrop-blur-xs text-white pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans text-left">
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ff5500]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] text-xs font-extrabold uppercase tracking-widest font-mono">
            <Sparkles className="w-4 h-4" />
            <span>INSTAGRAM LIVE FEED & PORTAFOLIO OFICIAL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-tight overflow-visible">
            GALERÍA DE <span className="text-orange-gradient font-serif-title italic font-normal">TRABAJOS</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {isEs 
              ? 'Todas las obras y sesiones reales de nuestros artistas residentes en Santa Cruz, Tabaiba y TattooTruck, sincronizadas en directo con Instagram.' 
              : 'All bespoke ink masterpieces synchronized live from our official Instagram profile.'}
          </p>

          {/* INSTAGRAM OFFICIAL FEED BADGE */}
          {profile && (
            <div className="pt-2 flex items-center justify-center">
              <a
                href="https://www.instagram.com/malibutattoostudio/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorHover(true, 'INSTAGRAM')}
                onMouseLeave={() => setCursorHover(false)}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-mono font-bold hover:opacity-95 transition-opacity shadow-[0_0_25px_rgba(219,39,119,0.4)] cursor-pointer"
              >
                {profile.profilePictureUrl && (
                  <img src={profile.profilePictureUrl} alt="Malibu Tattoo" className="w-6 h-6 rounded-full object-cover border border-white/40" />
                )}
                <span>@{profile.username} en Instagram</span>
                <span className="bg-black/40 px-2 py-0.5 rounded-full text-[10px] text-pink-200">{(profile.followersCount / 1000).toFixed(1)}k fans</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* VIEW MODE SELECTOR + CATEGORY FILTERS */}
        <div className="space-y-6 mb-12">
          {/* Main View Mode Selector */}
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex p-1 rounded-full bg-black/80 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setViewMode('all_photos')}
                onMouseEnter={() => setCursorHover(true, 'FOTOS')}
                onMouseLeave={() => setCursorHover(false)}
                className={`px-6 py-2.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'all_photos'
                    ? 'bg-[#ff5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Todas las Fotos ({displayItems.length} Piezas)</span>
              </button>

              <button
                onClick={() => setViewMode('posts')}
                onMouseEnter={() => setCursorHover(true, 'ÁLBUMES')}
                onMouseLeave={() => setCursorHover(false)}
                className={`px-6 py-2.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'posts'
                    ? 'bg-[#ff5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Por Publicación ({posts.length} Posts)</span>
              </button>
            </div>
          </div>

          {/* Sub-filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'all', label: isEs ? 'Todas las Obras' : 'All Works', icon: Layers },
              { id: 'carousel', label: isEs ? 'Álbumes / Sesiones' : 'Albums / Sessions', icon: Camera },
              { id: 'video', label: isEs ? 'Reels & Vídeos' : 'Reels & Videos', icon: Video },
              { id: 'ornamental', label: 'Ornamental & Dotwork' },
              { id: 'blackwork', label: 'Blackwork & Realismo' }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  onMouseEnter={() => setCursorHover(true, 'FILTRAR')}
                  onMouseLeave={() => setCursorHover(false)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-white text-black shadow-lg'
                      : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <div key={n} className="h-96 rounded-3xl glass-panel animate-pulse border border-white/10 bg-white/5" />
            ))}
          </div>
        )}

        {/* MASONRY / GRID OF REAL INSTAGRAM POSTS */}
        {!loading && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {filteredItems.map((item, idx) => {
                const artistMention = item.mentions && item.mentions.length > 0 ? `@${item.mentions[0]}` : '@malibutattoostudio';

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                    key={item.id || idx}
                    onClick={() => openLightbox(item)}
                    onMouseEnter={() => setCursorHover(true, 'AMPLIAR')}
                    onMouseLeave={() => setCursorHover(false)}
                    className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#ff5500]/50 transition-all duration-500 group text-left flex flex-col justify-between cursor-pointer shadow-2xl"
                  >
                    <div className="relative h-96 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.caption || 'Malibu Tattoo Piece'}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                      
                      {/* Media Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-black bg-[#ff5500] px-3 py-1 rounded-full font-mono shadow-md">
                          {item.mediaType === 'VIDEO' ? 'REEL' : item.photoNumber ? `FOTO ${item.photoNumber}/${item.totalPhotos}` : item.isAlbum ? `ÁLBUM (${item.children?.length || 4} FOTOS)` : 'PIEZA ORIGINAL'}
                        </span>
                      </div>

                      {/* Top right eye icon */}
                      <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 text-[#ff5500]" />
                      </div>

                      {/* Bottom Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-400 text-xs font-mono font-bold">
                            <Camera className="w-3.5 h-3.5" />
                            <span>{artistMention}</span>
                          </span>
                        </div>

                        {item.caption && (
                          <p className="text-xs text-slate-200 line-clamp-2 font-light leading-relaxed">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom action bar */}
                    <div className="p-4 bg-black/60 backdrop-blur-md flex items-center justify-between border-t border-white/10">
                      <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-300">
                        {item.likeCount !== undefined && (
                          <span className="flex items-center gap-1 text-pink-400">
                            <Heart className="w-3.5 h-3.5 fill-current text-pink-500" />
                            <span>{item.likeCount}</span>
                          </span>
                        )}
                        {item.commentsCount !== undefined && (
                          <span className="flex items-center gap-1 text-cyan-400">
                            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{item.commentsCount}</span>
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(`instagram-${item.id}`);
                        }}
                        onMouseEnter={() => setCursorHover(true, 'CITA')}
                        onMouseLeave={() => setCursorHover(false)}
                        className="px-4 py-2 rounded-full bg-[#ff5500] text-black font-extrabold text-[10px] uppercase tracking-wider hover:bg-[#ff7700] transition-colors shadow-md cursor-pointer"
                      >
                        {isEs ? 'Pedir Parecido' : 'Request Similar'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* LIGHTBOX MODAL WITH FULL CAROUSEL MULTI-PHOTO SLIDES */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full glass-panel rounded-3xl overflow-hidden border border-white/20 grid grid-cols-1 lg:grid-cols-12 text-left max-h-[90vh] shadow-2xl"
              >
                
                {/* Visual Section */}
                <div className="lg:col-span-7 relative bg-black flex items-center justify-center min-h-[350px] lg:min-h-[550px] overflow-hidden">
                  {(() => {
                    const currentImg = selectedPost.children && selectedPost.children.length > 0
                      ? selectedPost.children[currentSlideIndex]?.mediaUrl || selectedPost.mediaUrl
                      : selectedPost.sizes?.large?.mediaUrl || selectedPost.sizes?.medium?.mediaUrl || selectedPost.mediaUrl;

                    return (
                      <img
                        src={currentImg}
                        alt="Instagram Piece Detail"
                        className="w-full h-full object-contain max-h-[550px]"
                      />
                    );
                  })()}

                  {/* Carousel Controls */}
                  {selectedPost.children && selectedPost.children.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer"
                        title="Foto anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer"
                        title="Siguiente foto"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Photo counter dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                        {selectedPost.children.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setCurrentSlideIndex(dotIdx)}
                            className={`h-1.5 rounded-full transition-all ${
                              currentSlideIndex === dotIdx ? 'w-5 bg-[#ff5500]' : 'w-1.5 bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details & Action Column */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
                  
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff5500] bg-[#ff5500]/10 px-3 py-1 rounded-full border border-[#ff5500]/30">
                        {selectedPost.mediaType === 'VIDEO' ? 'REEL INSTAGRAM' : selectedPost.mediaType === 'CAROUSEL_ALBUM' ? `ÁLBUM (${currentSlideIndex + 1}/${selectedPost.children?.length || 1})` : 'OBRA ORIGINAL'}
                      </span>
                      <button
                        onClick={() => setSelectedPost(null)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Artist */}
                    <div className="mt-4 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          <Camera className="w-4 h-4 text-pink-400" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Artista Malibu Tattoo</span>
                        <h4 className="text-sm font-black text-white font-heading">
                          {selectedPost.mentions && selectedPost.mentions.length > 0 ? `@${selectedPost.mentions[0]}` : '@malibutattoostudio'}
                        </h4>
                      </div>
                    </div>

                    {/* Caption */}
                    {selectedPost.caption && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed whitespace-pre-line">
                          {selectedPost.caption}
                        </p>
                      </div>
                    )}

                    {/* Likes & Comments */}
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10 text-xs font-mono font-bold">
                      {selectedPost.likeCount !== undefined && (
                        <div className="flex items-center gap-1.5 text-pink-400">
                          <Heart className="w-4 h-4 fill-current text-pink-500" />
                          <span>{selectedPost.likeCount} Me gusta</span>
                        </div>
                      )}
                      {selectedPost.commentsCount !== undefined && (
                        <div className="flex items-center gap-1.5 text-cyan-400">
                          <MessageCircle className="w-4 h-4 text-cyan-400" />
                          <span>{selectedPost.commentsCount} Comentarios</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSelectedPost(null);
                        onOpenBooking('instagram-artwork');
                      }}
                      className="w-full py-3.5 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#ff7700] transition-colors shadow-[0_0_25px_rgba(255,85,0,0.4)] cursor-pointer"
                    >
                      {isEs ? 'Reservar Cita en Este Estilo' : 'Book Session for This Style'}
                    </button>

                    <a
                      href={selectedPost.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-full glass-panel border border-pink-500/40 hover:bg-pink-500/10 text-pink-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{isEs ? 'Ver Post en Instagram' : 'View Post on Instagram'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
