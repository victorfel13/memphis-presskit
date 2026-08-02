/** Colores y estilos globales — estilo editorial naranja/negro */
export const brand = {
  orange: '#e8722a',
  orangeDark: '#c95e1a',
  black: '#121212',
  surface: '#121212',
  surfaceAlt: '#181818',
  grey: '#282828',
  white: '#f5f5f5',
  textMuted: 'rgba(255,255,255,0.68)',
  borderSubtle: 'rgba(255,255,255,0.08)',
} as const

export const archivoBlackClass = 'archivo-black-regular'

export const archivoBlackSx = {
  fontFamily: '"Archivo Black", sans-serif',
  fontWeight: 400,
  fontStyle: 'normal',
} as const

export const bokorClass = 'bokor-regular'

export const bokorSx = {
  fontFamily: '"Bokor", system-ui',
  fontWeight: 400,
  fontStyle: 'normal',
} as const

export const heroFontFamily = archivoBlackSx.fontFamily
export const sectionTitleFontFamily = bokorSx.fontFamily
export const blockTitleFontFamily = heroFontFamily
export const heroSubtitleFontFamily = '"Varela Round", sans-serif'

export const displayFontFamily = heroFontFamily
export const titleFontFamily = sectionTitleFontFamily
export const bodyFontFamily = '"Source Sans 3", system-ui, sans-serif'

export const proseMaxWidth = 640

/** Párrafos de cuerpo — evitan desborde en móvil dentro de flex */
export const bodyParagraphSx = {
  fontFamily: bodyFontFamily,
  color: brand.textMuted,
  lineHeight: 1.75,
  fontSize: '0.95rem',
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
} as const

export const sectionTitleSx = {
  ...bokorSx,
  fontSize: { xs: '1.65rem', md: '2.1rem' },
  lineHeight: 1.15,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: brand.orange,
  mb: 0,
  maxWidth: '100%',
} as const

export const blockTitleSx = {
  ...archivoBlackSx,
  fontSize: { xs: '1.1rem', md: '1.35rem' },
  lineHeight: 1.2,
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  color: brand.white,
  mb: 0,
  maxWidth: '100%',
  overflowWrap: 'anywhere',
} as const

export const heroTitleSx = {
  ...bokorSx,
  fontSize: {
    xs: 'clamp(4.25rem, 20vw, 6rem)',
    sm: 'clamp(4.75rem, 16vw, 6.5rem)',
    md: 'clamp(5.5rem, 9.5vw, 8.5rem)',
    lg: 'clamp(6rem, 10vw, 9.5rem)',
  },
  lineHeight: 0.88,
  letterSpacing: { xs: '0.02em', md: '0.05em' },
  textTransform: 'uppercase',
  color: brand.white,
  width: '100%',
  maxWidth: '100%',
  overflowWrap: 'anywhere',
} as const

export const heroSubtitleSx = {
  fontFamily: heroSubtitleFontFamily,
  fontSize: { xs: '0.85rem', md: '0.95rem' },
  letterSpacing: '0.06em',
  color: brand.orange,
  fontWeight: 400,
  textTransform: 'uppercase',
  lineHeight: 1.5,
  maxWidth: '100%',
} as const

export const bwPhotoSx = {
  filter: 'grayscale(100%) contrast(1.05)',
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
}

export const colorPhotoSx = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
}

export const pageMaxWidth = 1280

export const pageContentClass = 'page-content'

/** Ancho y centrado — el padding horizontal vive en index.css (.page-content) */
export const pageContentSx = {
  width: '100%',
  maxWidth: pageMaxWidth,
  mx: 'auto',
  boxSizing: 'border-box',
  minWidth: 0,
  overflowX: 'clip',
} as const

export const sectionWrapSx = {
  ...pageContentSx,
  py: { xs: 3.5, md: 7 },
  minWidth: 0,
} as const

export const pageBottomPadWithPlayer = {
  xs: 'calc(80px + env(safe-area-inset-bottom, 0px))',
  md: 'calc(72px + env(safe-area-inset-bottom, 0px))',
} as const

export const navbarInnerHeight = {
  xs: 56,
  md: 64,
} as const

export const navbarHeight = {
  xs: `calc(${navbarInnerHeight.xs}px + env(safe-area-inset-top, 0px))`,
  md: `${navbarInnerHeight.md}px`,
} as const

export const scrollMarginTop = {
  xs: `calc(${navbarInnerHeight.xs}px + env(safe-area-inset-top, 0px))`,
  md: `${navbarInnerHeight.md}px`,
} as const
