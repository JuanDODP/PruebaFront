import { Box, CircularProgress } from '@mui/material'

// Indicador de carga para rutas diferidas (lazy) y cargas de página completa
export const PageLoader = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  return (
    <Box role="status" aria-label="Cargando" sx={{ display: 'grid', placeItems: 'center', minHeight: fullScreen ? '100dvh' : 320 }}>
      <CircularProgress />
    </Box>
  )
}
