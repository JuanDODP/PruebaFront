import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { AUTH_STORAGE_KEY, getInitialState, stateReducer, type Action, type State } from './StateReducer'

interface StateContextValue {
  state: State
  dispatch: Dispatch<Action>
}

const StateContext = createContext<StateContextValue | undefined>(undefined)

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stateReducer, undefined, getInitialState)

  // Sincroniza el "token" simulado con localStorage
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, String(state.isAuthenticated))
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [state.isAuthenticated])

  return <StateContext value={{ state, dispatch }}>{children}</StateContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error('useStateContext debe usarse dentro de <StateProvider>')
  }
  return context
}
