import useLanguage from '../hooks/useLanguage';
import { IDS, gdUrl } from '../data/images';

const GALLERY_INDICES = [6, 7, 8, 9, 10];

export default function Gallery({ onImageClick }) {
  const { t } = useLanguage();
  return (
    <section id="gallery">
      <div className="container">
        <div className="tag">{t('gal_tag')}</div>
        <h2 className="stitle">{t('gal_title')}</h2>
        <div className="gal-g">
          {GALLERY_INDICES.map((imgIdx) => (
            <div className="gal-img" key={imgIdx} onClick={() => onImageClick(imgIdx)}>
              <img src={gdUrl(IDS[imgIdx])} alt={`Monte Varginhas photo ${imgIdx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        <button className="gal-btn" onClick={() => onImageClick(0)}>
          <i className="fa fa-images"></i>
          <span>{t('gal_btn')}</span>
        </button>
      </div>
    </section>
  );
}
