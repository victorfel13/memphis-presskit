import { Box, type SxProps, type Theme } from '@mui/material'
import { useEffect, useRef } from 'react'

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const

type Rgb = { r: number; g: number; b: number }

function parseColor(hex: string): Rgb {
  const normalized = hex.replace('#', '')
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized
  const n = Number.parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

type ThresholdImageProps = {
  src: string
  alt: string
  /** 0–1 — más bajo = más negro */
  threshold?: number
  dither?: boolean
  lightColor?: string
  darkColor?: string
  backgroundColor?: string
  objectFit?: 'contain' | 'cover'
  sx?: SxProps<Theme>
}

export function ThresholdImage({
  src,
  alt,
  threshold = 0.46,
  dither = true,
  lightColor = '#f2e8dc',
  darkColor = '#0a0a0a',
  backgroundColor,
  objectFit = 'contain',
  sx,
}: ThresholdImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const light = parseColor(lightColor)
    const dark = parseColor(darkColor)
    const bg = backgroundColor ? parseColor(backgroundColor) : null

    const img = new Image()
    img.decoding = 'async'
    img.src = src

    let frame = 0

    const render = () => {
      if (!img.complete || !img.naturalWidth) return

      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(rect.width * dpr))
      const h = Math.max(1, Math.floor(rect.height * dpr))

      if (w === 0 || h === 0) return

      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      if (bg) {
        ctx.fillStyle = backgroundColor!
        ctx.fillRect(0, 0, w, h)
      } else {
        ctx.clearRect(0, 0, w, h)
      }

      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = w / h
      let drawW: number
      let drawH: number
      let drawX: number
      let drawY: number

      if (objectFit === 'cover') {
        if (imgAspect > canvasAspect) {
          drawH = h
          drawW = h * imgAspect
        } else {
          drawW = w
          drawH = w / imgAspect
        }
        drawX = (w - drawW) / 2
        drawY = (h - drawH) / 2
      } else if (imgAspect > canvasAspect) {
        drawW = w
        drawH = w / imgAspect
        drawX = 0
        drawY = (h - drawH) / 2
      } else {
        drawH = h
        drawW = h * imgAspect
        drawX = (w - drawW) / 2
        drawY = 0
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH)

      const imageData = ctx.getImageData(0, 0, w, h)
      const data = imageData.data
      const t = threshold

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4
          const alpha = data[i + 3] / 255
          if (alpha < 0.05) continue

          const gray =
            (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255

          let level = gray
          if (dither) {
            const matrix = BAYER_4[y % 4][x % 4] / 16 - 0.5
            level += matrix * 0.22
          }

          const on = level >= t
          const color = on ? light : dark
          data[i] = color.r
          data[i + 1] = color.g
          data[i + 2] = color.b
          data[i + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(render)
    }

    img.onload = schedule

    const ro = new ResizeObserver(schedule)
    ro.observe(container)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [src, threshold, dither, lightColor, darkColor, backgroundColor, objectFit])

  return (
    <Box ref={containerRef} sx={{ width: '100%', height: '100%', ...sx }}>
      <Box
        component="canvas"
        ref={canvasRef}
        role="img"
        aria-label={alt}
        sx={{ width: '100%', height: '100%', display: 'block' }}
      />
    </Box>
  )
}
