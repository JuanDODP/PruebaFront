import { Box } from '@mui/material'
import type { CharacterStatus } from '@/types'
import { pulseRing, REDUCED_MOTION } from '@/theme'
import { STATUS_META } from './characterMeta'

// Insignia translúcida que se coloca sobre la imagen del personaje
export const StatusBadge = ({ status }: { status: CharacterStatus }) => {
  const { label, color } = STATUS_META[status]

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.4,
        color: 'text.primary',
        bgcolor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(19, 39, 67, 0.18)',
      }}
    >
      <Box
        component="span"
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: color,
          color,
          // Solo los personajes vivos "laten"
          animation: status === 'Alive' ? `${pulseRing} 2s ease-out infinite` : 'none',
          [REDUCED_MOTION]: { animation: 'none' },
        }}
      />
      {label}
    </Box>
  )
}
