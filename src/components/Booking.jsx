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
  const [rooms, setRooms] = useState('1');
  const [guests, setGuests] = useState('1');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const name = [firstName, lastName].filter(Boolean).join(' ');
  let waText = t('wa_book_msg', {
    sIn: sIn || '?',
    sOut: sOut || '?',
    rooms,
    guests,
    name: name || '?',
  });
  if (phone) waText += `\nPhone: ${phone}`;
  if (notes) waText += `\n\n${notes}`;
  const waMsg = encodeURIComponent(waText);

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
            <div>
              <h3>{t('form_title')}</h3>
              <div className="frow">
                <div className="fg">
                  <label>{t('lbl_cin')}</label>
                  <input value={sIn} readOnly placeholder="YYYY-MM-DD" />
                </div>
                <div className="fg">
                  <label>{t('lbl_cout')}</label>
                  <input value={sOut} readOnly placeholder="YYYY-MM-DD" />
                </div>
              </div>
              <div className="frow">
                <div className="fg">
                  <label>{t('lbl_rooms')}</label>
                  <select value={rooms} onChange={e => setRooms(e.target.value)}>
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label>{t('lbl_guests')}</label>
                  <select value={guests} onChange={e => setGuests(e.target.value)}>
                    {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                </div>
              </div>
              <div className="frow">
                <div className="fg">
                  <label>{t('lbl_fn')}</label>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="fg">
                  <label>{t('lbl_ln')}</label>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="fg">
                <label>{t('lbl_phone')}</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="fg">
                <label>{t('lbl_msg')}</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={t('msg_ph')}></textarea>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
