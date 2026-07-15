import { Box, Stack } from '@mui/material'
import { brand } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { BlockTitle } from '../shared/BlockTitle'
import { BodyText } from '../shared/BodyText'
import { SubsectionLabel } from '../shared/SubsectionLabel'

type PropuestaBlock = {
  title: string
  subtitle: string
  paragraphs: readonly string[]
}

type PropuestaProps = {
  musical: PropuestaBlock
  lirica: PropuestaBlock
}

function PropuestaBlock({ block }: { block: PropuestaBlock }) {
  return (
    <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
      <BlockTitle>{block.title}</BlockTitle>
      <SubsectionLabel>{block.subtitle}</SubsectionLabel>
      <BodyText paragraphs={block.paragraphs} />
    </Box>
  )
}

export function Propuesta({ musical, lirica }: PropuestaProps) {
  return (
    <Box id="propuesta" component="section" sx={{ bgcolor: brand.black }}>
      <PageContent section>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          useFlexGap
          spacing={{ xs: 4, md: 6 }}
          sx={{ width: '100%', minWidth: 0 }}
        >
          <PropuestaBlock block={musical} />
          <PropuestaBlock block={lirica} />
        </Stack>
      </PageContent>
    </Box>
  )
}
