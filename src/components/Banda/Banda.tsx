import { Box, Typography } from '@mui/material'
import type { Member } from '../../data/pressKitData'
import { brand } from '../../theme/brand'
import { MemberPhoto } from '../shared/MemberPhoto'
import { PageContent } from '../shared/PageContent'
import { SubsectionLabel } from '../shared/SubsectionLabel'
import { MembersCarousel } from './MembersCarousel'

type BandaProps = {
  subtitle: string
  members: Member[]
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      <Box sx={{ mb: 1.25 }}>
        <MemberPhoto
          src={member.photoSrc}
          alt={member.name}
          fallbackLetter={member.nickname.charAt(0)}
        />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.78rem', md: '0.85rem' } }}>
        {member.name} &ldquo;{member.nickname}&rdquo;
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' }, color: brand.textMuted, mt: 0.5 }}>
        {member.role}
      </Typography>
    </Box>
  )
}

export function Banda({ subtitle, members }: BandaProps) {
  return (
    <Box id="banda" component="section" sx={{ bgcolor: brand.black }}>
      <PageContent section>
        <Box sx={{ width: '100%', mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
          <SubsectionLabel>{subtitle}</SubsectionLabel>
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%', minWidth: 0 }}>
          <MembersCarousel members={members} />
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            width: '100%',
            gridTemplateColumns: {
              md: 'repeat(3, minmax(0, 1fr))',
              lg: 'repeat(5, minmax(0, 1fr))',
            },
            gap: { md: 3 },
          }}
        >
          {members.map((member) => (
            <MemberCard key={member.nickname} member={member} />
          ))}
        </Box>
      </PageContent>
    </Box>
  )
}
