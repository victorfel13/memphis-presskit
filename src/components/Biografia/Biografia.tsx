import { Box, Stack } from '@mui/material'
import type { GalleryImage } from '../../data/pressKitAssets'
import { brand } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { BodyText } from '../shared/BodyText'
import { GalleryCarousel } from '../shared/GalleryCarousel'
import { SectionTitle } from '../shared/SectionTitle'
import { SubsectionLabel } from '../shared/SubsectionLabel'

type BiografiaProps = {
  title: string
  subtitle: string
  paragraphs: readonly string[]
  images: GalleryImage[]
}

export function Biografia({ title, subtitle, paragraphs, images }: BiografiaProps) {
  return (
    <Box id="biografia" component="section" sx={{ bgcolor: brand.surface, borderTop: `1px solid ${brand.borderSubtle}` }}>
      <PageContent section>
        <SectionTitle>{title}</SectionTitle>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ width: '100%', minWidth: 0 }}>
          <Box sx={{ width: { xs: '100%', md: '42%' }, minWidth: 0 }}>
            <GalleryCarousel images={images} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <SubsectionLabel>{subtitle}</SubsectionLabel>
            <BodyText paragraphs={paragraphs} />
          </Box>
        </Stack>
      </PageContent>
    </Box>
  )
}
