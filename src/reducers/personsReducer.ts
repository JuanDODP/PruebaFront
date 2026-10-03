import type { Person } from '@/types'

export interface PersonsState {
  persons: Person[]
  isLoading: boolean
  error: string | null
}

export type PersonsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Person[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADDED'; payload: Person }
  | { type: 'UPDATED'; payload: Person }
  | { type: 'REMOVED'; payload: { id: string } }

export const initialPersonsState: PersonsState = {
  persons: [],
  isLoading: true,
  error: null,
}

// Reducer puro: solo refleja en memoria lo que el servicio ya confirmó
export const personsReducer = (state: PersonsState, action: PersonsAction): PersonsState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, persons: action.payload, isLoading: false }
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'ADDED':
      return { ...state, persons: [action.payload, ...state.persons] }
    case 'UPDATED':
      return {
        ...state,
        persons: state.persons.map((person) => (person.id === action.payload.id ? action.payload : person)),
      }
    case 'REMOVED':
      return { ...state, persons: state.persons.filter((person) => person.id !== action.payload.id) }
    default:
      return state
  }
}
