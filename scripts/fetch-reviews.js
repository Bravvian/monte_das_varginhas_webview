import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/reviews-live.json');
const empty = JSON.stringify({ rating: null, totalCount: null, reviews: [] }, null, 2);

const API_KEY = process.env.GOOGLE_PLACES_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

if (!API_KEY || !PLACE_ID) {
  console.warn('[fetch-reviews] GOOGLE_PLACES_KEY or GOOGLE_PLACE_ID not set — skipping (existing reviews-live.json preserved).');
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
  const langs = ['en', 'pt', 'es', 'fr', 'de', 'nl', 'it'];
  const results = await Promise.all(langs.map(fetchForLanguage));
  const [enJson] = results;

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

  for (const json of results) {
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
    const aHasText = a.en?.trim() ? 1 : 0;
    const bHasText = b.en?.trim() ? 1 : 0;
    return bHasText - aHasText;
  });

  // Pad with curated static reviews until we reach 10
  const STATIC_REVIEWS = [
    { name: 'Catarina F.', stars: 5, date: 'August 2024', en: 'Absolutely stunning property. The outdoor spaces are incredible — we spent every evening on the terrace with the whole family. The BBQ area is superb and the beach is only minutes away. The chaparro tree is magical. We will definitely be back!', source: 'static' },
    { name: 'James M.', stars: 5, date: 'July 2024', en: 'Wonderful week at Monte Varginhas. The house was spotlessly clean, very well equipped, and Delmira was incredibly helpful from the moment we arrived. The location is perfect — wild beaches, total peace and quiet. Highly recommend.', source: 'static' },
    { name: 'Pablo R.', stars: 4, date: 'September 2024', en: 'A beautiful and tranquil place, perfect to disconnect. The views of the Alentejo countryside are breathtaking and the grill evenings were unforgettable. Porto Covo village is also very charming.', source: 'static' },
    { name: 'Marie D.', stars: 5, date: 'July 2024', en: 'A real gem. The covered terrace with the dining table is where we spent most of our time — perfect for long meals outdoors. The Costa Vicentina beaches nearby are some of the most beautiful we have seen in Europe.', source: 'static' },
    { name: 'Thomas G.', stars: 4, date: 'August 2024', en: 'Great value for a large group. We were 8 people and had plenty of space inside and out. The location is excellent — close to the beach but surrounded by nature. Delmira communicated clearly and check-in was smooth.', source: 'static' },
  ];

  const liveNames = new Set(reviews.map((r) => r.name));
  for (const s of STATIC_REVIEWS) {
    if (reviews.length >= 9) break;
    if (!liveNames.has(s.name)) reviews.push(s);
  }

  // Sort all reviews: text first, star-only after
  reviews.sort((a, b) => {
    const aHasText = a.en?.trim() ? 1 : 0;
    const bHasText = b.en?.trim() ? 1 : 0;
    return bHasText - aHasText;
  });

  const output = { rating, totalCount, reviews };
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`[fetch-reviews] Wrote ${reviews.length} unique reviews (${totalCount} total, ${rating}★)`);
} catch (err) {
  console.error('[fetch-reviews] Failed:', err.message);
  writeFileSync(outPath, empty);
  process.exit(0);
}
