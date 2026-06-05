import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.GOOGLE_PLACES_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

if (!API_KEY || !PLACE_ID) {
  console.warn('[fetch-reviews] GOOGLE_PLACES_KEY or GOOGLE_PLACE_ID not set — skipping.');
  const outPath = join(__dirname, '../src/data/reviews-live.json');
  writeFileSync(outPath, '[]');
  process.exit(0);
}

const url =
  `https://maps.googleapis.com/maps/api/place/details/json` +
  `?place_id=${PLACE_ID}` +
  `&fields=reviews` +
  `&reviews_sort=newest` +
  `&language=en` +
  `&key=${API_KEY}`;

try {
  const res = await fetch(url);
  const json = await res.json();

  if (json.status !== 'OK') {
    console.error('[fetch-reviews] Places API error:', json.status, json.error_message);
    process.exit(0);
  }

  const raw = json.result?.reviews ?? [];

  const reviews = raw.map((r) => ({
    name: r.author_name,
    profilePhoto: r.profile_photo_url,
    stars: r.rating,
    date: new Date(r.time * 1000).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    en: r.text,
    source: 'google',
  }));

  const outPath = join(__dirname, '../src/data/reviews-live.json');
  writeFileSync(outPath, JSON.stringify(reviews, null, 2));
  console.log(`[fetch-reviews] Wrote ${reviews.length} reviews to src/data/reviews-live.json`);
} catch (err) {
  console.error('[fetch-reviews] Failed:', err.message);
  // Write empty array so the static import in reviews.js always resolves
  const outPath = join(__dirname, '../src/data/reviews-live.json');
  writeFileSync(outPath, '[]');
  process.exit(0);
}
