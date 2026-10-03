import { useCallback, useState } from 'react'
import type { AlertColor } from '@mui/material'

export interface NotificationState {
  open: boolean
  message: string
  severity: AlertColor
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({ open: false, message: '', severity: 'success' })

  const notify = useCallback((message: string, severity: AlertColor = 'success') => {
    setNotification({ open: true, message, severity })
  }, [])

  // Solo se cambia `open` para que el mensaje no desaparezca durante la animación de salida
  const closeNotification = useCallback(() => setNotification((prev) => ({ ...prev, open: false })), [])

  return { notification, notify, closeNotification }
}
