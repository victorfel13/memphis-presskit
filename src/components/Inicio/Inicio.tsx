import { Box, IconButton, Stack, Typography } from '@mui/material'
import type { SocialLinks } from '../../data/pressKitData'
import { brand, bodyFontFamily, bokorClass, heroSubtitleSx, heroTitleSx, navbarHeight } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { AnimatedLighter } from '../shared/AnimatedLighter'
import { SpotifyGlyph } from '../SpotifyGlyph'
import { YouTubeGlyph } from '../YouTubeGlyph'

type InicioProps = {
  heroSrc: string
  title: string
  headlineLines: readonly [string, string]
  subtitle: string
  description: string
  social: Pick<SocialLinks, 'spotify' | 'youtube'>
}

const iconBtnSx = {
  color: brand.white,
  border: '1px solid rgba(255,255,255,0.35)',
  width: 44,
  height: 44,
  '&:hover': { color: brand.orange, borderColor: brand.orange, bgcolor: 'rgba(240,122,42,0.08)' },
}

export function Inicio({ heroSrc, title, headlineLines, subtitle, description, social }: InicioProps) {
  return (
    <Box
      id="inicio"
      component="section"
      sx={{
        position: 'relative',
        bgcolor: brand.black,
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <PageContent
        sx={{
          pt: { xs: navbarHeight.xs, md: navbarHeight.md },
          pb: { xs: 4, md: 6 },
          minHeight: { md: 'calc(100dvh - 56px)' },
          display: 'flex',
          alignItems: { md: 'center' },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
            gap: { xs: 3, md: 3, lg: 5 },
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              textAlign: { xs: 'center', md: 'left' },
              order: { xs: 2, md: 1 },
            }}
          >
            <Typography
              component="h1"
              className={bokorClass}
              sx={{
                ...heroTitleSx,
                mb: { xs: 1.5, md: 2.5 },
                maxWidth: { md: '100%' },
              }}
            >
              <Box component="span" sx={{ display: 'block' }}>
                {headlineLines[0]}
              </Box>
              <Box component="span" sx={{ display: 'block', mt: { xs: -0.25, md: -0.5 } }}>
                {headlineLines[1]}
              </Box>
            </Typography>

            <Typography
              component="p"
              sx={{
                ...heroSubtitleSx,
                mb: { xs: 1.5, md: 2.5 },
                maxWidth: { md: 520 },
                mx: { xs: 'auto', md: 0 },
              }}
            >
              {subtitle}
            </Typography>

            <Typography
              sx={{
                fontFamily: bodyFontFamily,
                color: brand.textMuted,
                lineHeight: 1.75,
                fontSize: { xs: '0.9rem', md: '1rem' },
                mb: { xs: 2, md: 3 },
                maxWidth: { md: 520 },
                mx: { xs: 'auto', md: 0 },
              }}
            >
              {description}
            </Typography>

            <Stack direction="row" useFlexGap spacing={1.25} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <IconButton
                component="a"
                href={social.spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                sx={iconBtnSx}
              >
                <SpotifyGlyph size={22} />
              </IconButton>
              <IconButton
                component="a"
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                sx={iconBtnSx}
              >
                <YouTubeGlyph size={22} />
              </IconButton>
            </Stack>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: { xs: 1, md: 2 },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: { xs: 280, sm: 320, md: 440, lg: 500 } }}>
              <AnimatedLighter src={heroSrc} alt={title} fill align="center" />
            </Box>
          </Box>
        </Box>
      </PageContent>
    </Box>
  )
}
