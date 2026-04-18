import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookie') === null) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => { localStorage.setItem('cookie', '1'); setVisible(false); };
  const decline = () => { localStorage.setItem('cookie', '0'); setVisible(false); };

  return (
    <div className={`cookie${visible ? ' show' : ''}`}>
      <span>{t('cookie_txt')}</span>
      <div className="cookie-btns">
        <button className="cookie-accept" onClick={accept}>{t('cookie_ok')}</button>
        <button className="cookie-decline" onClick={decline}>{t('cookie_no')}</button>
      </div>
    </div>
  );
}
