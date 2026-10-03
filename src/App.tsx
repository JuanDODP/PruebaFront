import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider, CharactersProvider } from '@/contexts'
import { AppRouter } from '@/routes'
import { theme } from '@/theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CharactersProvider>
          <AppRouter />
        </CharactersProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
