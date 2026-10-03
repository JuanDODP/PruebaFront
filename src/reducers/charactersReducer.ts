import type { Character, CharactersResponse, PageInfo } from '@/types'

export interface CharactersState {
  characters: Character[]
  info: PageInfo | null
  isLoading: boolean
  error: string | null
}

export type CharactersAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: CharactersResponse }
  | { type: 'FETCH_ERROR'; payload: string }

// Arranca en carga para no mostrar un "sin resultados" antes de la primera petición
export const initialCharactersState: CharactersState = {
  characters: [],
  info: null,
  isLoading: true,
  error: null,
}

export const charactersReducer = (state: CharactersState, action: CharactersAction): CharactersState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, characters: action.payload.results, info: action.payload.info, isLoading: false }
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
