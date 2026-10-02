import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useStateContext } from '../contexts/State.Context'

// Solo deja pasar si el usuario está autenticado
export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { state } = useStateContext()
  return state.isAuthenticated ? children : <Navigate to="/login" replace />
}
