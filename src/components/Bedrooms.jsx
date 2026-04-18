import useLanguage from '../hooks/useLanguage';
import { IDS, gdUrl } from '../data/images';

const BEDS = [
  { nameKey: 'bed1', descKey: 'bed1d', imgIdx: 20 },
  { nameKey: 'bed2', descKey: 'bed2d', imgIdx: 25 },
  { nameKey: 'bed3', descKey: 'bed3d', imgIdx: 30 },
  { nameKey: 'bed4', descKey: 'bed4d', imgIdx: 35 },
];

export default function Bedrooms({ onImageClick }) {
  const { t } = useLanguage();
  return (
    <section id="bedrooms">
      <div className="container">
        <div className="tag">{t('beds_tag')}</div>
        <h2 className="stitle">{t('beds_title')}</h2>
        <div className="beds-g">
          {BEDS.map((bed) => (
            <div className="bed-card" key={bed.nameKey} onClick={() => onImageClick?.(bed.imgIdx)}>
              <div className="bed-img">
                <img src={gdUrl(IDS[bed.imgIdx])} alt={t(bed.nameKey)} loading="lazy" />
              </div>
              <div className="bed-body">
                <h3>{t(bed.nameKey)}</h3>
                <p>
                  <i className="fa fa-bed" style={{ color: 'var(--terra)', marginRight: '5px' }}></i>
                  <span>{t(bed.descKey)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
