import { Box, Stack, Typography } from '@mui/material'
import { Buttom } from '../components/Login/Buttom'
import { useStateContext } from '../contexts/State.Context'

export const HomePage = () => {
  const { dispatch } = useStateContext()

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 5 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' } }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Welcome to the Home Page
          </Typography>
          <Typography color="text.secondary">This is the main landing page of the application.</Typography>
        </Box>
        <Buttom label="Cerrar sesión" variant="outlined" color="error" onClick={() => dispatch({ type: 'LOGOUT' })} />
      </Stack>
    </Box>
  )
}
