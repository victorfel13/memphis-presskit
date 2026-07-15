import { Box, IconButton, Typography } from '@mui/material'
import { usePlayback } from '../../context/PlaybackContext'
import { brand } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { SpotifyGlyph } from '../SpotifyGlyph'

const spotifyBtnSx = {
  color: 'rgba(255,255,255,0.42)',
  flexShrink: 0,
  '&:hover': {
    color: 'rgba(255,255,255,0.78)',
    bgcolor: 'rgba(255,255,255,0.06)',
  },
} as const

export function GlobalPlayer() {
  const { current, playingId, playTrack, openSpotify } = usePlayback()

  if (!current) return null

  const isPlaying = playingId === current.id

  return (
    <Box
      id="global-player"
      component="aside"
      aria-label="Reproductor de música"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        bgcolor: 'rgba(18,18,18,0.96)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        pb: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <PageContent
        sx={{
          py: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.25,
          minHeight: 56,
        }}
      >
        <IconButton
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          disabled={!current.audioSrc}
          onClick={() => playTrack(current)}
          sx={{
            flexShrink: 0,
            color: brand.white,
            border: '1px solid rgba(255,255,255,0.2)',
            width: 40,
            height: 40,
            '&:hover': { color: brand.orange, borderColor: brand.orange },
            '&.Mui-disabled': { opacity: 0.35 },
          }}
        >
          <Typography component="span" sx={{ fontSize: '0.7rem', lineHeight: 1 }}>
            {isPlaying ? '❚❚' : '▶'}
          </Typography>
        </IconButton>

        <Box
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: 0.5,
            overflow: 'hidden',
            bgcolor: current.coverTint ?? '#121212',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {current.coverSrc ? (
            <Box
              component="img"
              src={current.coverSrc}
              alt=""
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : null}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.9)',
            }}
            noWrap
          >
            {current.title}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.42)',
              mt: 0.15,
            }}
            noWrap
          >
            {current.artist}
          </Typography>
        </Box>

        {current.spotifyUrl ? (
          <IconButton
            size="small"
            aria-label="Abrir en Spotify"
            onClick={() => openSpotify(current.spotifyUrl!)}
            sx={spotifyBtnSx}
          >
            <SpotifyGlyph size={18} />
          </IconButton>
        ) : null}
      </PageContent>
    </Box>
  )
}
