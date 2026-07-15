/**
 * DATOS DEL PRESS KIT — edita aquí textos, links e imágenes.
 *
 * Para añadir canciones:
 * 1. Pon el archivo en `src/assets/audio/` (ej. purple-hair.mp3)
 * 2. Impórtalo abajo (como heroGroup)
 * 3. Asigna `audioSrc` al track correspondiente
 */

// ─── Imágenes — hero ─────────────────────────────────────────────────────────
import heroImage from '../assets/hero/hero.jpeg'

// ─── Imágenes — integrantes ──────────────────────────────────────────────────
import photoBetin from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.52 AM (2).jpeg'
import photoHugo from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.50 AM (1).jpeg'
import photoSili from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.51 AM.jpeg'
import photoTeo from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.52 AM (4).jpeg'
import photoApache from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.50 AM (5).jpeg'

// ─── Imágenes — galería (todas las de src/assets/galeria/) ────────────────────
const galleryImports = import.meta.glob<string>('../assets/galeria/*.jpeg', {
  eager: true,
  import: 'default',
})

const galleryImagesSorted = Object.entries(galleryImports)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, src], index) => ({
    src,
    alt: `Menfis Caravan — foto ${index + 1}`,
    category: 'live' as const,
  }))

// ─── Tipos (solo para ayudarte a no equivocarte) ───────────────────────────────

export type NavItem = {
  id: string
  label: string
}

export type ButtonLink = {
  label: string
  url: string
  variant: 'primary' | 'outline'
}

export type Member = {
  name: string
  nickname: string
  role: string
  /** Ruta a la foto del integrante (import desde assets) */
  photoSrc?: string
}

export type Track = {
  id: string
  title: string
  /** URL del audio — importa el archivo y asígnalo aquí */
  audioSrc?: string
  spotifyUrl?: string
}

export type PlatformLink = {
  label: string
  url: string
}

export type GalleryImage = {
  src: string
  alt: string
  category: 'promo' | 'live' | 'studio'
}

export type VideoItem = {
  title: string
  url: string
  category: 'videoclip' | 'live' | 'entrevista'
}

export type DownloadItem = {
  label: string
  url: string
}

export type SocialLinks = {
  spotify: string
  youtube: string
  facebook: string
  instagram: string
}

// ─── Contenido ───────────────────────────────────────────────────────────────

