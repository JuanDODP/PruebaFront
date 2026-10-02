import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useStateContext } from '../contexts/State.Context'

// Solo deja pasar si el usuario NO está autenticado (ej. login)
export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { state } = useStateContext()
  return state.isAuthenticated ? <Navigate to="/home" replace /> : children
}
