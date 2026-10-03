import { Box, Stack, Typography } from '@mui/material'
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded'
import RefreshRounded from '@mui/icons-material/RefreshRounded'
import { Button } from './Button'
import { EmptyState } from './EmptyState'

export interface ErrorFallbackProps {
  error: Error
  onReset: () => void
  fullScreen?: boolean
}

// Pantalla que muestra el ErrorBoundary cuando un componente falla al renderizar
export const ErrorFallback = ({ error, onReset, fullScreen = false }: ErrorFallbackProps) => {
  return (
    <Box role="alert" sx={{ display: 'grid', placeItems: 'center', minHeight: fullScreen ? '100dvh' : 320, px: 2 }}>
      <EmptyState
        icon={ErrorOutlineRounded}
        title="Algo salió mal"
        description="Ocurrió un error inesperado al mostrar esta sección. Puedes intentarlo de nuevo o recargar la página."
        action={
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'center' }}>
            <Button label="Reintentar" startIcon={<RefreshRounded />} onClick={onReset} />
            <Button label="Recargar página" variant="outlined" onClick={() => window.location.reload()} />
          </Stack>
        }
      />
      {/* El detalle técnico solo se muestra en desarrollo */}
      {import.meta.env.DEV && (
        <Typography
          component="pre"
          variant="caption"
          sx={{ maxWidth: 560, whiteSpace: 'pre-wrap', color: 'error.main', bgcolor: 'background.paper', p: 1.5, borderRadius: 1 }}
        >
          {error.message}
        </Typography>
      )}
    </Box>
  )
}