export const pressKitData = {
  bandName: 'MENFIS CARAVAN',

  nav: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'biografia', label: 'Biografía' },
    { id: 'banda', label: 'La Banda' },
    { id: 'musica', label: 'Discografía' },
    { id: 'videos', label: 'Videos' },
    { id: 'contacto', label: 'Contacto' },
  ] satisfies NavItem[],

  inicio: {
    heroSrc: heroImage,
    logoSrc: heroImage,
    title: 'MENFIS CARAVAN',
    headlineLines: ['MENFIS', 'CARAVAN'] as const,
    subtitle: 'Metal alternativo desde Mérida, Yucatán.',
    description:
      'Menfis Caravan transforma la pesadez del metal en una travesía sonora donde convergen el desierto, la psicodelia y la búsqueda de significado.',
    social: {
      spotify: 'https://open.spotify.com/search/Menfis%20Caravan',
      youtube: 'https://www.youtube.com/results?search_query=Menfis+Caravan',
      facebook: 'https://www.facebook.com/search/top?q=menfis%20caravan',
      instagram: 'https://www.instagram.com/explore/search/keyword/?q=menfis%20caravan',
    } satisfies SocialLinks,
  },

  biografia: {
    title: 'Biografía',
    subtitle: 'Sobre la banda',
    paragraphs: [
      'Formada en 2024 en Mérida, Yucatán, Menfis Caravan surge como una propuesta de metal alternativo que desafía las fronteras de los géneros convencionales. Su sonido fusiona la pesadez del stoner y el doom, la agresividad del thrash y el heavy metal, la sensibilidad del grunge, la exploración sonora de la psicodelia y la riqueza compositiva del rock progresivo.',
      'La banda desarrolla composiciones donde riffs contundentes conviven con pasajes hipnóticos y momentos de gran intensidad emocional, buscando que cada canción funcione como una experiencia inmersiva.',
      'En marzo de 2026 lanzó oficialmente The Purple Dust, su primer EP, consolidando una identidad sonora marcada por la fuerza, la introspección y la exploración musical.',
    ],
    /** Fotos del carrusel — carpeta src/assets/galeria/ */
    images: galleryImagesSorted satisfies GalleryImage[],
  },

  banda: {
    subtitle: 'Integrantes',
    members: [
      { name: 'Beto Quintal', nickname: 'Betin', role: 'Voz', photoSrc: photoBetin },
      { name: 'Hugo Garrido', nickname: 'Hugo Grunge', role: 'Guitarra', photoSrc: photoHugo },
      { name: 'Jesús Siliceo', nickname: 'Sili', role: 'Guitarra', photoSrc: photoSili },
      { name: 'Henry Celis Fajardo', nickname: 'Teo', role: 'Bajo', photoSrc: photoTeo },
      { name: 'Carlos Lizárraga', nickname: 'Apache', role: 'Batería', photoSrc: photoApache },
    ] satisfies Member[],
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
    ep: {
      title: 'The Purple Dust',
      coverSrc: heroImage,
      coverTint: '#3d1f4a',
      releaseLabel: 'EP · 2026',
      description: [
        'El primer lanzamiento oficial de Menfis Caravan representa la esencia de su propuesta musical: una combinación de metal alternativo, stoner, doom, grunge y psicodelia que transita entre la pesadez, la introspección y la exploración sonora.',
        'A través de tres composiciones, la banda construye un viaje que refleja su identidad mística y desértica.',
      ],
      tracks: [
        {
          id: 'purple-hair',
          title: 'Purple Hair',
          spotifyUrl: 'https://open.spotify.com/search/Menfis%20Caravan%20Purple%20Hair',
        },
        {
          id: 'blinded-by-dust',
          title: 'Blinded by Dust',
          spotifyUrl: 'https://open.spotify.com/search/Menfis%20Caravan%20Blinded%20by%20Dust',
        },
        {
          id: 'like-a-crucifixion',
          title: 'Like a Crucifixion',
          spotifyUrl: 'https://open.spotify.com/search/Menfis%20Caravan%20Like%20a%20Crucifixion',
        },
      ] satisfies Track[],
      platforms: [
        { label: 'Spotify', url: 'https://open.spotify.com/search/Menfis%20Caravan%20Purple%20Dust' },
        { label: 'YouTube', url: 'https://www.youtube.com/results?search_query=Menfis+Caravan+Purple+Dust' },
        { label: 'Apple Music', url: 'https://music.apple.com/search?term=Menfis%20Caravan' },
        { label: 'Bandcamp', url: 'https://bandcamp.com/search?q=Menfis%20Caravan' },
      ] satisfies PlatformLink[],
    },
  },

  videos: {
    title: 'Videos',
    subtitle: 'Video',
    description:
      'Presentaciones en vivo, sesiones y material audiovisual oficial de Menfis Caravan.',
    items: [
      { title: 'Videoclip', url: 'https://www.youtube.com/results?search_query=Menfis+Caravan', category: 'videoclip' },
      { title: 'Live Session', url: 'https://www.youtube.com/results?search_query=Menfis+Caravan+live', category: 'live' },
      { title: 'Presentación en vivo', url: 'https://www.youtube.com/results?search_query=Menfis+Caravan+concierto', category: 'live' },
    ] satisfies VideoItem[],
  },

  contacto: {
    title: 'Contacto',
    subtitle: 'Booking y prensa',
    booking: {
      name: 'Jesús Guillermo Siliceo',
      phone: '990 195 2915',
      phoneTel: '+529901952915',
      email: 'menfiscaravan@gmail.com',
    },
    redes: {
      spotify: 'https://open.spotify.com/search/Menfis%20Caravan',
      youtube: 'https://www.youtube.com/results?search_query=Menfis+Caravan',
      facebook: 'https://www.facebook.com/search/top?q=menfis%20caravan',
      instagram: 'https://www.instagram.com/explore/search/keyword/?q=menfis%20caravan',
    } satisfies SocialLinks,
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
    line1: 'MENFIS CARAVAN',
    line2: 'Metal Alternativo · Mérida, Yucatán, México',
    copyright: '© 2026 Menfis Caravan.',
    credit: 'Sitio hecho por Menfis Caravan y Víctor Camara',
  },
} as const
