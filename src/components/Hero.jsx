import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { IDS, gdUrl } from '../data/images';

const HERO_IDS = IDS.slice(0, 5);

export default function Hero() {
  const { t } = useLanguage();
  const [cur, setCur] = useState(0);

  const goSlide = (n) => setCur((n + HERO_IDS.length) % HERO_IDS.length);

  useEffect(() => {
    const id = setInterval(() => goSlide(cur + 1), 5000);
    return () => clearInterval(id);
  }, [cur]);

  return (
    <section id="hero">
      <div className="slides">
        {HERO_IDS.map((id, i) => (
          <div
            key={id}
            className={`slide${i === cur ? ' on' : ''}`}
            style={{ backgroundImage: `url(${gdUrl(id)})` }}
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
        {HERO_IDS.map((_, i) => (
          <button key={i} className={`dot${i === cur ? ' on' : ''}`} onClick={() => goSlide(i)} />
        ))}
      </div>
    </section>
  );
}
