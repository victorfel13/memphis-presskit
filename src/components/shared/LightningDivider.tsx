import { Box } from '@mui/material'
import { brand } from '../../theme/brand'

type LightningDividerProps = {
  align?: 'left' | 'center'
  width?: number | { xs?: number; md?: number }
}

/** Divisor ornamental — rayos / relámpagos estilo metal */
export function LightningDivider({ align = 'left', width = { xs: 200, md: 260 } }: LightningDividerProps) {
  return (
    <Box
      aria-hidden
      sx={{
        mt: 1.5,
        width,
        maxWidth: '100%',
        height: { xs: 28, md: 32 },
        color: brand.orange,
        opacity: 0.9,
        mx: align === 'center' ? 'auto' : 0,
        '& svg': { display: 'block', width: '100%', height: '100%' },
      }}
    >
      <svg viewBox="0 0 320 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rayos finos — izquierda */}
        <path d="M160 24 L8 10" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.35" />
        <path d="M160 24 L20 24" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.5" />
        <path d="M160 24 L12 38" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.35" />
        <path d="M160 24 L36 6" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.25" />
        <path d="M160 24 L44 42" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.25" />

        {/* Rayos finos — derecha */}
        <path d="M160 24 L312 10" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.35" />
        <path d="M160 24 L300 24" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.5" />
        <path d="M160 24 L308 38" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.35" />
        <path d="M160 24 L284 6" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.25" />
        <path d="M160 24 L276 42" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.25" />

        {/* Relámpago izquierdo */}
        <path
          d="M160 24 L138 24 L148 14 L132 24 L142 24 L118 38 L128 24 L108 24 L124 10 L114 24 L88 24"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="miter"
          fill="none"
        />

        {/* Relámpago derecho */}
        <path
          d="M160 24 L182 24 L172 14 L188 24 L178 24 L202 38 L192 24 L212 24 L196 10 L206 24 L232 24"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="miter"
          fill="none"
        />

        {/* Centro — diamante / chispa */}
        <path d="M160 8 L166 24 L160 20 L154 24 Z" fill="currentColor" />
        <path d="M160 40 L166 24 L160 28 L154 24 Z" fill="currentColor" opacity="0.75" />
      </svg>
    </Box>
  )
}
