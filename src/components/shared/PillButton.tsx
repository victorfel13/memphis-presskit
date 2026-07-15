import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import { brand } from '../../theme/brand'

type PillButtonProps = {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
}

export function PillButton({ label, href, variant = 'primary' }: PillButtonProps) {
  const isHash = href.startsWith('#')

  const sx: ButtonProps['sx'] =
    variant === 'primary'
      ? {
          bgcolor: brand.orange,
          color: brand.white,
          borderRadius: '999px',
          px: 2.5,
          py: 0.85,
          fontSize: '0.82rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': { bgcolor: brand.orangeDark, boxShadow: 'none' },
        }
      : {
          color: brand.white,
          borderRadius: '999px',
          border: `1px solid ${brand.borderSubtle}`,
          px: 2.5,
          py: 0.85,
          fontSize: '0.82rem',
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': { borderColor: brand.orange, color: brand.orange },
        }

  return (
    <Button
      component="a"
      href={href}
      target={isHash ? undefined : '_blank'}
      rel={isHash ? undefined : 'noopener noreferrer'}
      sx={sx}
    >
      {label}
    </Button>
  )
}
