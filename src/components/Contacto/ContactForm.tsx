import { Box, Button, Stack, TextField } from '@mui/material'
import { useCallback, useState } from 'react'
import { brand } from '../../theme/brand'

type ContactFormData = {
  nameLabel: string
  emailLabel: string
  subjectLabel: string
  messageLabel: string
  submitLabel: string
  defaultSubject: string
}

type ContactFormProps = {
  recipientEmail: string
  form: ContactFormData
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: brand.white,
    borderRadius: 1.5,
    bgcolor: brand.black,
    fontSize: '0.95rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.22)' },
    '&:hover fieldset': { borderColor: 'rgba(232,114,42,0.55)' },
    '&.Mui-focused fieldset': { borderColor: brand.orange, borderWidth: 1 },
  },
  '& .MuiInputLabel-root': {
    color: brand.textMuted,
    fontSize: '0.88rem',
    bgcolor: brand.black,
    px: 0.75,
  },
  '& .MuiInputLabel-root.Mui-focused': { color: brand.orange },
  '& .MuiInputLabel-shrink': { bgcolor: brand.black },
}

export function ContactForm({ recipientEmail, form }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const mailSubject = encodeURIComponent(subject.trim() || form.defaultSubject)
      const mailBody = encodeURIComponent(
        [`Nombre: ${name.trim()}`, `Correo: ${email.trim()}`, '', message.trim()].join('\n'),
      )

      window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`
    },
    [email, form.defaultSubject, message, name, recipientEmail, subject],
  )

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: '100%',
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 2,
        border: `1px solid ${brand.borderSubtle}`,
        bgcolor: brand.surfaceAlt,
        overflow: 'hidden',
      }}
    >
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              label={form.nameLabel}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              sx={fieldSx}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              label={form.emailLabel}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={fieldSx}
            />
          </Box>
        </Stack>

        <TextField
          label={form.subjectLabel}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={form.defaultSubject}
          fullWidth
          sx={fieldSx}
        />
        <TextField
          label={form.messageLabel}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          fullWidth
          multiline
          minRows={6}
          sx={fieldSx}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.5 }}>
          <Button
            type="submit"
            sx={{
              bgcolor: brand.orange,
              color: brand.white,
              borderRadius: '999px',
              px: 4,
              py: 1.25,
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { bgcolor: brand.orangeDark, boxShadow: 'none' },
            }}
          >
            {form.submitLabel}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
