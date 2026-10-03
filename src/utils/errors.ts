import { isAxiosError } from 'axios'

const DEFAULT_ERROR_MESSAGE = 'Ocurrió un error inesperado. Intenta de nuevo.'

// Traduce cualquier error (HTTP, de red o de negocio) a un mensaje apto para el usuario
export const getErrorMessage = (error: unknown, fallback = DEFAULT_ERROR_MESSAGE) => {
  if (isAxiosError(error)) {
    return error.response
      ? `El servidor respondió con un error (${error.response.status}). Intenta de nuevo.`
      : 'No fue posible conectar con el servidor. Revisa tu conexión.'
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}
