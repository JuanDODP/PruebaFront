import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import { fadeInUp, DURATION, EASE_OUT, REDUCED_MOTION } from '@/theme'

export const NotFoundPage = () => {
  return (
    <Box
      component="main"
      sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', px: 2, bgcolor: 'background.default' }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 440,
          animation: `${fadeInUp} ${DURATION.slow}ms ${EASE_OUT} both`,
          [REDUCED_MOTION]: { animation: 'none' },
        }}
      >
        <Typography
          aria-hidden
          sx={{
            fontSize: { xs: '6rem', sm: '8rem' },
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -4,
            background: 'linear-gradient(135deg, #1F3A5F 0%, #2F7A8A 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" component="h1" sx={{ mt: 2 }}>
          Página no encontrada
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          La dirección que buscas no existe o fue movida. Revisa la URL o vuelve al inicio.
        </Typography>
        {/* Si no hay sesión, la ruta privada redirige al login automáticamente */}
        <Button variant="contained" component={Link} to="/home" startIcon={<ArrowBackRounded />} size="large">
          Volver al inicio
        </Button>
      </Box>
    </Box>
  )
}
