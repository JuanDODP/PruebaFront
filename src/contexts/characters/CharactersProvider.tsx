import { useCallback, useMemo, useReducer, type ReactNode } from 'react'
import { charactersReducer, initialCharactersState, type CharactersAction } from '@/reducers'
import { charactersService } from '@/services'
import { delay, getErrorMessage } from '@/utils'
import { CharactersContext } from './CharactersContext'

// Tiempo mínimo de la carga simulada para que el estado `isLoading` sea visible
const SIMULATED_LOADING_MS = 1500

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(charactersReducer, initialCharactersState)

  // `signal` permite cancelar peticiones obsoletas (cambio rápido de página o desmontaje)
  const fetchCharacters = useCallback(async (page: number, signal?: AbortSignal) => {
    dispatch({ type: 'FETCH_START' })
    // La espera corre en paralelo con la petición: la carga dura lo que tarde la más lenta
    const minimumDelay = delay(SIMULATED_LOADING_MS)

    let result: CharactersAction
    try {
      result = { type: 'FETCH_SUCCESS', payload: await charactersService.getPage(page, signal) }
    } catch (error) {
      result = { type: 'FETCH_ERROR', payload: getErrorMessage(error) }
    }

    await minimumDelay
    if (!signal?.aborted) dispatch(result)
  }, [])

  const value = useMemo(() => ({ ...state, fetchCharacters }), [state, fetchCharacters])

  return <CharactersContext value={value}>{children}</CharactersContext>
}
