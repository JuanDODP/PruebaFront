import { Box, Paper, Skeleton, Stack } from '@mui/material'

// Placeholder con la misma forma que la Card para evitar saltos de layout al cargar
export const CardSkeleton = () => {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }} aria-hidden>
      <Skeleton variant="rectangular" animation="wave" sx={{ aspectRatio: '1 / 1', height: 'auto' }} />
      <Stack spacing={1.75} sx={{ p: 2 }}>
        {[0, 1, 2].map((row) => (
          <Box key={row} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Skeleton variant="rounded" animation="wave" width={32} height={32} />
            <Box sx={{ flex: 1 }}>
              <Skeleton animation="wave" width="35%" height={14} />
              <Skeleton animation="wave" width="70%" height={20} />
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}
