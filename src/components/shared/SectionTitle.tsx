import { Box, Typography } from '@mui/material'
import { bokorClass, sectionTitleSx } from '../../theme/brand'
import { LightningDivider } from './LightningDivider'

type SectionTitleProps = {
  children: string
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Box
      sx={{
        mb: { xs: 3, md: 4 },
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        component="h2"
        className={bokorClass}
        sx={{
          ...sectionTitleSx,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {children}
      </Typography>
      <LightningDivider align="center" />
    </Box>
  )
}
