export type Locale = 'es' | 'en'

export type UiStrings = {
  menu: string
  openMenu: string
  homeAria: string
  tracklist: string
  play: string
  pause: string
  musicPlayer: string
  trackProgress: (title: string) => string
  openSpotify: string
  openTrackSpotify: (title: string) => string
  switchToEs: string
  switchToEn: string
  languageLabel: string
  coverAlt: string
  whatsappPrefix: string
  previewSeconds: (seconds: number) => string
  previewOverdoozeEnd: string
  previewComingSoon: string
  previewReplay: string
}

export type PressKitCopy = {
  nav: { id: string; label: string }[]
  inicio: {
    subtitle: string
    description: string
  }
  estreno: {
    title: string
    subtitle: string
    releaseLabel: string
    description: readonly string[]
    preSaveLabel: string
    preSaveHint: string
  }
  biografia: {
    title: string
    subtitle: string
    paragraphs: readonly string[]
    galleryAlt: (index: number) => string
  }
  banda: {
    subtitle: string
    roles: Record<'betin' | 'hugo' | 'sili' | 'teo' | 'apache', string>
  }
  propuesta: {
    musical: { title: string; subtitle: string; paragraphs: readonly string[] }
    lirica: { title: string; subtitle: string; paragraphs: readonly string[] }
  }
  musica: {
    title: string
    description: readonly string[]
  }
  videos: {
    title: string
    subtitle: string
    description: string
    items: { title: string; url: string; category: 'videoclip' | 'live' | 'entrevista' }[]
  }
  tienda: {
    title: string
    subtitle: string
    description: readonly string[]
    imageAlt: string
    whatsappLabel: string
    whatsappMessage: string
  }
  contacto: {
    title: string
    form: {
      nameLabel: string
      emailLabel: string
      subjectLabel: string
      messageLabel: string
      submitLabel: string
      defaultSubject: string
    }
  }
  footer: {
    line2: string
    credit: string
  }
  ui: UiStrings
}
