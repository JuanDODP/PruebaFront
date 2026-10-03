import { useId, type ReactNode } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
  type Breakpoint,
} from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'

interface ModalProps {
  open: boolean
  title: ReactNode
  children: ReactNode
  actions?: ReactNode
  maxWidth?: Breakpoint
  onClose: () => void
}

// Modal base reutilizable: en móvil ocupa toda la pantalla para aprovechar el espacio
export const Modal = ({ open, title, children, actions, maxWidth = 'sm', onClose }: ModalProps) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const titleId = useId()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth={maxWidth}
      aria-labelledby={titleId}
      slotProps={{ paper: { sx: { borderRadius: { xs: 0, sm: 3 } } } }}
    >
      <DialogTitle
        id={titleId}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, pr: 1.5 }}
      >
        {title}
        <IconButton aria-label="Cerrar" onClick={onClose} edge="end">
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        {children}
      </DialogContent>
      {actions && <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: 2, gap: 1 }}>{actions}</DialogActions>}
    </Dialog>
  )
}
