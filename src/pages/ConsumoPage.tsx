import { Box, Paper, Typography } from '@mui/material'
import CloudSyncOutlined from '@mui/icons-material/CloudSyncOutlined'
import { PageHeader } from '../components/Layout/PageHeader'

export const ConsumoPage = () => {
  return (
    <>
      <PageHeader title="Consumo" subtitle="Información obtenida desde la API." />

      {/* Aquí se mostrarán los datos de la API */}
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 420, mx: 'auto' }}>
          <CloudSyncOutlined sx={{ fontSize: { xs: 40, md: 48 }, color: 'primary.light', mb: 1 }} />
          <Typography variant="h6" color="text.primary" gutterBottom>
            Sin datos todavía
          </Typography>
          <Typography variant="body2">Los datos aparecerán aquí cuando se conecte la API.</Typography>
        </Box>
      </Paper>
    </>
  )
}
