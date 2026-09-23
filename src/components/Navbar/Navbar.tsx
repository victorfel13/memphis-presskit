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
import { useCallback, useEffect, useState } from 'react'
import type { NavItem } from '../../data/pressKitAssets'
import { useNavigation } from '../../context/NavigationContext'
import { useLanguage } from '../../context/LanguageContext'
import { brand, navbarHeight, navbarInnerHeight } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { FlameIcon } from '../shared/FlameIcon'
import { LanguageToggle } from '../shared/LanguageToggle'

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
  const [activeId, setActiveId] = useState(() => {
    const hashId = window.location.hash.replace(/^#/, '')
    return items.some((item) => item.id === hashId) ? hashId : (items[0]?.id ?? 'inicio')
  })
  const { navigateTo, isTransitioning } = useNavigation()
  const { data } = useLanguage()
  const { ui } = data
  const sectionIds = items.map((item) => item.id).join('|')

  useEffect(() => {
    const ids = sectionIds.split('|').filter(Boolean)

    const updateActive = () => {
      if (isTransitioning) return
      const offset = Math.round(window.innerHeight * 0.4)
      let current = ids[0] ?? 'inicio'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      setActiveId(current)
    }

    updateActive()
    const frame = window.requestAnimationFrame(updateActive)
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [sectionIds, isTransitioning])

  const goTo = useCallback(
    (id: string) => {
      setActiveId(id)
      navigateTo(id)
      setMobileOpen(false)
    },
    [navigateTo],
  )

  const linkSx = (isActive: boolean) => ({
    color: isActive ? brand.orange : brand.white,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    minWidth: 0,
    height: '100%',
    px: 0,
    borderRadius: 0,
    borderBottom: `2px solid ${isActive ? brand.orange : 'transparent'}`,
    lineHeight: 1,
    '&:hover': { bgcolor: 'transparent', color: brand.orange },
  })

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
            aria-label={ui.homeAria}
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
            {items.slice(1).map((item) => {
              const isActive = item.id === activeId
              return (
                <Button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  sx={linkSx(isActive)}
                >
                  {item.label}
                </Button>
              )
            })}
            <LanguageToggle />
          </Stack>

          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <LanguageToggle compact />
            <IconButton
              type="button"
              aria-label={ui.openMenu}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              sx={{
                ...navSlotSx,
                color: brand.white,
                borderRadius: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>

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
              {ui.menu}
            </Box>
            <Divider sx={{ borderColor: brand.borderSubtle }} />
            <List dense>
              {items.map((item) => (
                <ListItemButton
                  key={item.id}
                  selected={item.id === activeId}
                  onClick={() => goTo(item.id)}
                  sx={{
                    color: item.id === activeId ? brand.orange : brand.white,
                    '&.Mui-selected': { bgcolor: 'transparent', color: brand.orange },
                    '&.Mui-selected:hover': { bgcolor: 'rgba(232, 114, 42, 0.08)' },
                  }}
                >
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
