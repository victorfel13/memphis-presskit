import { Box, Stack, Typography } from '@mui/material'
import { brand, bodyFontFamily } from '../../theme/brand'
import { useLanguage } from '../../context/LanguageContext'
import { PageContent } from '../shared/PageContent'
import { BodyText } from '../shared/BodyText'
import { PillButton } from '../shared/PillButton'
import { SectionTitle } from '../shared/SectionTitle'
import { SubsectionLabel } from '../shared/SubsectionLabel'

type TiendaProps = {
  title: string
  subtitle: string
  description: readonly string[]
  imageSrc: string
  imageAlt: string
  whatsappLabel: string
  whatsappUrl: string
  phoneDisplay: string
}

export function Tienda({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  whatsappLabel,
  whatsappUrl,
  phoneDisplay,
}: TiendaProps) {
  const { data } = useLanguage()
  const { ui } = data

  return (
    <Box
      id="tienda"
      component="section"
      sx={{
        bgcolor: brand.surfaceAlt,
        borderTop: `1px solid ${brand.borderSubtle}`,
      }}
    >
      <PageContent section>
        <SectionTitle>{title}</SectionTitle>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 5 }}
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' },
            width: '100%',
            maxWidth: 960,
            mx: 'auto',
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 420, md: 440 },
              flexShrink: 0,
              mx: { xs: 'auto', md: 0 },
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={imageAlt}
              sx={{
                display: 'block',
                width: '100%',
                height: 'auto',
                border: `2px solid ${brand.orange}`,
                boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: 'center', md: 'left' } }}>
            <SubsectionLabel>{subtitle}</SubsectionLabel>
            <Box sx={{ mb: 3 }}>
              <BodyText paragraphs={description} />
            </Box>

            <Stack spacing={1.5} sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
              <PillButton label={whatsappLabel} href={whatsappUrl} variant="primary" />
              <Typography
                sx={{
                  fontFamily: bodyFontFamily,
                  fontSize: '0.9rem',
                  color: brand.textMuted,
                  letterSpacing: '0.04em',
                }}
              >
                {ui.whatsappPrefix}{' '}
                <Box
                  component="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: brand.white,
                    textDecoration: 'none',
                    '&:hover': { color: brand.orange },
                  }}
                >
                  {phoneDisplay}
                </Box>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </PageContent>
    </Box>
  )
}
