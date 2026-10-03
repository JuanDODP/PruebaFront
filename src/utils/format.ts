const dateFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' })

export const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate))

// 5512345678 -> 55 1234 5678
export const formatPhone = (phone: string) => phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1 $2 $3')

export const onlyDigits = (value: string) => value.replace(/\D/g, '')

// Minúsculas y sin acentos para comparar textos ("José" coincide con "jose")
export const normalizeText = (value: string) =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

export const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`
