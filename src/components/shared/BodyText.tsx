import { Stack, Typography } from '@mui/material'
import { bodyParagraphSx, proseMaxWidth } from '../../theme/brand'

type BodyTextProps = {
  paragraphs: readonly string[]
}

export function BodyText({ paragraphs }: BodyTextProps) {
  return (
    <Stack spacing={1.75} sx={{ width: '100%', minWidth: 0 }}>
      {paragraphs.map((paragraph) => (
        <Typography
          key={paragraph.slice(0, 40)}
          sx={{
            ...bodyParagraphSx,
            maxWidth: { xs: '100%', md: proseMaxWidth },
          }}
        >
          {paragraph}
        </Typography>
      ))}
    </Stack>
  )
}
