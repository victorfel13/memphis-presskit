import type { Locale, PressKitCopy } from './types'

const es: PressKitCopy = {
  nav: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'lanzamientos', label: 'Lanzamientos' },
    { id: 'biografia', label: 'Biografía' },
    { id: 'banda', label: 'La Banda' },
    { id: 'musica', label: 'Discografía' },
    { id: 'videos', label: 'Videos' },
    { id: 'tienda', label: 'Tienda' },
    { id: 'contacto', label: 'Contacto' },
  ],
  inicio: {
    subtitle: 'Metal alternativo desde Mérida, Yucatán.',
    description:
      'Menfis Caravan transforma la pesadez del metal en una travesía sonora donde convergen el desierto, la psicodelia y la búsqueda de significado.',
  },
  estreno: {
    title: 'Estreno',
    subtitle: 'Próximo lanzamiento',
    releaseLabel: 'Single · Pre-save disponible',
    description: [
      'El nuevo single de Menfis Caravan ya está listo para reservarse en tu plataforma favorita.',
      'Haz pre-save ahora y sé de los primeros en escucharlo cuando salga oficialmente.',
    ],
    preSaveLabel: 'Pre-Save — Overdoze',
    preSaveHint:
      'Te llevamos a Hypeddit para conectar Spotify, Apple Music, Deezer u otras plataformas y guardar el single antes del estreno.',
  },
  lanzamientos: {
    title: 'Próximos lanzamientos',
    released: 'Ya disponible',
    upcoming: 'Próximamente',
    kinds: {
      single: 'Sencillo',
      album: 'LP',
      event: 'Presentación',
    },
    countdown: {
      eyebrow: 'Lanzamiento del LP',
      title: 'Menfis Caravan',
      dateLabel: '18 de noviembre de 2026',
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
      available: 'Ya disponible',
    },
    items: [
      { id: 'blinded-by-dust', dateLabel: '3 de septiembre', title: 'Blinded by Dust' },
      { id: 'wolf-apache', dateLabel: '20 de septiembre', title: 'Wolf Apache' },
      { id: 'rous', dateLabel: '4 de octubre', title: 'Rous' },
      { id: 'purple-hair', dateLabel: '25 de octubre', title: 'Purple Hair' },
      { id: 'like-a-crucifixion', dateLabel: '9 de noviembre', title: 'Like a Crucifixion' },
      { id: 'menfis-caravan-lp', dateLabel: '18 de noviembre', title: 'Menfis Caravan' },
      { id: 'material-fisico', dateLabel: '20 de noviembre', title: 'Presentación del material físico' },
    ],
  },
  biografia: {
    title: 'Biografía',
    subtitle: 'Sobre la banda',
    paragraphs: [
      'Formada en 2024 en Mérida, Yucatán, Menfis Caravan surge como una propuesta de metal alternativo que desafía las fronteras de los géneros convencionales. Su sonido fusiona la pesadez del stoner y el doom, la agresividad del thrash y el heavy metal, la sensibilidad del grunge, la exploración sonora de la psicodelia y la riqueza compositiva del rock progresivo.',
      'La banda desarrolla composiciones donde riffs contundentes conviven con pasajes hipnóticos y momentos de gran intensidad emocional, buscando que cada canción funcione como una experiencia inmersiva.',
      'En marzo de 2026 lanzó oficialmente The Purple Dust, su primer EP, consolidando una identidad sonora marcada por la fuerza, la introspección y la exploración musical.',
    ],
    galleryAlt: (index) => `Menfis Caravan — foto ${index + 1}`,
  },
  banda: {
    subtitle: 'Integrantes',
    roles: {
      betin: 'Voz',
      hugo: 'Guitarra',
      sili: 'Guitarra',
      teo: 'Bajo',
      apache: 'Batería',
    },
  },
  propuesta: {
    musical: {
      title: 'Propuesta Musical',
      subtitle: 'Sonido',
      paragraphs: [
        'Menfis Caravan construye su sonido a partir de la convergencia del stoner, doom, thrash, heavy metal, grunge, psicodelia y rock progresivo.',
        'Lejos de limitarse a un solo estilo, la banda desarrolla composiciones donde riffs densos y pesados conviven con pasajes atmosféricos, melodías melancólicas y explosiones de energía que mantienen una narrativa dinámica dentro de cada canción.',
        'Su objetivo es crear una experiencia inmersiva que combine fuerza, emoción y exploración sonora.',
      ],
    },
    lirica: {
      title: 'Propuesta Lírica',
      subtitle: 'Letras',
      paragraphs: [
        'Las composiciones de Menfis Caravan exploran los conflictos internos del ser humano, la transformación personal y la búsqueda de significado.',
        'Sus letras recurren a símbolos, metáforas y elementos espirituales, filosóficos y existenciales para abordar temas como la dualidad entre luz y oscuridad, la lucha contra los propios demonios, la decadencia emocional, la muerte como transformación y los estados alterados de conciencia.',
        'Más que contar historias lineales, buscan evocar emociones, cuestionamientos y múltiples interpretaciones.',
      ],
    },
  },
  musica: {
    title: 'Discografía',
    description: [
      'La música de Menfis Caravan representa una combinación de metal alternativo, stoner, doom, grunge y psicodelia que transita entre la pesadez, la introspección y la exploración sonora.',
      'A través de nuestras composiciones, la banda construye un viaje que refleja su identidad mística y desértica.',
    ],
  },
  videos: {
    title: 'Videos',
    subtitle: 'Video',
    description:
      'Presentaciones en vivo, sesiones y material audiovisual oficial de Menfis Caravan.',
    items: [
      { title: 'Videoclip', url: 'https://www.youtube.com/watch?v=NtE0yziO3k4', category: 'videoclip' },
      { title: 'Black Bleeding', url: 'https://www.youtube.com/shorts/jzvqe2fNckg', category: 'live' },
      { title: 'Presentación en vivo', url: 'https://www.youtube.com/watch?v=MsozeUAy1ys', category: 'live' },
    ],
  },
  tienda: {
    title: 'Tienda',
    subtitle: 'Merch oficial',
    description: [
      'Playeras, hoodies y merch de Menfis Caravan. Escríbenos por WhatsApp para tallas, precios y envíos.',
    ],
    imageAlt: 'Merch Menfis Caravan',
    whatsappLabel: 'Pedir por WhatsApp',
    whatsappMessage: 'Hola, me interesa el merch de Menfis Caravan',
  },
  contacto: {
    title: 'Contacto',
    form: {
      nameLabel: 'Nombre',
      emailLabel: 'Correo',
      subjectLabel: 'Asunto',
      messageLabel: 'Mensaje',
      submitLabel: 'Enviar correo',
      defaultSubject: 'Contacto — Menfis Caravan press kit',
    },
  },
  footer: {
    line2: 'Metal Alternativo · Mérida, Yucatán, México',
    credit: 'Sitio hecho por Menfis Caravan y Víctor Camara',
  },
  ui: {
    menu: 'MENÚ',
    openMenu: 'Abrir menú',
    homeAria: 'Menfis Caravan — inicio',
    tracklist: 'Tracklist',
    play: 'Reproducir',
    pause: 'Pausar',
    musicPlayer: 'Reproductor de música',
    trackProgress: (title) => `Progreso de ${title}`,
    openSpotify: 'Abrir Menfis Caravan en Spotify',
    openTrackSpotify: (title) => `Abrir ${title} en Spotify`,
    switchToEs: 'Cambiar a español',
    switchToEn: 'Switch to English',
    languageLabel: 'Idioma',
    coverAlt: 'Menfis Caravan',
    whatsappPrefix: 'WhatsApp:',
    previewSeconds: (seconds) => `Vista previa · ${seconds} s`,
    previewOverdoozeEnd: 'Escucha más en Spotify y otras plataformas.',
    previewComingSoon: 'Próximamente en plataformas.',
    previewReplay: 'Volver a escuchar la vista previa',
    photoCredit: 'Fotos por Esteban Medina',
  },
}

