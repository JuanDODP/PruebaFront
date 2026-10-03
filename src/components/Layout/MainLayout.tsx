import { Suspense } from 'react'
import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router'
import { ErrorBoundary, PageLoader } from '@/components/ui'
import { Footer } from './Footer'
import { Header } from './Header'

export const MainLayout = () => {
  const { pathname } = useLocation()

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Header />
      <Box
        component="main"
        sx={{ flex: 1, width: '100%', maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 5 } }}
      >
        {/* Si una página falla, el header sigue disponible y navegar a otra ruta reinicia el error */}
        <ErrorBoundary resetKey={pathname}>
          {/* El header se mantiene visible mientras se descarga la página (lazy) */}
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Box>
      <Footer />
    </Box>
  )
}
