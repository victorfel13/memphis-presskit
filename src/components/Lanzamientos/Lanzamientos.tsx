import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import type { ReleaseKind } from '../../data/pressKitAssets'
import { brand, bodyFontFamily, bokorSx } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { SectionTitle } from '../shared/SectionTitle'

type CalendarItem = {
  id: string
  date: string
  dateLabel: string
  title: string
  kind: ReleaseKind
}

type CountdownCopy = {
  target: string
  eyebrow: string
  title: string
  dateLabel: string
  days: string
  hours: string
  minutes: string
  seconds: string
  available: string
}

type LanzamientosProps = {
  title: string
  releasedLabel: string
  upcomingLabel: string
  kinds: Record<ReleaseKind, string>
  countdown: CountdownCopy
  items: CalendarItem[]
}

function isReleased(date: string) {
  const today = new Date()
  const todayStamp = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  const [year, month, day] = date.split('-').map(Number)
  return Date.UTC(year, month - 1, day) <= todayStamp
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const remaining = Math.max(0, new Date(target).getTime() - now)
  const totalSeconds = Math.floor(remaining / 1000)

  return {
    expired: remaining <= 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const colSx = {
  minWidth: 0,
  fontFamily: bodyFontFamily,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  lineHeight: 1.4,
}

function Countdown({ countdown }: { countdown: CountdownCopy }) {
  const { expired, days, hours, minutes, seconds } = useCountdown(countdown.target)
  const units = [
    { value: pad(days), label: countdown.days },
    { value: pad(hours), label: countdown.hours },
    { value: pad(minutes), label: countdown.minutes },
    { value: pad(seconds), label: countdown.seconds },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 960,
        mx: 'auto',
        mb: { xs: 4, md: 5 },
        py: { xs: 2.75, md: 3.75 },
        borderTop: `1px solid ${brand.borderSubtle}`,
        borderBottom: `1px solid ${brand.borderSubtle}`,
        textAlign: 'center',
      }}
    >
      <Typography
        component="p"
        sx={{
          ...bokorSx,
          fontSize: { xs: '1.7rem', md: '2.25rem' },
          lineHeight: 1.05,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: brand.orange,
          mb: { xs: 0.85, md: 1 },
        }}
      >
        {countdown.eyebrow}
      </Typography>

      <Typography
        component="p"
        sx={{
          fontFamily: bodyFontFamily,
          fontSize: { xs: '0.85rem', md: '0.95rem' },
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: brand.white,
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        {countdown.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: bodyFontFamily,
          fontSize: { xs: '0.78rem', md: '0.88rem' },
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: brand.textMuted,
          mb: { xs: 2.25, md: 3 },
        }}
      >
        {countdown.dateLabel}
      </Typography>

      {expired ? (
        <Typography
          sx={{
            ...bokorSx,
            fontSize: { xs: '1.45rem', md: '1.85rem' },
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: brand.orange,
          }}
        >
          {countdown.available}
        </Typography>
      ) : (
        <Box
          role="timer"
          aria-live="polite"
          aria-label={`${days} ${countdown.days}, ${hours} ${countdown.hours}, ${minutes} ${countdown.minutes}, ${seconds} ${countdown.seconds}`}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            columnGap: { xs: 1, md: 2.5 },
            maxWidth: 640,
            mx: 'auto',
          }}
        >
          {units.map((unit) => (
            <Box key={unit.label}>
              <Typography
                sx={{
                  ...bokorSx,
                  fontSize: { xs: '2rem', md: '2.85rem' },
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: brand.orange,
                }}
              >
                {unit.value}
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontFamily: bodyFontFamily,
                  fontSize: { xs: '0.68rem', md: '0.78rem' },
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: brand.textMuted,
                }}
              >
                {unit.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export function Lanzamientos({
  title,
  releasedLabel,
  upcomingLabel,
  kinds,
  countdown,
  items,
}: LanzamientosProps) {
  return (
    <Box
      id="lanzamientos"
      component="section"
      sx={{
        bgcolor: brand.black,
        borderTop: `1px solid ${brand.borderSubtle}`,
      }}
    >
      <PageContent section>
        <SectionTitle>{title}</SectionTitle>
        <Countdown countdown={countdown} />

        <Box
          component="ol"
          sx={{
            m: 0,
            p: 0,
            listStyle: 'none',
            width: '100%',
            maxWidth: 960,
            mx: 'auto',
          }}
        >
          {items.map((item) => {
            const released = isReleased(item.date)
            const status = released ? releasedLabel : upcomingLabel

            return (
              <Box
                key={item.id}
                component="li"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr auto',
                    md: 'minmax(180px, 0.9fr) minmax(0, 1.4fr) minmax(110px, 0.55fr) minmax(130px, 0.65fr)',
                  },
                  columnGap: { xs: 2, md: 3 },
                  rowGap: 0.6,
                  alignItems: 'baseline',
                  py: { xs: 1.75, md: 2 },
                  borderTop: `1px solid ${brand.borderSubtle}`,
                  '&:last-of-type': {
                    borderBottom: `1px solid ${brand.borderSubtle}`,
                  },
                }}
              >
                <Typography
                  sx={{
                    ...colSx,
                    fontSize: { xs: '0.72rem', md: '0.78rem' },
                    color: brand.orange,
                    fontWeight: 600,
                  }}
                >
                  {item.dateLabel}
                </Typography>

                <Typography
                  sx={{
                    ...colSx,
                    gridColumn: { xs: '1 / -1', md: 'auto' },
                    order: { xs: 3, md: 0 },
                    fontSize: { xs: '0.92rem', md: '0.95rem' },
                    color: brand.white,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    ...colSx,
                    display: { xs: 'none', md: 'block' },
                    fontSize: '0.72rem',
                    color: brand.textMuted,
                    textAlign: { md: 'right' },
                  }}
                >
                  {kinds[item.kind]}
                </Typography>

                <Typography
                  sx={{
                    ...colSx,
                    fontSize: { xs: '0.68rem', md: '0.72rem' },
                    color: released ? brand.orange : brand.textMuted,
                    fontWeight: 600,
                    textAlign: 'right',
                    justifySelf: 'end',
                  }}
                >
                  {status}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </PageContent>
    </Box>
  )
}
