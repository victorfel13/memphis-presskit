import { Box } from '@mui/material'
import { pressKitData } from './data/pressKitData'
import { PlaybackProvider, usePlayback } from './context/PlaybackContext'
import { Navbar } from './components/Navbar/Navbar'
import { Inicio } from './components/Inicio/Inicio'
import { Biografia } from './components/Biografia/Biografia'
import { Banda } from './components/Banda/Banda'
import { Propuesta } from './components/Propuesta/Propuesta'
import { Musica } from './components/Musica/Musica'
import { Videos } from './components/Videos/Videos'
import { Contacto } from './components/Contacto/Contacto'
import { Footer } from './components/Footer/Footer'
import { GlobalPlayer } from './components/GlobalPlayer/GlobalPlayer'
import { brand, pageBottomPadWithPlayer, scrollMarginTop } from './theme/brand'

function AppContent() {
  const { bandName, nav, inicio, biografia, banda, propuesta, musica, videos, contacto, footer } = pressKitData
  const { current } = usePlayback()

  return (
    <Box
      sx={{
        bgcolor: brand.black,
        color: brand.white,
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'clip',
        pb: current
          ? pageBottomPadWithPlayer
          : 'env(safe-area-inset-bottom, 0px)',
        '& section': { scrollMarginTop, width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'clip' },
      }}
    >
      <Navbar items={nav} />

      <Inicio
        heroSrc={inicio.heroSrc}
        title={inicio.title}
        headlineLines={inicio.headlineLines}
        subtitle={inicio.subtitle}
        description={inicio.description}
        social={inicio.social}
      />

      <Biografia
        title={biografia.title}
        subtitle={biografia.subtitle}
        paragraphs={biografia.paragraphs}
        images={biografia.images}
      />

      <Propuesta musical={propuesta.musical} lirica={propuesta.lirica} />

      <Banda subtitle={banda.subtitle} members={banda.members} />

      <Musica title={musica.title} bandName={bandName} ep={musica.ep} />

      <Videos
        title={videos.title}
        subtitle={videos.subtitle}
        description={videos.description}
        items={videos.items}
      />

      <Contacto
        title={contacto.title}
        booking={contacto.booking}
        form={contacto.form}
      />

      <Footer redes={contacto.redes} credit={footer.credit} />

      <GlobalPlayer />
    </Box>
  )
}

export default function App() {
  return (
    <PlaybackProvider>
      <AppContent />
    </PlaybackProvider>
  )
}
