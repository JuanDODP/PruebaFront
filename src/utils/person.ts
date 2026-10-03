import type { Person, PersonFormValues } from '@/types'
import { normalizeText } from './format'

export const getFullName = ({ firstName, lastName }: Pick<Person, 'firstName' | 'lastName'>) =>
  `${firstName} ${lastName}`.trim()

export const getInitials = ({ firstName, lastName }: Pick<Person, 'firstName' | 'lastName'>) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

// Limpia los valores capturados antes de guardarlos
export const sanitizePersonValues = ({ firstName, lastName, email, phone }: PersonFormValues): PersonFormValues => ({
  firstName: firstName.trim().replace(/\s+/g, ' '),
  lastName: lastName.trim().replace(/\s+/g, ' '),
  email: email.trim().toLowerCase(),
  phone: phone.trim(),
})

// Búsqueda por nombre completo o correo, sin distinguir mayúsculas ni acentos
export const filterPersons = (persons: Person[], query: string) => {
  const term = normalizeText(query)
  if (!term) return persons

  return persons.filter(
    (person) => normalizeText(getFullName(person)).includes(term) || normalizeText(person.email).includes(term),
  )
}
