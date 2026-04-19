import { useState, useEffect } from 'react';

export default function useLightbox() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const lbOpen = (i) => { setIdx(i); setOpen(true); };
  const lbClose = () => setOpen(false);
  const lbNav = (dir, total) => setIdx((i) => (i + dir + total) % total);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return { open, idx, lbOpen, lbClose, lbNav };
}
