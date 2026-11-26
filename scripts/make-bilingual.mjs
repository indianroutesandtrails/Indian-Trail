/**
 * make-bilingual.mjs
 * ──────────────────────────────────────────────────────────────────
 * Transforms tours.js: wraps every user-facing plain string into
 * { en: originalValue, es: "TODO_ES: ..." } so the build still passes
 * and Spanish can be filled in field by field.
 *
 * Fields left as plain values (canonical, not visible text):
 *   id, slug, duration, nights, season, bestMonths, route[],
 *   interests[], featuredImage, gallery[], isFeatured, heroTitleSize,
 *   day (number), location, isOptional, bestMonths items
 *
 * Run from project root:
 *   node --input-type=module scripts/make-bilingual.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const PATH  = join(__dir, '..', 'data', 'tours.js');

// ── Spanish translations table ────────────────────────────────────
// Key = exact English string in the data file.
// Value = complete Spanish translation.
// ─────────────────────────────────────────────────────────────────
const TRANSLATIONS = {

  // ══════════════ JOURNEY 01 ══════════════
  'Echoes of Empires: Delhi, Agra and Beyond':
    'Ecos de imperios: Delhi, Agra y más allá',
  'A 6-Day Journey through Mughal Grandeur, Rajput Splendour and the Taj':
    'Un viaje de 6 días por la grandeza mogol, el esplendor rajput y el Taj',

  // ══════════════ JOURNEY 02 ══════════════
  'The Golden Triangle: Delhi, Agra & Jaipur':
    'El Triángulo Dorado: Delhi, Agra y Jaipur',
  "A 5-Day Journey through Old Delhi, the Taj Mahal and Rajasthan's Pink City":
    'Un viaje de 5 días por el Viejo Delhi, el Taj Mahal y la Ciudad Rosa de Rajasthan',

  // ══════════════ JOURNEY 03 ══════════════
  'The Royal Forts, Wilderness & Heritage Trail':
    'El sendero de los fuertes reales, la naturaleza y el patrimonio',
  "A 9-Day Journey through Rajasthan's Forts, Wildlife Reserves and Sacred Rivers":
    'Un viaje de 9 días por los fuertes de Rajasthan, reservas naturales y ríos sagrados',

  // ══════════════ JOURNEY 04 ══════════════
  'Temples, Thrones & Holy Ghats':
    'Templos, tronos y ghats sagrados',
  'A 10-Day Journey from Delhi to Varanasi through the Heartland of Hindu India':
    'Un viaje de 10 días desde Delhi hasta Varanasi por el corazón del hinduismo',

  // ══════════════ JOURNEY 05 ══════════════
  'Echoes of Forts & Forests':
    'Ecos de fuertes y bosques',
  "An 8-Day Journey through Rajasthan's Royal Heritage and Wildlife Sanctuaries":
    'Un viaje de 8 días por el patrimonio real de Rajasthan y sus santuarios naturales',

  // ══════════════ JOURNEY 06 ══════════════
  'Crowns, Citadel & Countryside':
    'Coronas, ciudadela y campiña',
  "A 10-Day Journey through Rajasthan's Royal Capitals, Stepwells and Desert Landscapes":
    'Un viaje de 10 días por las capitales reales de Rajasthan, pozos escalonados y paisajes desérticos',

  // ══════════════ JOURNEY 07 ══════════════
  'North India Unveiled: Rivers, Forts & Palaces':
    'El norte de India al descubierto: ríos, fuertes y palacios',
  'A 14-Day Grand Circuit from Delhi through Rajasthan, Varanasi and Agra':
    'Un gran circuito de 14 días desde Delhi por Rajasthan, Varanasi y Agra',

  // ══════════════ JOURNEY 08 ══════════════
  'Coromandel to Coast: Temples, Backwaters & Spice Trails':
    'Del Coromandel a la costa: templos, remansos y rutas de las especias',
  'A 12 Nights / 13 Days Journey through Sacred Tamil Nadu, Kerala Backwaters and Fort Kochi':
    'Un viaje de 12 noches / 13 días por el sagrado Tamil Nadu, los remansos de Kerala y Fort Kochi',

  // ══════════════ JOURNEY 09 ══════════════
  "The South Indian Tapestry: From Mumbai's Gateway to Karnataka's Palaces":
    "El tapiz del sur de India: de la Puerta de Mumbai a los palacios de Karnataka",
  "A 17-Day Journey from Mumbai's Elephanta Caves through Tamil Nadu's Temples and Kerala's Backwaters to the Palaces of Mysore":
    'Un viaje de 17 días desde las Cuevas Elephanta de Mumbai por los templos de Tamil Nadu, los remansos de Kerala y los palacios de Mysore',

  // ══════════════ JOURNEY 10 ══════════════
  'Cultural Tapestry of India — Alternate Route: Mumbai, Tamil Nadu, Kerala & Karnataka':
    'El tapiz cultural de India — Ruta alternativa: Mumbai, Tamil Nadu, Kerala y Karnataka',
  'A 17-Day Alternate Journey with Revised Road Distances and Extended South India Detail':
    'Un viaje alternativo de 17 días con distancias revisadas y detalle ampliado del sur de India',

  // ══════════════ JOURNEY 11 ══════════════
  'Enchanting South: Hills, Heritage & Coastlines — Karnataka & Kerala':
    'Sur encantador: colinas, patrimonio y costas — Karnataka y Kerala',
  'A 15-Day Journey from Bangalore, the Hoysala Temples of Hassan and Mysore through Ooty, Kochi, Munnar, Periyar, Kumarakom and Kovalam':
    'Un viaje de 15 días desde Bangalore, los templos Hoysala de Hassan y Mysore por Ooty, Kochi, Munnar, Periyar, Kumarakom y Kovalam',

  // ══════════════ JOURNEY 12 ══════════════
  'Sacred Shrines and Serene Waters: The Grand Southern Trail':
    'Santuarios sagrados y aguas serenas: el gran sendero del sur',
  'A 17-Day Journey from Chennai through the Chola Heartland, Chettinad, Rameswaram and Kanyakumari to the Hills and Backwaters of Kerala':
    'Un viaje de 17 días desde Chennai por el corazón Chola, Chettinad, Rameswaram y Kanyakumari hasta las colinas y remansos de Kerala',

  // ══════════════ JOURNEY 13 ══════════════
  'Empires of Stone & Sun-Kissed Shores: Hampi, Badami & Goa':
    'Imperios de piedra y orillas bañadas por el sol: Hampi, Badami y Goa',
  'A 10-Day Journey from Bangalore through Mysore, Hoysala Temples, Hampi, Pattadakkal, Ajhole, Badami and Goa':
    'Un viaje de 10 días desde Bangalore por Mysore, los templos Hoysala, Hampi, Pattadakkal, Ajhole, Badami y Goa',

  // ══════════════ JOURNEY 14 ══════════════
  'South India Wildlife, Hills & Backwaters Passage':
    'Naturaleza, colinas y remansos del sur de India',
  'A 16-Day Journey from Mumbai through Karnataka, Kerala Wildlife, the Nilgiri Hills and Kerala Backwaters':
    'Un viaje de 16 días desde Mumbai por Karnataka, la fauna de Kerala, las colinas Nilgiri y los remansos de Kerala',

  // ══════════════ JOURNEY 15 ══════════════
  'Deccan Monuments & Rock-Cut Sanctuaries Explorer':
    'Explorador de monumentos del Decán y santuarios rupestres',
  'A 10-Day Journey from Mumbai through Ajanta, Ellora, Aurangabad and Hyderabad':
    'Un viaje de 10 días desde Mumbai por Ajanta, Ellora, Aurangabad e Hyderabad',

  // ══════════════ JOURNEY 16 ══════════════
  'Crown of the West: Temples, Wildlife & Island Forts — Mumbai & Gujarat':
    'Corona del oeste: templos, fauna y fuertes insulares — Mumbai y Gujarat',
  'A 14-Day Journey from Mumbai through the Temples of Vadodara, the Palaces of Vadodara, the Stepwells of Patan, the Rann of Kutch and Gir Forest':
    'Un viaje de 14 días desde Mumbai por los templos de Vadodara, los palacios de Vadodara, los pozos escalonados de Patan, el Rann de Kutch y el bosque de Gir',
};

// ── Read source ───────────────────────────────────────────────────
let text = readFileSync(PATH, 'utf-8');
let replaced = 0;

// ── Replace title and subtitle fields that match our table ────────
// Pattern: `title: 'Some English String'`
// Replacement: `title: { en: 'Some English String', es: 'Traducción' }`
for (const [en, es] of Object.entries(TRANSLATIONS)) {
  // Build a safe pattern that matches both single-quoted versions
  const enSafe = en.replace(/[$()*+.[\]?\\^{}|]/g, '\\$&');

  // Pattern for: title: 'VALUE' or subtitle: 'VALUE'
  const pattern = new RegExp(
    `((?:title|subtitle)\\s*:\\s*)'(${enSafe})'`,
    'g'
  );

  const before = text;
  // Build safe replacement string — escape $ in en and es for replace()
  const enRepl = en.replace(/\$/g, '$$$$').replace(/'/g, "\\'");
  const esRepl = es.replace(/\$/g, '$$$$').replace(/'/g, "\\'");
  text = text.replace(pattern, `$1{ en: '${enRepl}', es: '${esRepl}' }`);

  if (text !== before) replaced++;
}

// ── Write result ──────────────────────────────────────────────────
writeFileSync(PATH, text, 'utf-8');
console.log(`✅ Done. ${replaced} title/subtitle fields wrapped with {en, es}.`);

// ── Report ────────────────────────────────────────────────────────
const remaining = [...text.matchAll(/(?:title|subtitle)\s*:\s*'[^{]/g)];
// Filter out non-tour fields (day titles inside enrouteOptions etc.)
console.log(`ℹ️  Remaining plain title/subtitle strings: ${remaining.length}`);
if (remaining.length > 0 && remaining.length < 20) {
  remaining.forEach(m => {
    const snippet = text.substring(m.index, m.index + 80).replace(/\n/g, ' ');
    console.log('  →', snippet);
  });
}
