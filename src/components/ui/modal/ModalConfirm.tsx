import type { ReactNode } from 'react'
import { Box, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded'
import { Button } from '../Button'

interface ModalConfirmProps {
  open: boolean
  title: string
  message?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  color?: 'error' | 'warning' | 'primary'
  // Mientras se procesa la acción no se puede cancelar ni cerrar
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const actionButtonSx = { width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 130 }, m: '0 !important' }

// Confirmación para acciones destructivas o irreversibles
export const ModalConfirm = ({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  color = 'error',
  loading = false,
  onConfirm,
  onCancel,
}: ModalConfirmProps) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
      role="alertdialog"
      slotProps={{ paper: { sx: { m: { xs: 2, sm: 4 }, width: { xs: 'calc(100% - 32px)', sm: '100%' }, borderRadius: 3 } } }}
    >
      <DialogContent sx={{ textAlign: 'center', pt: { xs: 3, sm: 4 }, px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            width: { xs: 56, sm: 64 },
            height: { xs: 56, sm: 64 },
            mx: 'auto',
            mb: 2,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            fontSize: { xs: 28, sm: 32 },
            color: `${color}.main`,
            bgcolor: (theme) => `color-mix(in srgb, ${theme.palette[color].main} 12%, transparent)`,
          }}
        >
          <WarningAmberRounded fontSize="inherit" />
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {message && <Typography color="text.secondary">{message}</Typography>}
      </DialogContent>
      <DialogActions
        sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, justifyContent: 'center', gap: 1.5, pb: 3, px: { xs: 2, sm: 3 } }}
      >
        {/* En acciones destructivas el foco inicial va en "Cancelar" */}
        <Button label={cancelLabel} variant="outlined" color="inherit" onClick={onCancel} disabled={loading} autoFocus sx={actionButtonSx} />
        <Button label={confirmLabel} color={color} onClick={onConfirm} loading={loading} sx={actionButtonSx} />
      </DialogActions>
    </Dialog>
  )
}
