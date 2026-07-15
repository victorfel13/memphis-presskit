import { Box, Dialog, DialogContent, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { usePlayback } from '../../context/PlaybackContext'
import type { VideoItem } from '../../data/pressKitData'
import { brand, bodyParagraphSx, bwPhotoSx, proseMaxWidth } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { SectionTitle } from '../shared/SectionTitle'
import { SubsectionLabel } from '../shared/SubsectionLabel'
import { getYouTubeEmbedSrc, getYouTubeThumbnailUrl, getYouTubeVideoId } from '../../utils/youtube'

type VideosProps = {
  title: string
  subtitle: string
  description: string
  items: VideoItem[]
}

type ModalState = { videoId: string; title: string } | null

type VideoCardProps = {
  item: VideoItem
  onOpen: (url: string, title: string) => void
}

function VideoCard({ item, onOpen }: VideoCardProps) {
  const videoId = getYouTubeVideoId(item.url)
  const thumbUrl = videoId ? getYouTubeThumbnailUrl(videoId) : null

  return (
    <Box
      component="button"
      type="button"
      onClick={() => onOpen(item.url, item.title)}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        p: 0,
        border: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: brand.grey,
        textAlign: 'left',
        '&:hover .play-btn': { bgcolor: brand.orangeDark },
      }}
    >
      {thumbUrl ? (
        <Box component="img" src={thumbUrl} alt="" sx={bwPhotoSx} />
      ) : null}
      <Box
        className="play-btn"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: brand.orange,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: brand.white,
          fontSize: '1rem',
          pl: '3px',
          transition: 'background 0.2s',
        }}
      >
        ▶
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.25,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
          {item.title}
        </Typography>
        <Typography sx={{ fontSize: '0.65rem', color: brand.textMuted, textTransform: 'capitalize' }}>
          {item.category}
        </Typography>
      </Box>
    </Box>
  )
}

export function Videos({ title, subtitle, description, items }: VideosProps) {
  const { pauseAudio } = usePlayback()
  const [modal, setModal] = useState<ModalState>(null)

  const handleOpen = useCallback(
    (url: string, videoTitle: string) => {
      pauseAudio()
      const id = getYouTubeVideoId(url)
      if (id) {
        setModal({ videoId: id, title: videoTitle })
        return
      }
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [pauseAudio],
  )

  return (
    <Box id="videos" component="section" sx={{ bgcolor: brand.black }}>
      <PageContent section>
        <SectionTitle>{title}</SectionTitle>
        <SubsectionLabel>{subtitle}</SubsectionLabel>
        <Typography sx={{ ...bodyParagraphSx, mb: 3, maxWidth: { xs: '100%', md: proseMaxWidth } }}>
          {description}
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
          {items.map((item) => (
            <Box key={item.title} sx={{ flex: 1 }}>
              <VideoCard item={item} onOpen={handleOpen} />
            </Box>
          ))}
        </Stack>
      </PageContent>

      <Dialog open={Boolean(modal)} onClose={() => setModal(null)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, bgcolor: brand.black }}>
          <IconButton
            aria-label="Cerrar vídeo"
            onClick={() => setModal(null)}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: brand.white }}
          >
            ×
          </IconButton>
          {modal ? (
            <Box sx={{ pt: '56.25%', position: 'relative' }}>
              <Box
                component="iframe"
                src={getYouTubeEmbedSrc(modal.videoId, true)}
                title={modal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </Box>
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  )
}
