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
  pricePerRoom: 70,
};
