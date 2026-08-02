import { Typography } from '@mui/material'
import { brand, bodyFontFamily } from '../../theme/brand'

type SubsectionLabelProps = {
  children: string
}

export function SubsectionLabel({ children }: SubsectionLabelProps) {
  return (
    <Typography
      sx={{
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        overflowWrap: 'anywhere',
        fontFamily: bodyFontFamily,
        fontWeight: 600,
        fontSize: '0.75rem',
        mb: 1.25,
        color: brand.textMuted,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textAlign: 'inherit',
      }}
    >
      {children}
    </Typography>
  )
}
