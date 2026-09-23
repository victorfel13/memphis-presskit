import { Box } from '@mui/material'
import { PlaybackProvider, usePlayback } from './context/PlaybackContext'
import { NavigationProvider } from './context/NavigationContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Navbar } from './components/Navbar/Navbar'
import { Inicio } from './components/Inicio/Inicio'
import { Lanzamientos } from './components/Lanzamientos/Lanzamientos'
import { Biografia } from './components/Biografia/Biografia'
import { Banda } from './components/Banda/Banda'
import { Propuesta } from './components/Propuesta/Propuesta'
import { Musica } from './components/Musica/Musica'
import { Videos } from './components/Videos/Videos'
import { Tienda } from './components/Tienda/Tienda'
import { Contacto } from './components/Contacto/Contacto'
import { Footer } from './components/Footer/Footer'
import { GlobalPlayer } from './components/GlobalPlayer/GlobalPlayer'
import { brand, pageBottomPadWithPlayer, scrollMarginTop } from './theme/brand'

function AppContent() {
  const { data } = useLanguage()
  const { bandName, nav, inicio, lanzamientos, biografia, banda, propuesta, musica, videos, tienda, contacto, footer } = data
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

      <Lanzamientos
        title={lanzamientos.title}
        releasedLabel={lanzamientos.releasedLabel}
        upcomingLabel={lanzamientos.upcomingLabel}
        kinds={lanzamientos.kinds}
        countdown={lanzamientos.countdown}
        items={lanzamientos.items}
      />

      <Biografia
        title={biografia.title}
        subtitle={biografia.subtitle}
        paragraphs={biografia.paragraphs}
        images={biografia.images}
      />

      <Propuesta musical={propuesta.musical} lirica={propuesta.lirica} />

      <Banda subtitle={banda.subtitle} members={banda.members} />

      <Musica
        title={musica.title}
        bandName={bandName}
        coverSrc={musica.coverSrc}
        coverTint={musica.coverTint}
        description={musica.description}
        tracks={musica.tracks}
        platforms={musica.platforms}
      />

      <Videos
        title={videos.title}
        subtitle={videos.subtitle}
        description={videos.description}
        items={videos.items}
      />

      <Tienda
        title={tienda.title}
        subtitle={tienda.subtitle}
        description={tienda.description}
        imageSrc={tienda.imageSrc}
        imageAlt={tienda.imageAlt}
        whatsappLabel={tienda.whatsappLabel}
        whatsappUrl={tienda.whatsappUrl}
        phoneDisplay={tienda.phoneDisplay}
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
    <LanguageProvider>
      <NavigationProvider>
        <PlaybackProvider>
          <AppContent />
        </PlaybackProvider>
      </NavigationProvider>
    </LanguageProvider>
  )
}
