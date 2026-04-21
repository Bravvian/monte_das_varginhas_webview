import useLanguage from '../hooks/useLanguage';
import { GALLERY, OFFSETS } from '../data/images';

export default function Gallery({ onImageClick }) {
  const { t } = useLanguage();
  return (
    <section id="gallery">
      <div className="container">
        <div className="tag">{t('gal_tag')}</div>
        <h2 className="stitle">{t('gal_title')}</h2>
        <div className="gal-g">
          {GALLERY.map((src, i) => (
            <div className="gal-img" key={src} onClick={() => onImageClick(OFFSETS.GALLERY + i)}>
              <img src={src} alt={`Monte Varginhas photo ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        <button className="gal-btn" onClick={() => onImageClick(OFFSETS.GALLERY)}>
          <i className="fa fa-images"></i>
          <span>{t('gal_btn')}</span>
        </button>
      </div>
    </section>
  );
}
