/**
 * Canonical gallery data — Indian Routes & Trails
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all client/journey photography.
 * Used by: HomeGallery, /gallery page.
 *
 * Schema:
 *   id          — stable unique string (kebab-case filename without extension)
 *   src         — exact root-relative path (case-sensitive, matches filesystem)
 *   alt         — { en, es } bilingual accessible description
 *   caption     — { en, es } bilingual display label
 *   location    — plain string (proper name — same in both languages)
 *   category    — "moments" | "welcome" | "heritage" | "wildlife" | "dining"
 *   orientation — "landscape" | "portrait" (intrinsic aspect hint)
 *   layout      — "standard" | "wide" | "feature"
 *                 Deterministic grid variant: drives CSS column span without Math.random().
 *                 Pattern repeats: standard / standard / wide / standard / standard / feature
 *                 (every 6th image = feature, every 3rd = wide)
 *
 * Order: Display order. Do NOT shuffle at runtime (causes hydration mismatch).
 *
 * Integrity notes:
 *   - All paths verified against public/Owner's-Pic/ directory listing.
 *   - Om-Prakesh.webp excluded (owner portrait, not client/journey photography).
 *   - 48 images total.
 *   - IDs are unique.
 */

/** Assign deterministic layout variant by index */
function assignLayout(idx) {
  const pos = idx % 6;
  if (pos === 5) return 'feature';   // every 6th
  if (pos === 2) return 'wide';      // every 3rd (positions 2, 8, 14…)
  return 'standard';
}

