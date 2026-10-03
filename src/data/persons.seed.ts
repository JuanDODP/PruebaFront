import type { Person } from '../types/person'

const SEED_DATE = '2026-01-15T10:00:00.000Z'

// Registros de ejemplo para el primer ingreso (cuando localStorage está vacío)
export const SEED_PERSONS: Person[] = [
  { id: 'seed-1', firstName: 'María', lastName: 'González López', email: 'maria.gonzalez@correo.com', phone: '5512345678' },
  { id: 'seed-2', firstName: 'José', lastName: 'Hernández Ruiz', email: 'jose.hernandez@correo.com', phone: '3312345678' },
  { id: 'seed-3', firstName: 'Ana', lastName: 'Martínez Sánchez', email: 'ana.martinez@correo.com', phone: '8112345678' },
].map((person) => ({ ...person, createdAt: SEED_DATE, updatedAt: SEED_DATE }))
