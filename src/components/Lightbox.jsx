import { useEffect, useRef } from 'react';
import { IDS, gdUrl } from '../data/images';

export default function Lightbox({ open, idx, onClose, onNav }) {
  const thumbRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const el = thumbRef.current?.children[idx];
    if (el) el.scrollIntoView({ inline: 'center', behavior: 'smooth' });
  }, [open, idx]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onNav(1);
      else if (e.key === 'ArrowLeft') onNav(-1);
      else if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onNav, onClose]);

  if (!open) return null;

  return (
    <div className="lb open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="lb-close" aria-label="Close lightbox" onClick={onClose}><i className="fa fa-times"></i></button>
      <button className="lb-prev" aria-label="Previous image" onClick={() => onNav(-1)}><i className="fa fa-chevron-left"></i></button>
      <img className="lb-img" src={gdUrl(IDS[idx])} alt="Monte Varginhas" />
      <button className="lb-next" aria-label="Next image" onClick={() => onNav(1)}><i className="fa fa-chevron-right"></i></button>
      <div className="lb-counter">{idx + 1} / {IDS.length}</div>
      <div className="lb-thumbs" ref={thumbRef}>
        {IDS.map((id, i) => (
          <img
            key={id}
            className={`lb-thumb${i === idx ? ' on' : ''}`}
            src={gdUrl(id)}
            loading="lazy"
            alt={`Photo ${i + 1}`}
            onClick={() => onNav(i - idx)}
          />
        ))}
      </div>
    </div>
  );
}
