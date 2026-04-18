import useLanguage from '../hooks/useLanguage';
import { CFG } from '../data/config';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="container">
        <div className="foot-g">
          <div>
            <div className="foot-brand">Monte <span>Varginhas</span></div>
            <p className="foot-desc">{t('foot_desc')}</p>
            <div className="reg">
              <i className="fa fa-certificate" style={{ color: 'var(--terra)', marginRight: '5px' }}></i>
              Reg. AL 3112/AL
            </div>
          </div>
          <div>
            <div className="foot-title">{t('foot_explore')}</div>
            <ul className="foot-links">
              <li><a href="#about"><i className="fa fa-home"></i><span>{t('nav_about')}</span></a></li>
              <li><a href="#pricing"><i className="fa fa-tag"></i><span>{t('nav_price')}</span></a></li>
              <li><a href="#gallery"><i className="fa fa-images"></i><span>{t('nav_gallery')}</span></a></li>
              <li><a href="#reviews"><i className="fa fa-star"></i><span>{t('nav_reviews')}</span></a></li>
              <li><a href="#loc"><i className="fa fa-map-pin"></i><span>{t('nav_loc')}</span></a></li>
            </ul>
          </div>
          <div>
            <div className="foot-title">{t('foot_contact')}</div>
            <ul className="foot-links">
              <li><a href={`mailto:${CFG.email}`}><i className="fa fa-envelope"></i><span>{t('foot_email')}</span></a></li>
              <li>
                <a href={`https://wa.me/${CFG.whatsapp}`} target="_blank" rel="noreferrer">
                  <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i>WhatsApp
                </a>
              </li>
              <li><a href="#booking"><i className="fa fa-calendar"></i><span>{t('nav_book')}</span></a></li>
            </ul>
            <div style={{ marginTop: '18px', fontSize: '.82rem' }}>
              <div style={{ color: 'rgba(255,255,255,.4)', marginBottom: '3px' }}>{t('checkin')}</div>
              <div style={{ color: '#fff' }}>After 4:00 PM</div>
              <div style={{ color: 'rgba(255,255,255,.4)', margin: '8px 0 3px' }}>{t('checkout')}</div>
              <div style={{ color: '#fff' }}>Before 11:00 AM</div>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2025 Monte das Varginhas · Porto Covo, Portugal</div>
          <div style={{ color: 'rgba(255,255,255,.35)' }}>{t('foot_bottom')}</div>
        </div>
      </div>
    </footer>
  );
}
