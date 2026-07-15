import { Box, Stack, Typography } from '@mui/material'
import type { SocialLinks } from '../../data/pressKitData'
import { brand } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { SocialIconLinks } from '../shared/SocialIconLinks'

type FooterProps = {
  redes: SocialLinks
  credit: string
}

export function Footer({ redes, credit }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2.5, md: 3 },
        bgcolor: brand.black,
        borderTop: `1px solid ${brand.borderSubtle}`,
      }}
    >
      <PageContent sx={{ py: 0 }}>
        <Stack useFlexGap spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', width: '100%' }}>
        <SocialIconLinks redes={redes} size={22} variant="ghost" />
        <Typography sx={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)' }}>
          {credit}
        </Typography>
        </Stack>
      </PageContent>
    </Box>
  )
}
