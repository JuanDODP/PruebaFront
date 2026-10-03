import { SEED_PERSONS } from '@/data'
import type { Person, PersonFormValues } from '@/types'
import { delay, readStorage, sanitizePersonValues, writeStorage } from '@/utils'

/**
 * API REST simulada de personas. Se comporta como un backend real (asíncrona, con latencia
 * y posibles fallos) pero persiste en localStorage. Para conectar un backend real solo hay
 * que reemplazar estas funciones por llamadas con `apiClient`; los componentes no cambian.
 */

const STORAGE_KEY = 'persons'
const LATENCY_MS = 700
// Configurable desde .env para demostrar el manejo de errores (0 = nunca falla)
const ERROR_RATE = Number(import.meta.env.VITE_PERSONS_ERROR_RATE ?? 0) || 0

const isPersonList = (value: unknown): value is Person[] => Array.isArray(value)

const readAll = () => readStorage(STORAGE_KEY, () => SEED_PERSONS, isPersonList)

const saveAll = (persons: Person[]) => {
  if (!writeStorage(STORAGE_KEY, persons)) {
    throw new Error('No fue posible guardar la información. Intenta de nuevo.')
  }
}

const findOrFail = (persons: Person[], id: string) => {
  const person = persons.find((item) => item.id === id)
  if (!person) throw new Error('La persona ya no existe. Recarga la lista.')
  return person
}

// Validación del lado del "servidor": el cliente también valida, pero el backend es la fuente de verdad
const assertEmailAvailable = (persons: Person[], email: string, excludeId?: string) => {
  if (persons.some((person) => person.email === email && person.id !== excludeId)) {
    throw new Error('Este correo ya está registrado.')
  }
}

// Simula el viaje de red: latencia y, opcionalmente, fallos aleatorios
const request = async <T>(operation: () => T): Promise<T> => {
  await delay(LATENCY_MS)
  if (Math.random() < ERROR_RATE) {
    throw new Error('El servicio de personas no está disponible en este momento. Intenta de nuevo.')
  }
  return operation()
}

export const personsService = {
  getAll: () => request(readAll),

  create: (values: PersonFormValues) =>
    request(() => {
      const persons = readAll()
      const data = sanitizePersonValues(values)
      assertEmailAvailable(persons, data.email)

      const now = new Date().toISOString()
      const person: Person = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
      saveAll([person, ...persons])
      return person
    }),

  update: (id: string, values: PersonFormValues) =>
    request(() => {
      const persons = readAll()
      const current = findOrFail(persons, id)
      const data = sanitizePersonValues(values)
      assertEmailAvailable(persons, data.email, id)

      const updated: Person = { ...current, ...data, updatedAt: new Date().toISOString() }
      saveAll(persons.map((person) => (person.id === id ? updated : person)))
      return updated
    }),

  remove: (id: string) =>
    request(() => {
      const persons = readAll()
      findOrFail(persons, id)
      saveAll(persons.filter((person) => person.id !== id))
    }),
}
