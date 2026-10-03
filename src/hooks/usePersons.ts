import { useCallback, useEffect, useReducer } from 'react'
import { initialPersonsState, personsReducer, type PersonsAction } from '@/reducers'
import { personsService } from '@/services'
import type { PersonFormValues } from '@/types'
import { getErrorMessage } from '@/utils'

/**
 * Estado y operaciones del CRUD de personas. Las mutaciones solo actualizan el estado
 * cuando el servicio confirma; si fallan, el error se propaga para que la vista lo notifique.
 */
export const usePersons = () => {
  const [{ persons, isLoading, error }, dispatch] = useReducer(personsReducer, initialPersonsState)

  const loadPersons = useCallback(async (signal?: AbortSignal) => {
    dispatch({ type: 'FETCH_START' })

    let result: PersonsAction
    try {
      result = { type: 'FETCH_SUCCESS', payload: await personsService.getAll() }
    } catch (err) {
      result = { type: 'FETCH_ERROR', payload: getErrorMessage(err) }
    }

    if (!signal?.aborted) dispatch(result)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadPersons(controller.signal)
    return () => controller.abort()
  }, [loadPersons])

  const reload = useCallback(() => loadPersons(), [loadPersons])

  const addPerson = useCallback(async (values: PersonFormValues) => {
    const person = await personsService.create(values)
    dispatch({ type: 'ADDED', payload: person })
    return person
  }, [])

  const updatePerson = useCallback(async (id: string, values: PersonFormValues) => {
    const person = await personsService.update(id, values)
    dispatch({ type: 'UPDATED', payload: person })
    return person
  }, [])

  const deletePerson = useCallback(async (id: string) => {
    await personsService.remove(id)
    dispatch({ type: 'REMOVED', payload: { id } })
  }, [])

  // Validación inmediata en el formulario; `excludeId` permite conservar el propio correo al editar
  const isEmailTaken = useCallback(
    (email: string, excludeId?: string) => {
      const normalized = email.trim().toLowerCase()
      return persons.some((person) => person.email === normalized && person.id !== excludeId)
    },
    [persons],
  )

  return { persons, isLoading, error, reload, addPerson, updatePerson, deletePerson, isEmailTaken }
}