const RAW = [
  /* ── Iconic monuments ─────────────────────────────────────────── */
  {
    id: 'group-photo-taj-mahal-agra',
    src: "/Owner's-Pic/group-photo-taj-mahal-agra.webp",
    alt: { en: 'Group of travellers in front of the Taj Mahal, Agra', es: 'Grupo de viajeros frente al Taj Mahal, Agra' },
    caption: { en: 'Taj Mahal, Agra', es: 'Taj Mahal, Agra' },
    location: 'Agra',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'group-photo-taj-mahal-great-gate-agra',
    src: "/Owner's-Pic/group-photo-taj-mahal-great-gate-agra.webp",
    alt: { en: 'Travellers at the Great Gate of the Taj Mahal', es: 'Viajeros en la Gran Puerta del Taj Mahal' },
    caption: { en: 'Taj Mahal Great Gate', es: 'Gran Puerta del Taj Mahal' },
    location: 'Agra',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'group-photo-scalloped-arch-amber-fort-jaipur',
    src: "/Owner's-Pic/group-photo-scalloped-arch-amber-fort-jaipur.webp",
    alt: { en: 'Group photo under a scalloped arch at Amber Fort, Jaipur', es: 'Foto grupal bajo un arco festoneado en el Fuerte de Amber, Jaipur' },
    caption: { en: 'Amber Fort, Jaipur', es: 'Fuerte de Amber, Jaipur' },
    location: 'Jaipur',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'couple-ganesh-pol-amber-fort-jaipur',
    src: "/Owner's-Pic/couple-ganesh-pol-amber-fort-jaipur.webp",
    alt: { en: 'Couple at the Ganesh Pol gate, Amber Fort', es: 'Pareja en la puerta Ganesh Pol, Fuerte de Amber' },
    caption: { en: 'Ganesh Pol, Amber Fort', es: 'Ganesh Pol, Fuerte de Amber' },
    location: 'Jaipur',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'group-photo-jaswant-thada-jodhpur',
    src: "/Owner's-Pic/group-photo-jaswant-thada-jodhpur.webp",
    alt: { en: 'Group at Jaswant Thada cenotaph, Jodhpur', es: 'Grupo en el cenotafio de Jaswant Thada, Jodhpur' },
    caption: { en: 'Jaswant Thada, Jodhpur', es: 'Jaswant Thada, Jodhpur' },
    location: 'Jodhpur',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'group-photo-galta-ji-monkey-temple-jaipur',
    src: "/Owner's-Pic/group-photo-galta-ji-monkey-temple-jaipur.webp",
    alt: { en: 'Group at Galtaji Monkey Temple, Jaipur', es: 'Grupo en el Templo de los Monos Galtaji, Jaipur' },
    caption: { en: 'Galtaji Temple, Jaipur', es: 'Templo Galtaji, Jaipur' },
    location: 'Jaipur',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'travelers-meenakshi-temple-gopuram-madurai',
    src: "/Owner's-Pic/travelers-meenakshi-temple-gopuram-madurai.webp",
    alt: { en: 'Travellers in front of the Meenakshi Temple gopuram, Madurai', es: 'Viajeros frente al gopuram del Templo de Meenakshi, Madurai' },
    caption: { en: 'Meenakshi Temple, Madurai', es: 'Templo de Meenakshi, Madurai' },
    location: 'Madurai',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'travelers-on-fort-rampart-wall-blue-sky',
    src: "/Owner's-Pic/travelers-on-fort-rampart-wall-blue-sky.webp",
    alt: { en: 'Travellers on a fort rampart against a blue sky', es: 'Viajeros en la muralla de un fuerte bajo un cielo azul' },
    caption: { en: 'Fort Rampart', es: 'Muralla del fuerte' },
    location: 'Rajasthan',
    category: 'heritage',
    orientation: 'landscape',
  },
  /* ── Golden Temple ────────────────────────────────────────────── */
  {
    id: 'group-golden-temple-amritsar-orange-headscarves',
    src: "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves.webp",
    alt: { en: 'Group at the Golden Temple, Amritsar, wearing orange headscarves', es: 'Grupo en el Templo Dorado, Amritsar, con pañuelos naranja' },
    caption: { en: 'Golden Temple, Amritsar', es: 'Templo Dorado, Amritsar' },
    location: 'Amritsar',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'group-golden-temple-amritsar-orange-headscarves-close',
    src: "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves-close.webp",
    alt: { en: 'Close-up of group at Golden Temple wearing orange headscarves', es: 'Primer plano del grupo en el Templo Dorado con pañuelos naranja' },
    caption: { en: 'Golden Temple — Close', es: 'Templo Dorado — de cerca' },
    location: 'Amritsar',
    category: 'heritage',
    orientation: 'landscape',
  },
  {
    id: 'selfie-golden-temple-amritsar-sarovar',
    src: "/Owner's-Pic/selfie-golden-temple-amritsar-sarovar.webp",
    alt: { en: 'Selfie at the Golden Temple sarovar (sacred pool), Amritsar', es: 'Selfie en el sarovar (estanque sagrado) del Templo Dorado, Amritsar' },
    caption: { en: 'Golden Temple Sarovar', es: 'Sarovar del Templo Dorado' },
    location: 'Amritsar',
    category: 'heritage',
    orientation: 'portrait',
  },
  /* ── Luxury welcome ───────────────────────────────────────────── */
  {
    id: 'couple-hotel-doorman-rajasthani-turban-welcome',
    src: "/Owner's-Pic/couple-hotel-doorman-rajasthani-turban-welcome.webp",
    alt: { en: 'Couple welcomed by hotel doorman in Rajasthani turban', es: 'Pareja recibida por el portero del hotel con turbante rajasthani' },
    caption: { en: 'Rajasthani Welcome', es: 'Bienvenida rajasthaní' },
    location: 'Rajasthan',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'couple-hotel-lobby-marigold-garland-welcome',
    src: "/Owner's-Pic/couple-hotel-lobby-marigold-garland-welcome.webp",
    alt: { en: 'Couple welcomed with marigold garlands in a hotel lobby', es: 'Pareja recibida con guirnaldas de caléndulas en el vestíbulo del hotel' },
    caption: { en: 'Marigold Garland Welcome', es: 'Bienvenida con guirnaldas de caléndulas' },
    location: 'Rajasthan',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'couple-marigold-garlands-golden-carved-arch-hotel-wide',
    src: "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel-wide.webp",
    alt: { en: 'Wide view of couple with marigold garlands under a golden carved arch', es: 'Vista amplia de la pareja con guirnaldas bajo un arco tallado dorado' },
    caption: { en: 'Heritage Hotel Welcome', es: 'Bienvenida en hotel patrimonial' },
    location: 'Rajasthan',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'couple-marigold-garlands-golden-carved-arch-hotel',
    src: "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel.webp",
    alt: { en: 'Couple with marigold garlands under a carved arch at a palace hotel', es: 'Pareja con guirnaldas de caléndulas bajo un arco tallado en un hotel palacio' },
    caption: { en: 'Palace Hotel, Rajasthan', es: 'Hotel palacio, Rajasthan' },
    location: 'Rajasthan',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'group-welcome-traditional-musicians-palace-entrance',
    src: "/Owner's-Pic/group-welcome-traditional-musicians-palace-entrance.webp",
    alt: { en: 'Group welcomed by traditional musicians at a palace entrance', es: 'Grupo recibido por músicos tradicionales a la entrada de un palacio' },
    caption: { en: 'Traditional Musicians', es: 'Músicos tradicionales' },
    location: 'Rajasthan',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'travelers-hotel-doormen-red-turbans-colorful-scarves',
    src: "/Owner's-Pic/travelers-hotel-doormen-red-turbans-colorful-scarves.webp",
    alt: { en: 'Travellers with hotel doormen in red turbans and colourful scarves', es: 'Viajeros con porteros de hotel con turbantes rojos y pañuelos de colores' },
    caption: { en: 'Hotel Welcome, Jaipur', es: 'Bienvenida en hotel, Jaipur' },
    location: 'Jaipur',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'group-flower-garlands-airport-arrival',
    src: "/Owner's-Pic/group-flower-garlands-airport-arrival.webp",
    alt: { en: 'Group receiving flower garlands at airport arrival', es: 'Grupo recibiendo guirnaldas de flores a la llegada al aeropuerto' },
    caption: { en: 'Airport Arrival Welcome', es: 'Bienvenida en el aeropuerto' },
    location: 'India',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'travelers-flower-garlands-airport-welcome',
    src: "/Owner's-Pic/travelers-flower-garlands-airport-welcome.webp",
    alt: { en: 'Travellers wearing flower garlands at airport welcome', es: 'Viajeros con guirnaldas de flores en la bienvenida del aeropuerto' },
    caption: { en: 'Flower Garlands — Airport', es: 'Guirnaldas de flores — Aeropuerto' },
    location: 'India',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'travelers-flower-garlands-tempo-traveller-welcome',
    src: "/Owner's-Pic/travelers-flower-garlands-tempo-traveller-welcome.webp",
    alt: { en: 'Travellers with flower garlands beside a tempo traveller vehicle', es: 'Viajeros con guirnaldas de flores junto a un tempo traveller' },
    caption: { en: 'Traveller Welcome', es: 'Bienvenida al viajero' },
    location: 'India',
    category: 'welcome',
    orientation: 'landscape',
  },
  {
    id: 'travelers-namaste-yellow-doorway-carved-wooden-door',
    src: "/Owner's-Pic/travelers-namaste-yellow-doorway-carved-wooden-door.webp",
    alt: { en: 'Travellers greeting with namaste at a yellow carved wooden doorway', es: 'Viajeros saludando con namaste en una puerta de madera tallada amarilla' },
    caption: { en: 'Traditional Namaste', es: 'Namaste tradicional' },
    location: 'Rajasthan',
    category: 'welcome',
    orientation: 'portrait',
  },
  /* ── Dining & Hospitality ─────────────────────────────────────── */
  {
    id: 'couple-lunch-jaipur-pavilion-itc-rajputana-jaipur',
    src: "/Owner's-Pic/couple-lunch-jaipur-pavilion-itc-rajputana-jaipur.webp",
    alt: { en: 'Couple at lunch in the Jaipur Pavilion at ITC Rajputana hotel', es: 'Pareja en el almuerzo en el Jaipur Pavilion del hotel ITC Rajputana' },
    caption: { en: 'ITC Rajputana, Jaipur', es: 'ITC Rajputana, Jaipur' },
    location: 'Jaipur',
    category: 'dining',
    orientation: 'landscape',
  },
  {
    id: 'group-dinner-evening-gathering-indoors',
    src: "/Owner's-Pic/group-dinner-evening-gathering-indoors.webp",
    alt: { en: 'Group at an evening dinner gathering indoors', es: 'Grupo en una cena vespertina en interior' },
    caption: { en: 'Evening Dinner', es: 'Cena de tarde' },
    location: 'Rajasthan',
    category: 'dining',
    orientation: 'landscape',
  },
  {
    id: 'group-photo-luxury-hotel-lobby-orange-lilies',
    src: "/Owner's-Pic/group-photo-luxury-hotel-lobby-orange-lilies.webp",
    alt: { en: 'Group photo in a luxury hotel lobby with orange lily arrangement', es: 'Foto grupal en el vestíbulo de un hotel de lujo con arreglo de lirios naranjas' },
    caption: { en: 'Luxury Hotel, Rajasthan', es: 'Hotel de lujo, Rajasthan' },
    location: 'Rajasthan',
    category: 'dining',
    orientation: 'landscape',
  },
  {
    id: 'group-photo-hotel-lobby-chandeliers',
    src: "/Owner's-Pic/group-photo-hotel-lobby-chandeliers.webp",
    alt: { en: 'Group photo in a hotel lobby under chandeliers', es: 'Foto grupal en el vestíbulo de un hotel bajo arañas de cristal' },
    caption: { en: 'Hotel Lobby, Chandeliers', es: 'Vestíbulo del hotel, arañas de cristal' },
    location: 'Rajasthan',
    category: 'dining',
    orientation: 'landscape',
  },
  {
    id: 'three-people-blue-painted-interior-candlelit-table',
    src: "/Owner's-Pic/three-people-blue-painted-interior-candlelit-table.webp",
    alt: { en: 'Three people at a candlelit table in a blue painted interior', es: 'Tres personas en una mesa con velas en un interior pintado de azul' },
    caption: { en: 'Candlelit Dinner', es: 'Cena a la luz de las velas' },
    location: 'Rajasthan',
    category: 'dining',
    orientation: 'landscape',
  },
  /* ── Wildlife & Desert ────────────────────────────────────────── */
  {
    id: 'group-sand-dunes-sunset-jaisalmer',
    src: "/Owner's-Pic/group-sand-dunes-sunset-jaisalmer.webp",
    alt: { en: 'Group on sand dunes at sunset near Jaisalmer', es: 'Grupo en las dunas de arena al atardecer cerca de Jaisalmer' },
    caption: { en: 'Sand Dunes, Jaisalmer', es: 'Dunas de arena, Jaisalmer' },
    location: 'Jaisalmer',
    category: 'wildlife',
    orientation: 'landscape',
  },
  {
    id: 'elephant-ride-amber-fort-jaipur',
    src: "/Owner's-Pic/elephant-ride-amber-fort-jaipur.webp",
    alt: { en: 'Elephant ride at Amber Fort, Jaipur', es: 'Paseo en elefante en el Fuerte de Amber, Jaipur' },
    caption: { en: 'Amber Fort, Jaipur', es: 'Fuerte de Amber, Jaipur' },
    location: 'Jaipur',
    category: 'wildlife',
    orientation: 'landscape',
  },
  {
    id: 'couple-painted-elephants-amber-fort-jaipur',
    src: "/Owner's-Pic/couple-painted-elephants-amber-fort-jaipur.webp",
    alt: { en: 'Couple with painted elephants at Amber Fort, Jaipur', es: 'Pareja con elefantes pintados en el Fuerte de Amber, Jaipur' },
    caption: { en: 'Painted Elephants, Jaipur', es: 'Elefantes pintados, Jaipur' },
    location: 'Jaipur',
    category: 'wildlife',
    orientation: 'landscape',
  },
  {
    id: 'travelers-jungle-safari-jeep-winter-morning',
    src: "/Owner's-Pic/travelers-jungle-safari-jeep-winter-morning.webp",
    alt: { en: 'Travellers on a jungle safari jeep on a winter morning', es: 'Viajeros en un jeep de safari por la selva en una mañana de invierno' },
    caption: { en: 'Jungle Safari', es: 'Safari por la selva' },
    location: 'Ranthambore',
    category: 'wildlife',
    orientation: 'landscape',
  },
  /* ── Moments & Groups ─────────────────────────────────────────── */
  {
    id: 'three-people-hotel-lobby-bookshelf-marble-floor',
    src: "/Owner's-Pic/three-people-hotel-lobby-bookshelf-marble-floor.webp",
    alt: { en: 'Three people in a hotel lobby with bookshelf and marble floor', es: 'Tres personas en el vestíbulo de un hotel con estantería y suelo de mármol' },
    caption: { en: 'Hotel Lobby Moment', es: 'Momento en el vestíbulo del hotel' },
    location: 'Rajasthan',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'three-women-holding-painted-camel-figurine',
    src: "/Owner's-Pic/three-women-holding-painted-camel-figurine.webp",
    alt: { en: 'Three women holding a painted camel figurine souvenir', es: 'Tres mujeres con una figura de camello pintada de recuerdo' },
    caption: { en: 'Painted Camel Souvenir', es: 'Recuerdo de camello pintado' },
    location: 'Rajasthan',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'three-women-palace-hotel-courtyard-pillars',
    src: "/Owner's-Pic/three-women-palace-hotel-courtyard-pillars.webp",
    alt: { en: 'Three women in a palace hotel courtyard with pillars', es: 'Tres mujeres en el patio de un hotel palacio con columnas' },
    caption: { en: 'Palace Hotel Courtyard', es: 'Patio del hotel palacio' },
    location: 'Rajasthan',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'two-people-hotel-lobby-red-flower-arrangement',
    src: "/Owner's-Pic/two-people-hotel-lobby-red-flower-arrangement.webp",
    alt: { en: 'Two people in a hotel lobby beside a red flower arrangement', es: 'Dos personas en el vestíbulo del hotel junto a un arreglo floral rojo' },
    caption: { en: 'Hotel Lobby, Red Flowers', es: 'Vestíbulo del hotel, flores rojas' },
    location: 'Rajasthan',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'two-people-modern-hotel-lobby-marble-floor',
    src: "/Owner's-Pic/two-people-modern-hotel-lobby-marble-floor.webp",
    alt: { en: 'Two people in a modern hotel lobby with marble floor', es: 'Dos personas en un vestíbulo de hotel moderno con suelo de mármol' },
    caption: { en: 'Modern Hotel Lobby', es: 'Vestíbulo de hotel moderno' },
    location: 'India',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'travelers-airport-terminal-group-photo',
    src: "/Owner's-Pic/travelers-airport-terminal-group-photo.webp",
    alt: { en: 'Group photo of travellers at an airport terminal', es: 'Foto grupal de viajeros en la terminal del aeropuerto' },
    caption: { en: 'Airport Terminal', es: 'Terminal del aeropuerto' },
    location: 'India',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'travelers-flower-garlands-inside-temple-rajasthan',
    src: "/Owner's-Pic/travelers-flower-garlands-inside-temple-rajasthan.webp",
    alt: { en: 'Travellers with flower garlands inside a Rajasthani temple', es: 'Viajeros con guirnaldas de flores dentro de un templo de Rajasthan' },
    caption: { en: 'Temple, Rajasthan', es: 'Templo, Rajasthan' },
    location: 'Rajasthan',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'travelers-palace-hotel-lobby-tiger-statue-colorful-scarves',
    src: "/Owner's-Pic/travelers-palace-hotel-lobby-tiger-statue-colorful-scarves.webp",
    alt: { en: 'Travellers in a palace hotel lobby beside a tiger statue with colourful scarves', es: 'Viajeros en el vestíbulo de un hotel palacio junto a una estatua de tigre con pañuelos de colores' },
    caption: { en: 'Palace Hotel, Tiger Statue', es: 'Hotel palacio, estatua del tigre' },
    location: 'Rajasthan',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'group-photo-rajasthani-turbans-evening-archway-ganesh',
    src: "/Owner's-Pic/group-photo-rajasthani-turbans-evening-archway-ganesh.webp",
    alt: { en: 'Group with Rajasthani turbans in an evening archway beside a Ganesh statue', es: 'Grupo con turbantes rajasthani en un arco vespertino junto a una estatua de Ganesh' },
    caption: { en: 'Rajasthani Turbans', es: 'Turbantes rajasthanis' },
    location: 'Rajasthan',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'selfie-three-people-garden-red-flowers',
    src: "/Owner's-Pic/selfie-three-people-garden-red-flowers.webp",
    alt: { en: 'Selfie of three people in a garden with red flowers', es: 'Selfie de tres personas en un jardín con flores rojas' },
    caption: { en: 'Garden Moment', es: 'Momento en el jardín' },
    location: 'India',
    category: 'moments',
    orientation: 'portrait',
  },
  /* ── Traveller portraits & international ─────────────────────── */
  {
    id: 'man-portrait-tropical-garden-red-ginger-flowers',
    src: "/Owner's-Pic/man-portrait-tropical-garden-red-ginger-flowers.webp",
    alt: { en: 'Man in a tropical garden with red ginger flowers', es: 'Hombre en un jardín tropical con flores de jengibre rojo' },
    caption: { en: 'Tropical Garden', es: 'Jardín tropical' },
    location: 'India',
    category: 'moments',
    orientation: 'portrait',
  },
  {
    id: 'man-portrait-tropical-hot-springs-waterfall',
    src: "/Owner's-Pic/man-portrait-tropical-hot-springs-waterfall.webp",
    alt: { en: 'Man at tropical hot springs with waterfall', es: 'Hombre en aguas termales tropicales con cascada' },
    caption: { en: 'Hot Springs', es: 'Aguas termales' },
    location: 'India',
    category: 'moments',
    orientation: 'portrait',
  },
  {
    id: 'man-standing-teatro-nacional-san-jose-costa-rica',
    src: "/Owner's-Pic/man-standing-teatro-nacional-san-jose-costa-rica.webp",
    alt: { en: 'Man standing at the Teatro Nacional, San José, Costa Rica', es: 'Hombre de pie ante el Teatro Nacional, San José, Costa Rica' },
    caption: { en: 'Teatro Nacional, Costa Rica', es: 'Teatro Nacional, Costa Rica' },
    location: 'San José, Costa Rica',
    category: 'moments',
    orientation: 'portrait',
  },
  {
    id: 'travelers-helicopter-manang-air-kathmandu-nepal',
    src: "/Owner's-Pic/travelers-helicopter-manang-air-kathmandu-nepal.webp",
    alt: { en: 'Travellers beside a Manang Air helicopter in Kathmandu, Nepal', es: 'Viajeros junto a un helicóptero de Manang Air en Katmandú, Nepal' },
    caption: { en: 'Helicopter, Kathmandu', es: 'Helicóptero, Katmandú' },
    location: 'Kathmandu, Nepal',
    category: 'moments',
    orientation: 'landscape',
  },
  /* ── Unused-in-carousels (newly added to full gallery) ────────── */
  {
    id: 'travelers-airport-terminal-group-photo-close',
    src: "/Owner's-Pic/travelers-airport-terminal-group-photo-close.webp",
    alt: { en: 'Close-up group photo of travellers at an airport terminal', es: 'Primer plano grupal de viajeros en la terminal del aeropuerto' },
    caption: { en: 'Airport Terminal — Close', es: 'Terminal del aeropuerto — de cerca' },
    location: 'India',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'two-people-hotel-lobby-patterned-dress',
    src: "/Owner's-Pic/two-people-hotel-lobby-patterned-dress.webp",
    alt: { en: 'Two people in a hotel lobby, one in a patterned dress', es: 'Dos personas en el vestíbulo del hotel, una con vestido estampado' },
    caption: { en: 'Hotel Lobby Moment', es: 'Momento en el vestíbulo del hotel' },
    location: 'India',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'two-people-hotel-lobby-red-flower-arrangement-2',
    src: "/Owner's-Pic/two-people-hotel-lobby-red-flower-arrangement-2.webp",
    alt: { en: 'Two people in a hotel lobby with red flower arrangement', es: 'Dos personas en el vestíbulo del hotel con arreglo floral rojo' },
    caption: { en: 'Red Floral Lobby', es: 'Vestíbulo con flores rojas' },
    location: 'India',
    category: 'moments',
    orientation: 'landscape',
  },
  {
    id: 'three-people-modern-hotel-lobby-marble-floor',
    src: "/Owner's-Pic/three-people-modern-hotel-lobby-marble-floor.webp",
    alt: { en: 'Three people in a modern hotel lobby with marble floor', es: 'Tres personas en un vestíbulo de hotel moderno con suelo de mármol' },
    caption: { en: 'Modern Hotel Lobby', es: 'Vestíbulo de hotel moderno' },
    location: 'India',
    category: 'moments',
    orientation: 'landscape',
  },
];

