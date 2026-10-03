import { createTheme } from '@mui/material'

// Paleta corporativa: azul marino como color principal, acentos sobrios y fondos neutros
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1F3A5F', light: '#3A5A80', dark: '#132743', contrastText: '#FFFFFF' },
    secondary: { main: '#2F7A8A', light: '#4F9AAA', dark: '#1F5661', contrastText: '#FFFFFF' },
    success: { main: '#2E7D4F' },
    error: { main: '#C0392B' },
    warning: { main: '#C98A1B' },
    info: { main: '#2B6CB0' },
    background: { default: '#F4F6F9', paper: '#FFFFFF' },
    text: { primary: '#1E293B', secondary: '#5B6B7F' },
    divider: '#E2E8F0',
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: { borderColor: '#E2E8F0' },
      },
    },
  },
})
