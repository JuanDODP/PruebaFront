import { useEffect, useReducer, type Reducer } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

/**
 * useReducer cuyo estado se inicializa desde localStorage y se guarda en cada cambio.
 * `isValid` evita arrancar con datos corruptos o con una forma inesperada.
 */
export const usePersistentReducer = <S, A>(
  reducer: Reducer<S, A>,
  key: string,
  fallback: () => S,
  isValid: (value: unknown) => value is S,
) => {
  const [state, dispatch] = useReducer(reducer, key, (storageKey) => readStorage(storageKey, fallback, isValid))

  useEffect(() => {
    writeStorage(key, state)
  }, [key, state])

  return [state, dispatch] as const
}
