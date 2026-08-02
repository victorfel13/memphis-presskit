import { Box } from '@mui/material'
import { useMemo } from 'react'
import fuegoMp4 from '../../assets/video/fuego.mp4'
import fuegoWebm from '../../assets/video/fuego.webm'

type ResponsiveSize = number | { xs?: number; sm?: number; md?: number }

type FlameIconProps = {
  /** Ancho en px — usa `height` para encajar en la app bar */
  size?: ResponsiveSize
  height?: ResponsiveSize
}

function canPlayWebmAlpha(): boolean {
  if (typeof document === 'undefined') return false
  const video = document.createElement('video')
  return video.canPlayType('video/webm; codecs="vp9"') !== ''
}

function toResponsiveSx(value: ResponsiveSize) {
  if (typeof value === 'number') return value
  return {
    xs: value.xs,
    sm: value.sm,
    md: value.md ?? value.xs,
  }
}

/** Llama animada — video con fondo negro eliminado */
export function FlameIcon({ size, height = { xs: 50, md: 58 } }: FlameIconProps) {
  const useWebm = useMemo(() => canPlayWebmAlpha(), [])

  const dimensionSx = height
    ? { height: toResponsiveSx(height), width: 'auto', aspectRatio: '1 / 1.45' }
    : { width: toResponsiveSx(size ?? 40), aspectRatio: '1 / 1.45' }

  return (
    <Box
      aria-hidden
      sx={{
        ...dimensionSx,
        flexShrink: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
    >
      <Box
        component="video"
        src={useWebm ? fuegoWebm : fuegoMp4}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        sx={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'contain',
          objectPosition: '50% 100%',
          mixBlendMode: useWebm ? 'normal' : 'screen',
        }}
      />
    </Box>
  )
}
