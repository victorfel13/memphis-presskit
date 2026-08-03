import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState, type ChangeEvent, type CSSProperties, type MouseEvent } from 'react'
import { spotifyArtistUrl } from '../../data/pressKitAssets'
import { useLanguage } from '../../context/LanguageContext'
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
    previewEnded,
    previewEndKind,
    previewLimit,
    audioRef,
    playTrack,
    openSpotify,
    onAudioPlay,
    onAudioPause,
    onAudioEnded,
  } = usePlayback()
  const { isTransitioning } = useNavigation()
  const { data } = useLanguage()
  const { ui } = data

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
  }, [current?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const syncProgress = () => setProgress(Math.min(audio.currentTime || 0, previewLimit))

    audio.addEventListener('timeupdate', syncProgress)
    audio.addEventListener('seeked', syncProgress)

    syncProgress()

    return () => {
      audio.removeEventListener('timeupdate', syncProgress)
      audio.removeEventListener('seeked', syncProgress)
    }
  }, [current?.id, current?.audioSrc, audioRef, previewLimit])

  const handleSeek = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current
      if (!audio || previewEnded) return
      const next = Math.min(Number(e.target.value), previewLimit)
      audio.currentTime = next
      setProgress(next)
    },
    [audioRef, previewEnded, previewLimit],
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
  const progressPct = previewLimit > 0 ? (progress / previewLimit) * 100 : 0
  const previewMessage =
    previewEndKind === 'stream-more' ? ui.previewOverdoozeEnd : ui.previewComingSoon

  return (
    <Box
      id="global-player"
      component="aside"
      aria-label={ui.musicPlayer}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        visibility: isTransitioning ? 'hidden' : 'visible',
        bgcolor: 'rgba(18,18,18,0.96)',
        borderTop: `1px solid ${isPlaying ? 'rgba(232,114,42,0.35)' : previewEnded ? 'rgba(232,114,42,0.5)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isPlaying || previewEnded ? '0 -8px 24px rgba(232,114,42,0.08)' : 'none',
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
          minHeight: previewEnded ? 72 : 64,
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
            opacity: previewEnded ? 0.65 : 1,
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
          <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.9)',
                flex: 1,
                minWidth: 0,
              }}
              noWrap
            >
              {current.title}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.58rem',
                color: brand.orange,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              {ui.previewSeconds(previewLimit)}
            </Typography>
          </Stack>

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

          {previewEnded ? (
            <Stack direction="row" spacing={1} sx={{ mt: 0.85, alignItems: 'center', flexWrap: 'wrap', gap: 0.75 }}>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  color: brand.orange,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {previewMessage}
              </Typography>
              {previewEndKind === 'stream-more' ? (
                <IconButton
                  size="small"
                  aria-label={ui.openSpotify}
                  onClick={() => openSpotify(spotifyArtistUrl)}
                  sx={{ ...spotifyBtnSx, color: brand.orange }}
                >
                  <SpotifyGlyph size={18} />
                </IconButton>
              ) : null}
              <IconButton
                size="small"
                aria-label={ui.previewReplay}
                onClick={handleTogglePlay}
                sx={playBtnSx}
              >
                <Typography component="span" sx={{ fontSize: '0.55rem', lineHeight: 1, color: brand.orange }}>
                  ↺
                </Typography>
              </IconButton>
            </Stack>
          ) : null}

          {current.audioSrc && !previewEnded ? (
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
                aria-label={isPlaying ? `${ui.pause} ${current.title}` : `${ui.play} ${current.title}`}
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
                  max={previewLimit}
                  step={0.1}
                  value={Math.min(progress, previewLimit)}
                  onChange={handleSeek}
                  disabled={previewEnded}
                  aria-label={ui.trackProgress(current.title)}
                  aria-valuemin={0}
                  aria-valuemax={previewLimit}
                  aria-valuenow={progress}
                  style={{ '--progress': `${progressPct}%` } as CSSProperties}
                  sx={{
                    width: '100%',
                    opacity: previewEnded ? 0.45 : 1,
                    pointerEvents: previewEnded ? 'none' : 'auto',
                  }}
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
                {formatTime(previewLimit)}
              </Typography>

              <IconButton
                size="small"
                aria-label={ui.openSpotify}
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