/** Assign deterministic layout variants */
export const galleryImages = RAW.map((img, idx) => ({
  ...img,
  layout: assignLayout(idx),
}));

/** Returns only the images used in HomeGallery (18 curated selection) */
export const homeGalleryImages = galleryImages.filter(img => [
  'group-photo-taj-mahal-agra',
  'couple-hotel-lobby-marigold-garland-welcome',
  'group-sand-dunes-sunset-jaisalmer',
  'group-golden-temple-amritsar-orange-headscarves',
  'couple-ganesh-pol-amber-fort-jaipur',
  'group-welcome-traditional-musicians-palace-entrance',
  'travelers-jungle-safari-jeep-winter-morning',
  'group-dinner-evening-gathering-indoors',
  'group-photo-jaswant-thada-jodhpur',
  'couple-painted-elephants-amber-fort-jaipur',
  'travelers-namaste-yellow-doorway-carved-wooden-door',
  'selfie-golden-temple-amritsar-sarovar',
  'group-photo-luxury-hotel-lobby-orange-lilies',
  'travelers-meenakshi-temple-gopuram-madurai',
  'man-standing-teatro-nacional-san-jose-costa-rica',
  'travelers-flower-garlands-airport-welcome',
  'group-photo-scalloped-arch-amber-fort-jaipur',
  'three-women-palace-hotel-courtyard-pillars',
].includes(img.id));

