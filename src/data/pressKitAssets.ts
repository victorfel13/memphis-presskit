import audioBlindedByDust from '../assets/audio/blinded-by-dust.mp3'
import audioOverdooze from '../assets/audio/overdooze.mp3'
import audioRous from '../assets/audio/rous.mp3'
import audioWolfApache from '../assets/audio/wolf-apache.mp3'
import heroImage from '../assets/hero/hero.jpeg'
import coverOverdoze from '../assets/estreno/portada-overdoze.png'
import shopImage from '../assets/tienda/shop1.jpeg'
import photoBetin from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.52 AM (2).jpeg'
import photoHugo from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.50 AM (1).jpeg'
import photoSili from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.51 AM.jpeg'
import photoTeo from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.52 AM (4).jpeg'
import photoApache from '../assets/members/WhatsApp Image 2026-06-21 at 8.50.50 AM (5).jpeg'

const galleryImports = import.meta.glob<string>('../assets/galeria/*.jpeg', {
  eager: true,
  import: 'default',
})

export const galleryImages = Object.entries(galleryImports)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, src]) => ({
    src,
    category: 'live' as const,
  }))

export const spotifyArtistUrl = 'https://open.spotify.com/artist/5X3yhhxnqw48Z4RCmfHw0C'
export const youtubeChannelUrl = 'https://www.youtube.com/@MenfisCaravan'
export const appleMusicArtistUrl = 'https://music.apple.com/us/artist/menfis-caravan/1872522309'
export const facebookUrl = 'https://www.facebook.com/profile.php?id=61568212000504'
export const instagramUrl = 'https://www.instagram.com/menfis_caravan/'

export {
  audioBlindedByDust,
  audioOverdooze,
  audioRous,
  audioWolfApache,
  heroImage,
  coverOverdoze,
  shopImage,
}

export type ReleaseKind = 'single' | 'album' | 'event'

export type ReleaseItem = {
  id: string
  date: string
  title: string
  kind: ReleaseKind
}

export const memberPhotos = {
  betin: photoBetin,
  hugo: photoHugo,
  sili: photoSili,
  teo: photoTeo,
  apache: photoApache,
} as const

export type NavItem = { id: string; label: string }

export type Member = {
  name: string
  nickname: string
  role: string
  photoSrc?: string
}

export type Track = {
  id: string
  title: string
  audioSrc?: string
  spotifyUrl?: string
}

export type PlatformLink = { label: string; url: string }

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

export type SocialLinks = {
  spotify: string
  youtube: string
  facebook: string
  instagram: string
}
