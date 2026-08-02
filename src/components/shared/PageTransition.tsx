import { Box } from '@mui/material'
import { useEffect } from 'react'

const DURATION_MS = 560
const SCROLL_AT_MS = 260

type PageTransitionProps = {
  active: boolean
  onMidpoint: () => void
  onComplete: () => void
}

/**
 * Cortina que sube desde abajo con filo naranja —
 * cubre, cambia sección y se va hacia arriba.
 */
export function PageTransition({ active, onMidpoint, onComplete }: PageTransitionProps) {
  useEffect(() => {
    if (!active) return

    const scrollTimer = window.setTimeout(onMidpoint, SCROLL_AT_MS)
    const endTimer = window.setTimeout(onComplete, DURATION_MS)

    return () => {
      window.clearTimeout(scrollTimer)
      window.clearTimeout(endTimer)
    }
  }, [active, onMidpoint, onComplete])

  if (!active) return null

  return (
    <Box
      aria-hidden
      className="page-transition"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        pointerEvents: 'all',
        overflow: 'hidden',
      }}
    >
      <Box className="page-transition__panel">
        <Box className="page-transition__edge" />
      </Box>
    </Box>
  )
}
