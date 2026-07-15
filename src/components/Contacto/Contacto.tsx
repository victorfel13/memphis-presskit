import { Box } from '@mui/material'
import { brand } from '../../theme/brand'
import { PageContent } from '../shared/PageContent'
import { SectionTitle } from '../shared/SectionTitle'
import { ContactForm } from './ContactForm'

type BookingInfo = {
  email: string
}

type ContactFormData = {
  nameLabel: string
  emailLabel: string
  subjectLabel: string
  messageLabel: string
  submitLabel: string
  defaultSubject: string
}

type ContactoProps = {
  title: string
  booking: BookingInfo
  form: ContactFormData
}

export function Contacto({ title, booking, form }: ContactoProps) {
  return (
    <Box id="contacto" component="section" sx={{ bgcolor: brand.surface, borderTop: `1px solid ${brand.borderSubtle}` }}>
      <PageContent section>
        <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto', minWidth: 0 }}>
          <SectionTitle align="center">{title}</SectionTitle>
          <ContactForm recipientEmail={booking.email} form={form} />
        </Box>
      </PageContent>
    </Box>
  )
}
