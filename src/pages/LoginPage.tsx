import { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { Footer } from '@/components/Layout'
import { LoginForm } from '@/components/Login'
import { ModalAlert } from '@/components/ui'
import { useAuth } from '@/contexts'

export const LoginPage = () => {
  const { login } = useAuth()
  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'grid',
          placeItems: 'center',
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 4 },
          bgcolor: { xs: 'background.paper', sm: 'background.default' },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: 420, md: 440 },
            p: { xs: 1, sm: 4, md: 5 },
            boxShadow: { xs: 'none', sm: 3 },
            borderRadius: { xs: 0, sm: 3 },
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 }, fontSize: { xs: '1.5rem', md: '1.75rem' } }}
          >
            Iniciar sesión
          </Typography>
          <LoginForm onSuccess={() => setShowSuccess(true)} />
        </Paper>

        <ModalAlert
          open={showSuccess}
          type="success"
          title="Inicio de sesión exitoso"
          message="¡Bienvenido de nuevo!"
          buttonLabel="Continuar"
          // Al autenticar, PublicRoute redirige automáticamente a /home
          onClose={login}
        />
      </Box>
      <Footer />
    </Box>
  )
}
