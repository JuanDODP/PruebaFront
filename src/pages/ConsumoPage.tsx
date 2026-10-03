import { Paper } from '@mui/material'
import CloudSyncOutlined from '@mui/icons-material/CloudSyncOutlined'
import { PageHeader } from '../components/Layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { useContext, useEffect } from 'react'
import { ApiDataContext } from '@/contexts/api/Data.Context'

export const ConsumoPage = () => {
  const{data, getData, isLoading} = useContext(ApiDataContext)
  
  useEffect(() => {
    // Aquí podrías hacer la llamada a la API para obtener los datos
    // y actualizar el estado global con los datos obtenidos.
    getData()

  }, [])
  console.log("=====================================")
  console.log(data)
  console.log(isLoading)
  console.log("=====================================")
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
