import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, type MouseEvent } from 'react'
import { usePlayback, type PlayerTrack } from '../../context/PlaybackContext'
import type { Track } from '../../data/pressKitData'
import { spotifyArtistUrl } from '../../data/pressKitData'
import { brand } from '../../theme/brand'
import { SpotifyGlyph } from '../SpotifyGlyph'

type TracklistPlayerProps = {
  tracks: Track[]
  buildPlayerTrack: (track: Track) => PlayerTrack
}

const spotifyBtnSx = {
  flexShrink: 0,
  color: 'rgba(255,255,255,0.42)',
  width: 36,
  height: 36,
  '&:hover': { color: brand.orange, bgcolor: 'rgba(232,114,42,0.1)' },
} as const

const playBtnSx = {
  flexShrink: 0,
  color: brand.white,
  width: 36,
  height: 36,
  border: '1px solid rgba(255,255,255,0.2)',
  '&:hover': { color: brand.orange, borderColor: brand.orange },
  '&.Mui-disabled': { opacity: 0.35, borderColor: 'rgba(255,255,255,0.08)' },
} as const

export function TracklistPlayer({ tracks, buildPlayerTrack }: TracklistPlayerProps) {
  const { current, playingId, playTrack, openSpotify } = usePlayback()

  const handleRowClick = useCallback(
    (track: Track) => {
      playTrack(buildPlayerTrack(track))
    },
    [buildPlayerTrack, playTrack],
  )

  const handlePlayClick = useCallback(
    (e: MouseEvent, track: Track) => {
      e.stopPropagation()
      playTrack(buildPlayerTrack(track))
    },
    [buildPlayerTrack, playTrack],
  )

  const handleSpotifyClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      openSpotify(spotifyArtistUrl)
    },
    [openSpotify],
  )

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: '0.95rem' }}>
        Tracklist
      </Typography>

      <Stack spacing={0} sx={{ mb: 3 }}>
        {tracks.map((track, index) => {
          const active = current?.id === track.id
          const trackPlaying = playingId === track.id

          return (
            <Box
              key={track.id}
              component="button"
              type="button"
              onClick={() => handleRowClick(track)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                width: '100%',
                textAlign: 'left',
                py: 1.25,
                px: 0.5,
                border: 'none',
                borderBottom: '1px solid',
                borderColor: active ? brand.orange : 'rgba(255,255,255,0.1)',
                bgcolor: active ? 'rgba(232,114,42,0.06)' : 'transparent',
                color: brand.white,
                cursor: 'pointer',
                font: 'inherit',
                minWidth: 0,
                '&:hover': { borderColor: brand.orange, bgcolor: 'rgba(232,114,42,0.04)' },
              }}
            >
              <Typography
                sx={{
                  width: 24,
                  flexShrink: 0,
                  color: brand.orange,
                  fontWeight: 800,
                  fontSize: '0.9rem',
                }}
              >
                {index + 1}
              </Typography>

              <Typography
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: active ? 700 : 400,
                  fontSize: '0.9rem',
                  color: active ? brand.white : 'rgba(255,255,255,0.82)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {track.title}
              </Typography>

              <IconButton
                size="small"
                aria-label={trackPlaying ? `Pausar ${track.title}` : `Reproducir ${track.title}`}
                disabled={!track.audioSrc}
                onClick={(e) => handlePlayClick(e, track)}
                sx={playBtnSx}
              >
                <Typography component="span" sx={{ fontSize: '0.65rem', lineHeight: 1 }}>
                  {trackPlaying ? '❚❚' : '▶'}
                </Typography>
              </IconButton>

              <IconButton
                size="small"
                aria-label={`Abrir ${track.title} en Spotify`}
                onClick={handleSpotifyClick}
                sx={spotifyBtnSx}
              >
                <SpotifyGlyph size={18} />
              </IconButton>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}
