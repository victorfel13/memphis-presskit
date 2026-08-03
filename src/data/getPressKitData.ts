import type { Locale } from '../i18n/types'
import { translations } from '../i18n/translations'
import {
  audioBlindedByDust,
  audioOverdooze,
  audioRous,
  audioWolfApache,
  coverOverdoze,
  facebookUrl,
  galleryImages,
  heroImage,
  instagramUrl,
  memberPhotos,
  shopImage,
  spotifyArtistUrl,
  youtubeChannelUrl,
  appleMusicArtistUrl,
} from './pressKitAssets'

export function getPressKitData(locale: Locale) {
  const copy = translations[locale]

  return {
    bandName: 'MENFIS CARAVAN' as const,
    nav: copy.nav,
    inicio: {
      heroSrc: heroImage,
      title: 'MENFIS CARAVAN' as const,
      headlineLines: ['MENFIS', 'CARAVAN'] as const,
      subtitle: copy.inicio.subtitle,
      description: copy.inicio.description,
      social: {
        spotify: spotifyArtistUrl,
        youtube: youtubeChannelUrl,
        facebook: facebookUrl,
        instagram: instagramUrl,
      },
    },
    estreno: {
      title: copy.estreno.title,
      subtitle: copy.estreno.subtitle,
      trackTitle: 'Overdoze' as const,
      releaseLabel: copy.estreno.releaseLabel,
      description: copy.estreno.description,
      coverSrc: coverOverdoze,
      preSaveUrl: 'https://hypeddit.com/menfiscaravan/overdoze',
      preSaveLabel: copy.estreno.preSaveLabel,
      preSaveHint: copy.estreno.preSaveHint,
    },
    biografia: {
      title: copy.biografia.title,
      subtitle: copy.biografia.subtitle,
      paragraphs: copy.biografia.paragraphs,
      images: galleryImages.map((img, index) => ({
        ...img,
        alt: copy.biografia.galleryAlt(index),
      })),
    },
    banda: {
      subtitle: copy.banda.subtitle,
      members: [
        { name: 'Beto Quintal', nickname: 'Betin', role: copy.banda.roles.betin, photoSrc: memberPhotos.betin },
        { name: 'Hugo Garrido', nickname: 'Hugo Grunge', role: copy.banda.roles.hugo, photoSrc: memberPhotos.hugo },
        { name: 'Jesús Siliceo', nickname: 'Sili', role: copy.banda.roles.sili, photoSrc: memberPhotos.sili },
        { name: 'Henry Celis Fajardo', nickname: 'Teo', role: copy.banda.roles.teo, photoSrc: memberPhotos.teo },
        { name: 'Carlos Lizárraga', nickname: 'Apache', role: copy.banda.roles.apache, photoSrc: memberPhotos.apache },
      ],
    },
    propuesta: copy.propuesta,
    musica: {
      title: copy.musica.title,
      coverSrc: heroImage,
      coverTint: '#3d1f4a',
      description: copy.musica.description,
      tracks: [
        { id: 'overdoze', title: 'Overdoze', audioSrc: audioOverdooze },
        { id: 'blinded-by-dust', title: 'Blinded by Dust', audioSrc: audioBlindedByDust },
        { id: 'wolf-apache', title: 'Wolf Apache', audioSrc: audioWolfApache },
        { id: 'rous', title: 'Rous', audioSrc: audioRous },
      ],
      platforms: [
        { label: 'Spotify', url: spotifyArtistUrl },
        { label: 'YouTube', url: youtubeChannelUrl },
        { label: 'Apple Music', url: appleMusicArtistUrl },
        { label: 'Bandcamp', url: 'https://menfiscaravan.bandcamp.com' },
      ],
    },
    videos: {
      title: copy.videos.title,
      subtitle: copy.videos.subtitle,
      description: copy.videos.description,
      items: copy.videos.items,
    },
    tienda: {
      title: copy.tienda.title,
      subtitle: copy.tienda.subtitle,
      description: copy.tienda.description,
      imageSrc: shopImage,
      imageAlt: copy.tienda.imageAlt,
      phoneDisplay: '990 195 2915',
      whatsappUrl: `https://wa.me/529901952915?text=${encodeURIComponent(copy.tienda.whatsappMessage)}`,
      whatsappLabel: copy.tienda.whatsappLabel,
    },
    contacto: {
      title: copy.contacto.title,
      booking: {
        name: 'Jesús Guillermo Siliceo',
        phone: '990 195 2915',
        phoneTel: '+529901952915',
        email: 'menfiscaravan@gmail.com',
      },
      redes: {
        spotify: spotifyArtistUrl,
        youtube: youtubeChannelUrl,
        facebook: facebookUrl,
        instagram: instagramUrl,
      },
      form: copy.contacto.form,
    },
    footer: {
      line1: 'MENFIS CARAVAN' as const,
      line2: copy.footer.line2,
      copyright: '© 2026 Menfis Caravan.',
      credit: copy.footer.credit,
    },
    ui: copy.ui,
  }
}

export type PressKitData = ReturnType<typeof getPressKitData>
