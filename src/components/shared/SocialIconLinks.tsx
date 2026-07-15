import { IconButton, Stack } from '@mui/material'
import type { SocialLinks } from '../../data/pressKitData'
import { brand } from '../../theme/brand'
import { FacebookGlyph } from '../FacebookGlyph'
import { InstagramGlyph } from '../InstagramGlyph'
import { SpotifyGlyph } from '../SpotifyGlyph'
import { YouTubeGlyph } from '../YouTubeGlyph'

type SocialIconLinksProps = {
  redes: SocialLinks
  size?: number
  variant?: 'outlined' | 'ghost'
}

const outlinedSx = {
  color: brand.white,
  border: '1px solid rgba(255,255,255,0.35)',
  width: 44,
  height: 44,
  '&:hover': { color: brand.orange, borderColor: brand.orange, bgcolor: 'rgba(240,122,42,0.08)' },
} as const

const ghostSx = {
  color: 'rgba(255,255,255,0.5)',
  width: 40,
  height: 40,
  '&:hover': { color: brand.orange, bgcolor: 'rgba(240,122,42,0.06)' },
} as const

const items = [
  { key: 'spotify', label: 'Spotify', Glyph: SpotifyGlyph },
  { key: 'youtube', label: 'YouTube', Glyph: YouTubeGlyph },
  { key: 'facebook', label: 'Facebook', Glyph: FacebookGlyph },
  { key: 'instagram', label: 'Instagram', Glyph: InstagramGlyph },
] as const

export function SocialIconLinks({ redes, size = 20, variant = 'ghost' }: SocialIconLinksProps) {
  const btnSx = variant === 'outlined' ? outlinedSx : ghostSx

  return (
    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
      {items.map(({ key, label, Glyph }) => (
        <IconButton
          key={key}
          component="a"
          href={redes[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          sx={btnSx}
        >
          <Glyph size={size} />
        </IconButton>
      ))}
    </Stack>
  )
}
