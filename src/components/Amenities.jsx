import useLanguage from '../hooks/useLanguage';
import AMENITIES from '../data/amenities';

export default function Amenities() {
  const { t } = useLanguage();
  return (
    <section id="amen">
      <div className="container">
        <div className="tag">{t('amen_tag')}</div>
        <h2 className="stitle">{t('amen_title')}</h2>
        <div className="amen-g">
          {AMENITIES.map((item) => (
            <div className="amen" key={item.key}>
              <i className={item.icon}></i>
              <span>{t(item.key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
