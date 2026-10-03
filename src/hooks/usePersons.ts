import { useCallback } from 'react'
import { SEED_PERSONS } from '../data/persons.seed'
import { personsReducer } from '../reducers/personsReducer'
import type { Person, PersonFormValues } from '../types/person'
import { sanitizePersonValues } from '../utils/person'
import { usePersistentReducer } from './usePersistentReducer'

export const PERSONS_STORAGE_KEY = 'persons'

const isPersonList = (value: unknown): value is Person[] => Array.isArray(value)

// API del CRUD de personas; los componentes no conocen el reducer ni el storage
export const usePersons = () => {
  const [persons, dispatch] = usePersistentReducer(
    personsReducer,
    PERSONS_STORAGE_KEY,
    () => SEED_PERSONS,
    isPersonList,
  )

  const addPerson = useCallback(
    (values: PersonFormValues) => {
      const now = new Date().toISOString()
      const person: Person = { ...sanitizePersonValues(values), id: crypto.randomUUID(), createdAt: now, updatedAt: now }
      dispatch({ type: 'ADD', payload: person })
      return person
    },
    [dispatch],
  )

  const updatePerson = useCallback(
    (id: string, values: PersonFormValues) => {
      dispatch({
        type: 'UPDATE',
        payload: { id, values: sanitizePersonValues(values), updatedAt: new Date().toISOString() },
      })
    },
    [dispatch],
  )

  const deletePerson = useCallback((id: string) => dispatch({ type: 'DELETE', payload: { id } }), [dispatch])

  // Evita correos duplicados; `excludeId` permite conservar el propio correo al editar
  const isEmailTaken = useCallback(
    (email: string, excludeId?: string) => {
      const normalized = email.trim().toLowerCase()
      return persons.some((person) => person.email === normalized && person.id !== excludeId)
    },
    [persons],
  )

  return { persons, addPerson, updatePerson, deletePerson, isEmailTaken }
}
