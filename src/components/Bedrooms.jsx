import useLanguage from '../hooks/useLanguage';
import { ROOM1, ROOM2, ROOM3, ROOM4, OFFSETS } from '../data/images';

const BEDS = [
  { nameKey: 'bed1', descKey: 'bed1d', cover: ROOM1[0], lbOffset: OFFSETS.ROOM1 },
  { nameKey: 'bed2', descKey: 'bed2d', cover: ROOM2[0], lbOffset: OFFSETS.ROOM2 },
  { nameKey: 'bed3', descKey: 'bed3d', cover: ROOM3[0], lbOffset: OFFSETS.ROOM3 },
  { nameKey: 'bed4', descKey: 'bed4d', cover: ROOM4[0], lbOffset: OFFSETS.ROOM4 },
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
            <div className="bed-card" key={bed.nameKey} onClick={() => onImageClick?.(bed.lbOffset)}>
              <div className="bed-img">
                <img src={bed.cover} alt={t(bed.nameKey)} loading="lazy" />
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
