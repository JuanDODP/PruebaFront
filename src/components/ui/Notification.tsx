import { Alert, Snackbar } from '@mui/material'
import type { NotificationState } from '../../hooks/useNotification'

interface NotificationProps extends NotificationState {
  onClose: () => void
}

export const Notification = ({ open, message, severity, onClose }: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={(_, reason) => reason !== 'clickaway' && onClose()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%', alignItems: 'center' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
