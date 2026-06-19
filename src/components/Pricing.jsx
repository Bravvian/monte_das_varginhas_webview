import { useState } from 'react';
import useLanguage from '../hooks/useLanguage';
import { CFG, getSeasonPrice } from '../data/config';

const makePriceRows = (p) => [
  { key: 'pr1', price: `€${p}` },
  { key: 'pr2', price: `€${p * 2}` },
  { key: 'pr3', price: `€${p * 3}` },
  { key: 'pr4', price: `€${p * 4}` },
  { key: 'pr5', price: '€0', priceStyle: { color: '#22C55E' } },
];

export default function Pricing() {
  const { t } = useLanguage();
  const [rooms, setRooms] = useState(2);
  const [nights, setNights] = useState(5);
  const p = getSeasonPrice();
  const month = new Date().getMonth() + 1;
  const isSummer = month >= 6 && month <= 9;
  const altPrice = isSummer ? CFG.priceWinter : CFG.priceSummer;
  const PRICE_ROWS = makePriceRows(p);
  const total = rooms * p * nights;

  return (
    <section id="pricing">
      <div className="container">
        <div className="tag">{t('price_tag')}</div>
        <h2 className="stitle">{t('price_title')}</h2>
        <p className="ssub">{t('price_sub')}</p>
        <div className="price-g">
          <div className="price-card">
            <div className="price-hero">
              <div className="price-num">€{p}</div>
              <div className="price-unit">{t('price_unit')}</div>
            </div>
            <div className="price-season-wrap">
              <span className="price-season-badge">{isSummer ? t('price_summer') : t('price_winter')}</span>
              <span className="price-season-alt">{isSummer ? t('price_winter') : t('price_summer')}: €{altPrice}</span>
            </div>
            <div className="price-rows">
              {PRICE_ROWS.map((row) => (
                <div className="price-row" key={row.key}>
                  <span>{t(row.key)}</span>
                  <span style={row.priceStyle || {}}>
                    {row.price}
                    {!row.priceStyle && <span style={{ color: 'rgba(255,255,255,.4)', fontWeight: 400 }}>/night</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="calc">
            <h3>{t('calc_title')}</h3>
            <div className="calc-row">
              <label>
                <span>{t('calc_rooms')}</span>{' '}
                <span className="calc-val">{rooms}</span>
              </label>
              <input type="range" min="1" max="4" value={rooms} step="1" onChange={(e) => setRooms(+e.target.value)} />
            </div>
            <div className="calc-row">
              <label>
                <span>{t('calc_nights')}</span>{' '}
                <span className="calc-val">{nights}</span>
              </label>
              <input type="range" min="1" max="30" value={nights} step="1" onChange={(e) => setNights(+e.target.value)} />
            </div>
            <div className="calc-total">
              <div className="calc-total-n">€{total.toLocaleString()}</div>
              <div className="calc-total-l">{rooms} {t('calc_rooms')} · {nights} {t('calc_nights')} · no fees</div>
            </div>
            <a href="#booking" className="calc-cta">{t('calc_cta')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
