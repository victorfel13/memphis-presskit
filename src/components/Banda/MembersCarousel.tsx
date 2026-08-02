import { Box, IconButton, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import type { Member } from '../../data/pressKitAssets'
import { brand } from '../../theme/brand'
import { MemberPhoto } from '../shared/MemberPhoto'

type MembersCarouselProps = {
  members: Member[]
}

function ArrowButton({
  label,
  direction,
  onClick,
}: {
  label: string
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  return (
    <IconButton
      type="button"
      aria-label={label}
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '38%',
        [direction === 'prev' ? 'left' : 'right']: 0,
        transform: 'translateY(-50%)',
        color: brand.white,
        bgcolor: 'rgba(0,0,0,0.55)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 0,
        width: 40,
        height: 40,
        zIndex: 2,
        '&:hover': { bgcolor: brand.orange, borderColor: brand.orange },
      }}
    >
      {direction === 'prev' ? '‹' : '›'}
    </IconButton>
  )
}

function MemberSlide({ member }: { member: Member }) {
  return (
    <Box sx={{ textAlign: 'center', width: '100%', minWidth: 0, px: 5 }}>
      <Box sx={{ maxWidth: 320, mx: 'auto', mb: 1.5, width: '100%', minWidth: 0 }}>
        <MemberPhoto
          src={member.photoSrc}
          alt={member.name}
          fallbackLetter={member.nickname.charAt(0)}
          fallbackSize="2rem"
        />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
        {member.name} &ldquo;{member.nickname}&rdquo;
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: brand.textMuted, mt: 0.5 }}>
        {member.role}
      </Typography>
    </Box>
  )
}

export function MembersCarousel({ members }: MembersCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = members.length

  const goPrev = useCallback(() => {
    if (total === 0) return
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    if (total === 0) return
    setIndex((i) => (i + 1) % total)
  }, [total])

  if (total === 0) return null

  const current = members[index]

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'clip' }}>
      {total > 1 ? <ArrowButton label="Integrante anterior" direction="prev" onClick={goPrev} /> : null}

      {current ? <MemberSlide member={current} /> : null}

      {total > 1 ? <ArrowButton label="Integrante siguiente" direction="next" onClick={goNext} /> : null}

      {total > 1 ? (
        <>
          <Typography
            align="center"
            sx={{ mt: 1.5, fontSize: '0.7rem', color: brand.textMuted, letterSpacing: '0.08em' }}
          >
            {index + 1} / {total}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 1.25, flexWrap: 'wrap' }}>
            {members.map((member, i) => (
              <Box
                key={member.nickname}
                component="button"
                type="button"
                aria-label={`Ver a ${member.nickname}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
                sx={{
                  width: 8,
                  height: 8,
                  p: 0,
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  bgcolor: i === index ? brand.orange : 'rgba(255,255,255,0.25)',
                  '&:hover': { bgcolor: i === index ? brand.orange : 'rgba(255,255,255,0.5)' },
                }}
              />
            ))}
          </Box>
        </>
      ) : null}
    </Box>
  )
}
