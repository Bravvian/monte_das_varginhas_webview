import useLanguage from '../hooks/useLanguage';
import { IDS, gdUrl } from '../data/images';

const FEATURES = [
  { icon: 'fa fa-door-open', titleKey: 'f1t', subKey: 'f1s' },
  { icon: 'fa fa-fire', titleKey: 'f2t', subKey: 'f2s' },
  { icon: 'fa fa-umbrella-beach', titleKey: 'f3t', subKey: 'f3s' },
  { icon: 'fa fa-tree', titleKey: 'f4t', subKey: 'f4s' },
];

export default function About({ onImageClick }) {
  const { t } = useLanguage();
  return (
    <section id="about">
      <div className="container">
        <div className="about-g">
          <div>
            <div className="tag">{t('about_tag')}</div>
            <h2 className="stitle" dangerouslySetInnerHTML={{ __html: t('about_title') }} />
            <p style={{ color: 'var(--muted)', marginBottom: '14px' }}>{t('about_p1')}</p>
            <p style={{ color: 'var(--muted)', marginBottom: '28px' }}>{t('about_p2')}</p>
            <div className="feats">
              {FEATURES.map((f) => (
                <div className="feat" key={f.titleKey}>
                  <div className="ficon"><i className={f.icon}></i></div>
                  <div className="ftxt">
                    <strong>{t(f.titleKey)}</strong>
                    <span>{t(f.subKey)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-img" onClick={() => onImageClick?.(5)}>
            <img src={gdUrl(IDS[5])} alt="Monte Varginhas" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
