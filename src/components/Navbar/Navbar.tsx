import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material'
import { useCallback, useState } from 'react'
import type { NavItem } from '../../data/pressKitData'
import { brand, navbarHeight } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { FlameIcon } from '../shared/FlameIcon'

type NavbarProps = {
  items: NavItem[]
}

function MenuIcon() {
  return (
    <Box component="svg" width={24} height={24} viewBox="0 0 24 24" aria-hidden sx={{ fill: 'currentColor' }}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </Box>
  )
}

export function Navbar({ items }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const goTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    setMobileOpen(false)
  }, [])

  const linkSx = {
    color: brand.white,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    minWidth: 0,
    p: 0,
    '&:hover': { bgcolor: 'transparent', color: brand.orange },
  }

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        height: navbarHeight,
        bgcolor: brand.black,
        borderBottom: `1px solid ${brand.borderSubtle}`,
        pt: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <PageContent sx={{ py: 0 }}>
        <Stack
          direction="row"
          useFlexGap
          sx={{
            height: { xs: '48px', md: '56px' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
        <IconButton
          onClick={() => goTo('inicio')}
          aria-label="Menfis Caravan — inicio"
          sx={{ p: 0.5, color: brand.white, '&:hover': { bgcolor: 'transparent', opacity: 0.85 } }}
        >
          <FlameIcon size={32} />
        </IconButton>

        <Stack direction="row" useFlexGap spacing={2.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {items.slice(1).map((item) => (
            <Button key={item.id} onClick={() => goTo(item.id)} sx={linkSx}>
              {item.label}
            </Button>
          ))}
        </Stack>

        <IconButton
          type="button"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          sx={{ color: brand.white, display: { xs: 'inline-flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          disableScrollLock
          slotProps={{
            paper: { sx: { width: 280, bgcolor: brand.black, color: brand.white } },
          }}
        >
          <Box sx={{ px: 2, py: 2, fontSize: '0.85rem', letterSpacing: '0.12em', opacity: 0.5 }}>
            MENÚ
          </Box>
          <Divider sx={{ borderColor: brand.borderSubtle }} />
          <List dense>
            {items.map((item) => (
              <ListItemButton key={item.id} onClick={() => goTo(item.id)}>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { letterSpacing: '0.06em' } } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        </Stack>
      </PageContent>
    </Box>
  )
}
