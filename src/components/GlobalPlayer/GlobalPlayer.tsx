import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState, type ChangeEvent, type CSSProperties, type MouseEvent } from 'react'
import { spotifyArtistUrl } from '../../data/pressKitData'
import { usePlayback } from '../../context/PlaybackContext'
import { useNavigation } from '../../context/NavigationContext'
import { brand } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { SpotifyGlyph } from '../SpotifyGlyph'

const spotifyBtnSx = {
  color: 'rgba(255,255,255,0.42)',
  flexShrink: 0,
  '&:hover': {
    color: brand.orange,
    bgcolor: 'rgba(232,114,42,0.1)',
  },
} as const

const playBtnSx = {
  flexShrink: 0,
  color: brand.white,
  width: 28,
  height: 28,
  border: `1px solid rgba(232,114,42,0.45)`,
  bgcolor: 'rgba(232,114,42,0.08)',
  '&:hover': {
    color: brand.orange,
    borderColor: brand.orange,
    bgcolor: 'rgba(232,114,42,0.14)',
  },
} as const

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function GlobalPlayer() {
  const {
    current,
    playingId,
    audioRef,
    playTrack,
    openSpotify,
    onAudioPlay,
    onAudioPause,
    onAudioEnded,
  } = usePlayback()
  const { isTransitioning } = useNavigation()

  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !current?.audioSrc) return
    void audio.play().catch(() => {})
  }, [current?.id, current?.audioSrc, audioRef])

  useEffect(() => {
    setProgress(0)
    setDuration(0)
  }, [current?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const syncDuration = () => setDuration(audio.duration || 0)
    const syncProgress = () => setProgress(audio.currentTime || 0)

    audio.addEventListener('loadedmetadata', syncDuration)
    audio.addEventListener('durationchange', syncDuration)
    audio.addEventListener('timeupdate', syncProgress)
    audio.addEventListener('seeked', syncProgress)

    syncDuration()
    syncProgress()

    return () => {
      audio.removeEventListener('loadedmetadata', syncDuration)
      audio.removeEventListener('durationchange', syncDuration)
      audio.removeEventListener('timeupdate', syncProgress)
      audio.removeEventListener('seeked', syncProgress)
    }
  }, [current?.id, current?.audioSrc, audioRef])

  const handleSeek = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current
      if (!audio) return
      const next = Number(e.target.value)
      audio.currentTime = next
      setProgress(next)
    },
    [audioRef],
  )

  const handleTogglePlay = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (!current) return
      playTrack(current)
    },
    [current, playTrack],
  )

  if (!current) return null

  const isPlaying = playingId === current.id
  const progressPct = duration > 0 ? (progress / duration) * 100 : 0

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
        visibility: isTransitioning ? 'hidden' : 'visible',
        bgcolor: 'rgba(18,18,18,0.96)',
        borderTop: `1px solid ${isPlaying ? 'rgba(232,114,42,0.35)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isPlaying ? '0 -8px 24px rgba(232,114,42,0.08)' : 'none',
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
          minHeight: 64,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
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

          {current.audioSrc ? (
            <Stack direction="row" spacing={0.75} sx={{ mt: 0.75, width: '100%', alignItems: 'center' }}>
              <audio
                key={current.id}
                ref={audioRef}
                src={current.audioSrc}
                preload="metadata"
                aria-hidden
                tabIndex={-1}
                onPlay={onAudioPlay}
                onPause={onAudioPause}
                onEnded={onAudioEnded}
                style={{ display: 'none' }}
              />

              <IconButton
                size="small"
                aria-label={isPlaying ? `Pausar ${current.title}` : `Reproducir ${current.title}`}
                onClick={handleTogglePlay}
                sx={playBtnSx}
              >
                <Typography component="span" sx={{ fontSize: '0.55rem', lineHeight: 1, color: brand.orange }}>
                  {isPlaying ? '❚❚' : '▶'}
                </Typography>
              </IconButton>

              <Typography
                component="span"
                sx={{
                  flexShrink: 0,
                  fontSize: '0.62rem',
                  fontVariantNumeric: 'tabular-nums',
                  color: 'rgba(255,255,255,0.55)',
                  minWidth: '2.5rem',
                }}
              >
                {formatTime(progress)}
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                  height: 20,
                }}
              >
                <Box
                  component="input"
                  type="range"
                  className="global-player__progress"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={progress}
                  onChange={handleSeek}
                  aria-label={`Progreso de ${current.title}`}
                  aria-valuemin={0}
                  aria-valuemax={duration || 0}
                  aria-valuenow={progress}
                  style={{ '--progress': `${progressPct}%` } as CSSProperties}
                  sx={{ width: '100%' }}
                />
              </Box>

              <Typography
                component="span"
                sx={{
                  flexShrink: 0,
                  fontSize: '0.62rem',
                  fontVariantNumeric: 'tabular-nums',
                  color: 'rgba(255,255,255,0.42)',
                  minWidth: '2.5rem',
                  textAlign: 'right',
                }}
              >
                {formatTime(duration)}
              </Typography>

              <IconButton
                size="small"
                aria-label="Abrir Menfis Caravan en Spotify"
                onClick={() => openSpotify(spotifyArtistUrl)}
                sx={spotifyBtnSx}
              >
                <SpotifyGlyph size={18} />
              </IconButton>
            </Stack>
          ) : null}
        </Box>
      </PageContent>
    </Box>
  )
}
