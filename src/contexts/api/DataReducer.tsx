import type { Data, Info, Result } from '@/interface/ApiData.Interface'

export interface DataState {
  characters: Result[]
  info: Info | null
  isLoading: boolean
  error: string | null
}

export type ActionData =
  | { type: 'fetchStart' }
  | { type: 'fetchSuccess'; payload: Data }
  | { type: 'fetchError'; payload: string }

export const initialDataState: DataState = {
  characters: [],
  info: null,
  isLoading: false,
  error: null,
}

export const dataReducer = (state: DataState, action: ActionData): DataState => {
  switch (action.type) {
    case 'fetchStart':
      return { ...state, isLoading: true, error: null }
    case 'fetchSuccess':
      return { ...state, characters: action.payload.results, info: action.payload.info, isLoading: false }
    case 'fetchError':
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
