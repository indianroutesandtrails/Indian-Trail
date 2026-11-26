/**
 * Short Trips & Day Excursions — Indian Routes & Trails
 *
 * All user-visible fields use { en: "...", es: "..." } bilingual objects.
 * Canonical identifiers (slug, id, type, interests[], image) remain plain values.
 *
 * Image mapping:
 *   /destination/agra.jpg        — Agra in a Day
 *   /destination/bharatpur.jpg   — Bharatpur Bird Park
 *   /destination/jaipur.jpg      — Jaipur in a Day
 *   /destination/pushkar.jpg     — Pushkar & Bagru Block Printing
 *   /destination/ranthambore.jpg — Ranthambore Tiger Safari
 */

export const shortTrips = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Agra in a Day
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'agra-in-a-day',
    title: {
      en: 'Agra in a Day',
      es: 'Agra en un día',
    },
    summary: {
      en: 'The Taj Mahal, Agra Fort and the exquisite Itimad-ud-Daulah — India\'s most iconic city in a single beautifully arranged day.',
      es: 'El Taj Mahal, el Fuerte de Agra y el exquisito Itimad-ud-Daulah — la ciudad más icónica de la India en un solo día perfectamente organizado.',
    },
    image: '/destination/agra.jpg',
    featured: true,
    defaultVariant: 'delhi',
    variants: [
      {
        id: 'delhi',
        label: { en: 'From Delhi', es: 'Desde Delhi' },
        origin: 'Delhi',
        type: 'day-trip',
        interests: ['heritage', 'culture', 'architecture', 'photography'],
        travelTime: {
          en: 'Approximately 2 hours by Gatimaan Express train (subject to timetable) or approximately 3.5–4 hours by road, subject to traffic',
          es: 'Aproximadamente 2 horas en el tren Gatimaan Express (sujeto al horario) o aproximadamente 3,5–4 horas por carretera, según el tráfico',
        },
        duration: { en: '1 Day', es: '1 día' },
        overview: {
          en: 'Begin the day from Delhi — either on the Gatimaan Express, India\'s fastest train linking Delhi Hazrat Nizamuddin to Agra Cantt in approximately two hours (subject to current timetable and availability), or by an early private road departure to beat the traffic. Your guide meets you at Agra station or hotel and the day unfolds across the city\'s three great Mughal monuments. Agra Fort, the red-sandstone imperial citadel on the Yamuna bank, comes first — its immense walls, audience halls and the Musamman Burj tower from which, tradition holds, Shah Jahan watched the Taj Mahal in his final years. Next, the Itimad-ud-Daulah (the "Baby Taj") — an exquisite garden tomb whose finely inlaid white marble surface inspired the craftsmen who would later complete the Taj itself. After lunch at a recommended local restaurant, the afternoon belongs to the Taj Mahal. The monument is most luminous in the warm afternoon light before the crowds thin; your guide will explain the geometry of the char-bagh, the Quranic inscriptions and the Pietra Dura inlay that took 22 years to complete. If the schedule allows, a stop at a verified Agra marble-inlay artisan workshop gives a direct encounter with the craft tradition that has been practised here continuously since the Mughal court. Return to Delhi by the evening train or arranged transport, with a transfer to your Delhi hotel on arrival.',
          es: 'Comience el día desde Delhi — bien en el Gatimaan Express, el tren más rápido de la India que une Delhi Hazrat Nizamuddin con Agra Cantt en aproximadamente dos horas (sujeto al horario y disponibilidad actuales), bien con una salida privada temprana por carretera para evitar el tráfico. Su guía le recibe en la estación o el hotel de Agra, y el día se despliega a través de los tres grandes monumentos mogoles de la ciudad. El Fuerte de Agra, la ciudadela imperial de arenisca roja a orillas del Yamuna, es el primero — con sus imponentes murallas, las salas de audiencias y la torre del Musamman Burj desde la cual, según la tradición, Shah Jahan contempló el Taj Mahal en sus últimos años. A continuación, el Itimad-ud-Daulah (el «Pequeño Taj») — una exquisita tumba-jardín cuya superficie de mármol blanco finamente incrustado inspiró a los artesanos que después completarían el Taj. Tras el almuerzo en un restaurante local recomendado, la tarde pertenece al Taj Mahal. El monumento es más luminoso con la cálida luz de la tarde antes de que se dispersen las multitudes; su guía le explicará la geometría del char-bagh, las inscripciones coránicas y el trabajo de incrustación en Pietra Dura que tardó 22 años en completarse. Si el horario lo permite, una parada en un taller de artesanos de incrustación en mármol de Agra, verificado, ofrece un encuentro directo con la tradición artesanal que se practica aquí ininterrumpidamente desde la corte mogola. Regreso a Delhi en el tren de tarde o en el transporte acordado, con traslado al hotel de Delhi a la llegada.',
        },
        timeline: [
          {
            sequence: { en: 'Early morning', es: 'Primera hora de la mañana' },
            heading: { en: 'Departure from Delhi', es: 'Salida desde Delhi' },
            description: {
              en: 'Depart Delhi by Gatimaan Express from Hazrat Nizamuddin station (subject to current timetable and booking), or by private road at approximately 05:30–06:00 to arrive in Agra before the main tourist rush.',
              es: 'Salida de Delhi en el Gatimaan Express desde la estación de Hazrat Nizamuddin (sujeto al horario y la reserva actuales), o en vehículo privado por carretera a las 05:30–06:00 aproximadamente para llegar a Agra antes de la afluencia turística principal.',
            },
          },
          {
            sequence: { en: 'Morning', es: 'Mañana' },
            heading: { en: 'Agra Fort', es: 'Fuerte de Agra' },
            description: {
              en: 'Guided visit to Agra Fort (UNESCO World Heritage Site) — the great red-sandstone imperial citadel that served as the principal seat of the Mughal Empire under Akbar, Jahangir and Shah Jahan. See the Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), Khas Mahal, Musamman Burj and the views across the Yamuna toward the Taj Mahal.',
              es: 'Visita guiada al Fuerte de Agra (Patrimonio de la Humanidad de la UNESCO) — la gran ciudadela imperial de arenisca roja que fue la sede principal del Imperio mogol bajo Akbar, Jahangir y Shah Jahan. Visite el Diwan-i-Aam (Sala de Audiencias Públicas), el Diwan-i-Khas (Sala de Audiencias Privadas), el Khas Mahal, el Musamman Burj y las vistas sobre el Yamuna hacia el Taj Mahal.',
            },
          },
          {
            sequence: { en: 'Late morning', es: 'Media mañana' },
            heading: { en: 'Itimad-ud-Daulah (Baby Taj)', es: 'Itimad-ud-Daulah (el Pequeño Taj)' },
            description: {
              en: 'The tomb of Mirza Ghiyas Beg — Nur Jahan\'s father and the first major monument in Mughal India to be entirely faced in white marble. Its delicate Pietra Dura inlay work directly prefigures the Taj. Usually far less crowded than the main monument, and arguably more intimate and refined.',
              es: 'La tumba de Mirza Ghiyas Beg — el padre de Nur Jahan y el primer gran monumento en la India mogola revestido enteramente de mármol blanco. Su delicado trabajo de incrustación en Pietra Dura prefigura directamente el Taj. Suele estar mucho menos concurrida que el monumento principal, y es, sin duda, más íntima y refinada.',
            },
          },
          {
            sequence: { en: 'Afternoon', es: 'Tarde' },
            heading: { en: 'Lunch and Taj Mahal', es: 'Almuerzo y Taj Mahal' },
            description: {
              en: 'Lunch at a recommended local Agra restaurant. Afternoon visit to the Taj Mahal — the most celebrated building in the world, built between 1632 and 1653 by Shah Jahan in memory of Mumtaz Mahal. Your guide covers the geometry of the char-bagh, the symmetry of the minarets, the Quranic calligraphic inscriptions and the extraordinary Pietra Dura inlay of semi-precious stones. Note: the Taj Mahal is closed to general visitors every Friday.',
              es: 'Almuerzo en un restaurante local recomendado de Agra. Visita por la tarde al Taj Mahal — el edificio más célebre del mundo, construido entre 1632 y 1653 por Shah Jahan en memoria de Mumtaz Mahal. Su guía le explica la geometría del char-bagh, la simetría de los minaretes, las inscripciones caligráficas coránicas y el extraordinario trabajo de incrustación en Pietra Dura con piedras semipreciosas. Nota: el Taj Mahal está cerrado a las visitas generales todos los viernes.',
            },
          },
          {
            sequence: { en: 'Late afternoon (if time allows)', es: 'Última hora de la tarde (si el tiempo lo permite)' },
            heading: { en: 'Marble Artisan Workshop', es: 'Taller de artesanos del mármol' },
            description: {
              en: 'An optional stop at a verified Agra marble-inlay artisan\'s workshop — where craftspeople continue the Pietra Dura tradition introduced by Mughal court artisans in the 17th century. A direct encounter with a living craft heritage.',
              es: 'Una parada opcional en un taller de artesanos de incrustación en mármol de Agra, verificado — donde los artesanos continúan la tradición de Pietra Dura introducida por los artesanos de la corte mogola en el siglo XVII. Un encuentro directo con un patrimonio artesanal vivo.',
            },
          },
          {
            sequence: { en: 'Evening', es: 'Noche' },
            heading: { en: 'Return to Delhi', es: 'Regreso a Delhi' },
            description: {
              en: 'Transfer to Agra Cantt station or road departure. Return to Delhi by evening train or private vehicle with transfer to your Delhi hotel on arrival.',
              es: 'Traslado a la estación de Agra Cantt o salida por carretera. Regreso a Delhi en el tren de tarde o en vehículo privado, con traslado al hotel de Delhi a la llegada.',
            },
          },
        ],
        highlights: [
          { en: 'Agra Fort — UNESCO imperial Mughal citadel', es: 'Fuerte de Agra — ciudadela imperial mogola, Patrimonio de la UNESCO' },
          { en: 'Itimad-ud-Daulah — the exquisite "Baby Taj" marble tomb', es: 'Itimad-ud-Daulah — la exquisita tumba de mármol «Pequeño Taj»' },
          { en: 'Taj Mahal — guided visit with full contextual explanation', es: 'Taj Mahal — visita guiada con explicación contextual completa' },
          { en: 'Optional: Agra marble-inlay artisan workshop', es: 'Opcional: taller de artesanos de incrustación en mármol de Agra' },
        ],
        inclusions: [
          { en: 'Return Delhi–Agra train fare (when train variant is selected and booked)', es: 'Billete de tren de ida y vuelta Delhi–Agra (cuando se selecciona y reserva la opción en tren)' },
          { en: 'Private air-conditioned vehicle for arrival, local sightseeing and departure transfers in Agra', es: 'Vehículo privado con aire acondicionado para los traslados de llegada, visitas locales y salida en Agra' },
          { en: 'Local Agra lunch', es: 'Almuerzo local en Agra' },
          { en: 'Licensed local monument guide throughout the day', es: 'Guía local de monumentos con licencia durante todo el día' },
          { en: 'Monument entry fees (Agra Fort, Itimad-ud-Daulah, Taj Mahal)', es: 'Entradas a los monumentos (Fuerte de Agra, Itimad-ud-Daulah, Taj Mahal)' },
        ],
        exclusions: [
          { en: 'Personal expenses', es: 'Gastos personales' },
          { en: 'Gratuities for guide and driver', es: 'Propinas para el guía y el conductor' },
          { en: 'Meals not mentioned in inclusions', es: 'Comidas no mencionadas en las inclusiones' },
        ],
        planningNotes: [
          { en: 'The Taj Mahal is closed to general visitors every Friday. Please confirm your visit date avoids Friday.', es: 'El Taj Mahal está cerrado a las visitas generales todos los viernes. Confirme que la fecha de su visita no sea viernes.' },
          { en: 'Gatimaan Express timetable and availability should be verified at time of booking — train numbers, times and fares are subject to change.', es: 'El horario y la disponibilidad del Gatimaan Express deben verificarse en el momento de la reserva — los números de tren, horarios y tarifas están sujetos a cambios.' },
          { en: 'Monument opening hours are subject to change. Entry fees for foreign nationals differ from Indian nationals.', es: 'Los horarios de apertura de los monumentos están sujetos a cambios. Las tarifas de entrada para extranjeros difieren de las aplicables a ciudadanos indios.' },
        ],
        responsibleTourism: null,
      },
      {
        id: 'jaipur',
        label: { en: 'From Jaipur', es: 'Desde Jaipur' },
        origin: 'Jaipur',
        type: 'day-trip',
        interests: ['heritage', 'culture', 'architecture', 'photography'],
        travelTime: {
          en: 'Approximately 4.5 hours by road, subject to traffic',
          es: 'Aproximadamente 4,5 horas por carretera, según el tráfico',
        },
        duration: { en: '1 Day', es: '1 día' },
        overview: {
          en: 'An early road departure from Jaipur — around 07:00, or approximately 06:00 if including the optional detour to Chand Baori and Harshat Mata Temple at Abhaneri village. Abhaneri is home to Chand Baori, one of the largest and most remarkable stepwells in the world: 3,500 narrow steps descending in perfect geometric symmetry to the water below, carved in the 9th century. On arrival in Agra, your guide meets you and the day follows the same sequence: Agra Fort, Itimad-ud-Daulah, lunch and the Taj Mahal. If the schedule allows, an optional sunset view from the Mehtab Bagh — the formal Mughal garden directly across the Yamuna from the Taj, where the monument is reflected perfectly in the water as the light fades — and a stop at a verified marble-inlay artisan workshop. Return by road, approximately 4.5 hours to Jaipur, with a hotel drop on arrival.',
          es: 'Una salida temprana en carretera desde Jaipur — alrededor de las 07:00, o aproximadamente a las 06:00 si se incluye el desvío opcional a Chand Baori y al Templo de Harshat Mata en el pueblo de Abhaneri. Abhaneri alberga el Chand Baori, uno de los pozos escalonados más grandes y notables del mundo: 3.500 estrechos escalones descienden en perfecta simetría geométrica hasta el agua, tallados en el siglo IX. A la llegada a Agra, su guía le recibe y el día sigue la misma secuencia: el Fuerte de Agra, el Itimad-ud-Daulah, el almuerzo y el Taj Mahal. Si el horario lo permite, una vista opcional al atardecer desde el Mehtab Bagh — el jardín mogol formal justo al otro lado del Yamuna frente al Taj, donde el monumento se refleja a la perfección en el agua al caer la luz — y una parada en un taller de artesanos de incrustación en mármol verificado. Regreso por carretera, aproximadamente 4,5 horas hasta Jaipur, con traslado al hotel a la llegada.',
        },
        timeline: [
          {
            sequence: { en: 'Early morning (approximately 07:00, or 06:00 if including Abhaneri)', es: 'Primera hora de la mañana (aprox. 07:00, o 06:00 si se incluye Abhaneri)' },
            heading: { en: 'Departure from Jaipur', es: 'Salida desde Jaipur' },
            description: {
              en: 'Private road departure from Jaipur heading east toward Agra. Approximately 4.5-hour journey subject to traffic and route conditions.',
              es: 'Salida privada por carretera desde Jaipur hacia el este en dirección a Agra. Trayecto de aproximadamente 4,5 horas, sujeto al tráfico y las condiciones de la ruta.',
            },
          },
          {
            sequence: { en: 'En route (optional)', es: 'En ruta (opcional)' },
            heading: { en: 'Chand Baori and Harshat Mata Temple, Abhaneri', es: 'Chand Baori y Templo de Harshat Mata, Abhaneri' },
            description: {
              en: 'The stepwell at Abhaneri village — one of the largest in India, descending 3,500 steps in precise inverted-pyramid geometry to a depth of approximately 20 metres, carved in the 9th century. The adjacent Harshat Mata Temple dates from the same period. An outstanding 45-minute stop on the road.',
              es: 'El pozo escalonado del pueblo de Abhaneri — uno de los más grandes de la India, con 3.500 escalones en precisa geometría de pirámide invertida que descienden aproximadamente 20 metros, tallados en el siglo IX. El Templo de Harshat Mata adyacente data del mismo período. Una parada extraordinaria de 45 minutos en la ruta.',
            },
          },
          {
            sequence: { en: 'Morning', es: 'Mañana' },
            heading: { en: 'Agra Fort', es: 'Fuerte de Agra' },
            description: {
              en: 'Guided visit to Agra Fort (UNESCO). See the Diwan-i-Aam, Diwan-i-Khas, Khas Mahal, Musamman Burj and the views toward the Taj Mahal from the fort\'s riverside ramparts.',
              es: 'Visita guiada al Fuerte de Agra (UNESCO). Visite el Diwan-i-Aam, el Diwan-i-Khas, el Khas Mahal, el Musamman Burj y las vistas hacia el Taj Mahal desde las murallas ribereñas del fuerte.',
            },
          },
          {
            sequence: { en: 'Late morning', es: 'Media mañana' },
            heading: { en: 'Itimad-ud-Daulah (Baby Taj)', es: 'Itimad-ud-Daulah (el Pequeño Taj)' },
            description: {
              en: 'The first great all-white-marble Mughal tomb, its Pietra Dura inlay work a direct inspiration for the Taj Mahal. Intimate, beautiful and rarely crowded.',
              es: 'La primera gran tumba mogola de mármol blanco puro, cuyo trabajo de incrustación en Pietra Dura es una inspiración directa para el Taj Mahal. Íntima, hermosa y raramente concurrida.',
            },
          },
          {
            sequence: { en: 'Afternoon', es: 'Tarde' },
            heading: { en: 'Lunch and Taj Mahal', es: 'Almuerzo y Taj Mahal' },
            description: {
              en: 'Lunch at a recommended local restaurant. Afternoon guided visit to the Taj Mahal. Note: closed every Friday.',
              es: 'Almuerzo en un restaurante local recomendado. Visita guiada por la tarde al Taj Mahal. Nota: cerrado todos los viernes.',
            },
          },
          {
            sequence: { en: 'Late afternoon (if schedule allows)', es: 'Última hora de la tarde (si el horario lo permite)' },
            heading: { en: 'Mehtab Bagh Sunset and Artisan Workshop', es: 'Atardecer en Mehtab Bagh y taller de artesanos' },
            description: {
              en: 'Optional sunset view from Mehtab Bagh garden across the Yamuna — the finest and least crowded vantage point for the Taj Mahal at dusk. Optional stop at a verified marble-inlay artisan workshop.',
              es: 'Vista opcional al atardecer desde el jardín de Mehtab Bagh al otro lado del Yamuna — el mirador más hermoso y menos concurrido del Taj Mahal al anochecer. Parada opcional en un taller de artesanos de incrustación en mármol verificado.',
            },
          },
          {
            sequence: { en: 'Evening', es: 'Noche' },
            heading: { en: 'Return to Jaipur', es: 'Regreso a Jaipur' },
            description: {
              en: 'Road departure from Agra, approximately 4.5 hours subject to traffic, with transfer to your Jaipur hotel on arrival.',
              es: 'Salida por carretera desde Agra, aproximadamente 4,5 horas según el tráfico, con traslado al hotel de Jaipur a la llegada.',
            },
          },
        ],
        highlights: [
          { en: 'Optional: Chand Baori stepwell and Harshat Mata Temple, Abhaneri (9th century)', es: 'Opcional: pozo escalonado de Chand Baori y Templo de Harshat Mata, Abhaneri (siglo IX)' },
          { en: 'Agra Fort — UNESCO imperial Mughal citadel', es: 'Fuerte de Agra — ciudadela imperial mogola, Patrimonio de la UNESCO' },
          { en: 'Itimad-ud-Daulah — the exquisite "Baby Taj" marble tomb', es: 'Itimad-ud-Daulah — la exquisita tumba de mármol «Pequeño Taj»' },
          { en: 'Taj Mahal — guided visit with full contextual explanation', es: 'Taj Mahal — visita guiada con explicación contextual completa' },
          { en: 'Optional: Mehtab Bagh sunset, Agra marble-inlay artisan workshop', es: 'Opcional: atardecer en Mehtab Bagh, taller de artesanos de incrustación en mármol de Agra' },
        ],
        inclusions: [
          { en: 'Private air-conditioned vehicle for return Jaipur–Agra–Jaipur road journey', es: 'Vehículo privado con aire acondicionado para el trayecto de ida y vuelta Jaipur–Agra–Jaipur por carretera' },
          { en: 'Guided city experience in Agra throughout the day', es: 'Experiencia guiada por la ciudad de Agra durante todo el día' },
          { en: 'Local Agra lunch', es: 'Almuerzo local en Agra' },
          { en: 'Monument entry fees (Agra Fort, Itimad-ud-Daulah, Taj Mahal)', es: 'Entradas a los monumentos (Fuerte de Agra, Itimad-ud-Daulah, Taj Mahal)' },
        ],
        exclusions: [
          { en: 'Gratuities for guide and driver', es: 'Propinas para el guía y el conductor' },
          { en: 'Personal expenses', es: 'Gastos personales' },
          { en: 'Meals not mentioned in inclusions', es: 'Comidas no mencionadas en las inclusiones' },
        ],
        planningNotes: [
          { en: 'The Taj Mahal is closed to general visitors every Friday.', es: 'El Taj Mahal está cerrado a las visitas generales todos los viernes.' },
          { en: 'Road travel times are approximate and subject to traffic and road conditions.', es: 'Los tiempos de viaje por carretera son aproximados y están sujetos al tráfico y las condiciones de la ruta.' },
          { en: 'Chand Baori and Harshat Mata Temple entry is managed by ASI — fees apply.', es: 'La entrada a Chand Baori y al Templo de Harshat Mata está gestionada por el ASI — se aplican tarifas.' },
        ],
        responsibleTourism: null,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Bharatpur Bird Park
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'bharatpur-bird-park',
    title: {
      en: 'Bharatpur Bird Park',
      es: 'Parque de Aves de Bharatpur',
    },
    summary: {
      en: 'The UNESCO-listed Keoladeo wetland sanctuary and the 9th-century Chand Baori stepwell — a day or overnight of nature and heritage from Jaipur.',
      es: 'El santuario de humedales de Keoladeo, Patrimonio de la UNESCO, y el pozo escalonado de Chand Baori del siglo IX — una excursión de un día o con pernoctación de naturaleza y patrimonio desde Jaipur.',
    },
    image: '/destination/bharatpur.jpg',
    featured: true,
    defaultVariant: 'same-day',
    variants: [
      {
        id: 'same-day',
        label: { en: 'Same Day', es: 'Excursión de un día' },
        origin: 'Jaipur',
        type: 'day-trip',
        interests: ['wildlife', 'nature', 'photography', 'heritage'],
        travelTime: {
          en: 'Approximately 4 hours each way, subject to traffic',
          es: 'Aproximadamente 4 horas en cada sentido, según el tráfico',
        },
        duration: { en: '1 Day', es: '1 día' },
        overview: {
          en: 'An early road departure from Jaipur, heading east toward Bharatpur — approximately 180 km, four hours subject to route and traffic. The first stop is Abhaneri village, home to Chand Baori — one of the largest and most architecturally remarkable stepwells in the world: 3,500 steps in precise inverted-pyramid symmetry, carved in the 9th century, alongside the Harshat Mata Temple. Arriving in Bharatpur, lunch at a local restaurant before the afternoon visit to Keoladeo National Park. Keoladeo — formerly known as Keoladeo Ghana or Bharatpur Bird Sanctuary — is a UNESCO World Heritage Site and one of Asia\'s most important wetland habitats for resident and migratory birdlife. An authorised cycle-rickshaw or foot birdwatching experience through the park\'s wetlands and woodland allows quiet, unhurried observation of the resident bird colonies and, between October and February, large flocks of migratory waterfowl. The sanctuary is home to over 370 recorded species of birds. Sightings are never guaranteed and depend entirely on season and conditions. Return to Jaipur approximately four hours, with hotel drop on arrival.',
          es: 'Una salida temprana en carretera desde Jaipur, en dirección este hacia Bharatpur — aproximadamente 180 km, cuatro horas según la ruta y el tráfico. La primera parada es el pueblo de Abhaneri, donde se encuentra el Chand Baori — uno de los pozos escalonados arquitectónicamente más notables del mundo: 3.500 escalones en precisa simetría de pirámide invertida, tallados en el siglo IX, junto al Templo de Harshat Mata. A la llegada a Bharatpur, almuerzo en un restaurante local antes de la visita por la tarde al Parque Nacional Keoladeo. Keoladeo — conocido anteriormente como Keoladeo Ghana o Santuario de Aves de Bharatpur — es Patrimonio de la Humanidad de la UNESCO y uno de los hábitats de humedales más importantes de Asia para la avifauna residente y migratoria. Una experiencia guiada en ciclo-rickshaw o a pie por los humedales y el bosque del parque permite una observación tranquila y pausada de las colonias de aves residentes y, entre octubre y febrero, de grandes bandadas de aves acuáticas migratorias. El santuario alberga más de 370 especies registradas de aves. Los avistamientos no están garantizados y dependen íntegramente de la estación y las condiciones. Regreso a Jaipur en aproximadamente cuatro horas, con traslado al hotel a la llegada.',
        },
        timeline: [
          {
            sequence: { en: 'Early morning', es: 'Primera hora de la mañana' },
            heading: { en: 'Departure from Jaipur', es: 'Salida desde Jaipur' },
            description: {
              en: 'Private road departure from Jaipur heading east toward Bharatpur/Abhaneri. Approximately 4 hours subject to traffic.',
              es: 'Salida privada por carretera desde Jaipur hacia el este en dirección a Bharatpur/Abhaneri. Aproximadamente 4 horas según el tráfico.',
            },
          },
          {
            sequence: { en: 'Morning (en route)', es: 'Mañana (en ruta)' },
            heading: { en: 'Chand Baori and Harshat Mata Temple, Abhaneri', es: 'Chand Baori y Templo de Harshat Mata, Abhaneri' },
            description: {
              en: 'One of the finest stepwells in India — 3,500 steps in inverted-pyramid geometry descending approximately 20 metres, carved in the 9th century. The adjacent Harshat Mata Temple is contemporaneous. A rewarding 45-minute stop.',
              es: 'Uno de los pozos escalonados más notables de la India — 3.500 escalones en geometría de pirámide invertida que descienden aproximadamente 20 metros, tallados en el siglo IX. El Templo de Harshat Mata adyacente es contemporáneo. Una parada de 45 minutos muy gratificante.',
            },
          },
          {
            sequence: { en: 'Afternoon arrival', es: 'Llegada por la tarde' },
            heading: { en: 'Lunch in Bharatpur', es: 'Almuerzo en Bharatpur' },
            description: {
              en: 'Arrival in Bharatpur. Lunch at a local restaurant.',
              es: 'Llegada a Bharatpur. Almuerzo en un restaurante local.',
            },
          },
          {
            sequence: { en: 'Afternoon', es: 'Tarde' },
            heading: { en: 'Keoladeo National Park', es: 'Parque Nacional Keoladeo' },
            description: {
              en: 'Guided birdwatching visit to Keoladeo National Park (UNESCO World Heritage Site). An authorised cycle-rickshaw or foot experience through the wetlands and woodland. The park shelters a rich and diverse resident and migratory birdlife across its wetlands, grassland and woodland. Sightings vary by season; the park is at its richest for migratory waterfowl between October and February.',
              es: 'Visita guiada de observación de aves en el Parque Nacional Keoladeo (Patrimonio de la Humanidad de la UNESCO). Experiencia en ciclo-rickshaw autorizado o a pie por los humedales y el bosque. El parque alberga una rica y diversa avifauna residente y migratoria en sus humedales, praderas y bosques. Los avistamientos varían según la estación; el parque es más rico en aves acuáticas migratorias entre octubre y febrero.',
            },
          },
          {
            sequence: { en: 'Evening', es: 'Noche' },
            heading: { en: 'Return to Jaipur', es: 'Regreso a Jaipur' },
            description: {
              en: 'Road departure from Bharatpur, approximately 4 hours subject to traffic, hotel drop in Jaipur.',
              es: 'Salida por carretera desde Bharatpur, aproximadamente 4 horas según el tráfico, traslado al hotel en Jaipur.',
            },
          },
        ],
        highlights: [
          { en: 'Chand Baori stepwell, Abhaneri — 9th century, UNESCO-adjacent heritage', es: 'Pozo escalonado de Chand Baori, Abhaneri — siglo IX, patrimonio próximo a la UNESCO' },
          { en: 'Harshat Mata Temple, Abhaneri', es: 'Templo de Harshat Mata, Abhaneri' },
          { en: 'Keoladeo National Park — UNESCO World Heritage wetland birdwatching', es: 'Parque Nacional Keoladeo — observación de aves en humedales, Patrimonio de la UNESCO' },
          { en: 'Authorised cycle-rickshaw or foot safari through the wetlands', es: 'Safari autorizado en ciclo-rickshaw o a pie por los humedales' },
        ],
        inclusions: [
          { en: 'Private air-conditioned vehicle for return Jaipur–Bharatpur–Jaipur journey', es: 'Vehículo privado con aire acondicionado para el trayecto de ida y vuelta Jaipur–Bharatpur–Jaipur' },
          { en: 'Guided visits to Abhaneri and Keoladeo National Park', es: 'Visitas guiadas a Abhaneri y al Parque Nacional Keoladeo' },
          { en: 'Relevant monument and park entry fees', es: 'Entradas a los monumentos y al parque correspondientes' },
          { en: 'Authorised rickshaw or birdwatching guide experience within the park', es: 'Experiencia de rickshaw autorizado o guía de observación de aves dentro del parque' },
          { en: 'Arrival lunch in Bharatpur', es: 'Almuerzo de llegada en Bharatpur' },
        ],
        exclusions: [
          { en: 'Gratuities for guide and driver', es: 'Propinas para el guía y el conductor' },
          { en: 'Personal expenses', es: 'Gastos personales' },
        ],
        planningNotes: [
          { en: 'Keoladeo National Park is at its richest for migratory waterfowl between October and February, but resident birdlife is present year-round.', es: 'El Parque Nacional Keoladeo es más rico en aves acuáticas migratorias entre octubre y febrero, pero la avifauna residente está presente durante todo el año.' },
          { en: 'Wildlife sightings are never guaranteed and depend entirely on season and conditions.', es: 'Los avistamientos de fauna no están garantizados y dependen íntegramente de la estación y las condiciones.' },
          { en: 'Park entry fees and authorised rickshaw charges apply.', es: 'Se aplican tarifas de entrada al parque y cargos por rickshaw autorizado.' },
        ],
        responsibleTourism: {
          en: 'All wildlife is observed from designated paths, from a respectful distance, in accordance with park regulations. No feeding, disturbing or approaching of animals is permitted.',
          es: 'Toda la fauna se observa desde los senderos designados, a una distancia respetuosa, de acuerdo con la normativa del parque. No está permitido alimentar, molestar ni acercarse a los animales.',
        },
      },
      {
        id: 'overnight',
        label: { en: 'Overnight', es: 'Con alojamiento' },
        origin: 'Jaipur',
        type: 'overnight',
        interests: ['wildlife', 'nature', 'photography', 'heritage'],
        travelTime: {
          en: 'Approximately 4 hours each way, subject to traffic',
          es: 'Aproximadamente 4 horas en cada sentido, según el tráfico',
        },
        duration: { en: '2 Days / 1 Night', es: '2 días / 1 noche' },
        overview: {
          en: 'The overnight variant allows a far more immersive experience of Keoladeo\'s birdlife — an evening visit as the birds roost, a full night in Bharatpur and a relaxed early morning in the park when birdsong is at its richest and the light is at its most photogenic. The outward journey follows the same route: Jaipur by road, Abhaneri\'s Chand Baori and Harshat Mata Temple en route, arrival at Bharatpur hotel, lunch and rest. The afternoon and sunset hours are spent in Keoladeo National Park on an authorised rickshaw or foot safari. A leisurely hotel dinner follows in the evening. The next morning, an early start for the best birdwatching conditions in the park — the golden-hour light and the activity of feeding birds make this one of the most rewarding natural experiences in North India. After breakfast and checkout, the drive returns to Jaipur, approximately four hours subject to traffic.',
          es: 'La modalidad con pernoctación permite una experiencia mucho más inmersiva de la avifauna de Keoladeo — una visita vespertina cuando las aves se recogen a dormir, una noche completa en Bharatpur y una relajada mañana temprana en el parque cuando el canto de los pájaros es más rico y la luz es más fotogénica. El viaje de ida sigue la misma ruta: Jaipur por carretera, el Chand Baori y el Templo de Harshat Mata de Abhaneri en ruta, llegada al hotel de Bharatpur, almuerzo y descanso. Las horas de la tarde y del atardecer se dedican al Parque Nacional Keoladeo en un safari autorizado en rickshaw o a pie. Una relajada cena en el hotel sigue por la noche. A la mañana siguiente, una salida temprana para las mejores condiciones de observación de aves en el parque — la luz de la hora dorada y la actividad de las aves que se alimentan hacen de esta una de las experiencias naturales más gratificantes del norte de la India. Tras el desayuno y el check-out, el viaje regresa a Jaipur, aproximadamente cuatro horas según el tráfico.',
        },
        timeline: [
          {
            sequence: { en: 'Day 1 — Early morning', es: 'Día 1 — Primera hora de la mañana' },
            heading: { en: 'Departure from Jaipur', es: 'Salida desde Jaipur' },
            description: {
              en: 'Private road departure from Jaipur heading east. Approximately 4 hours subject to traffic.',
              es: 'Salida privada por carretera desde Jaipur hacia el este. Aproximadamente 4 horas según el tráfico.',
            },
          },
          {
            sequence: { en: 'Day 1 — Morning (en route)', es: 'Día 1 — Mañana (en ruta)' },
            heading: { en: 'Chand Baori and Harshat Mata Temple, Abhaneri', es: 'Chand Baori y Templo de Harshat Mata, Abhaneri' },
            description: {
              en: '9th-century stepwell and temple at Abhaneri village — one of the finest heritage stops on this road.',
              es: 'Pozo escalonado y templo del siglo IX en el pueblo de Abhaneri — una de las mejores paradas patrimoniales de esta ruta.',
            },
          },
          {
            sequence: { en: 'Day 1 — Afternoon arrival', es: 'Día 1 — Llegada por la tarde' },
            heading: { en: 'Hotel Arrival, Lunch and Rest', es: 'Llegada al hotel, almuerzo y descanso' },
            description: {
              en: 'Arrival at Bharatpur hotel. Lunch and time to settle in before the afternoon park visit.',
              es: 'Llegada al hotel de Bharatpur. Almuerzo y tiempo para instalarse antes de la visita al parque por la tarde.',
            },
          },
          {
            sequence: { en: 'Day 1 — Afternoon and Sunset', es: 'Día 1 — Tarde y atardecer' },
            heading: { en: 'Keoladeo National Park — Evening Birdwatching', es: 'Parque Nacional Keoladeo — Observación de aves al atardecer' },
            description: {
              en: 'Guided evening birdwatching in Keoladeo National Park on an authorised rickshaw or foot safari. Keoladeo is particularly atmospheric in the late afternoon as the light softens and the resident birds begin to roost.',
              es: 'Observación guiada de aves al atardecer en el Parque Nacional Keoladeo en un safari autorizado en rickshaw o a pie. Keoladeo es especialmente atmosférico a última hora de la tarde, cuando la luz se suaviza y las aves residentes comienzan a posarse.',
            },
          },
          {
            sequence: { en: 'Day 1 — Evening', es: 'Día 1 — Noche' },
            heading: { en: 'Hotel Dinner and Overnight', es: 'Cena en el hotel y pernoctación' },
            description: {
              en: 'Return to hotel for dinner and overnight stay in Bharatpur.',
              es: 'Regreso al hotel para cenar y pernoctar en Bharatpur.',
            },
          },
          {
            sequence: { en: 'Day 2 — Early morning', es: 'Día 2 — Primera hora de la mañana' },
            heading: { en: 'Keoladeo National Park — Morning Safari', es: 'Parque Nacional Keoladeo — Safari matutino' },
            description: {
              en: 'An early start for the golden-hour birdwatching visit — the most rewarding time in the park, when the light is photogenic, the birds are most active and the pathways are still quiet.',
              es: 'Una salida temprana para la visita de observación de aves en la hora dorada — el momento más gratificante en el parque, cuando la luz es fotogénica, las aves están más activas y los senderos están aún tranquilos.',
            },
          },
          {
            sequence: { en: 'Day 2 — Morning', es: 'Día 2 — Mañana' },
            heading: { en: 'Breakfast and Checkout', es: 'Desayuno y check-out' },
            description: {
              en: 'Hotel breakfast and checkout.',
              es: 'Desayuno en el hotel y check-out.',
            },
          },
          {
            sequence: { en: 'Day 2 — Late morning', es: 'Día 2 — Media mañana' },
            heading: { en: 'Return to Jaipur', es: 'Regreso a Jaipur' },
            description: {
              en: 'Road departure from Bharatpur. Approximately 4 hours subject to traffic. Hotel drop in Jaipur.',
              es: 'Salida por carretera desde Bharatpur. Aproximadamente 4 horas según el tráfico. Traslado al hotel en Jaipur.',
            },
          },
        ],
        highlights: [
          { en: 'Chand Baori stepwell, Abhaneri — 9th century', es: 'Pozo escalonado de Chand Baori, Abhaneri — siglo IX' },
          { en: 'Keoladeo National Park — UNESCO World Heritage, evening and golden-hour morning birdwatching', es: 'Parque Nacional Keoladeo — Patrimonio de la UNESCO, observación de aves al atardecer y en la hora dorada matutina' },
          { en: 'Overnight Bharatpur — relaxed two-session park experience', es: 'Pernoctación en Bharatpur — experiencia relajada en el parque en dos sesiones' },
          { en: 'Authorised cycle-rickshaw or foot safari', es: 'Safari autorizado en ciclo-rickshaw o a pie' },
        ],
        inclusions: [
          { en: 'Private air-conditioned vehicle for return Jaipur–Bharatpur–Jaipur journey', es: 'Vehículo privado con aire acondicionado para el trayecto de ida y vuelta Jaipur–Bharatpur–Jaipur' },
          { en: 'Guided visits to Abhaneri and Keoladeo National Park (both sessions)', es: 'Visitas guiadas a Abhaneri y al Parque Nacional Keoladeo (ambas sesiones)' },
          { en: 'Bharatpur hotel stay with breakfast, lunch and dinner', es: 'Estancia en hotel en Bharatpur con desayuno, almuerzo y cena' },
          { en: 'Relevant monument and park entry fees', es: 'Entradas a los monumentos y al parque correspondientes' },
          { en: 'Authorised rickshaw or birdwatching guide experience within the park', es: 'Experiencia de rickshaw autorizado o guía de observación de aves dentro del parque' },
        ],
        exclusions: [
          { en: 'Gratuities for guide and driver', es: 'Propinas para el guía y el conductor' },
          { en: 'Personal expenses', es: 'Gastos personales' },
        ],
        planningNotes: [
          { en: 'Keoladeo National Park is at its richest for migratory waterfowl between October and February.', es: 'El Parque Nacional Keoladeo es más rico en aves acuáticas migratorias entre octubre y febrero.' },
          { en: 'Wildlife sightings are never guaranteed.', es: 'Los avistamientos de fauna no están garantizados.' },
          { en: 'Hotel category and specific property are confirmed at time of booking.', es: 'La categoría del hotel y el establecimiento concreto se confirman en el momento de la reserva.' },
        ],
        responsibleTourism: {
          en: 'All wildlife is observed from designated paths at a respectful distance, following park regulations. No feeding or disturbing of animals is permitted.',
          es: 'Toda la fauna se observa desde los senderos designados, a una distancia respetuosa, siguiendo la normativa del parque. No está permitido alimentar ni molestar a los animales.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Jaipur in a Day from Delhi
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'jaipur-in-a-day',
    title: {
      en: 'Jaipur in a Day from Delhi',
      es: 'Jaipur en un día desde Delhi',
    },
    summary: {
      en: 'Amber Fort, the Hawa Mahal, Jantar Mantar, the City Palace and the Pink City\'s bazaars — Rajasthan\'s royal capital in a single well-crafted day from Delhi.',
      es: 'El Fuerte de Amber, el Hawa Mahal, el Jantar Mantar, el Palacio de la Ciudad y los bazares de la Ciudad Rosa — la capital real de Rajasthan en un solo día magistralmente organizado desde Delhi.',
    },
    image: '/destination/jaipur.jpg',
    featured: true,
    defaultVariant: null,
    variants: [
      {
        id: 'delhi',
        label: { en: 'From Delhi', es: 'Desde Delhi' },
        origin: 'Delhi',
        type: 'day-trip',
        interests: ['heritage', 'culture', 'architecture', 'shopping'],
        travelTime: {
          en: 'Approximately 4 hours each way, subject to traffic',
          es: 'Aproximadamente 4 horas en cada sentido, según el tráfico',
        },
        duration: { en: '1 Day', es: '1 día' },
        overview: {
          en: 'An early road departure from Delhi at approximately 05:00 — the only way to make meaningful use of a single day in Jaipur is to arrive before the main visitor rush. The drive takes approximately four hours, subject to traffic on the Delhi–Jaipur expressway. The day opens at Amber Fort and Palace — the magnificent hilltop citadel of the Kachhawaha dynasty rising above Maota Lake, with its Diwan-i-Aam, Sheesh Mahal (Hall of Mirrors) and sweeping views across the Aravalli foothills. Ascent to the fort is by private jeep or on foot; in keeping with the responsible-tourism commitment of Indian Routes and Trails, elephant rides are not offered or encouraged. A short photo stop at Jal Mahal — the lake palace that appears to float on Man Sagar reservoir — precedes a visit to a hand-block-printing artisan workshop, where guests can experience the traditional Rajasthani craft directly. Lunch at a local Jaipur restaurant, then an afternoon circuit of the old walled city: Hawa Mahal, the five-storied Palace of Winds; Jantar Mantar, Sawai Jai Singh\'s 18th-century royal astronomical observatory with its extraordinary masonry instruments (UNESCO); and the City Palace complex. Time permitting, a visit to a Jaipur jewellery or artisan workshop. Return road journey to Delhi, approximately 4.5 hours subject to traffic.',
          es: 'Una salida temprana en carretera desde Delhi a las 05:00 aproximadamente — la única manera de aprovechar al máximo un solo día en Jaipur es llegar antes de la afluencia turística principal. El trayecto tarda aproximadamente cuatro horas, según el tráfico en la autopista Delhi–Jaipur. El día comienza en el Fuerte y Palacio de Amber — la magnífica ciudadela en lo alto de una colina de la dinastía Kachhawaha, que se eleva sobre el lago Maota, con su Diwan-i-Aam, el Sheesh Mahal (Sala de los Espejos) y vistas panorámicas sobre las estribaciones de los Aravalli. El ascenso al fuerte es en jeep privado o a pie; de acuerdo con el compromiso de turismo responsable de Indian Routes and Trails, no se ofrecen ni se fomentan los paseos en elefante. Una breve parada fotográfica en el Jal Mahal — el palacio lacustre que parece flotar sobre el embalse de Man Sagar — precede a una visita a un taller de artesanos de estampado a mano, donde los visitantes pueden experimentar directamente el artesanado tradicional rajasthaní. Almuerzo en un restaurante local de Jaipur y, a continuación, un recorrido por la tarde por la ciudad antigua amurallada: el Hawa Mahal, el Palacio de los Vientos de cinco plantas; el Jantar Mantar, el observatorio astronómico real del siglo XVIII de Sawai Jai Singh con sus extraordinarios instrumentos de mampostería (UNESCO); y el complejo del Palacio de la Ciudad. Si el tiempo lo permite, una visita a una joyería o taller de artesanía de Jaipur. Regreso por carretera a Delhi, aproximadamente 4,5 horas según el tráfico.',
        },
        timeline: [
          {
            sequence: { en: 'Early morning (approximately 05:00)', es: 'Primera hora de la mañana (aproximadamente 05:00)' },
            heading: { en: 'Departure from Delhi', es: 'Salida desde Delhi' },
            description: {
              en: 'Private road departure from Delhi. Approximately 4 hours to Jaipur, subject to traffic.',
              es: 'Salida privada por carretera desde Delhi. Aproximadamente 4 horas hasta Jaipur, según el tráfico.',
            },
          },
          {
            sequence: { en: 'Morning', es: 'Mañana' },
            heading: { en: 'Amber Fort and Palace', es: 'Fuerte y Palacio de Amber' },
            description: {
              en: 'Guided visit to Amber Fort and Palace — the hilltop citadel of the Kachhawaha Rajput dynasty, perched above Maota Lake. Explore the Diwan-i-Aam, Ganesh Pol, Sheesh Mahal and royal apartments. Ascent by private jeep or on foot. Elephant rides are not offered or encouraged.',
              es: 'Visita guiada al Fuerte y Palacio de Amber — la ciudadela en lo alto de una colina de la dinastía Kachhawaha Rajput, encaramada sobre el lago Maota. Explore el Diwan-i-Aam, el Ganesh Pol, el Sheesh Mahal y los apartamentos reales. Ascenso en jeep privado o a pie. No se ofrecen ni se fomentan los paseos en elefante.',
            },
          },
          {
            sequence: { en: 'Late morning', es: 'Media mañana' },
            heading: { en: 'Jal Mahal and Block Printing Workshop', es: 'Jal Mahal y taller de estampado a mano' },
            description: {
              en: 'A photo stop at Jal Mahal — the 18th-century lake palace on Man Sagar reservoir — then a visit to a hand-block-printing artisan workshop for a hands-on encounter with a traditional Rajasthani craft.',
              es: 'Una parada fotográfica en el Jal Mahal — el palacio lacustre del siglo XVIII sobre el embalse de Man Sagar — y, a continuación, una visita a un taller de artesanos de estampado a mano para un encuentro práctico con un artesanado rajasthaní tradicional.',
            },
          },
          {
            sequence: { en: 'Afternoon', es: 'Tarde' },
            heading: { en: 'Lunch and Old City Tour', es: 'Almuerzo y visita a la ciudad antigua' },
            description: {
              en: 'Lunch at a recommended local Jaipur restaurant. Afternoon: Hawa Mahal (five-storied Palace of Winds, exterior and courtyard), Jantar Mantar (UNESCO royal astronomical observatory, 1720s), City Palace (royal residence, Diwan-i-Khas, museum courtyards). Time permitting: Jaipur jewellery or artisan workshop visit.',
              es: 'Almuerzo en un restaurante local recomendado de Jaipur. Tarde: Hawa Mahal (Palacio de los Vientos de cinco plantas, exterior y patio), Jantar Mantar (observatorio astronómico real de la UNESCO, década de 1720), Palacio de la Ciudad (residencia real, Diwan-i-Khas, patios del museo). Si el tiempo lo permite: visita a una joyería o taller de artesanía de Jaipur.',
            },
          },
          {
            sequence: { en: 'Late afternoon', es: 'Última hora de la tarde' },
            heading: { en: 'Bazaars', es: 'Bazares' },
            description: {
              en: 'Time in the Pink City\'s bazaars — Johari Bazaar for jewellery and gemstones, Bapu Bazaar for block-print textiles and Rajasthani footwear, and the lanes around Hawa Mahal for blue pottery and miniature paintings.',
              es: 'Tiempo en los bazares de la Ciudad Rosa — Johari Bazaar para joyería y gemas, Bapu Bazaar para textiles estampados a mano y calzado rajasthaní, y los callejones alrededor del Hawa Mahal para cerámica azul y pinturas en miniatura.',
            },
          },
          {
            sequence: { en: 'Evening', es: 'Noche' },
            heading: { en: 'Return to Delhi', es: 'Regreso a Delhi' },
            description: {
              en: 'Road departure from Jaipur. Approximately 4.5 hours to Delhi, subject to traffic. Hotel drop in Delhi.',
              es: 'Salida por carretera desde Jaipur. Aproximadamente 4,5 horas hasta Delhi, según el tráfico. Traslado al hotel en Delhi.',
            },
          },
        ],
        highlights: [
          { en: 'Amber Fort and Palace — Kachhawaha dynasty hilltop citadel', es: 'Fuerte y Palacio de Amber — ciudadela en la colina de la dinastía Kachhawaha' },
          { en: 'Jal Mahal — lake palace on Man Sagar reservoir (photo stop)', es: 'Jal Mahal — palacio lacustre sobre el embalse de Man Sagar (parada fotográfica)' },
          { en: 'Hand-block-printing artisan workshop visit', es: 'Visita al taller de artesanos de estampado a mano' },
          { en: 'Hawa Mahal — the five-storied Palace of Winds', es: 'Hawa Mahal — el Palacio de los Vientos de cinco plantas' },
          { en: 'Jantar Mantar — UNESCO royal astronomical observatory', es: 'Jantar Mantar — observatorio astronómico real, Patrimonio de la UNESCO' },
          { en: 'City Palace — royal residence and museum complex', es: 'Palacio de la Ciudad — residencia real y complejo museístico' },
          { en: 'Pink City bazaars — jewellery, textiles, blue pottery', es: 'Bazares de la Ciudad Rosa — joyería, textiles, cerámica azul' },
        ],
        inclusions: [
          { en: 'Private air-conditioned return vehicle Delhi–Jaipur–Delhi', es: 'Vehículo privado con aire acondicionado de ida y vuelta Delhi–Jaipur–Delhi' },
          { en: 'Monument entry fees (Amber Fort, Hawa Mahal, Jantar Mantar, City Palace)', es: 'Entradas a los monumentos (Fuerte de Amber, Hawa Mahal, Jantar Mantar, Palacio de la Ciudad)' },
          { en: 'Local Jaipur lunch', es: 'Almuerzo local en Jaipur' },
          { en: 'Guided city visits throughout the day', es: 'Visitas guiadas por la ciudad durante todo el día' },
        ],
        exclusions: [
          { en: 'Gratuities for guide and driver', es: 'Propinas para el guía y el conductor' },
          { en: 'Personal expenses', es: 'Gastos personales' },
          { en: 'Meals not mentioned in inclusions', es: 'Comidas no mencionadas en las inclusiones' },
        ],
        planningNotes: [
          { en: 'Elephant rides are not offered or recommended, in keeping with the responsible-tourism principles of Indian Routes and Trails.', es: 'Los paseos en elefante no se ofrecen ni se recomiendan, de acuerdo con los principios de turismo responsable de Indian Routes and Trails.' },
          { en: 'Jaipur monument entry fees vary for Indian and international visitors.', es: 'Las tarifas de entrada a los monumentos de Jaipur varían entre visitantes indios e internacionales.' },
          { en: 'Road travel time is approximately 4–4.5 hours each way, subject to traffic. Early departure is essential.', es: 'El tiempo de viaje por carretera es de aproximadamente 4–4,5 horas en cada sentido, según el tráfico. La salida temprana es fundamental.' },
        ],
        responsibleTourism: {
          en: 'Amber Fort ascent is by private jeep or on foot. Elephant rides are not offered or encouraged by Indian Routes and Trails.',
          es: 'El ascenso al Fuerte de Amber es en jeep privado o a pie. Indian Routes and Trails no ofrece ni fomenta los paseos en elefante.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Pushkar & Bagru Block Printing
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'pushkar-bagru-block-printing',
    title: {
      en: 'Pushkar & Bagru Block Printing',
      es: 'Pushkar y estampado a mano en Bagru',
    },
    summary: {
      en: 'A day from Jaipur combining a hands-on block-printing workshop in a traditional craftsperson\'s village with the sacred lake, ghats and temples of Pushkar.',
      es: 'Una excursión de un día desde Jaipur que combina un taller práctico de estampado a mano en un pueblo artesanal tradicional con el lago sagrado, los ghats y los templos de Pushkar.',
    },
    image: '/destination/pushkar.jpg',
    featured: false,
    defaultVariant: null,
    variants: [
      {
        id: 'jaipur',
        label: { en: 'From Jaipur', es: 'Desde Jaipur' },
        origin: 'Jaipur',
        type: 'day-trip',
        interests: ['culture', 'spiritual', 'rural', 'artisan'],
        travelTime: {
          en: 'Approximately 1 hour to Bagru; approximately 1.5 hours Bagru to Pushkar; approximately 1.5 hours Pushkar to Jaipur',
          es: 'Aproximadamente 1 hora hasta Bagru; aproximadamente 1,5 horas de Bagru a Pushkar; aproximadamente 1,5 horas de Pushkar a Jaipur',
        },
        duration: { en: '1 Day', es: '1 día' },
        overview: {
          en: 'Departure from Jaipur at approximately 09:00 heading west. The first stop is Bagru village, home to the Chhipa community — one of the oldest and most respected hand-block-printing traditions in Rajasthan. A two-hour hands-on workshop introduces guests to the complete process: natural and traditional dyes, the hand-carved wooden blocks, resist and direct printing techniques, and the distinctive Bagru aesthetic that has been passed down through generations of master craftspeople. Each guest makes their own print using chosen blocks and colour combinations, taking home a souvenir of the craft. Continue to Pushkar — one of the holiest towns in Hindu tradition, built around the sacred Pushkar Lake, which is believed to have appeared where petals fell from the divine hand of Lord Brahma. The town is home to one of the very few temples in the world dedicated to Brahma the Creator. A guided walking tour of the sacred ghats and the Brahma Temple precedes free time to explore Pushkar\'s vibrant bazaar lanes. Lunch is self-paid at one of Pushkar\'s many lakeside cafés or restaurants. The evening option of watching the sunset from Pushkar Lake, or the Savitri Temple hilltop, brings a contemplative close to the day. Return to Jaipur.',
          es: 'Salida desde Jaipur a las 09:00 aproximadamente en dirección oeste. La primera parada es el pueblo de Bagru, hogar de la comunidad Chhipa — una de las tradiciones de estampado a mano más antiguas y respetadas de Rajasthan. Un taller práctico de dos horas introduce a los visitantes en el proceso completo: tintes naturales y tradicionales, los bloques de madera tallados a mano, técnicas de estampado por reserva y directo, y la distintiva estética de Bagru que se ha transmitido a través de generaciones de maestros artesanos. Cada visitante crea su propia estampa eligiendo bloques y combinaciones de colores, llevándose a casa un recuerdo del artesanado. Continúe hacia Pushkar — una de las poblaciones más sagradas de la tradición hindú, construida en torno al sagrado lago Pushkar, que se cree que apareció donde cayeron los pétalos de la mano divina del Señor Brahma. La localidad alberga uno de los pocos templos del mundo dedicados a Brahma el Creador. Un recorrido guiado a pie por los sagrados ghats y el Templo de Brahma precede al tiempo libre para explorar los animados callejones del bazar de Pushkar. El almuerzo corre por cuenta del visitante en uno de los numerosos cafés o restaurantes junto al lago de Pushkar. La opción vespertina de contemplar el atardecer desde el lago Pushkar, o desde la colina del Templo de Savitri, pone un cierre contemplativo al día. Regreso a Jaipur.',
        },
        timeline: [
          {
            sequence: { en: 'Morning (approximately 09:00)', es: 'Mañana (aproximadamente 09:00)' },
            heading: { en: 'Departure from Jaipur', es: 'Salida desde Jaipur' },
            description: {
              en: 'Private road departure from Jaipur west toward Bagru village. Approximately 45 minutes to 1 hour.',
              es: 'Salida privada por carretera desde Jaipur hacia el oeste en dirección al pueblo de Bagru. Aproximadamente 45 minutos a 1 hora.',
            },
          },
          {
            sequence: { en: 'Late morning (approximately 2 hours)', es: 'Media mañana (aproximadamente 2 horas)' },
            heading: { en: 'Bagru Village — Hand-Block-Printing Workshop', es: 'Pueblo de Bagru — Taller de estampado a mano con bloques' },
            description: {
              en: 'Guided visit to the Chhipa community workshop in Bagru. Introduction to the complete block-printing process: preparation of natural and traditional dyes, selection of hand-carved wooden blocks, resist and direct printing on cotton fabric. A approximately two-hour hands-on session — each guest creates their own print using chosen blocks and colours.',
              es: 'Visita guiada al taller de la comunidad Chhipa en Bagru. Introducción al proceso completo de estampado a mano: preparación de tintes naturales y tradicionales, selección de bloques de madera tallados a mano, estampado por reserva y directo sobre tela de algodón. Una sesión práctica de aproximadamente dos horas — cada visitante crea su propia estampa eligiendo bloques y colores.',
            },
          },
          {
            sequence: { en: 'Afternoon arrival', es: 'Llegada por la tarde' },
            heading: { en: 'Drive to Pushkar and Arrival', es: 'Trayecto a Pushkar y llegada' },
            description: {
              en: 'Approximately 1.5-hour drive from Bagru to Pushkar. Arrival and time to settle at a Pushkar café or restaurant for a self-paid lunch.',
              es: 'Trayecto de aproximadamente 1,5 horas de Bagru a Pushkar. Llegada y tiempo para instalarse en un café o restaurante de Pushkar para un almuerzo por cuenta propia.',
            },
          },
          {
            sequence: { en: 'Afternoon', es: 'Tarde' },
            heading: { en: 'Sacred Ghats and Brahma Temple', es: 'Ghats sagrados y Templo de Brahma' },
            description: {
              en: 'Guided exploration of Pushkar\'s 52 sacred ghats around Pushkar Lake, with context on the mythology of the lake and the significance of this pilgrimage site. Visit to the Brahma Temple — one of the very few temples in the world dedicated to Brahma the Creator. Respectful walking tour: visitors should dress modestly, remove shoes at temple thresholds and follow clockwise circumambulation customs.',
              es: 'Exploración guiada de los 52 ghats sagrados de Pushkar alrededor del lago Pushkar, con contexto sobre la mitología del lago y la importancia de este lugar de peregrinación. Visita al Templo de Brahma — uno de los pocos templos del mundo dedicados a Brahma el Creador. Recorrido a pie respetuoso: los visitantes deben vestir con modestia, quitarse los zapatos en los umbrales del templo y seguir las costumbres de circunvalación en el sentido de las agujas del reloj.',
            },
          },
          {
            sequence: { en: 'Afternoon', es: 'Tarde' },
            heading: { en: 'Pushkar Bazaar', es: 'Bazar de Pushkar' },
            description: {
              en: 'Free time in Pushkar\'s bazaar lanes — silver jewellery, incense, printed textiles, spices and Rajasthani craft items.',
              es: 'Tiempo libre en los callejones del bazar de Pushkar — joyería de plata, incienso, textiles estampados, especias y artesanía rajasthaní.',
            },
          },
          {
            sequence: { en: 'Evening', es: 'Noche' },
            heading: { en: 'Sunset by Pushkar Lake or Savitri Temple', es: 'Atardecer junto al lago Pushkar o en el Templo de Savitri' },
            description: {
              en: 'Sunset by Pushkar Lake — one of the most peaceful and atmospheric experiences in Rajasthan. Optional: Savitri Temple hilltop, accessed by ropeway or stairs, for a panoramic view across the desert plains at dusk.',
              es: 'Atardecer junto al lago Pushkar — una de las experiencias más tranquilas y atmosféricas de Rajasthan. Opcional: colina del Templo de Savitri, accesible en teleférico o escaleras, para una vista panorámica sobre las llanuras del desierto al anochecer.',
            },
          },
          {
            sequence: { en: 'Evening', es: 'Noche' },
            heading: { en: 'Return to Jaipur', es: 'Regreso a Jaipur' },
            description: {
              en: 'Private road departure from Pushkar. Approximately 1.5 hours to Jaipur, with hotel drop.',
              es: 'Salida privada por carretera desde Pushkar. Aproximadamente 1,5 horas hasta Jaipur, con traslado al hotel.',
            },
          },
        ],
        highlights: [
          { en: 'Bagru Chhipa community — hands-on block-printing workshop', es: 'Comunidad Chhipa de Bagru — taller práctico de estampado a mano' },
          { en: 'Create your own hand-block print to take home', es: 'Crea tu propio estampado a mano para llevarte a casa' },
          { en: 'Pushkar Lake — one of the holiest sites in Hindu tradition', es: 'Lago Pushkar — uno de los lugares más sagrados de la tradición hindú' },
          { en: 'Brahma Temple — one of the world\'s few Brahma-dedicated temples', es: 'Templo de Brahma — uno de los pocos templos del mundo dedicados a Brahma' },
          { en: 'Pushkar bazaar — silver, textiles, spices', es: 'Bazar de Pushkar — plata, textiles, especias' },
          { en: 'Optional: sunset from Savitri Temple hilltop', es: 'Opcional: atardecer desde la colina del Templo de Savitri' },
        ],
        inclusions: [
          { en: 'Private air-conditioned return vehicle Jaipur–Bagru–Pushkar–Jaipur', es: 'Vehículo privado con aire acondicionado de ida y vuelta Jaipur–Bagru–Pushkar–Jaipur' },
          { en: 'Guided Bagru village visit and hands-on block-printing workshop', es: 'Visita guiada al pueblo de Bagru y taller práctico de estampado a mano' },
          { en: 'Hand-block-printing experience with take-home printed souvenir', es: 'Experiencia de estampado a mano con recuerdo estampado para llevarse a casa' },
          { en: 'Guided walking tour of Pushkar ghats and Brahma Temple', es: 'Recorrido guiado a pie por los ghats de Pushkar y el Templo de Brahma' },
        ],
        exclusions: [
          { en: 'Meals (lunch and all meals are self-paid at Pushkar restaurants)', es: 'Comidas (el almuerzo y todas las comidas corren por cuenta del visitante en los restaurantes de Pushkar)' },
          { en: 'Gratuities for guide and driver', es: 'Propinas para el guía y el conductor' },
          { en: 'Unmentioned activities', es: 'Actividades no mencionadas' },
        ],
        planningNotes: [
          { en: 'Pushkar is a sacred Hindu pilgrimage town; visitors should dress modestly, avoid bringing leather goods to the ghats and follow respectful customs at all temples.', es: 'Pushkar es una sagrada localidad de peregrinación hindú; los visitantes deben vestir con modestia, evitar llevar artículos de cuero a los ghats y seguir costumbres respetuosas en todos los templos.' },
          { en: 'Savitri Temple ropeway operation is subject to weather and maintenance conditions.', es: 'El funcionamiento del teleférico del Templo de Savitri está sujeto a las condiciones meteorológicas y de mantenimiento.' },
          { en: 'The Pushkar Camel Fair takes place in November each year — if visiting during the fair, advance arrangements are strongly recommended.', es: 'La Feria de Camellos de Pushkar se celebra cada año en noviembre — si se visita durante la feria, se recomienda encarecidamente realizar los preparativos con antelación.' },
        ],
        responsibleTourism: {
          en: 'The block-printing workshop directly supports the Chhipa artisan community and their traditional livelihood. This is an authentic craft encounter, not a staged demonstration.',
          es: 'El taller de estampado a mano apoya directamente a la comunidad artesanal Chhipa y su sustento tradicional. Se trata de un encuentro artesanal auténtico, no de una demostración escenificada.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Ranthambore Tiger Safari
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'ranthambore-tiger-safari',
    title: {
      en: 'Ranthambore Tiger Safari',
      es: 'Safari de Tigres en Ranthambore',
    },
    summary: {
      en: 'An overnight from Jaipur into one of India\'s premier wildlife reserves — jeep safaris, the 10th-century Ranthambore Fort and the forests of the Aravalli foothills.',
      es: 'Una excursión con pernoctación desde Jaipur a una de las mejores reservas naturales de la India — safaris en jeep, el Fuerte de Ranthambore del siglo X y los bosques de las estribaciones de los Aravalli.',
    },
    image: '/destination/ranthambore.jpg',
    featured: false,
    defaultVariant: null,
    variants: [
      {
        id: 'jaipur',
        label: { en: 'From Jaipur', es: 'Desde Jaipur' },
        origin: 'Jaipur',
        type: 'overnight',
        interests: ['wildlife', 'nature', 'heritage', 'photography'],
        travelTime: {
          en: 'Approximately 3 hours each way, subject to traffic',
          es: 'Aproximadamente 3 horas en cada sentido, según el tráfico',
        },
        duration: { en: '2 Days / 1 Night', es: '2 días / 1 noche' },
        overview: {
          en: 'Ranthambore National Park — formerly the private hunting grounds of the Maharajas of Jaipur, now one of India\'s best-known wildlife reserves and a major conservation success story for the Royal Bengal Tiger. Set among the rocky terrain and ancient ruins of the Aravalli foothills, Ranthambore is unusually photogenic for an Indian tiger reserve — its open grassland, crumbling ruins and lakeside settings give sightings a dramatic backdrop that few other parks can match. The two-day, one-night trip begins with a morning road departure from Jaipur after breakfast, arriving in time for hotel check-in and lunch. An evening authorized shared-canter vehicle safari through the park follows. The next morning brings an early start for the golden-hour safari — the most productive time for wildlife observations. A visit to the extraordinary 10th-century Ranthambore Fort and the Ganesh Temple within the park precedes a return to the hotel for breakfast, checkout and the drive back to Jaipur. A tiger sighting is never guaranteed and depends entirely on the animal\'s natural movements and choices. All wildlife is observed at a distance, from designated vehicles, in full compliance with park regulations.',
          es: 'El Parque Nacional Ranthambore — antiguamente los terrenos de caza privados de los maharajás de Jaipur, ahora una de las reservas naturales más conocidas de la India y un gran caso de éxito en la conservación del tigre de Bengala. Situado entre el escarpado terreno y las antiguas ruinas de las estribaciones de los Aravalli, Ranthambore es excepcionalmente fotogénico para una reserva de tigres india — sus praderas abiertas, ruinas en desmoronamiento y entornos lacustres ofrecen a los avistamientos un fondo dramático que pocos parques pueden igualar. La excursión de dos días y una noche comienza con una salida en carretera matutina desde Jaipur tras el desayuno, llegando a tiempo para el check-in en el hotel y el almuerzo. A continuación sigue un safari vespertino autorizado en vehículo canter compartido por el parque. A la mañana siguiente se sale temprano para el safari de la hora dorada — el momento más productivo para la observación de fauna. Una visita al extraordinario Fuerte de Ranthambore del siglo X y al Templo de Ganesh dentro del parque precede al regreso al hotel para el desayuno, el check-out y el viaje de regreso a Jaipur. Un avistamiento de tigre no está nunca garantizado y depende íntegramente de los movimientos y decisiones naturales del animal. Toda la fauna se observa a distancia, desde vehículos designados, en pleno cumplimiento de la normativa del parque.',
        },
        timeline: [
          {
            sequence: { en: 'Day 1 — Morning (after breakfast)', es: 'Día 1 — Mañana (después del desayuno)' },
            heading: { en: 'Departure from Jaipur', es: 'Salida desde Jaipur' },
            description: {
              en: 'Private road departure from Jaipur after breakfast. Approximately 3-hour drive to Ranthambore, subject to traffic.',
              es: 'Salida privada por carretera desde Jaipur después del desayuno. Trayecto de aproximadamente 3 horas hasta Ranthambore, según el tráfico.',
            },
          },
          {
            sequence: { en: 'Day 1 — Afternoon', es: 'Día 1 — Tarde' },
            heading: { en: 'Hotel Check-in and Lunch', es: 'Check-in en el hotel y almuerzo' },
            description: {
              en: 'Arrival at Ranthambore hotel, check-in and lunch.',
              es: 'Llegada al hotel de Ranthambore, check-in y almuerzo.',
            },
          },
          {
            sequence: { en: 'Day 1 — Afternoon/Evening', es: 'Día 1 — Tarde/Noche' },
            heading: { en: 'Evening Safari — Ranthambore National Park', es: 'Safari vespertino — Parque Nacional Ranthambore' },
            description: {
              en: 'Authorized shared-canter vehicle safari through Ranthambore National Park. The park\'s woodland, grassland, lakes and ancient ruins provide a dramatic setting for wildlife viewing. Resident wildlife includes Royal Bengal Tiger, leopard, sloth bear, hyena, jackal, sambar deer, chital, nilgai, marsh crocodile and a rich diversity of birds. A tiger sighting is never guaranteed.',
              es: 'Safari autorizado en vehículo canter compartido por el Parque Nacional Ranthambore. El bosque, las praderas, los lagos y las antiguas ruinas del parque proporcionan un escenario dramático para la observación de fauna. La fauna residente incluye tigre de Bengala, leopardo, oso perezoso, hiena, chacal, ciervo sambar, chital, nilgó, cocodrilo de agua dulce y una rica diversidad de aves. Un avistamiento de tigre no está nunca garantizado.',
            },
          },
          {
            sequence: { en: 'Day 1 — Evening', es: 'Día 1 — Noche' },
            heading: { en: 'Return to Hotel and Dinner', es: 'Regreso al hotel y cena' },
            description: {
              en: 'Return to hotel. Rajasthani dinner.',
              es: 'Regreso al hotel. Cena rajasthaní.',
            },
          },
          {
            sequence: { en: 'Day 1 — Night', es: 'Día 1 — Noche' },
            heading: { en: 'Overnight at Ranthambore', es: 'Pernoctación en Ranthambore' },
            description: {
              en: 'Overnight in Ranthambore hotel.',
              es: 'Pernoctación en el hotel de Ranthambore.',
            },
          },
          {
            sequence: { en: 'Day 2 — Early morning', es: 'Día 2 — Primera hora de la mañana' },
            heading: { en: 'Morning Safari — Ranthambore National Park', es: 'Safari matutino — Parque Nacional Ranthambore' },
            description: {
              en: 'Early start for the golden-hour morning safari — the most productive time for wildlife, when the animals are active in the cool morning air and the photographic light is at its best.',
              es: 'Salida temprana para el safari matutino de la hora dorada — el momento más productivo para la fauna, cuando los animales están activos en el fresco aire matutino y la luz fotográfica está en su mejor momento.',
            },
          },
          {
            sequence: { en: 'Day 2 — Late morning', es: 'Día 2 — Media mañana' },
            heading: { en: 'Ranthambore Fort and Ganesh Temple', es: 'Fuerte de Ranthambore y Templo de Ganesh' },
            description: {
              en: 'Visit to the 10th-century Ranthambore Fort — an ancient hilltop citadel whose ruins rise dramatically from the forested hillside within the park boundary. The Ganesh Temple within the fort is an active pilgrimage site. Subject to current park/route access regulations.',
              es: 'Visita al Fuerte de Ranthambore del siglo X — una antigua ciudadela en lo alto de una colina cuyas ruinas se elevan dramáticamente desde la ladera boscosa dentro del límite del parque. El Templo de Ganesh dentro del fuerte es un lugar de peregrinación activo. Sujeto a la normativa vigente de acceso al parque/ruta.',
            },
          },
          {
            sequence: { en: 'Day 2 — Morning', es: 'Día 2 — Mañana' },
            heading: { en: 'Breakfast, Checkout and Return to Jaipur', es: 'Desayuno, check-out y regreso a Jaipur' },
            description: {
              en: 'Hotel breakfast and checkout. Approximately 3-hour road journey back to Jaipur, with hotel drop.',
              es: 'Desayuno en el hotel y check-out. Trayecto por carretera de aproximadamente 3 horas de regreso a Jaipur, con traslado al hotel.',
            },
          },
        ],
        highlights: [
          { en: 'Authorized shared-canter vehicle safaris — morning and evening', es: 'Safaris autorizados en vehículo canter compartido — mañana y tarde' },
          { en: 'Ranthambore National Park — Royal Bengal Tiger habitat', es: 'Parque Nacional Ranthambore — hábitat del tigre de Bengala' },
          { en: '10th-century Ranthambore Fort within the park', es: 'Fuerte de Ranthambore del siglo X dentro del parque' },
          { en: 'Ganesh Temple within the fort (active pilgrimage site)', es: 'Templo de Ganesh dentro del fuerte (lugar de peregrinación activo)' },
          { en: 'Rich non-predator wildlife: leopard, sloth bear, deer, marsh crocodile, birds', es: 'Rica fauna no depredadora: leopardo, oso perezoso, ciervos, cocodrilo de agua dulce, aves' },
        ],
        inclusions: [
          { en: 'Private air-conditioned vehicle Jaipur–Ranthambore–Jaipur', es: 'Vehículo privado con aire acondicionado Jaipur–Ranthambore–Jaipur' },
          { en: 'Guided park safaris (authorized shared-canter vehicle for both sessions)', es: 'Safaris guiados en el parque (vehículo canter compartido autorizado para ambas sesiones)' },
          { en: 'Ranthambore hotel stay with bed and breakfast and lunch', es: 'Estancia en hotel en Ranthambore con alojamiento y desayuno y almuerzo' },
        ],
        exclusions: [
          { en: 'Guide and driver gratuities', es: 'Propinas para el guía y el conductor' },
          { en: 'Personal expenses', es: 'Gastos personales' },
          { en: 'Meals not mentioned in inclusions', es: 'Comidas no mencionadas en las inclusiones' },
        ],
        planningNotes: [
          { en: 'A tiger sighting is never guaranteed. The park experience is rewarding regardless of specific sightings.', es: 'Un avistamiento de tigre no está nunca garantizado. La experiencia en el parque es gratificante independientemente de los avistamientos específicos.' },
          { en: 'Ranthambore National Park safaris operate on authorised shared-canter vehicles. Private jeep options are available at additional cost — enquire at time of booking.', es: 'Los safaris del Parque Nacional Ranthambore operan en vehículos canter compartidos autorizados. Las opciones de jeep privado están disponibles con un coste adicional — consultar en el momento de la reserva.' },
          { en: 'The park has a limited number of daily safari permits; advance booking is strongly recommended, especially October–February.', es: 'El parque dispone de un número limitado de permisos diarios de safari; se recomienda encarecidamente la reserva anticipada, especialmente de octubre a febrero.' },
          { en: 'Park is closed for a period in June/July for the monsoon — verify current seasonal calendar.', es: 'El parque cierra durante un período en junio/julio por el monzón — verificar el calendario de temporada actualizado.' },
        ],
        responsibleTourism: {
          en: 'All wildlife is observed at a distance, from authorized vehicles only, in compliance with Ranthambore National Park regulations. No feeding, baiting or disturbing of animals. No off-road driving.',
          es: 'Toda la fauna se observa a distancia, únicamente desde vehículos autorizados, en cumplimiento de la normativa del Parque Nacional Ranthambore. Prohibido alimentar, cebar o molestar a los animales. Prohibido circular fuera de la pista.',
        },
      },
    ],
  },
];

/** Returns a trip by slug */
export const getShortTripBySlug = (slug) => shortTrips.find((t) => t.slug === slug);

/** Returns a specific variant by trip slug and variant id */
export const getVariant = (slug, variantId) => {
  const trip = getShortTripBySlug(slug);
  if (!trip) return null;
  return trip.variants.find((v) => v.id === variantId) ?? trip.variants[0];
};

/**
 * getLocalized — picks the right language from a {en, es} object,
 * or returns the value unchanged if it is a plain string.
 * Normalises locale: any value starting with 'es' maps to 'es', otherwise 'en'.
 */
export const getLocalizedValue = (value, locale = 'en') => {
  const lang = String(locale || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  if (value === null || value === undefined) return '';
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value['en'] ?? '';
  }
  return value;
};

/**
 * Returns flat list of {value, label} options for all canonical short trips + variants.
 * value format: "slug__variantId"  (double underscore separator)
 * label: "Trip Title — Variant Label" or just "Trip Title" if single variant.
 * @param {string} lang - 'en' or 'es' for localized labels
 */
export const getShortTripSelectOptions = (lang = 'en') => {
  const getVal = (val) => getLocalizedValue(val, lang);
  const options = [];
  shortTrips.forEach((trip) => {
    const tripTitle = getVal(trip.title);
    if (trip.variants.length === 1) {
      const variantLabel = getVal(trip.variants[0].label);
      options.push({
        value: `${trip.slug}__${trip.variants[0].id}`,
        label: `${tripTitle} — ${variantLabel}`,
        tripTitle,
        variantLabel,
      });
    } else {
      trip.variants.forEach((v) => {
        const variantLabel = getVal(v.label);
        options.push({
          value: `${trip.slug}__${v.id}`,
          label: `${tripTitle} — ${variantLabel}`,
          tripTitle,
          variantLabel,
        });
      });
    }
  });
  return options;
};

/**
 * Parses a "slug__variantId" value string back to { slug, variantId, displayLabel }.
 * Returns null for any invalid/malformed value.
 * @param {string} value
 * @param {string} lang - optional locale for display label
 */
export const parseShortTripValue = (value, lang = 'en') => {
  if (!value || typeof value !== 'string') return null;
  const sep = value.lastIndexOf('__');
  if (sep === -1) return null;
  const slug      = value.slice(0, sep);
  const variantId = value.slice(sep + 2);
  const trip = getShortTripBySlug(slug);
  if (!trip) return null;
  const v = trip.variants.find((x) => x.id === variantId);
  if (!v) return null;
  const getVal = (val) => getLocalizedValue(val, lang);
  const tripTitle    = getVal(trip.title);
  const variantLabel = getVal(v.label);
  return { slug, variantId, tripTitle, variantLabel, displayLabel: `${tripTitle} — ${variantLabel}` };
};

/* ─────────────────────────────────────────────────────────────────────────
   Page-level localized content — used by ShortTripsPage and ShortTripDetail
   All fields use the same { en, es } pattern as siteContent.js.
───────────────────────────────────────────────────────────────────────── */
export const shortTripsPageContent = {
  hero: {
    eyebrow: { en: 'Short Trips & Day Excursions', es: 'Viajes cortos y excursiones' },
    title: { en: 'Short Trips & Day Excursions', es: 'Viajes cortos y excursiones de un día' },
    description: {
      en: 'Remarkable places, thoughtfully arranged for a single day or an unhurried night away.',
      es: 'Lugares extraordinarios, organizados con cuidado para una excursión de un día o una noche sin prisas.',
    },
    cta: { en: 'Plan My Trip', es: 'Planificar mi viaje' },
  },
  filters: {
    all:       { en: 'All',          es: 'Todos' },
    delhi:     { en: 'From Delhi',   es: 'Desde Delhi' },
    jaipur:    { en: 'From Jaipur',  es: 'Desde Jaipur' },
    dayTrip:   { en: 'Day Trip',     es: 'Excursión de un día' },
    overnight: { en: 'Overnight',    es: 'Con alojamiento' },
    heritage:  { en: 'Heritage',     es: 'Patrimonio' },
    wildlife:  { en: 'Wildlife',     es: 'Naturaleza y fauna' },
    culture:   { en: 'Culture',      es: 'Cultura' },
  },
  card: {
    viewDetails: { en: 'View Details', es: 'Ver detalles' },
    enquire:     { en: 'Enquire',      es: 'Consultar' },
    noResults:   { en: 'No short trips match this filter.', es: 'Ningún viaje corto coincide con este filtro.' },
    showAll:     { en: 'Show all',     es: 'Mostrar todos' },
  },
  typeBadge: {
    dayTrip:   { en: 'Day Trip',  es: 'Excursión' },
    overnight: { en: 'Overnight', es: 'Con alojamiento' },
  },
  ordinary: {
    eyebrow:     { en: 'Curated by Om',         es: 'Seleccionado por Om' },
    title:       { en: 'Experience the Ordinary', es: 'Vive lo cotidiano' },
    description: {
      en: 'The small encounters that linger longest — a cookfire, a printing block, a paddled canal, a sunrise ghat.',
      es: 'Los pequeños encuentros que permanecen más tiempo en la memoria: un fuego de cocina, un bloque de impresión, un canal recorrido a remo y un ghat al amanecer.',
    },
    enquire: { en: 'Enquire', es: 'Consultar' },
  },
  combine: {
    eyebrow: { en: 'Extend Your Stay', es: 'Amplía tu estancia' },
    title:   { en: 'Add a short trip to any of our journeys.', es: 'Añade una escapada corta a cualquiera de nuestros viajes.' },
    description: {
      en: 'Every multi-day journey can be enriched with a day excursion before or after. Om will design the connection seamlessly.',
      es: 'Cada viaje de varios días puede enriquecerse con una excursión de un día antes o después. Om diseñará la conexión a la perfección.',
    },
    cta: { en: 'View All Journeys', es: 'Ver todos los viajes' },
  },
  finalCta: {
    eyebrow: { en: 'Ready to Begin?', es: '¿Listo para empezar?' },
    title:   { en: 'Plan a Short Trip Around Your Journey', es: 'Planifica una escapada corta para tu viaje' },
    description: {
      en: 'Tell Om what interests you and he will arrange it as an extension of your visit or as a standalone day away.',
      es: 'Dile a Om qué te interesa y él lo organizará como una extensión de tu visita o como una escapada independiente.',
    },
    cta: { en: 'Enquire Now', es: 'Consultar ahora' },
  },
  detail: {
    overview:            { en: 'Overview',              es: 'Resumen' },
    aboutThisTrip:       { en: 'About This Trip',        es: 'Sobre esta excursión' },
    whatToExpect:        { en: 'What to Expect',         es: 'Qué esperar' },
    yourDay:             { en: 'Your Day, Step by Step', es: 'Tu día, paso a paso' },
    howDayUnfolds:       { en: 'How the Day Unfolds',    es: 'Cómo se desarrolla el día' },
    whatsIncluded:       { en: "What's Included",        es: 'Qué incluye' },
    inclExcl:            { en: 'Inclusions & Exclusions', es: 'Incluye y no incluye' },
    included:            { en: 'Included',               es: 'Incluye' },
    notIncluded:         { en: 'Not Included',           es: 'No incluye' },
    beforeYouGo:         { en: 'Before You Go',          es: 'Antes de salir' },
    planningNotes:       { en: 'Planning Notes',         es: 'Notas de planificación' },
    responsibleTourism:  { en: 'Responsible Tourism',    es: 'Turismo responsable' },
    ourCommitment:       { en: 'Our Commitment',         es: 'Nuestro compromiso' },
    tripAtGlance:        { en: 'Trip at a Glance',       es: 'La excursión de un vistazo' },
    type:                { en: 'Type',                   es: 'Tipo' },
    origin:              { en: 'Origin',                 es: 'Origen' },
    duration:            { en: 'Duration',               es: 'Duración' },
    travel:              { en: 'Travel',                 es: 'Desplazamiento' },
    pricing:             { en: 'Pricing',                es: 'Precio' },
    requestQuote:        { en: 'Request a Quote',        es: 'Solicitar presupuesto' },
    variant:             { en: 'Variant',                es: 'Modalidad' },
    planThisTrip:        { en: 'Plan This Trip',         es: 'Planifica esta excursión' },
    omWillRespond:       { en: 'Om will personally respond and arrange the details.', es: 'Om te responderá personalmente y organizará todos los detalles.' },
    enquireNow:          { en: 'Enquire Now',            es: 'Consultar ahora' },
    allShortTrips:       { en: 'All Short Trips',        es: 'Todos los viajes cortos' },
    beginThisTrip:       { en: 'Begin This Trip',        es: 'Comienza esta excursión' },
    readyToGo:           { en: 'Ready to Go?',           es: '¿Listo para partir?' },
    shareDate:           { en: 'Share your preferred date and Om will arrange everything.', es: 'Comparte tu fecha preferida y Om lo organizará todo.' },
    highlights:          { en: 'Highlights',             es: 'Aspectos destacados' },
    dayByDay:            { en: 'Day by Day',             es: 'Día a día' },
    enquire:             { en: 'Enquire About This Trip', es: 'Consultar sobre esta excursión' },
    backToTrips:         { en: 'All Short Trips',        es: 'Todos los viajes cortos' },
    allShortTripsLink:   { en: 'All Short Trips',        es: 'Todos los viajes cortos' },
  },
  sliderDots: {
    shortTrip:  { en: 'Short Trip',  es: 'Viaje corto' },
    experience: { en: 'Experience',  es: 'Experiencia' },
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   Localized Ordinary Experience cards
───────────────────────────────────────────────────────────────────────── */
export const EXPERIENCES_DATA = [
  {
    id: 'heritage-walk-mumbai',
    title: { en: 'Heritage Walk in Mumbai — Kala Ghoda', es: 'Paseo patrimonial en Mumbai — Kala Ghoda' },
    summary: {
      en: "A guided colonial heritage walk through Mumbai's most atmospheric district — Victorian Gothic, Indo-Saracenic and Art Deco architecture around the original Kala Ghoda cultural quarter.",
      es: 'Un paseo guiado por el patrimonio colonial del barrio más atmosférico de Mumbai: arquitectura victoriana gótica, indo-sarracena y art déco alrededor del histórico barrio cultural de Kala Ghoda.',
    },
    image: '/ordinary/kala_ghoda.jpg',
  },
  {
    id: 'cooking-experience',
    title: { en: 'Hands-on Cooking Experience', es: 'Taller de cocina práctica' },
    summary: {
      en: 'Learn to cook an authentic Indian meal with a local host — spices, techniques and recipes you can recreate at home.',
      es: 'Aprende a cocinar un auténtico plato indio con un anfitrión local: especias, técnicas y recetas que podrás recrear en casa.',
    },
    image: '/ordinary/cooking.jpg',
  },
  {
    id: 'block-printing',
    title: { en: 'Hand Block Printing Experience', es: 'Taller de estampado a mano con bloques' },
    summary: {
      en: "Work directly with traditional Rajasthani block-printing artisans — choose your block, mix your colour and create your own printed fabric to take home.",
      es: 'Trabaja directamente con artesanos tradicionales de estampado rajasthani: elige tu bloque, mezcla tu color y crea tu propio tejido estampado para llevarte a casa.',
    },
    image: '/ordinary/block_printing.jpg',
  },
  {
    id: 'blue-pottery',
    title: { en: 'Blue Pottery Classes', es: 'Clases de cerámica azul' },
    summary: {
      en: "Jaipur's distinctive turquoise and white ceramic tradition: a studio session with a Blue Pottery master craftsperson.",
      es: 'La distintiva tradición cerámica en turquesa y blanco de Jaipur: una sesión de taller con un maestro artesano de la cerámica azul.',
    },
    image: '/ordinary/blue_pottery.jpg',
  },
  {
    id: 'heritage-train-deogarh',
    title: { en: 'Rural Heritage Train Journey in Deogarh', es: 'Viaje en tren patrimonial rural en Deogarh' },
    summary: {
      en: "A slow metre-gauge train ride through the Aravalli Hills — one of Rajasthan's most evocative and least-visited experiences.",
      es: 'Un tranquilo viaje en tren de vía métrica por las colinas de los Aravalli — una de las experiencias más evocadoras y menos visitadas de Rajasthan.',
    },
    image: '/ordinary/train_journey.jpg',
  },
  {
    id: 'kerala-backwater',
    title: { en: 'Kerala Backwater Boat Experience', es: 'Paseo en barca por los remansos de Kerala' },
    summary: {
      en: "A houseboat cruise through the coconut-fringed canals of Kumarakom and Alleppey — a gentle, unhurried introduction to Kerala's backwater world.",
      es: 'Un crucero en casa flotante por los canales bordeados de cocoteros de Kumarakom y Alleppey: una introducción suave y pausada al mundo de los remansos de Kerala.',
    },
    image: '/ordinary/kerala_boat.jpg',
  },
  {
    id: 'yoga-rishikesh',
    title: { en: 'Yoga Retreats and Classes — Rishikesh and Haridwar', es: 'Retiros y clases de yoga — Rishikesh y Haridwar' },
    summary: {
      en: "Practise yoga at the source — Rishikesh's riverbank ashrams and the ghats of Haridwar offer an immersive introduction to the living tradition.",
      es: 'Practica yoga en su origen: los ashrams a orillas del río en Rishikesh y los ghats de Haridwar ofrecen una introducción inmersiva a la tradición viva.',
    },
    image: '/ordinary/yoga_class.jpg',
  },
  {
    id: 'rickshaw-delhi',
    title: { en: 'Tuk-Tuk and Rickshaw Ride in New Delhi', es: 'Paseo en tuk-tuk y rickshaw por Nueva Delhi' },
    summary: {
      en: 'Navigate the lanes of Old Delhi by cycle-rickshaw and auto-rickshaw — the most direct way to experience the rhythm of the city at street level.',
      es: 'Recorre los callejones del Viejo Delhi en rickshaw de pedales y auto-rickshaw: la forma más directa de vivir el ritmo de la ciudad a pie de calle.',
    },
    image: '/ordinary/rikshaw_ride.jpg',
  },
  {
    id: 'boat-pichola',
    title: { en: 'Boat Ride on Lake Pichola, Udaipur', es: 'Paseo en barca por el lago Pichola, Udaipur' },
    summary: {
      en: "A sunset cruise on Udaipur's most iconic lake, passing the Lake Palace and Jag Mandir island palaces as the Aravalli Hills glow in the fading light.",
      es: 'Un crucero al atardecer por el lago más icónico de Udaipur, pasando junto al Palacio del Lago y los palacios insulares de Jag Mandir mientras las colinas de los Aravalli brillan con la luz del crepúsculo.',
    },
    image: '/ordinary/boat_ride_udaipur.jpg',
  },
  {
    id: 'jaipur-sunset',
    title: { en: 'Jaipur Sunset & Nightlife Experience', es: 'Atardecer y vida nocturna en Jaipur' },
    summary: {
      en: "Nahargarh Fort at dusk, the illuminated Pink City from the ramparts, rooftop restaurants in the old city and the vibrant night market of Johari Bazaar.",
      es: 'El Fuerte Nahargarh al atardecer, la Ciudad Rosa iluminada desde las murallas, restaurantes en azoteas en la ciudad vieja y el vibrante mercado nocturno del Johari Bazaar.',
    },
    image: '/ordinary/jaipur_sunset.jpg',
  },
];
