import { Box } from '@mui/material'
import { ThresholdImage } from './ThresholdImage'

type AnimatedLighterProps = {
  src: string
  alt: string
  size?: number
  fill?: boolean
  align?: 'center' | 'right' | 'left'
}

export function AnimatedLighter({ src, alt, size = 260, fill = false, align = 'center' }: AnimatedLighterProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: fill ? '100%' : size,
        maxWidth: '100%',
        height: fill ? 'auto' : size * 1.25,
        aspectRatio: fill ? '4 / 5' : undefined,
        mx: align === 'center' ? 'auto' : 0,
        ml: align === 'right' ? 'auto' : undefined,
        mr: align === 'left' ? 'auto' : undefined,
        overflow: 'hidden',
      }}
    >
      <ThresholdImage
        src={src}
        alt={alt}
        threshold={0.44}
        dither
        lightColor="#f2e8dc"
        darkColor="#101010"
        objectFit="contain"
      />
    </Box>
  )
}
