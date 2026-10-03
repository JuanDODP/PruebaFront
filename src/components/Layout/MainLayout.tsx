import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Header } from './Header'

export const MainLayout = () => {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Header />
      <Box
        component="main"
        sx={{ flex: 1, width: '100%', maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 5 } }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
