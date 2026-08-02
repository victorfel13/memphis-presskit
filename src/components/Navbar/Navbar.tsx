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
import { useNavigation } from '../../context/NavigationContext'
import { brand, navbarHeight, navbarInnerHeight } from '../../theme/brand'
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

const navSlotSx = {
  height: '100%',
  minWidth: { xs: 44, md: 52 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
} as const

export function Navbar({ items }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { navigateTo } = useNavigation()

  const goTo = useCallback(
    (id: string) => {
      navigateTo(id)
      setMobileOpen(false)
    },
    [navigateTo],
  )

  const linkSx = {
    color: brand.white,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    minWidth: 0,
    p: 0,
    lineHeight: 1,
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
      <PageContent sx={{ py: 0, height: '100%' }}>
        <Stack
          direction="row"
          useFlexGap
          sx={{
            height: { xs: `${navbarInnerHeight.xs}px`, md: `${navbarInnerHeight.md}px` },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => goTo('inicio')}
            aria-label="Menfis Caravan — inicio"
            sx={{
              ...navSlotSx,
              justifyContent: 'flex-start',
              border: 'none',
              bgcolor: 'transparent',
              cursor: 'pointer',
              p: 0,
              color: brand.white,
              '&:hover': { opacity: 0.85 },
            }}
          >
            <FlameIcon height={{ xs: 50, md: 58 }} />
          </Box>

          <Stack
            direction="row"
            useFlexGap
            spacing={2.5}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              height: '100%',
            }}
          >
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
            sx={{
              ...navSlotSx,
              color: brand.white,
              display: { xs: 'inline-flex', md: 'none' },
              borderRadius: 1,
            }}
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
