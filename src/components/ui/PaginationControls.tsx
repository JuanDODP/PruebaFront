import { Pagination, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

const ARIA_LABELS: Record<string, string> = {
  first: 'Primera página',
  last: 'Última página',
  next: 'Página siguiente',
  previous: 'Página anterior',
}

interface PaginationControlsProps {
  page: number
  count: number
  disabled?: boolean
  summary?: string
  onChange: (page: number) => void
}

// Paginación reutilizable: en móvil muestra menos números para que quepa en una sola línea
export const PaginationControls = ({ page, count, disabled = false, summary, onChange }: PaginationControlsProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack spacing={1.5} sx={{ alignItems: 'center', mt: { xs: 4, md: 5 } }}>
      <Pagination
        page={page}
        count={count}
        disabled={disabled}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
        size={isMobile ? 'medium' : 'large'}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={1}
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        getItemAriaLabel={(type, item, selected) => {
          if (type === 'page') return selected ? `Página ${item}, actual` : `Ir a la página ${item}`
          return ARIA_LABELS[type] ?? ''
        }}
      />
      {summary && (
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
      )}
    </Stack>
  )
}
