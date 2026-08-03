import { Typography } from '@mui/material'
import { useLanguage } from '../../context/LanguageContext'
import { brand, bodyFontFamily } from '../../theme/brand'

type PhotoCreditProps = {
  align?: 'left' | 'center' | 'right'
}

export function PhotoCredit({ align = 'center' }: PhotoCreditProps) {
  const { data } = useLanguage()

  return (
    <Typography
      sx={{
        mt: 1.25,
        fontFamily: bodyFontFamily,
        fontSize: '0.65rem',
        color: brand.textMuted,
        letterSpacing: '0.06em',
        fontStyle: 'italic',
        textAlign: align,
        width: '100%',
      }}
    >
      {data.ui.photoCredit}
    </Typography>
  )
}
