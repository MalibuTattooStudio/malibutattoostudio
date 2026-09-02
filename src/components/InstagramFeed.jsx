import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, ExternalLink, RefreshCw, Heart, MessageCircle, Sparkles } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   AUTOMATIC INSTAGRAM FEED COMPONENT — Malibu Tattoo Studio
   Connects to Behold.so or Meta Basic Display API
   Auto-syncs live Instagram posts for artists & studio
   ═══════════════════════════════════════════════════════════ */

export default function InstagramFeed({ 
  feedUrl = 'https://feeds.behold.so/eEBBeqqjBcTrYjz4wrVS', 
  igHandle = '@malibutattoostudio', 
  igUrl = 'https://www.instagram.com/malibutattoostudio/',
  artistMention = '',
  limit = 12,
  language = 'es' 
}) {
  const isEs = language === 'es';
  const [feedData, setFeedData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const targetUrl = feedUrl || 'https://feeds.behold.so/eEBBeqqjBcTrYjz4wrVS';
    setLoading(true);
    setError(false);

    fetch(targetUrl)
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con la API de Instagram');
        return res.json();
      })
      .then(data => {
        setFeedData(data);
        // Handle Behold.so API format (data.posts) or standard array format
        let rawPosts = Array.isArray(data) ? data : (data.posts || data.data || []);
        
        // If an artist mention filter is requested, try to filter
        if (artistMention) {
          const cleanMention = artistMention.replace('@', '').toLowerCase();
          const filtered = rawPosts.filter(p => {
            const mentions = Array.isArray(p.mentions) ? p.mentions.map(m => m.toLowerCase()) : [];
            const caption = (p.caption || '').toLowerCase();
            return mentions.includes(cleanMention) || caption.includes(cleanMention);
          });
          // If we found matching posts, use them; otherwise fallback to all posts
          if (filtered.length > 0) {
            rawPosts = filtered;
          }
        }
        
        setPosts(rawPosts.slice(0, limit));
        setLoading(false);
      })
      .catch(err => {
        console.warn('Instagram API Feed notice:', err);
        setError(true);
        setLoading(false);
      });
  }, [feedUrl, artistMention, limit]);

  return (
    <div className="w-full space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              {feedData?.profilePictureUrl ? (
                <img src={feedData.profilePictureUrl} alt="Malibu Tattoo" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-6 h-6 text-pink-400" />
              )}
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff5500] font-mono">
                INSTAGRAM LIVE SYNC
              </span>
            </div>
            <h4 className="text-base font-black text-white font-heading">
              {artistMention || igHandle}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(219,39,119,0.3)] cursor-pointer"
          >
            <span>{isEs ? 'Ver en Instagram' : 'View on Instagram'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border border-white/10">
          <RefreshCw className="w-8 h-8 text-[#ff5500] animate-spin mx-auto" />
          <p className="text-xs text-slate-300 font-mono tracking-wider">
            {isEs ? 'Sincronizando publicaciones oficiales de Malibu Tattoo...' : 'Syncing official Malibu Tattoo posts...'}
          </p>
        </div>
      )}

      {/* LIVE POSTS GRID */}
      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => {
            const imageUrl = post.sizes?.large?.mediaUrl || post.sizes?.medium?.mediaUrl || post.mediaUrl || post.thumbnail_url;
            return (
              <motion.a
                key={post.id || idx}
                href={post.permalink || igUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="relative group rounded-2xl overflow-hidden aspect-square border border-white/10 block glass-panel shadow-lg"
              >
                <img
                  src={imageUrl}
                  alt={post.caption || 'Instagram Malibu Tattoo Post'}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold bg-[#ff5500] text-black px-2 py-0.5 rounded-full">
                      {post.mediaType === 'VIDEO' ? 'REEL' : post.mediaType === 'CAROUSEL_ALBUM' ? 'ÁLBUM' : 'FOTO'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                  </div>

                  <div className="space-y-1">
                    {post.caption && (
                      <p className="text-[10px] text-slate-200 line-clamp-2 font-light leading-snug">
                        {post.caption}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-[10px] font-mono text-pink-400 font-bold pt-1">
                      {post.likeCount !== undefined && (
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-current text-pink-500" />
                          {post.likeCount}
                        </span>
                      )}
                      {post.commentsCount !== undefined && (
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-cyan-400" />
                          {post.commentsCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      )}

      {/* ERROR FALLBACK */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 text-[#ff5500] text-[10px] font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feed de Instagram</span>
          </div>
          <p className="text-xs text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
            {isEs 
              ? 'Puedes ver todas las publicaciones directamente en nuestro perfil oficial de Instagram.'
              : 'You can check all our latest posts on our official Instagram profile.'}
          </p>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-pink-400 font-mono hover:underline"
          >
            <span>{igHandle}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

    </div>
  );
}
