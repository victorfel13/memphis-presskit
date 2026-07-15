import { Box, Typography } from '@mui/material'
import { brand, colorPhotoSx } from '../../theme/brand'

type MemberPhotoProps = {
  src?: string
  alt: string
  fallbackLetter: string
  fallbackSize?: string
}

export function MemberPhoto({ src, alt, fallbackLetter, fallbackSize = '1.75rem' }: MemberPhotoProps) {
  return (
    <Box
      sx={{
        aspectRatio: '3/4',
        width: '100%',
        bgcolor: brand.grey,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {src ? (
        <Box component="img" src={src} alt={alt} sx={colorPhotoSx} />
      ) : (
        <Typography sx={{ fontSize: fallbackSize, color: 'rgba(255,255,255,0.12)', fontWeight: 700 }}>
          {fallbackLetter}
        </Typography>
      )}
    </Box>
  )
}
