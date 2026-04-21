import { useState, useEffect, useMemo } from 'react';
import { CFG } from '../data/config';

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return toDateStr(d);
}

function parseIcal(text) {
  const blocked = new Set();
  const lines = text.split(/\r?\n/);
  let dtStart = null, dtEnd = null;
  for (const line of lines) {
    if (line.startsWith('DTSTART')) {
      const val = line.split(':')[1]?.trim();
      if (val) dtStart = val.slice(0, 8);
    } else if (line.startsWith('DTEND')) {
      const val = line.split(':')[1]?.trim();
      if (val) dtEnd = val.slice(0, 8);
    } else if (line.startsWith('END:VEVENT')) {
      if (dtStart && dtEnd) {
        let d = new Date(`${dtStart.slice(0,4)}-${dtStart.slice(4,6)}-${dtStart.slice(6,8)}T00:00:00`);
        const end = new Date(`${dtEnd.slice(0,4)}-${dtEnd.slice(4,6)}-${dtEnd.slice(6,8)}T00:00:00`);
        while (d < end) {
          blocked.add(toDateStr(d));
          d.setDate(d.getDate() + 1);
        }
      }
      dtStart = null;
      dtEnd = null;
    }
  }
  return [...blocked];
}

export default function useCalendar() {
  const today = toDateStr(new Date());
  const now = new Date();
  const [cy, setCy] = useState(now.getFullYear());
  const [cm, setCm] = useState(now.getMonth());
  const [sIn, setSIn] = useState('');
  const [sOut, setSOut] = useState('');
  const [dynamicBlocked, setDynamicBlocked] = useState([]);

  useEffect(() => {
    if (!CFG.icalUrls?.length) return;
    CFG.icalUrls.forEach(async (url) => {
      try {
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
        const text = await res.text();
        const dates = parseIcal(text);
        setDynamicBlocked(prev => [...new Set([...prev, ...dates])]);
      } catch {
        // silently fail if iCal unavailable
      }
    });
  }, []);

  const allBlocked = useMemo(
    () => new Set([...CFG.blocked, ...dynamicBlocked]),
    [dynamicBlocked]
  );

  const pick = (dateStr) => {
    if (dateStr < today) return;
    if (allBlocked.has(dateStr)) return;
    if (!sIn || (sIn && sOut)) {
      setSIn(dateStr);
      setSOut('');
    } else if (dateStr > sIn) {
      let d = addDays(sIn, 1);
      let hasBlocked = false;
      while (d < dateStr) {
        if (allBlocked.has(d)) { hasBlocked = true; break; }
        d = addDays(d, 1);
      }
      if (hasBlocked) {
        setSIn(dateStr);
        setSOut('');
      } else {
        setSOut(dateStr);
      }
    } else {
      setSIn(dateStr);
      setSOut('');
    }
  };

  const prevMonth = () => {
    if (cm === 0) { setCy(y => y - 1); setCm(11); }
    else setCm(m => m - 1);
  };

  const nextMonth = () => {
    if (cm === 11) { setCy(y => y + 1); setCm(0); }
    else setCm(m => m + 1);
  };

  const renderData = useMemo(() => {
    const firstDay = new Date(cy, cm, 1).getDay();
    const daysInMonth = new Date(cy, cm + 1, 0).getDate();
    const startOffset = (firstDay + 6) % 7; // Monday-first
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push({ empty: true });
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(cm + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const dateStr = `${cy}-${mm}-${dd}`;
      cells.push({
        dateStr,
        day: d,
        isPast: dateStr < today,
        isToday: dateStr === today,
        isBlocked: allBlocked.has(dateStr),
        isIn: dateStr === sIn,
        isOut: dateStr === sOut,
        inRange: !!(sIn && sOut && dateStr > sIn && dateStr < sOut),
      });
    }
    return { cells, cy, cm };
  }, [cy, cm, sIn, sOut, allBlocked, today]);

  return { cy, cm, sIn, sOut, pick, prevMonth, nextMonth, renderData };
}
