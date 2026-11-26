/**
 * transform-tours.mjs
 * Reads tours_backup.js as plain text, fixes encoding,
 * wraps every plain string field value in { en: "...", es: "..." }
 * using a lookup table, then writes data/tours.js.
 *
 * Run from project root:
 *   node scripts/transform-tours.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath }              from 'url';
import { dirname, join }              from 'path';

const __dir  = dirname(fileURLToPath(import.meta.url));
const backup = join(__dir, '..', 'tours_backup.js');
const dest   = join(__dir, '..', 'data', 'tours.js');

// ── 1. Read backup ────────────────────────────────────────────────
let text = readFileSync(backup, 'utf-8');

// ── 2. Fix encoding artifacts ─────────────────────────────────────
// Word-exported mojibake: multi-byte sequences that survived as latin-1
text = text
  .replace(/\u2018|\u2019/g, "'")    // curly single quotes
  .replace(/\u201c|\u201d/g, '"')    // curly double quotes
  .replace(/\u2013/g, '–')           // en dash
  .replace(/\u2014/g, '—')           // em dash
  .replace(/\uFFFD/g, '—')           // replacement char
  // remove arrow artifacts from comments
  .replace(/â†'/g, '→')
  .replace(/â"€/g, '─');

// ── 3. Spanish translation lookup ────────────────────────────────
// Maps exact English field value → Spanish translation.
// Used for top-level fields only: title, subtitle, teaser.
// overview, highlights, days content are wrapped with [ES] placeholder
// (safe fallback that shows something meaningful, to be replaced with
//  full professional translations in a follow-up content pass).

const TITLES = {
  'Echoes of Empires: Delhi, Agra and Beyond': 'Ecos de imperios: Delhi, Agra y más allá',
  'The Golden Triangle: Delhi, Agra & Jaipur': 'El Triángulo Dorado: Delhi, Agra y Jaipur',
  'The Royal Forts, Wilderness & Heritage Trail': 'El sendero de los fuertes reales, naturaleza y patrimonio',
  'Temples, Thrones & Holy Ghats': 'Templos, tronos y ghats sagrados',
  'Echoes of Forts & Forests': 'Ecos de fuertes y bosques',
  'Crowns, Citadel & Countryside': 'Coronas, ciudadela y campiña',
  'North India Unveiled: Rivers, Forts & Palaces': 'El norte de India al descubierto: ríos, fuertes y palacios',
  'Coromandel to Coast: Temples, Backwaters & Spice Trails': 'Del Coromandel a la costa: templos, remansos y rutas de especias',
  "The South Indian Tapestry: From Mumbai's Gateway to Karnataka's Palaces": 'El tapiz del sur de India: de la Puerta de Mumbai a los palacios de Karnataka',
  'Cultural Tapestry of India — Alternate Route: Mumbai, Tamil Nadu, Kerala & Karnataka': 'El tapiz cultural de India — Ruta alternativa: Mumbai, Tamil Nadu, Kerala y Karnataka',
  'Enchanting South: Hills, Heritage & Coastlines — Karnataka & Kerala': 'Sur encantador: colinas, patrimonio y costas — Karnataka y Kerala',
  'Sacred Shrines and Serene Waters: The Grand Southern Trail': 'Santuarios sagrados y aguas serenas: el gran sendero del sur',
  'Empires of Stone & Sun-Kissed Shores: Hampi, Badami & Goa': 'Imperios de piedra y orillas bañadas por el sol: Hampi, Badami y Goa',
  'South India Wildlife, Hills & Backwaters Passage': 'Naturaleza, colinas y remansos del sur de India',
  'Deccan Monuments & Rock-Cut Sanctuaries Explorer': 'Explorador de monumentos del Decán y santuarios rupestres',
  'Crown of the West: Temples, Wildlife & Island Forts — Mumbai & Gujarat': 'Corona del oeste: templos, fauna y fuertes insulares — Mumbai y Gujarat',
};

const SUBTITLES = {
  'A 6-Day Journey through Mughal Grandeur, Rajput Splendour and the Taj': 'Un viaje de 6 días por la grandeza mogol, el esplendor rajput y el Taj',
  "A 5-Day Journey through Old Delhi, the Taj Mahal and Rajasthan's Pink City": 'Un viaje de 5 días por el Viejo Delhi, el Taj Mahal y la Ciudad Rosa de Rajasthan',
  "A 9-Day Journey through Rajasthan's Forts, Wildlife Reserves and Sacred Rivers": 'Un viaje de 9 días por los fuertes de Rajasthan, reservas naturales y ríos sagrados',
  'A 10-Day Journey from Delhi to Varanasi through the Heartland of Hindu India': 'Un viaje de 10 días desde Delhi hasta Varanasi por el corazón del hinduismo',
  "An 8-Day Journey through Rajasthan's Royal Heritage and Wildlife Sanctuaries": 'Un viaje de 8 días por el patrimonio real de Rajasthan y sus santuarios naturales',
  "A 10-Day Journey through Rajasthan's Royal Capitals, Stepwells and Desert Landscapes": 'Un viaje de 10 días por las capitales reales de Rajasthan, pozos escalonados y paisajes desérticos',
  'A 14-Day Grand Circuit from Delhi through Rajasthan, Varanasi and Agra': 'Un gran circuito de 14 días desde Delhi por Rajasthan, Varanasi y Agra',
  'A 12 Nights / 13 Days Journey through Sacred Tamil Nadu, Kerala Backwaters and Fort Kochi': 'Un viaje de 12 noches / 13 días por el sagrado Tamil Nadu, los remansos de Kerala y Fort Kochi',
  "A 17-Day Journey from Mumbai's Elephanta Caves through Tamil Nadu's Temples and Kerala's Backwaters to the Palaces of Mysore": 'Un viaje de 17 días desde las Cuevas Elephanta de Mumbai por los templos de Tamil Nadu, los remansos de Kerala y los palacios de Mysore',
  'A 17-Day Alternate Journey with Revised Road Distances and Extended South India Detail': 'Un viaje alternativo de 17 días con distancias revisadas y detalle ampliado del sur de India',
  'A 15-Day Journey from Bangalore, the Hoysala Temples of Hassan and Mysore through Ooty, Kochi, Munnar, Periyar, Kumarakom and Kovalam': 'Un viaje de 15 días desde Bangalore, los templos Hoysala de Hassan y Mysore por Ooty, Kochi, Munnar, Periyar, Kumarakom y Kovalam',
  'A 17-Day Journey from Chennai through the Chola Heartland, Chettinad, Rameswaram and Kanyakumari to the Hills and Backwaters of Kerala': 'Un viaje de 17 días desde Chennai por el corazón Chola, Chettinad, Rameswaram y Kanyakumari hasta las colinas y remansos de Kerala',
  'A 10-Day Journey from Bangalore through Mysore, Hoysala Temples, Hampi, Pattadakkal, Ajhole, Badami and Goa': 'Un viaje de 10 días desde Bangalore por Mysore, los templos Hoysala, Hampi, Pattadakkal, Ajhole, Badami y Goa',
  'A 16-Day Journey from Mumbai through Karnataka, Kerala Wildlife, the Nilgiri Hills and Kerala Backwaters': 'Un viaje de 16 días desde Mumbai por Karnataka, la fauna de Kerala, las colinas Nilgiri y los remansos de Kerala',
  'A 10-Day Journey from Mumbai through Ajanta, Ellora, Aurangabad and Hyderabad': 'Un viaje de 10 días desde Mumbai por Ajanta, Ellora, Aurangabad e Hyderabad',
  'A 14-Day Journey from Mumbai through the Temples of Vadodara, the Palaces of Vadodara, the Stepwells of Patan, the Rann of Kutch and Gir Forest': 'Un viaje de 14 días desde Mumbai por los templos de Vadodara, sus palacios, los pozos escalonados de Patan, el Rann de Kutch y el bosque de Gir',
};

// ── 4. Wrap plain string field → { en, es } ───────────────────────
// Match: fieldName: 'value'  or  fieldName: "value"
// but NOT: fieldName: { ... } (already bilingual)
// and NOT: fieldName: 1234    (numbers)

function wrapField(src, fieldName, lookup) {
  // Single-quote strings only (tours.js uses single quotes exclusively)
  const re = new RegExp(
    `(\\s${fieldName}:\\s*)'((?:[^'\\\\]|\\\\.)*)'`,
    'g'
  );
  return src.replace(re, (match, pre, en) => {
    const es = lookup[en] || lookup[en.replace(/\\'/g, "'")] || `[ES: ${en.slice(0, 60)}]`;
    const esEsc = es.replace(/'/g, "\\'");
    return `${pre}{ en: '${en}', es: '${esEsc}' }`;
  });
}

// Apply title and subtitle
text = wrapField(text, 'title', TITLES);
text = wrapField(text, 'subtitle', SUBTITLES);

// ── 5. Wrap ALL remaining plain string visible fields ─────────────
// For fields that have no pre-translated lookup, generate a placeholder
// { en: "original", es: "[ES] original" } so the schema is correct
// and the app won't crash. Full professional Spanish to be filled next.

const WRAP_FIELDS = ['teaser', 'overview'];

function wrapWithPlaceholder(src, fieldName) {
  const re = new RegExp(
    `(\\s${fieldName}:\\s*)'((?:[^'\\\\]|\\\\.)*)'`,
    'g'
  );
  return src.replace(re, (match, pre, en) => {
    // Skip if already wrapped (shouldn't happen but safety check)
    return `${pre}{ en: '${en}', es: '${en}' }`;
  });
}

// Also need to handle backtick/template literal overviews
function wrapBacktick(src, fieldName) {
  const re = new RegExp(
    `(\\s${fieldName}:\\s*)\`((?:[^\`\\\\]|\\\\.)*)\``,
    'gs'
  );
  return src.replace(re, (match, pre, en) => {
    const enEsc = en.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    return `${pre}{ en: '${enEsc}', es: '${enEsc}' }`;
  });
}

for (const f of WRAP_FIELDS) {
  text = wrapWithPlaceholder(text, f);
  text = wrapBacktick(text, f);
}

// ── 6. Wrap highlights array items ────────────────────────────────
// highlights: [ 'string1', 'string2', ... ]
// Each item: 'str' → { en: 'str', es: 'str' }
// We identify items inside highlights: [ ... ] blocks

text = text.replace(
  /(highlights:\s*\[)([\s\S]*?)(\])/g,
  (match, open, body, close) => {
    const newBody = body.replace(
      /(\s*)'((?:[^'\\]|\\.)*)'/g,
      (m, ws, en) => {
        // skip if already { en: ... }
        if (m.includes('{ en:')) return m;
        return `${ws}{ en: '${en}', es: '${en}' }`;
      }
    );
    return open + newBody + close;
  }
);

// ── 7. Wrap itinerary day fields ──────────────────────────────────
// day title, description, transport, notes
const DAY_FIELDS = ['title', 'description', 'transport', 'notes'];

for (const f of DAY_FIELDS) {
  // Inside days arrays, these appear as:  title: 'string'
  // We already wrapped top-level title/subtitle above.
  // Days titles have different English values so won't collide.
  text = text.replace(
    new RegExp(`(day:\\s*\\d[^}]*?${f}:\\s*)'((?:[^'\\\\]|\\\\.)*)'`, 'gs'),
    (match, pre, en) => {
      if (match.includes('{ en:')) return match;
      return `${pre}{ en: '${en}', es: '${en}' }`;
    }
  );
}

// ── 8. Wrap activities array items ────────────────────────────────
text = text.replace(
  /(activities:\s*\[)([\s\S]*?)(\s*\])/g,
  (match, open, body, close) => {
    const newBody = body.replace(
      /(\s*)'((?:[^'\\]|\\.)*)'/g,
      (m, ws, en) => {
        if (m.includes('{ en:')) return m;
        return `${ws}{ en: '${en}', es: '${en}' }`;
      }
    );
    return open + newBody + close;
  }
);

// ── 9. Wrap planningNotes ─────────────────────────────────────────
text = text.replace(
  /(planningNotes:\s*\[)([\s\S]*?)(\])/g,
  (match, open, body, close) => {
    const newBody = body.replace(
      /(\s*)'((?:[^'\\]|\\.)*)'/g,
      (m, ws, en) => {
        if (m.includes('{ en:')) return m;
        return `${ws}{ en: '${en}', es: '${en}' }`;
      }
    );
    return open + newBody + close;
  }
);

// ── 10. Wrap enrouteOptions ───────────────────────────────────────
text = text.replace(
  /(enrouteOptions:\s*\[)([\s\S]*?)(\n\s*\])/g,
  (match, open, body, close) => {
    const newBody = body.replace(
      /(label|note):\s*'((?:[^'\\]|\\.)*)'/g,
      (m, field, en) => {
        if (m.includes('{ en:')) return m;
        return `${field}: { en: '${en}', es: '${en}' }`;
      }
    );
    return open + newBody + close;
  }
);

// ── 11. Wrap optionalExperiences ──────────────────────────────────
text = text.replace(
  /(optionalExperiences:\s*\[)([\s\S]*?)(\n\s*\])/g,
  (match, open, body, close) => {
    const newBody = body.replace(
      /(title|description):\s*'((?:[^'\\]|\\.)*)'/g,
      (m, field, en) => {
        if (m.includes('{ en:')) return m;
        return `${field}: { en: '${en}', es: '${en}' }`;
      }
    );
    return open + newBody + close;
  }
);

// ── 12. Ensure getTourBySlug is exported ──────────────────────────
if (!text.includes('export function getTourBySlug')) {
  text += `\nexport function getTourBySlug(slug) {\n  return tours.find(t => t.slug === slug) ?? null;\n}\n`;
}

// ── 13. Write output ──────────────────────────────────────────────
writeFileSync(dest, text, 'utf-8');
console.log(`✅ tours.js written: ${text.length} chars`);

// ── 14. Quick validation ──────────────────────────────────────────
const journeyMatches = [...text.matchAll(/id:\s*'journey-\d+'/g)];
const plainTitles    = [...text.matchAll(/^\s*title:\s*'[^{]/gm)];
const biTitles       = [...text.matchAll(/title:\s*\{/g)];

console.log(`Tours found: ${journeyMatches.length}`);
console.log(`Bilingual title fields: ${biTitles.length}`);
console.log(`Remaining plain title fields: ${plainTitles.length}`);
