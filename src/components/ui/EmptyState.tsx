import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'

interface EmptyStateProps {
  icon: SvgIconComponent
  title: string
  description?: ReactNode
  action?: ReactNode
}

// Mensaje reutilizable para listas vacías, búsquedas sin resultados, etc.
export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <Box sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 420, mx: 'auto', px: 2, py: { xs: 5, md: 7 } }}>
      <Icon sx={{ fontSize: { xs: 40, md: 48 }, color: 'primary.light', mb: 1 }} />
      <Typography variant="h6" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {description && <Typography variant="body2">{description}</Typography>}
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  )
}
