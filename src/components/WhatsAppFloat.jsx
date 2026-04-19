import useLanguage from '../hooks/useLanguage';
import { CFG } from '../data/config';

export default function WhatsAppFloat() {
  const { t } = useLanguage();
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${CFG.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact via WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <span className="wa-float-tip">{t('wa_tip')}</span>
    </a>
  );
}
