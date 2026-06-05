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

async function fetchForLanguage(lang) {
  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${PLACE_ID}` +
    `&fields=rating,user_ratings_total,reviews` +
    `&reviews_sort=newest` +
    `&language=${lang}` +
    `&key=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

try {
  // Fetch in multiple languages — Google returns a different top-5 per language
  const [enJson, ptJson, esJson] = await Promise.all([
    fetchForLanguage('en'),
    fetchForLanguage('pt'),
    fetchForLanguage('es'),
  ]);

  if (enJson.status !== 'OK') {
    console.error('[fetch-reviews] Places API error:', enJson.status, enJson.error_message);
    writeFileSync(outPath, empty);
    process.exit(0);
  }

  const rating = enJson.result?.rating ?? null;
  const totalCount = enJson.result?.user_ratings_total ?? null;

  // Deduplicate by author_name + time across all language responses
  const seen = new Set();
  const reviews = [];

  for (const json of [enJson, ptJson, esJson]) {
    if (json.status !== 'OK') continue;
    for (const r of (json.result?.reviews ?? [])) {
      const key = `${r.author_name}__${r.time}`;
      if (seen.has(key)) continue;
      seen.add(key);
      reviews.push({
        name: r.author_name,
        profilePhoto: r.profile_photo_url,
        stars: r.rating,
        date: new Date(r.time * 1000).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
        en: r.text,
        source: 'google',
      });
    }
  }

  // Text reviews first, then star-only; within each group newest first
  reviews.sort((a, b) => {
    const aHasText = a.en ? 1 : 0;
    const bHasText = b.en ? 1 : 0;
    if (bHasText !== aHasText) return bHasText - aHasText;
    return new Date(b.date) - new Date(a.date);
  });

  const output = { rating, totalCount, reviews };
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`[fetch-reviews] Wrote ${reviews.length} unique reviews (${totalCount} total, ${rating}★)`);
} catch (err) {
  console.error('[fetch-reviews] Failed:', err.message);
  writeFileSync(outPath, empty);
  process.exit(0);
}
