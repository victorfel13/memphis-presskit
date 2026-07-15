export function getYouTubeVideoId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0] || null
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return v
      const parts = u.pathname.split('/').filter(Boolean)
      const embedIdx = parts.indexOf('embed')
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1]
    }
  } catch {
    return null
  }
  return null
}

export function getYouTubeThumbnailUrl(id: string, quality: 'hq' | 'mq' = 'hq'): string {
  const file = quality === 'hq' ? 'hqdefault.jpg' : 'mqdefault.jpg'
  return `https://img.youtube.com/vi/${id}/${file}`
}

export function getYouTubeEmbedSrc(id: string, autoplay = false): string {
  const params = autoplay ? '?autoplay=1' : ''
  return `https://www.youtube.com/embed/${id}${params}`
}
