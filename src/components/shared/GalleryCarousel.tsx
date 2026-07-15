import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import type { GalleryImage } from '../../data/pressKitData'
import { brand, colorPhotoSx } from '../../theme/brand'

type GalleryCarouselProps = {
  images: GalleryImage[]
}

function ArrowButton({
  label,
  direction,
  onClick,
}: {
  label: string
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  return (
    <IconButton
      type="button"
      aria-label={label}
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        [direction === 'prev' ? 'left' : 'right']: 4,
        transform: 'translateY(-50%)',
        color: brand.white,
        bgcolor: 'rgba(0,0,0,0.55)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 0,
        width: 40,
        height: 40,
        zIndex: 2,
        '&:hover': { bgcolor: brand.orange, borderColor: brand.orange },
      }}
    >
      {direction === 'prev' ? '‹' : '›'}
    </IconButton>
  )
}

/** Carrusel de fotos — flechas, puntos y popup al hacer clic */
export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  const total = images.length
  const current = images[index]

  const goPrev = useCallback(() => {
    if (total === 0) return
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    if (total === 0) return
    setIndex((i) => (i + 1) % total)
  }, [total])

  const handleClose = useCallback(() => setSelected(null), [])

  if (total === 0) return null

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        {total > 1 ? <ArrowButton label="Foto anterior" direction="prev" onClick={goPrev} /> : null}

        <Box
          component="button"
          type="button"
          onClick={() => current && setSelected(current)}
          sx={{
            display: 'block',
            width: '100%',
            p: 0,
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
            bgcolor: brand.grey,
            aspectRatio: '4/3',
            '&:hover img': { opacity: 0.9 },
          }}
        >
          {current ? (
            <Box
              component="img"
              src={current.src}
              alt={current.alt}
              sx={{ ...colorPhotoSx, width: '100%', height: '100%' }}
            />
          ) : null}
        </Box>

        {total > 1 ? <ArrowButton label="Foto siguiente" direction="next" onClick={goNext} /> : null}

        {total > 1 ? (
          <>
            <Typography
              align="center"
              sx={{ mt: 1, fontSize: '0.7rem', color: brand.textMuted, letterSpacing: '0.08em' }}
            >
              {index + 1} / {total}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 1.25, flexWrap: 'wrap' }}>
              {images.map((img, i) => (
                <Box
                  key={img.src}
                  component="button"
                  type="button"
                  aria-label={`Ir a foto ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                  sx={{
                    width: 8,
                    height: 8,
                    p: 0,
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    bgcolor: i === index ? brand.orange : 'rgba(255,255,255,0.25)',
                    '&:hover': { bgcolor: i === index ? brand.orange : 'rgba(255,255,255,0.5)' },
                  }}
                />
              ))}
            </Box>
          </>
        ) : null}
      </Box>

      <Dialog open={Boolean(selected)} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: brand.black }}>
          <IconButton
            aria-label="Cerrar"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: brand.white, bgcolor: 'rgba(0,0,0,0.6)' }}
          >
            ×
          </IconButton>
          {selected ? (
            <Box
              component="img"
              src={selected.src}
              alt={selected.alt}
              sx={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
