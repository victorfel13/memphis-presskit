import { Box, Typography } from '@mui/material'
import { bokorClass, sectionTitleSx } from '../../theme/brand'
import { LightningDivider } from './LightningDivider'

type SectionTitleProps = {
  children: string
  align?: 'left' | 'center'
}

export function SectionTitle({ children, align = 'left' }: SectionTitleProps) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: align }}>
      <Typography component="h2" className={bokorClass} sx={sectionTitleSx}>
        {children}
      </Typography>
      <LightningDivider align={align} />
    </Box>
  )
}
