import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/reviews-live.json');
const empty = JSON.stringify({ rating: null, totalCount: null, reviews: [] }, null, 2);

const API_KEY = process.env.GOOGLE_PLACES_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

if (!API_KEY || !PLACE_ID) {
  console.warn('[fetch-reviews] GOOGLE_PLACES_KEY or GOOGLE_PLACE_ID not set — skipping.');
  writeFileSync(outPath, empty);
  process.exit(0);
}

const url =
  `https://maps.googleapis.com/maps/api/place/details/json` +
  `?place_id=${PLACE_ID}` +
  `&fields=rating,user_ratings_total,reviews` +
  `&reviews_sort=newest` +
  `&language=en` +
  `&key=${API_KEY}`;

try {
  const res = await fetch(url);
  const json = await res.json();

  if (json.status !== 'OK') {
    console.error('[fetch-reviews] Places API error:', json.status, json.error_message);
    writeFileSync(outPath, empty);
    process.exit(0);
  }

  const raw = json.result?.reviews ?? [];

  const reviews = raw.filter((r) => r.text?.trim()).map((r) => ({
    name: r.author_name,
    profilePhoto: r.profile_photo_url,
    stars: r.rating,
    date: new Date(r.time * 1000).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    en: r.text,
    source: 'google',
  }));

  const output = {
    rating: json.result?.rating ?? null,
    totalCount: json.result?.user_ratings_total ?? null,
    reviews,
  };

  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`[fetch-reviews] Wrote ${reviews.length} reviews (${output.totalCount} total, ${output.rating}★) to src/data/reviews-live.json`);
} catch (err) {
  console.error('[fetch-reviews] Failed:', err.message);
  writeFileSync(outPath, empty);
  process.exit(0);
}
