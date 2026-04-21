import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { HERO } from '../data/images';

const SLIDES = HERO.slice(0, 5);

export default function Hero() {
  const { t } = useLanguage();
  const [cur, setCur] = useState(0);

  const goSlide = (n) => setCur((n + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(() => goSlide(cur + 1), 5000);
    return () => clearInterval(id);
  }, [cur]);

  return (
    <section id="hero">
      <div className="slides">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`slide${i === cur ? ' on' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div className="overlay"></div>
      <div className="hero-c">
        <div className="badge">{t('hero_badge')}</div>
        <h1>Monte das Varginhas</h1>
        <p>{t('hero_sub')}</p>
        <div className="hero-btns">
          <a href="#booking" className="btn-p">
            <i className="fa fa-calendar-check"></i>
            <span>{t('hero_btn1')}</span>
          </a>
          <a href="#gallery" className="btn-s">
            <i className="fa fa-images"></i>
            <span>{t('hero_btn2')}</span>
          </a>
        </div>
      </div>
      <div className="dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`dot${i === cur ? ' on' : ''}`} onClick={() => goSlide(i)} />
        ))}
      </div>
    </section>
  );
}
