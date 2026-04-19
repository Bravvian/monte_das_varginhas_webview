import { useEffect } from 'react';
import './styles/main.css';
import { IDS } from './data/images';
import useLightbox from './hooks/useLightbox';
import useLanguage from './hooks/useLanguage';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Bedrooms from './components/Bedrooms';
import Amenities from './components/Amenities';
import Pricing from './components/Pricing';
import HouseRules from './components/HouseRules';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const { open, idx, lbOpen, lbClose, lbNav } = useLightbox();
  const onNav = (dir) => lbNav(dir, IDS.length);
  const { lang } = useLanguage();

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero onGalleryClick={() => lbOpen(0)} />
        <Stats />
        <About onImageClick={lbOpen} />
        <Bedrooms onImageClick={lbOpen} />
        <Amenities />
        <Pricing />
        <HouseRules />
        <Gallery onImageClick={lbOpen} />
        <Booking />
        <Reviews />
        <Location />
        <Footer />
      </main>
      <WhatsAppFloat />
      <CookieBanner />
      <Lightbox open={open} idx={idx} onClose={lbClose} onNav={onNav} />
    </>
  );
}
