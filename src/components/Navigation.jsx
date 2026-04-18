import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [mobOpen, setMobOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMob = () => setMobOpen(false);

  return (
    <>
      <nav style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,.08)' : 'none' }}>
        <div className="container nav-i">
          <a className="logo" href="#hero">Monte <span>Varginhas</span></a>
          <ul className="nav-links">
            <li><a href="#about">{t('nav_about')}</a></li>
            <li><a href="#pricing">{t('nav_price')}</a></li>
            <li><a href="#gallery">{t('nav_gallery')}</a></li>
            <li><a href="#reviews">{t('nav_reviews')}</a></li>
            <li><a href="#loc">{t('nav_loc')}</a></li>
            <li>
              <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}>
                {lang === 'en' ? 'PT' : 'EN'}
              </button>
            </li>
            <li><a href="#booking" className="nav-cta">{t('nav_book')}</a></li>
          </ul>
          <button className="hamburger" onClick={() => setMobOpen((o) => !o)}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </nav>
      <div className="mob-menu" style={{ display: mobOpen ? 'flex' : 'none' }}>
        <a href="#about" onClick={closeMob}>{t('nav_about')}</a>
        <a href="#pricing" onClick={closeMob}>{t('nav_price')}</a>
        <a href="#gallery" onClick={closeMob}>{t('nav_gallery')}</a>
        <a href="#reviews" onClick={closeMob}>{t('nav_reviews')}</a>
        <a href="#loc" onClick={closeMob}>{t('nav_loc')}</a>
        <a href="#booking" onClick={closeMob}>{t('nav_book')}</a>
      </div>
    </>
  );
}
