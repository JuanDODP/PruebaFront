import type { Person, PersonFormValues } from '../types/person'

export type PersonsAction =
  | { type: 'ADD'; payload: Person }
  | { type: 'UPDATE'; payload: { id: string; values: PersonFormValues; updatedAt: string } }
  | { type: 'DELETE'; payload: { id: string } }

// Reducer puro: ids y fechas se generan fuera para que sea predecible y fácil de probar
export const personsReducer = (state: Person[], action: PersonsAction): Person[] => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'UPDATE': {
      const { id, values, updatedAt } = action.payload
      return state.map((person) => (person.id === id ? { ...person, ...values, updatedAt } : person))
    }
    case 'DELETE':
      return state.filter((person) => person.id !== action.payload.id)
    default:
      return state
  }
}
