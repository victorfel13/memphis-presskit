import { Box, Typography } from '@mui/material'
import { archivoBlackClass, blockTitleSx } from '../../theme/brand'

type BlockTitleProps = {
  children: string
}

export function BlockTitle({ children }: BlockTitleProps) {
  return (
    <Box sx={{ mb: 2, width: '100%', minWidth: 0 }}>
      <Typography component="h3" className={archivoBlackClass} sx={blockTitleSx}>
        {children}
      </Typography>
    </Box>
  )
}
