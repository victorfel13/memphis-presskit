import { Box, Button, Stack } from '@mui/material'
import type { Locale } from '../../i18n/types'
import { useLanguage } from '../../context/LanguageContext'
import { brand } from '../../theme/brand'

const btnSx = (active: boolean) =>
  ({
    minWidth: 36,
    px: 1,
    py: 0.35,
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: 1.2,
    borderRadius: '999px',
    color: active ? brand.white : brand.textMuted,
    bgcolor: active ? brand.orange : 'transparent',
    border: `1px solid ${active ? brand.orange : brand.borderSubtle}`,
    boxShadow: 'none',
    '&:hover': {
      bgcolor: active ? brand.orangeDark : 'rgba(255,255,255,0.04)',
      borderColor: brand.orange,
      boxShadow: 'none',
    },
  }) as const

type LanguageToggleProps = {
  compact?: boolean
}

export function LanguageToggle({ compact = false }: LanguageToggleProps) {
  const { locale, setLocale, data } = useLanguage()

  const pick = (next: Locale) => {
    if (next !== locale) setLocale(next)
  }

  return (
    <Stack
      direction="row"
      spacing={0.5}
      role="group"
      aria-label={data.ui.languageLabel}
      sx={{ alignItems: 'center', flexShrink: 0 }}
    >
      {(['es', 'en'] as const).map((code) => (
        <Button
          key={code}
          type="button"
          onClick={() => pick(code)}
          aria-pressed={locale === code}
          aria-label={code === 'es' ? data.ui.switchToEs : data.ui.switchToEn}
          sx={btnSx(locale === code)}
        >
          {code.toUpperCase()}
        </Button>
      ))}
      {!compact ? null : (
        <Box component="span" sx={{ display: 'none' }} aria-hidden>
          {data.ui.languageLabel}
        </Box>
      )}
    </Stack>
  )
}
