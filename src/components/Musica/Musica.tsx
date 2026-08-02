import { Box, IconButton, Stack } from '@mui/material'
import { useCallback } from 'react'
import { usePlayback, type PlayerTrack } from '../../context/PlaybackContext'
import type { PlatformLink, Track } from '../../data/pressKitAssets'
import { spotifyArtistUrl } from '../../data/pressKitAssets'
import { useLanguage } from '../../context/LanguageContext'
import { brand, colorPhotoSx } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { BodyText } from '../shared/BodyText'
import { PillButton } from '../shared/PillButton'
import { SectionTitle } from '../shared/SectionTitle'
import { TracklistPlayer } from './TracklistPlayer'

type MusicaProps = {
  title: string
  bandName: string
  coverSrc: string
  coverTint: string
  description: readonly string[]
  tracks: Track[]
  platforms: PlatformLink[]
}

function buildPlayerTrack(
  bandName: string,
  coverSrc: string,
  coverTint: string,
  track: Track,
): PlayerTrack {
  return {
    id: track.id,
    title: track.title,
    artist: bandName,
    coverSrc,
    coverTint,
    audioSrc: track.audioSrc,
    spotifyUrl: spotifyArtistUrl,
  }
}

export function Musica({
  title,
  bandName,
  coverSrc,
  coverTint,
  description,
  tracks,
  platforms,
}: MusicaProps) {
  const { data } = useLanguage()
  const { ui } = data
  const { playingId, playTrack, current } = usePlayback()

  const buildTrack = useCallback(
    (track: Track) => buildPlayerTrack(bandName, coverSrc, coverTint, track),
    [bandName, coverSrc, coverTint],
  )

  const selectedTrack = tracks.find((t) => t.id === current?.id) ?? tracks[0]
  const isPlaying = selectedTrack ? playingId === selectedTrack.id : false
  const hasAudio = Boolean(selectedTrack?.audioSrc)

  const handleCoverPlay = useCallback(() => {
    if (!selectedTrack) return
    playTrack(buildPlayerTrack(bandName, coverSrc, coverTint, selectedTrack))
  }, [bandName, coverSrc, coverTint, playTrack, selectedTrack])

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
                bgcolor: coverTint,
                cursor: hasAudio ? 'pointer' : 'default',
              }}
              onClick={hasAudio ? handleCoverPlay : undefined}
            >
              <Box component="img" src={coverSrc} alt={ui.coverAlt} sx={colorPhotoSx} />

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
                    aria-label={isPlaying ? `${ui.pause} ${selectedTrack?.title}` : `${ui.play} ${selectedTrack?.title}`}
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
            <Box sx={{ mb: 3 }}>
              <BodyText paragraphs={description} />
            </Box>

            <TracklistPlayer tracks={tracks} buildPlayerTrack={buildTrack} />

            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {platforms.map((platform) => (
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
