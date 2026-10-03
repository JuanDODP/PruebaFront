import { useEffect, useState, type ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import CloudOffOutlined from '@mui/icons-material/CloudOffOutlined'
import RefreshRounded from '@mui/icons-material/RefreshRounded'
import SearchOffRounded from '@mui/icons-material/SearchOffRounded'
import { Card } from '@/components/Consumo/Card'
import { CardSkeleton } from '@/components/Consumo/CardSkeleton'
import { StatusSummary } from '@/components/Consumo/StatusSummary'
import { PageHeader } from '@/components/Layout/PageHeader'
import { Buttom } from '@/components/ui/Buttom'
import { EmptyState } from '@/components/ui/EmptyState'
import { PaginationControls } from '@/components/ui/PaginationControls'
import { useApiData } from '@/contexts/api/Data.Context'

const SKELETON_COUNT = 8
// La API siempre devuelve 20 personajes por página
const PAGE_SIZE = 20

const CardGrid = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      display: 'grid',
      gap: { xs: 2, md: 3 },
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
    }}
  >
    {children}
  </Box>
)

export const ConsumoPage = () => {
  const { characters, info, isLoading, error, getData } = useApiData()
  const [page, setPage] = useState(1)

  // Cada cambio de página vuelve a consultar la API con el nuevo número
  useEffect(() => {
    void getData(page)
  }, [getData, page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const firstItem = (page - 1) * PAGE_SIZE + 1
  const lastItem = firstItem + characters.length - 1

  const renderContent = () => {
    if (isLoading) {
      return (
        <CardGrid>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
        </CardGrid>
      )
    }
    if (error && characters.length === 0) {
      return (
        <EmptyState
          icon={CloudOffOutlined}
          title="No pudimos cargar los personajes"
          description={error}
          action={<Buttom label="Reintentar" startIcon={<RefreshRounded />} onClick={() => void getData(page)} />}
        />
      )
    }
    if (characters.length === 0) {
      return <EmptyState icon={SearchOffRounded} title="Sin personajes" description="La API no devolvió resultados." />
    }
    return (
      <CardGrid>
        {characters.map((character, index) => (
          <Card key={character.id} character={character} index={index} />
        ))}
      </CardGrid>
    )
  }

  return (
    <>
      <PageHeader title="Personajes" subtitle="Información obtenida desde la API de Rick and Morty." />

      {!isLoading && characters.length > 0 && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3 }}
        >
          <StatusSummary characters={characters} />
          {info && (
            <Typography variant="body2" color="text.secondary">
              Mostrando {firstItem}–{lastItem} de {info.count} personajes
            </Typography>
          )}
        </Stack>
      )}

      <Box aria-busy={isLoading} aria-live="polite">
        {renderContent()}
      </Box>

      {/* Se mantiene visible (deshabilitada) durante la carga para que la página no salte */}
      {info && info.pages > 1 && (
        <PaginationControls
          page={page}
          count={info.pages}
          disabled={isLoading}
          summary={`Página ${page} de ${info.pages}`}
          onChange={handlePageChange}
        />
      )}
    </>
  )
}
