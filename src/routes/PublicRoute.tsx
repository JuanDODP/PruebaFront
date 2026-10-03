import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/contexts'

// Solo deja pasar si el usuario NO está autenticado (ej. login)
export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/home" replace /> : children
}
