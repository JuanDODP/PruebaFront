import { useMemo } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import type { Character, CharacterStatus } from '@/types'
import { STATUS_META } from './characterMeta'

// Resumen rápido de cuántos personajes hay por estado
export const StatusSummary = ({ characters }: { characters: Character[] }) => {
  const counts = useMemo(
    () =>
      characters.reduce<Record<CharacterStatus, number>>(
        (acc, { status }) => ({ ...acc, [status]: acc[status] + 1 }),
        { Alive: 0, Dead: 0, unknown: 0 },
      ),
    [characters],
  )

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
      {(Object.keys(STATUS_META) as CharacterStatus[]).map((status) => (
        <Box
          key={status}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: STATUS_META[status].color }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {counts[status]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {STATUS_META[status].label}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}
