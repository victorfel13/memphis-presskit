import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { usePlayback, type PlayerTrack } from '../../context/PlaybackContext'
import type { PlatformLink, Track } from '../../data/pressKitData'
import { brand, colorPhotoSx, archivoBlackClass, archivoBlackSx } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { BodyText } from '../shared/BodyText'
import { PillButton } from '../shared/PillButton'
import { SectionTitle } from '../shared/SectionTitle'
import { TracklistPlayer } from './TracklistPlayer'

type EpData = {
  title: string
  coverSrc: string
  coverTint: string
  releaseLabel: string
  description: readonly string[]
  tracks: Track[]
  platforms: PlatformLink[]
}

type MusicaProps = {
  title: string
  bandName: string
  ep: EpData
}

function buildPlayerTrack(bandName: string, ep: EpData, track: Track): PlayerTrack {
  return {
    id: track.id,
    title: track.title,
    artist: `${bandName} · ${ep.title}`,
    coverSrc: ep.coverSrc,
    coverTint: ep.coverTint,
    audioSrc: track.audioSrc,
    spotifyUrl: track.spotifyUrl,
  }
}

export function Musica({ title, bandName, ep }: MusicaProps) {
  const { playingId, playTrack, current } = usePlayback()
  const epTrackIds = useMemo(() => new Set(ep.tracks.map((t) => t.id)), [ep.tracks])

  const buildTrack = useCallback(
    (track: Track) => buildPlayerTrack(bandName, ep, track),
    [bandName, ep],
  )

  const selectedTrack =
    ep.tracks.find((t) => t.id === current?.id && epTrackIds.has(t.id)) ?? ep.tracks[0]
  const isPlaying = selectedTrack ? playingId === selectedTrack.id : false
  const hasAudio = Boolean(selectedTrack?.audioSrc)

  const handleCoverPlay = useCallback(() => {
    if (!selectedTrack) return
    playTrack(buildPlayerTrack(bandName, ep, selectedTrack))
  }, [bandName, ep, playTrack, selectedTrack])

  return (
    <Box id="musica" component="section" sx={{ bgcolor: brand.surface, borderTop: `1px solid ${brand.borderSubtle}` }}>
      <PageContent section>
        <SectionTitle>{title}</SectionTitle>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ alignItems: { md: 'flex-start' }, width: '100%', minWidth: 0 }}
        >
          <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0, mx: { xs: 'auto', md: 0 } }}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '1',
                overflow: 'hidden',
                bgcolor: ep.coverTint,
                cursor: hasAudio ? 'pointer' : 'default',
              }}
              onClick={hasAudio ? handleCoverPlay : undefined}
            >
              <Box component="img" src={ep.coverSrc} alt={`Portada — ${ep.title}`} sx={colorPhotoSx} />

              {hasAudio ? (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.25)',
                  }}
                >
                  <IconButton
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCoverPlay()
                    }}
                    sx={{
                      color: brand.white,
                      bgcolor: brand.orange,
                      width: 52,
                      height: 52,
                      '&:hover': { bgcolor: brand.orangeDark },
                    }}
                  >
                    {isPlaying ? '❚❚' : '▶'}
                  </IconButton>
                </Box>
              ) : null}
            </Box>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            <Typography
              className={archivoBlackClass}
              sx={{
                ...archivoBlackSx,
                fontSize: { xs: '1.35rem', md: '1.6rem' },
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: brand.white,
                mb: 0.5,
              }}
            >
              {ep.title}
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: brand.orange, mb: 2, letterSpacing: '0.06em' }}>
              {ep.releaseLabel}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <BodyText paragraphs={ep.description} />
            </Box>

            <TracklistPlayer tracks={ep.tracks} buildPlayerTrack={buildTrack} epTrackIds={epTrackIds} />

            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {ep.platforms.map((platform) => (
                <PillButton
                  key={platform.label}
                  label={platform.label}
                  href={platform.url}
                  variant="ghost"
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </PageContent>
    </Box>
  )
}
