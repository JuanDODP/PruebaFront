export interface Person {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
}

// Campos que captura el usuario; el resto (id y fechas) se generan automáticamente
export type PersonFormValues = Pick<Person, 'firstName' | 'lastName' | 'email' | 'phone'>
