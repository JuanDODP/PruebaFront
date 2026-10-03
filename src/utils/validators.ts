export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
export const PHONE_PATTERN = /^\d{10}$/
// Letras (incluye acentos y ñ), espacios, apóstrofes, puntos y guiones
export const NAME_PATTERN = /^\p{L}[\p{L}\s'.-]*$/u

export const PHONE_LENGTH = 10
export const NAME_MAX_LENGTH = 50

// `required` de react-hook-form acepta valores con solo espacios; esta regla los rechaza
export const notBlank = (message: string) => (value: string) => value.trim().length > 0 || message
