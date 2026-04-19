import { useState } from 'react';
import useLanguage from '../hooks/useLanguage';
import useCalendar from '../hooks/useCalendar';
import { CFG } from '../data/config';

const MONTH_NAMES = {
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  pt: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
};
const DAY_NAMES = {
  en: ['Mo','Tu','We','Th','Fr','Sa','Su'],
  pt: ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
  fr: ['Lu','Ma','Me','Je','Ve','Sa','Di'],
  es: ['Lu','Ma','Mi','Ju','Vi','Sá','Do'],
};

export default function Booking() {
  const { lang, t } = useLanguage();
  const { sIn, sOut, pick, prevMonth, nextMonth, renderData } = useCalendar();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(`https://formspree.io/f/${CFG.formspreeId}`, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
    } catch {
      // fall through to success state; user can use WhatsApp
    }
    setSending(false);
    setSent(true);
  };

  const waMsg = encodeURIComponent(
    `Hello! I'd like to book Monte Varginhas. Check-in: ${sIn || '?'}, Check-out: ${sOut || '?'}`
  );

  return (
    <section id="booking">
      <div className="container">
        <div className="tag">{t('book_tag')}</div>
        <h2 className="stitle">{t('book_title')}</h2>
        <p className="ssub">{t('book_sub')}</p>
        <div className="book-g">
          <div>
            <div className="cal-wrap">
              <div className="cal-hdr">
                <button className="cal-nav" onClick={prevMonth} type="button">
                  <i className="fa fa-chevron-left"></i>
                </button>
                <div className="cal-title">
                  {MONTH_NAMES[lang][renderData.cm]} {renderData.cy}
                </div>
                <button className="cal-nav" onClick={nextMonth} type="button">
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
              <div className="cal-g">
                {DAY_NAMES[lang].map(d => <div className="cdn" key={d}>{d}</div>)}
                {renderData.cells.map((cell, i) => {
                  if (cell.empty) return <div key={`e-${i}`} />;
                  const cls = ['cday',
                    cell.isPast && 'past',
                    cell.isBlocked && 'blocked',
                    cell.isIn && 's-in',
                    cell.isOut && 's-out',
                    cell.inRange && 'in-range',
                    cell.isToday && 'today',
                  ].filter(Boolean).join(' ');
                  return (
                    <div key={cell.dateStr} className={cls} onClick={() => pick(cell.dateStr)}>
                      {cell.day}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="legend">
              <div className="leg"><div className="ldot a"></div><span>{t('leg_avail')}</span></div>
              <div className="leg"><div className="ldot b"></div><span>{t('leg_unavail')}</span></div>
              <div className="leg"><div className="ldot s"></div><span>{t('leg_sel')}</span></div>
            </div>
            <div className="ci-co">
              <div className="ci-co-item">
                <span>{t('checkin')}</span>
                <strong>{sIn || '—'}</strong>
              </div>
              <div className="ci-co-item">
                <span>{t('checkout')}</span>
                <strong>{sOut || '—'}</strong>
              </div>
            </div>
          </div>
          <div className="bform">
            {sent ? (
              <div className="success" style={{ display: 'block' }}>
                <i className="fa fa-circle-check"></i>
                <h3>{t('success_title')}</h3>
                <p>{t('success_msg')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>{t('form_title')}</h3>
                <div className="frow">
                  <div className="fg">
                    <label>{t('lbl_cin')}</label>
                    <input name="checkin" value={sIn} readOnly placeholder="YYYY-MM-DD" required />
                  </div>
                  <div className="fg">
                    <label>{t('lbl_cout')}</label>
                    <input name="checkout" value={sOut} readOnly placeholder="YYYY-MM-DD" required />
                  </div>
                </div>
                <div className="frow">
                  <div className="fg">
                    <label>{t('lbl_rooms')}</label>
                    <select name="rooms">
                      {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="fg">
                    <label>{t('lbl_guests')}</label>
                    <select name="guests">
                      {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                  </div>
                </div>
                <div className="frow">
                  <div className="fg">
                    <label>{t('lbl_fn')}</label>
                    <input name="firstName" required />
                  </div>
                  <div className="fg">
                    <label>{t('lbl_ln')}</label>
                    <input name="lastName" required />
                  </div>
                </div>
                <div className="fg">
                  <label>Email</label>
                  <input name="email" type="email" required />
                </div>
                <div className="fg">
                  <label>{t('lbl_phone')}</label>
                  <input name="phone" type="tel" />
                </div>
                <div className="fg">
                  <label>{t('lbl_msg')}</label>
                  <textarea name="message" placeholder={t('msg_ph')}></textarea>
                </div>
                <button className="sub-btn" type="submit" disabled={sending}>
                  <i className="fa fa-paper-plane"></i>
                  {t('btn_send')}
                </button>
                <a
                  className="wa-btn"
                  href={`https://wa.me/${CFG.whatsapp}?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp"></i>
                  {t('btn_wa')}
                </a>
                <div className="pay-note" dangerouslySetInnerHTML={{ __html: t('pay_note') }} />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
