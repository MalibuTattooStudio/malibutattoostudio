import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calendar, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import InstagramIcon from './icons/InstagramIcon';

const navLinks = [
  { id: 'studios', path: '/estudios', labelEs: 'Estudios', labelEn: 'Studios' },
  { id: 'tattootruck', path: '/tattootruck', labelEs: 'TattooTruck', labelEn: 'TattooTruck' },
  { id: 'gallery', path: '/galeria', labelEs: 'Galería', labelEn: 'Gallery' },
  { id: 'artists', path: '/artistas', labelEs: 'Artistas', labelEn: 'Artists' },
];

export default function Navigation({ 
  activeTab, 
  setActiveTab, 
  language, 
  setLanguage, 
  onOpenBooking,
  setCursorHover 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lightSpotRef = useRef(null);
  const isEs = language === 'es';
  const location = useLocation();
  const navigate = useNavigate();

  // Solid nav whenever scrolled, or on any inner route (no hero to sit over there)
  const solidNav = isScrolled || location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    // Move the underline light-spot with the cursor via a ref — no re-render per mousemove
    const handleMouseMove = (e) => {
      if (lightSpotRef.current) {
        lightSpotRef.current.style.left = `${(e.clientX / window.innerWidth) * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
    setActiveTab(link.id);
    navigate(link.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab('hero');
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-600 ${
          solidNav
            ? 'py-3 bg-[#070709]/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-white/[0.06]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-between items-center relative">
          
          {/* ── WORDMARK LOGO ── */}
          <div 
            onClick={scrollToTop}
            onMouseEnter={() => setCursorHover(true, 'INICIO')}
            onMouseLeave={() => setCursorHover(false)}
            className="flex items-center gap-3 cursor-none group select-none"
          >
            {/* Small decorative emblem */}
            <div className={`rounded-full border border-[#ff5500]/40 overflow-hidden transition-all duration-500 group-hover:border-[#ff5500] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.3)] ${
              solidNav ? 'w-8 h-8' : 'w-10 h-10'
            }`}>
              <img
                src="/assets/logo.jpg"
                alt="Malibu"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className={`font-heading font-extrabold tracking-[0.08em] text-white uppercase leading-none group-hover:text-[#ff5500] transition-colors duration-300 ${
                solidNav ? 'text-base' : 'text-lg'
              }`}>
                MALIBU
              </span>
              <span className="text-[0.6rem] tracking-[0.18em] text-zinc-500 uppercase leading-none mt-0.5 font-light">
                Tattoo Studio
              </span>
            </div>
          </div>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (location.pathname === '/' && activeTab === link.id);
              const label = isEs ? link.labelEs : link.labelEn;
              
              return (
                <div 
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  onMouseEnter={() => setCursorHover(true, label.toUpperCase())}
                  onMouseLeave={() => setCursorHover(false)}
                  className="relative cursor-none group py-1"
                >
                  <span className={`text-[0.8rem] font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-white font-bold' : 'text-zinc-400 group-hover:text-white'
                  }`}>
                    {label}
                  </span>
                  
                  {/* Cuberto-style underline: slides in from left */}
                  <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#ff5500] transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span 
                      layoutId="nav-active-dot"
                      className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ff5500]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/malibutattoostudio/" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorHover(true, 'INSTAGRAM')}
              onMouseLeave={() => setCursorHover(false)}
              className="text-zinc-500 hover:text-white transition-colors duration-300 cursor-none"
            >
              <InstagramIcon size={17} strokeWidth={1.5} />
            </a>
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              onMouseEnter={() => setCursorHover(true, 'IDIOMA')}
              onMouseLeave={() => setCursorHover(false)}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors duration-300 cursor-none"
            >
              <Globe size={16} strokeWidth={1.5} />
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider">{language}</span>
            </button>

            {/* CTA: Breathing Glow Booking Button */}
            <button
              onClick={() => onOpenBooking('general')}
              onMouseEnter={() => setCursorHover(true, 'RESERVAR')}
              onMouseLeave={() => setCursorHover(false)}
              className="relative cursor-none group"
            >
              <span className="absolute inset-0 rounded-full bg-[#ff5500]/15 blur-xl cta-glow" />
              <span className="relative flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm group-hover:border-[#ff5500]/40 group-hover:bg-[#ff5500]/10 transition-all duration-400">
                <Calendar size={14} className="text-[#ff5500]" />
                <span className="text-[0.78rem] font-semibold tracking-wide text-white">
                  {isEs ? 'Reservar Cita' : 'Book Now'}
                </span>
              </span>
            </button>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            onMouseEnter={() => setCursorHover(true, 'MENÚ')}
            onMouseLeave={() => setCursorHover(false)}
            aria-label={isEs ? 'Abrir menú' : 'Open menu'}
            className="lg:hidden text-white cursor-none p-2 -mr-2"
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── INTERACTIVE EXPANDING LINE FROM CENTER TO SIDES ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: solidNav ? 1 : 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full bg-gradient-to-r from-transparent via-[#ff5500] to-transparent origin-center opacity-80"
          />
          {/* Interactive mouse light spot (position set via ref, no re-render) */}
          <div
            ref={lightSpotRef}
            className="absolute top-0 bottom-0 w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffaa66] to-transparent transition-[left] duration-150 ease-out opacity-90 hidden lg:block"
            style={{ left: '50%' }}
          />
        </div>

      </motion.nav>

      {/* ══════════════════════════════════════
          FULL SCREEN MOBILE MENU OVERLAY
         ══════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#070709] flex flex-col overflow-y-auto"
          >
            {/* Top bar with close */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-2.5" onClick={scrollToTop}>
                <div className="w-8 h-8 rounded-full border border-[#ff5500]/40 overflow-hidden">
                  <img src="/assets/logo.jpg" alt="Malibu" className="w-full h-full object-cover" />
                </div>
                <span className="font-heading font-extrabold text-base tracking-[0.08em] text-white uppercase">
                  MALIBU
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={isEs ? 'Cerrar menú' : 'Close menu'}
                className="text-zinc-400 hover:text-white transition-colors p-2 -mr-2"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6 divide-y divide-white/[0.06]">
              {navLinks.map((link, i) => {
                const label = isEs ? link.labelEs : link.labelEn;
                const isActive = location.pathname === link.path || (location.pathname === '/' && activeTab === link.id);

                return (
                  <motion.button
                    key={link.id}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNavClick(link)}
                    className="group flex items-center gap-4 py-5 w-full text-left"
                  >
                    <span className={`font-mono text-[0.7rem] tracking-widest tabular-nums transition-colors ${
                      isActive ? 'text-[#ff5500]' : 'text-zinc-600'
                    }`}>
                      0{i + 1}
                    </span>
                    <span className={`font-heading font-bold text-[1.85rem] sm:text-4xl uppercase tracking-tight leading-none transition-colors ${
                      isActive ? 'text-[#ff5500]' : 'text-zinc-200 group-active:text-white'
                    }`}>
                      {label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 sm:px-8 pb-10 space-y-6"
            >
              <div className="h-px w-full bg-white/[0.06]" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <a 
                    href="https://www.instagram.com/malibutattoostudio/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <InstagramIcon size={18} />
                    <span className="font-mono text-xs tracking-wider">@malibutattoostudio</span>
                  </a>
                </div>
                
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <Globe size={16} />
                  <span className="text-sm font-bold uppercase">{language}</span>
                </button>
              </div>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking('general');
                }}
                className="w-full py-4 bg-[#ff5500] text-black font-extrabold text-sm tracking-[0.15em] uppercase hover:bg-[#ff7700] transition-colors"
              >
                {isEs ? 'Reservar Cita' : 'Book Now'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
