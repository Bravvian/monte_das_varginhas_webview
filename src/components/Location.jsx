import useLanguage from '../hooks/useLanguage';

const LOC_ITEMS = [
  { icon: 'fa fa-umbrella-beach', nameKey: 'l1', distKey: 'l1d' },
  { icon: 'fa fa-water', nameKey: 'l2', distKey: 'l2d' },
  { icon: 'fa fa-city', nameKey: 'l3', distKey: 'l3d' },
  { icon: 'fa fa-person-hiking', nameKey: 'l4', distKey: 'l4d' },
  { icon: 'fa fa-plane', nameKey: 'l5', distKey: 'l5d' },
];

export default function Location() {
  const { t } = useLanguage();
  return (
    <section id="loc">
      <div className="container">
        <div className="tag">{t('loc_tag')}</div>
        <h2 className="stitle">{t('loc_title')}</h2>
        <div className="loc-g">
          <div>
            {LOC_ITEMS.map((item) => (
              <div className="loc-item" key={item.nameKey}>
                <div className="loc-ico"><i className={item.icon}></i></div>
                <div className="loc-txt">
                  <strong>{t(item.nameKey)}</strong>
                  <span>{t(item.distKey)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="loc-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-8.7663459!3d37.8787803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1bbcf05c689443%3A0xd9f8875e66d232a3!2sMonte%20Varginhas%20Porto%20Covo!5e0!3m2!1sen!2spt!4v1"
              allowFullScreen
              loading="lazy"
              title="Porto Covo map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
