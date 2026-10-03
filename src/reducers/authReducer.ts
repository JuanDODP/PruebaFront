export interface AuthState {
  isAuthenticated: boolean
}

export type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}