/** Bilingual page-level content for /gallery */
export const galleryPageContent = {
  hero: {
    eyebrow:  { en: 'Real Moments',          es: 'Momentos reales' },
    heading1: { en: 'Journeys in',            es: 'Viajes en' },
    heading2: { en: 'Photographs',            es: 'fotografías' },
    subtitle: { en: 'Real travellers, real destinations — a visual memoir of India with Om.', es: 'Viajeros reales, destinos reales — una memoria visual de la India con Om.' },
    cta:      { en: 'Explore the Collection', es: 'Explorar la colección' },
  },
  filters: {
    all:      { en: 'All',       es: 'Todos' },
    moments:  { en: 'Moments',   es: 'Momentos' },
    welcome:  { en: 'Welcome',   es: 'Bienvenida' },
    heritage: { en: 'Heritage',  es: 'Patrimonio' },
    wildlife: { en: 'Wildlife',  es: 'Naturaleza' },
    dining:   { en: 'Dining',    es: 'Gastronomía' },
  },
  counts: {
    showing:  { en: 'photographs', es: 'fotografías' },
  },
  lightbox: {
    viewImage:    { en: 'View image',    es: 'Ver imagen' },
    prevImage:    { en: 'Previous image', es: 'Imagen anterior' },
    nextImage:    { en: 'Next image',    es: 'Imagen siguiente' },
    closeGallery: { en: 'Close gallery', es: 'Cerrar galería' },
    imageCounter: { en: 'Image',         es: 'Imagen' },
    of:           { en: 'of',            es: 'de' },
  },
  empty: {
    noImages: { en: 'No images in this category.', es: 'No hay imágenes en esta categoría.' },
  },
  cta: {
    planJourney: { en: 'Plan Your Journey', es: 'Planifica tu viaje' },
    viewTours:   { en: 'View All Journeys', es: 'Ver todos los viajes' },
  },
};

export const GALLERY_CATEGORIES = ['all', 'moments', 'welcome', 'heritage', 'wildlife', 'dining'];

/** Data integrity check — run once at startup in dev */
export function validateGalleryData() {
  const errors = [];
  const ids = galleryImages.map(img => img.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) errors.push('Duplicate IDs found');
  galleryImages.forEach(img => {
    if (!img.id)       errors.push(`Missing id: ${img.src}`);
    if (!img.src)      errors.push(`Missing src: ${img.id}`);
    if (!img.alt?.en)  errors.push(`Missing alt.en: ${img.id}`);
    if (!img.alt?.es)  errors.push(`Missing alt.es: ${img.id}`);
    if (!img.caption?.en) errors.push(`Missing caption.en: ${img.id}`);
    if (!img.caption?.es) errors.push(`Missing caption.es: ${img.id}`);
    if (!['standard','wide','feature'].includes(img.layout)) errors.push(`Invalid layout: ${img.id}`);
    if (!['moments','welcome','heritage','wildlife','dining'].includes(img.category)) errors.push(`Invalid category: ${img.id}`);
  });
  return errors;
}