const en: PressKitCopy = {
  nav: [
    { id: 'inicio', label: 'Home' },
    { id: 'lanzamientos', label: 'Releases' },
    { id: 'biografia', label: 'Bio' },
    { id: 'banda', label: 'The Band' },
    { id: 'musica', label: 'Discography' },
    { id: 'videos', label: 'Videos' },
    { id: 'tienda', label: 'Shop' },
    { id: 'contacto', label: 'Contact' },
  ],
  inicio: {
    subtitle: 'Alternative metal from Mérida, Yucatán.',
    description:
      'Menfis Caravan turns the weight of metal into a sonic journey where desert landscapes, psychedelia, and the search for meaning converge.',
  },
  estreno: {
    title: 'New Release',
    subtitle: 'Upcoming single',
    releaseLabel: 'Single · Pre-save available',
    description: [
      'The new Menfis Caravan single is ready to pre-save on your favorite platform.',
      'Pre-save now and be among the first to hear it on release day.',
    ],
    preSaveLabel: 'Pre-Save — Overdoze',
    preSaveHint:
      'We’ll take you to Hypeddit to connect Spotify, Apple Music, Deezer, or other platforms and save the single before release.',
  },
  lanzamientos: {
    title: 'Upcoming Releases',
    released: 'Out now',
    upcoming: 'Coming soon',
    kinds: {
      single: 'Single',
      album: 'LP',
      event: 'Event',
    },
    countdown: {
      eyebrow: 'LP release',
      title: 'Menfis Caravan',
      dateLabel: 'November 18, 2026',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      available: 'Out now',
    },
    items: [
      { id: 'blinded-by-dust', dateLabel: 'September 3', title: 'Blinded by Dust' },
      { id: 'wolf-apache', dateLabel: 'September 20', title: 'Wolf Apache' },
      { id: 'rous', dateLabel: 'October 4', title: 'Rous' },
      { id: 'purple-hair', dateLabel: 'October 25', title: 'Purple Hair' },
      { id: 'like-a-crucifixion', dateLabel: 'November 9', title: 'Like a Crucifixion' },
      { id: 'menfis-caravan-lp', dateLabel: 'November 18', title: 'Menfis Caravan' },
      { id: 'material-fisico', dateLabel: 'November 20', title: 'Physical release event' },
    ],
  },
  biografia: {
    title: 'Biography',
    subtitle: 'About the band',
    paragraphs: [
      'Formed in 2024 in Mérida, Yucatán, Menfis Caravan is an alternative metal project that pushes beyond conventional genre boundaries. Their sound blends the heaviness of stoner and doom, the aggression of thrash and heavy metal, the sensitivity of grunge, psychedelic exploration, and the compositional depth of progressive rock.',
      'The band builds songs where crushing riffs coexist with hypnotic passages and moments of intense emotion, aiming for each track to work as an immersive experience.',
      'In March 2026 they officially released The Purple Dust, their debut EP, solidifying a sonic identity marked by power, introspection, and musical exploration.',
    ],
    galleryAlt: (index) => `Menfis Caravan — photo ${index + 1}`,
  },
  banda: {
    subtitle: 'Members',
    roles: {
      betin: 'Vocals',
      hugo: 'Guitar',
      sili: 'Guitar',
      teo: 'Bass',
      apache: 'Drums',
    },
  },
  propuesta: {
    musical: {
      title: 'Musical Approach',
      subtitle: 'Sound',
      paragraphs: [
        'Menfis Caravan builds its sound from the convergence of stoner, doom, thrash, heavy metal, grunge, psychedelia, and progressive rock.',
        'Rather than sticking to one style, the band develops compositions where dense, heavy riffs coexist with atmospheric passages, melancholic melodies, and bursts of energy that keep a dynamic narrative within each song.',
        'Their goal is to create an immersive experience that combines force, emotion, and sonic exploration.',
      ],
    },
    lirica: {
      title: 'Lyrical Approach',
      subtitle: 'Lyrics',
      paragraphs: [
        'Menfis Caravan’s compositions explore inner conflict, personal transformation, and the search for meaning.',
        'Their lyrics use symbols, metaphors, and spiritual, philosophical, and existential elements to address themes such as the duality of light and darkness, fighting inner demons, emotional decay, death as transformation, and altered states of consciousness.',
        'Rather than telling linear stories, they aim to evoke emotions, questions, and multiple interpretations.',
      ],
    },
  },
  musica: {
    title: 'Discography',
    description: [
      'Menfis Caravan’s music combines alternative metal, stoner, doom, grunge, and psychedelia, moving between heaviness, introspection, and sonic exploration.',
      'Through our compositions, the band builds a journey that reflects its mystical, desert identity.',
    ],
  },
  videos: {
    title: 'Videos',
    subtitle: 'Video',
    description: 'Live performances, sessions, and official audiovisual material from Menfis Caravan.',
    items: [
      { title: 'Music video', url: 'https://www.youtube.com/watch?v=NtE0yziO3k4', category: 'videoclip' },
      { title: 'Black Bleeding', url: 'https://www.youtube.com/shorts/jzvqe2fNckg', category: 'live' },
      { title: 'Live performance', url: 'https://www.youtube.com/watch?v=MsozeUAy1ys', category: 'live' },
    ],
  },
  tienda: {
    title: 'Shop',
    subtitle: 'Official merch',
    description: [
      'T-shirts, hoodies, and Menfis Caravan merch. Message us on WhatsApp for sizes, prices, and shipping.',
    ],
    imageAlt: 'Menfis Caravan merch',
    whatsappLabel: 'Order on WhatsApp',
    whatsappMessage: 'Hi, I’m interested in Menfis Caravan merch',
  },
  contacto: {
    title: 'Contact',
    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      subjectLabel: 'Subject',
      messageLabel: 'Message',
      submitLabel: 'Send email',
      defaultSubject: 'Contact — Menfis Caravan press kit',
    },
  },
  footer: {
    line2: 'Alternative Metal · Mérida, Yucatán, Mexico',
    credit: 'Site by Menfis Caravan and Víctor Camara',
  },
  ui: {
    menu: 'MENU',
    openMenu: 'Open menu',
    homeAria: 'Menfis Caravan — home',
    tracklist: 'Tracklist',
    play: 'Play',
    pause: 'Pause',
    musicPlayer: 'Music player',
    trackProgress: (title) => `${title} progress`,
    openSpotify: 'Open Menfis Caravan on Spotify',
    openTrackSpotify: (title) => `Open ${title} on Spotify`,
    switchToEs: 'Cambiar a español',
    switchToEn: 'Switch to English',
    languageLabel: 'Language',
    coverAlt: 'Menfis Caravan',
    whatsappPrefix: 'WhatsApp:',
    previewSeconds: (seconds) => `Preview · ${seconds} s`,
    previewOverdoozeEnd: 'Listen more on Spotify and other platforms.',
    previewComingSoon: 'Coming soon to streaming platforms.',
    previewReplay: 'Replay preview',
    photoCredit: 'Photos by Esteban Medina',
  },
}

export const translations: Record<Locale, PressKitCopy> = { es, en }
