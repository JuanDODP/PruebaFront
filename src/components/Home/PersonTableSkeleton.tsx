import { Box, Divider, Skeleton, Stack } from '@mui/material'

// Placeholder del listado mientras el servicio responde; se adapta a tabla y a tarjetas
export const PersonTableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <Stack divider={<Divider />} aria-hidden>
      {Array.from({ length: rows }, (_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: { xs: 2, md: 1.75 } }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Skeleton width="45%" />
            <Skeleton width="65%" sx={{ display: { md: 'none' } }} />
          </Box>
          <Skeleton width="25%" sx={{ display: { xs: 'none', md: 'block' } }} />
          <Skeleton width="12%" sx={{ display: { xs: 'none', md: 'block' } }} />
          <Skeleton variant="rounded" width={96} height={28} sx={{ display: { xs: 'none', md: 'block' } }} />
        </Box>
      ))}
    </Stack>
  )
}
