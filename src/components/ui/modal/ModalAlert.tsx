import { Box, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import CheckRounded from '@mui/icons-material/CheckRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { Button } from '../Button'

export type AlertType = 'success' | 'error'

interface ModalAlertProps {
  open: boolean
  type: AlertType
  title: string
  message?: string
  buttonLabel?: string
  onClose: () => void
}

const ICONS = {
  success: CheckRounded,
  error: CloseRounded,
}

export const ModalAlert = ({ open, type, title, message, buttonLabel = 'Aceptar', onClose }: ModalAlertProps) => {
  const Icon = ICONS[type]

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
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
            color: 'common.white',
            bgcolor: `${type}.main`,
          }}
        >
          <Icon fontSize="inherit" />
        </Box>
        <Typography variant="h6" color={`${type}.main`} gutterBottom>
          {title}
        </Typography>
        {message && <Typography color="text.secondary">{message}</Typography>}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, px: { xs: 2, sm: 3 } }}>
        <Button label={buttonLabel} color={type} onClick={onClose} sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 160 } }} />
      </DialogActions>
    </Dialog>
  )
}
