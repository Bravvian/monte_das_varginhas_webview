import useLanguage from '../hooks/useLanguage';

export default function Stats() {
  const { t } = useLanguage();
  return (
    <div className="stats">
      <div className="container">
        <div className="stats-g">
          <div className="stat"><div className="stat-n">10</div><div className="stat-l">{t('stat_guests')}</div></div>
          <div className="stat"><div className="stat-n">4</div><div className="stat-l">{t('stat_beds')}</div></div>
          <div className="stat"><div className="stat-n">4</div><div className="stat-l">{t('stat_baths')}</div></div>
          <div className="stat"><div className="stat-n">4.73 ★</div><div className="stat-l">{t('stat_rating')}</div></div>
          <div className="stat"><div className="stat-n">€70</div><div className="stat-l">{t('stat_price')}</div></div>
          <div className="stat"><div className="stat-n">{t('stat_fees_n')}</div><div className="stat-l">{t('stat_fees_l')}</div></div>
        </div>
      </div>
    </div>
  );
}
