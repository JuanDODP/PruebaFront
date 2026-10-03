import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/contexts'

// Solo deja pasar si el usuario está autenticado
export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
