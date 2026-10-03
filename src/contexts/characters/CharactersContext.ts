import { createContext } from 'react'
import type { CharactersState } from '@/reducers'

export interface CharactersContextValue extends CharactersState {
  fetchCharacters: (page: number, signal?: AbortSignal) => Promise<void>
}

export const CharactersContext = createContext<CharactersContextValue | undefined>(undefined)
