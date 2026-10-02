export const AUTH_STORAGE_KEY = 'isAuthenticated'

export interface State {
  isAuthenticated: boolean
}

export type Action = { type: 'LOGIN' } | { type: 'LOGOUT' }

// Lee el estado guardado; si no existe (primer ingreso) arranca en false
export const getInitialState = (): State => {
  try {
    return { isAuthenticated: localStorage.getItem(AUTH_STORAGE_KEY) === 'true' }
  } catch {
    return { isAuthenticated: false }
  }
}

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}
