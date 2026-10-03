import { Paper } from '@mui/material'
import CloudSyncOutlined from '@mui/icons-material/CloudSyncOutlined'
import { PageHeader } from '../components/Layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'

export const ConsumoPage = () => {
  return (
    <>
      <PageHeader title="Consumo" subtitle="Información obtenida desde la API." />

      {/* Aquí se mostrarán los datos de la API */}
      <Paper variant="outlined">
        <EmptyState
          icon={CloudSyncOutlined}
          title="Sin datos todavía"
          description="Los datos aparecerán aquí cuando se conecte la API."
        />
      </Paper>
    </>
  )
}
