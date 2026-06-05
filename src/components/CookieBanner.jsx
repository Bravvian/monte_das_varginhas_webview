import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('cookie_consent') === null) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (analyticsChoice) => {
    localStorage.setItem('cookie_consent', JSON.stringify({ essential: true, analytics: analyticsChoice }));
    setVisible(false);
  };

  return (
    <div className={`cookie${visible ? ' show' : ''}${expanded ? ' cookie--expanded' : ''}`}>
      {!expanded ? (
        <>
          <span>{t('cookie_txt')}</span>
          <div className="cookie-btns">
            <button className="cookie-customize" onClick={() => setExpanded(true)}>{t('cookie_customize')}</button>
            <button className="cookie-decline" onClick={() => save(false)}>{t('cookie_no')}</button>
            <button className="cookie-accept" onClick={() => save(true)}>{t('cookie_ok')}</button>
          </div>
        </>
      ) : (
        <>
          <strong className="cookie-prefs-title">{t('cookie_prefs_title')}</strong>
          <div className="cookie-cats">
            <div className="cookie-cat">
              <div>
                <div className="cookie-cat-name">{t('cookie_essential')}</div>
                <div className="cookie-cat-desc">{t('cookie_essential_desc')}</div>
              </div>
              <span className="cookie-always-on">{t('cookie_always_on')}</span>
            </div>
            <div className="cookie-cat">
              <div>
                <div className="cookie-cat-name">{t('cookie_analytics')}</div>
                <div className="cookie-cat-desc">{t('cookie_analytics_desc')}</div>
              </div>
              <label className="cookie-toggle" aria-label={t('cookie_analytics')}>
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                <span className="toggle-track"></span>
              </label>
            </div>
          </div>
          <div className="cookie-btns">
            <button className="cookie-decline" onClick={() => save(false)}>{t('cookie_no')}</button>
            <button className="cookie-accept" onClick={() => save(analytics)}>{t('cookie_save')}</button>
          </div>
        </>
      )}
    </div>
  );
}
