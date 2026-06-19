export const CFG = {
  email: import.meta.env.VITE_EMAIL || 'delmira.bravo@gmail.com',
  whatsapp: import.meta.env.VITE_WHATSAPP || '351914706704',
  formspreeId: import.meta.env.VITE_FORMSPREE_ID || 'xzdyelwb',
  // Paste your Airbnb/Booking.com iCal feed URLs here to show live blocked dates.
  // Airbnb: airbnb.com → Hosting → Calendar → Availability → Export Calendar
  // Booking.com: extranet.booking.com → Calendar → Sync calendars → Export
  icalUrls: [],
  blocked: [],
  googleApiKey: '',
  googlePlaceId: '',
  // € per room per night — edit here to update all pricing across the site
  priceSummer: 90, // Jun–Sep
  priceWinter: 70, // Oct–May
};

// Returns the price for the given date (defaults to today)
export function getSeasonPrice(date = new Date()) {
  const month = date.getMonth() + 1; // 1–12
  return month >= 6 && month <= 9 ? CFG.priceSummer : CFG.priceWinter;
}
