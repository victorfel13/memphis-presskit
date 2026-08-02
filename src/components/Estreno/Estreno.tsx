import { Box, Stack, Typography } from '@mui/material'
import { brand, archivoBlackClass, archivoBlackSx, navbarInnerHeight } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { BodyText } from '../shared/BodyText'
import { PillButton } from '../shared/PillButton'
import { SectionTitle } from '../shared/SectionTitle'
import { SubsectionLabel } from '../shared/SubsectionLabel'

const coverSize = {
  xs: 'min(100%, 340px)',
  sm: 'min(100%, 380px)',
  md: 'min(420px, 52vh)',
} as const

type EstrenoProps = {
  title: string
  subtitle: string
  trackTitle: string
  releaseLabel: string
  description: readonly string[]
  coverSrc: string
  preSaveUrl: string
  preSaveLabel: string
  preSaveHint: string
}

export function Estreno({
  title,
  subtitle,
  trackTitle,
  releaseLabel,
  description,
  coverSrc,
  preSaveUrl,
  preSaveLabel,
  preSaveHint,
}: EstrenoProps) {
  return (
    <Box
      id="estreno"
      component="section"
      sx={{
        bgcolor: brand.surfaceAlt,
        borderTop: `1px solid ${brand.borderSubtle}`,
        borderBottom: `1px solid ${brand.borderSubtle}`,
        minHeight: {
          xs: `calc(100dvh - ${navbarInnerHeight.xs}px)`,
          md: `calc(100dvh - ${navbarInnerHeight.md}px)`,
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PageContent
        section
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 4, md: 6 },
        }}
      >
        <SectionTitle>{title}</SectionTitle>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 6 }}
          sx={{
            alignItems: { xs: 'center', md: 'center' },
            justifyContent: 'center',
            width: '100%',
            minWidth: 0,
            flex: 1,
          }}
        >
          <Box
            sx={{
              width: coverSize,
              height: coverSize,
              flexShrink: 0,
              mx: { xs: 'auto', md: 0 },
            }}
          >
            <Box
              component="a"
              href={preSaveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${preSaveLabel} — ${trackTitle}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                aspectRatio: '1',
                overflow: 'hidden',
                bgcolor: '#ffffff',
                boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
                border: `2px solid ${brand.orange}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: `0 16px 48px rgba(232,114,42,0.25)`,
                },
              }}
            >
              <Box
                component="img"
                src={coverSrc}
                alt={`Portada — ${trackTitle}`}
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  transform: 'translateX(-11%)',
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              maxWidth: { md: 520 },
              textAlign: { xs: 'center', md: 'left' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <SubsectionLabel>{subtitle}</SubsectionLabel>

            <Typography
              className={archivoBlackClass}
              sx={{
                ...archivoBlackSx,
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: brand.white,
                mb: 0.75,
                lineHeight: 1.05,
              }}
            >
              {trackTitle}
            </Typography>

            <Typography
              sx={{
                fontSize: '0.85rem',
                color: brand.orange,
                mb: 2.5,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {releaseLabel}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <BodyText paragraphs={description} />
            </Box>

            <Stack
              spacing={1.5}
              sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}
            >
              <PillButton label={preSaveLabel} href={preSaveUrl} variant="primary" />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: brand.textMuted,
                  maxWidth: 420,
                  lineHeight: 1.5,
                }}
              >
                {preSaveHint}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </PageContent>
    </Box>
  )
}
