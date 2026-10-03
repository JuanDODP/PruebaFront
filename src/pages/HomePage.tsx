import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { PageHeader } from '../components/Layout/PageHeader'
import { navRoutes } from '../routes/routes'

export const HomePage = () => {
  const modules = navRoutes.filter(({ path }) => path !== '/home')

  return (
    <>
      <PageHeader title="Bienvenido" subtitle="Panel principal de la aplicación." />

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        }}
      >
        {modules.map(({ id, name, path, icon: Icon }) => (
          <Paper
            key={id}
            variant="outlined"
            component={Link}
            to={path}
            sx={{
              p: { xs: 2.5, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
              '&:hover': { borderColor: 'primary.light', boxShadow: 2 },
            }}
          >
            {Icon && (
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1.5,
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                <Icon />
              </Box>
            )}
            <Typography variant="h6">{name}</Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, mt: 'auto' }}
            >
              Ir al módulo <ArrowForwardRounded fontSize="small" />
            </Typography>
          </Paper>
        ))}
      </Box>
    </>
  )
}
