import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { authReducer, type AuthState } from '@/reducers'
import { readStorage, writeStorage } from '@/utils'
import { AuthContext } from './AuthContext'

const AUTH_STORAGE_KEY = 'isAuthenticated'

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

// Recupera la sesión simulada guardada; en el primer ingreso arranca sin sesión
const getInitialState = (): AuthState => ({
  isAuthenticated: readStorage(AUTH_STORAGE_KEY, () => false, isBoolean),
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ isAuthenticated }, dispatch] = useReducer(authReducer, undefined, getInitialState)

  useEffect(() => {
    writeStorage(AUTH_STORAGE_KEY, isAuthenticated)
  }, [isAuthenticated])

  const login = useCallback(() => dispatch({ type: 'LOGIN' }), [])
  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [])

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout])

  return <AuthContext value={value}>{children}</AuthContext>
}
