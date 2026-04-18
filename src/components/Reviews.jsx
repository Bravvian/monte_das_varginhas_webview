import useLanguage from '../hooks/useLanguage';
import REVIEWS from '../data/reviews';

const COLORS = ['var(--terra)', 'var(--gold)', '#6B7280', '#3B82F6', '#8B5CF6', '#059669'];

const RATING_BARS = [
  { key: 'rb1', score: 4.6, pct: 92 },
  { key: 'rb2', score: 4.4, pct: 88 },
  { key: 'rb3', score: 4.6, pct: 92 },
  { key: 'rb4', score: 4.4, pct: 88 },
  { key: 'rb5', score: 4.4, pct: 88 },
  { key: 'rb6', score: 4.4, pct: 88 },
];

export default function Reviews() {
  const { lang, t } = useLanguage();
  return (
    <section id="reviews">
      <div className="container">
        <div className="tag">{t('rev_tag')}</div>
        <h2 className="stitle">{t('rev_title')}</h2>
        <div className="rating-hero">
          <div className="r-big">
            <div className="r-num">4.73</div>
            <div className="stars">★★★★★</div>
            <div className="r-cnt">{t('rev_count')}</div>
          </div>
          <div className="r-bars">
            {RATING_BARS.map((bar) => (
              <div className="rbar-row" key={bar.key}>
                <span className="bar-lbl">{t(bar.key)}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${bar.pct}%` }}></div>
                </div>
                <span className="bar-sc">{bar.score}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rev-g">
          {REVIEWS.map((r, i) => (
            <div className="rev-card" key={r.name}>
              <div className="rev-hdr">
                <div className="avatar" style={{ background: COLORS[i] }}>{r.name.charAt(0)}</div>
                <div>
                  <div className="rvr-name">{r.name} {r.flag}</div>
                  <div className="rvr-date">{r.date}</div>
                </div>
              </div>
              <div className="rev-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <div className="rev-txt">{lang === 'pt' ? r.pt : r.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
