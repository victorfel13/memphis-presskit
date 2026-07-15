import { Box } from '@mui/material'
import { useId } from 'react'
import { brand } from '../../theme/brand'

type FlameIconProps = {
  size?: number
}

/** Llama animada — logo del navbar (SVG + flicker CSS, siempre visible sobre negro) */
export function FlameIcon({ size = 40 }: FlameIconProps) {
  const gradientId = useId()
  const height = Math.round(size * 1.3)

  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height,
        flexShrink: 0,
        display: 'block',
        color: brand.orange,
        animation: 'navbarFlameFlicker 1.4s ease-in-out infinite alternate',
        transformOrigin: '50% 90%',
        '@keyframes navbarFlameFlicker': {
          '0%': { transform: 'scaleY(1) scaleX(1)', opacity: 0.9 },
          '45%': { transform: 'scaleY(1.08) scaleX(0.96)', opacity: 1 },
          '100%': { transform: 'scaleY(0.94) scaleX(1.03)', opacity: 0.85 },
        },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 32 42"
        width={size}
        height={height}
        sx={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#d96518" />
            <stop offset="45%" stopColor={brand.orange} />
            <stop offset="100%" stopColor="#fff59d" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${gradientId})`}
          d="M16 40 C7 31 3 22 7.5 14 C9.5 10 12.5 11.5 14 7 C15 10.5 17 9.5 18.5 7 C20 11.5 23 10 25 14 C29 22 25 31 16 40 Z"
        />
        <path
          fill="#fff59d"
          opacity={0.85}
          d="M16 34 C12 28 11 22 13.5 17 C14.5 14.5 15.5 15.5 16 12.5 C16.5 15.5 17.5 14.5 18.5 17 C21 22 20 28 16 34 Z"
        />
      </Box>
    </Box>
  )
}
