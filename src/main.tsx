import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { bodyFontFamily, brand } from './theme/brand'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: brand.orange },
    background: { default: brand.black, paper: brand.grey },
    text: { primary: brand.white, secondary: brand.textMuted },
  },
  typography: {
    fontFamily: bodyFontFamily,
    allVariants: { letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { overflowX: 'clip', width: '100%', maxWidth: '100%' },
        body: { overflowX: 'clip', width: '100%', maxWidth: '100%', margin: 0 },
        '#root': { overflowX: 'clip', width: '100%', maxWidth: '100%' },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiModal: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
