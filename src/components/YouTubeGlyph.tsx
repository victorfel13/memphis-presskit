import { Box } from '@mui/material'

type YouTubeGlyphProps = {
  size?: number
}

export function YouTubeGlyph({ size = 22 }: YouTubeGlyphProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      sx={{ display: 'block' }}
    >
      <path
        fill="currentColor"
        d="M23.5 6.2a3.03 3.03 0 0 0-2.14-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.36.56A3.03 3.03 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.14 2.14c1.82.56 9.36.56 9.36.56s7.54 0 9.36-.56a3.03 3.03 0 0 0 2.14-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"
      />
    </Box>
  )
}
