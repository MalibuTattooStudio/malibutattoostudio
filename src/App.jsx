import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import TechOverlay from './components/TechOverlay';
import Navigation from './components/Navigation';
import PageTransition from './components/PageTransition';
import Hero from './components/Hero';
import TattooTruckSection from './components/TattooTruckSection';
import StudiosSection from './components/StudiosSection';
import GallerySection from './components/GallerySection';
import ArtistSection from './components/ArtistSection';
import ReviewsSection from './components/ReviewsSection';
import SignalDivider from './components/SignalDivider';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

// Pages
import TattooTruckPage from './pages/TattooTruckPage';
import StudiosPage from './pages/StudiosPage';
import GalleryPage from './pages/GalleryPage';
import ArtistsPage from './pages/ArtistsPage';
import ArtistProfilePage from './pages/ArtistProfilePage';
import AvisoLegalPage from './pages/legal/AvisoLegalPage';
import PrivacidadPage from './pages/legal/PrivacidadPage';
import CookiesPage from './pages/legal/CookiesPage';

// Internal gallery manager — lazy so it never touches the public bundle path
const AdminPage = lazy(() => import('./pages/AdminPage'));

// WebGL fluid background — lazy so three.js stays out of the critical path
const HeroCanvas = lazy(() => import('./components/HeroCanvas'));

function AnimatedAppRoutes({ handleOpenBooking, setCursorHover, language }) {
  const location = useLocation();

  // Reset custom cursor hover state and scroll to top whenever route changes
  React.useEffect(() => {
    setCursorHover(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, setCursorHover]);

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        {/* Main Home Landing Page */}
        <Route path="/" element={
          <main className="relative z-10">
            <Hero
              onOpenBooking={handleOpenBooking}
              setCursorHover={setCursorHover}
              language={language}
            />

            <StudiosSection
              onOpenBooking={handleOpenBooking}
              setCursorHover={setCursorHover}
              language={language}
            />

            <GallerySection
              onOpenBooking={handleOpenBooking}
              setCursorHover={setCursorHover}
              language={language}
            />

            <ArtistSection
              setCursorHover={setCursorHover}
              language={language}
            />

            <TattooTruckSection
              setCursorHover={setCursorHover}
              language={language}
            />

            <ReviewsSection
              setCursorHover={setCursorHover}
              language={language}
            />

            <SignalDivider language={language} />
          </main>
        } />

        {/* Dedicated Studios Page */}
        <Route path="/estudios" element={
          <StudiosPage
            onOpenBooking={handleOpenBooking}
            setCursorHover={setCursorHover}
            language={language}
          />
        } />

        {/* Dedicated TattooTruck Caravan Page */}
        <Route path="/tattootruck" element={
          <TattooTruckPage
            onOpenBooking={handleOpenBooking}
            setCursorHover={setCursorHover}
            language={language}
          />
        } />

        {/* Dedicated Gallery Portfolio Page */}
        <Route path="/galeria" element={
          <GalleryPage
            onOpenBooking={handleOpenBooking}
            setCursorHover={setCursorHover}
            language={language}
          />
        } />

        {/* Dedicated Artists Page */}
        <Route path="/artistas" element={
          <ArtistsPage
            onOpenBooking={handleOpenBooking}
            setCursorHover={setCursorHover}
            language={language}
          />
        } />

        {/* Dedicated Individual Artist Page */}
        <Route path="/artista/:slug" element={
          <ArtistProfilePage
            onOpenBooking={handleOpenBooking}
            setCursorHover={setCursorHover}
            language={language}
          />
        } />

        {/* Legal pages */}
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>
    </PageTransition>
  );
}

function SiteShell() {
  const [activeTab, setActiveTab] = useState('hero');
  const [language, setLanguage] = useState('es');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLocation, setBookingLocation] = useState('santacruz');

  // Custom Cursor state
  const [cursorHover, setCursorHoverState] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorPreviewData, setCursorPreviewData] = useState(null);

  const setCursorHover = useCallback((hover, text = '', previewData = null) => {
    setCursorHoverState(hover);
    setCursorText(text);
    setCursorPreviewData(previewData);
  }, []);

  const handleOpenBooking = useCallback((loc = 'santacruz') => {
    setBookingLocation(loc);
    setBookingOpen(true);
  }, []);

  // The native cursor is only ever hidden while CustomCursor is mounted to
  // replace it (here, on the public site). /admin renders outside SiteShell
  // and has no replacement — it must keep the real cursor, so this class
  // lives on the component that needs it instead of statically in index.html.
  useEffect(() => {
    document.body.classList.add('cursor-none');
    return () => document.body.classList.remove('cursor-none');
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-slate-100 bg-noise selection:bg-[#ff5500] selection:text-black">
      {/* Dynamic Custom Cursor with Floating Photo Preview */}
      <CustomCursor isHovered={cursorHover} cursorText={cursorText} previewData={cursorPreviewData} />

      {/* Active Theory WebGL Fluid Background */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Active Theory Tech HUD Overlay */}
      <TechOverlay />

      {/* Glassmorphic Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onOpenBooking={handleOpenBooking}
        setCursorHover={setCursorHover}
      />

      {/* Animated Routes Container */}
      <AnimatedAppRoutes
        handleOpenBooking={handleOpenBooking}
        setCursorHover={setCursorHover}
        language={language}
      />

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} language={language} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialLocation={bookingLocation}
        language={language}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#070709]" />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="/*" element={<SiteShell />} />
      </Routes>
    </Router>
  );
}
