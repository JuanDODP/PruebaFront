import { CssBaseline, ThemeProvider } from '@mui/material'
import { ErrorBoundary } from '@/components/ui'
import { AuthProvider, CharactersProvider } from '@/contexts'
import { AppRouter } from '@/routes'
import { theme } from '@/theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Última línea de defensa: cualquier error no atrapado muestra una pantalla de recuperación */}
      <ErrorBoundary fullScreen>
        <AuthProvider>
          <CharactersProvider>
            <AppRouter />
          </CharactersProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
