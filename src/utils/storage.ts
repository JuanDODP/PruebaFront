// Lectura/escritura segura de localStorage (puede no existir o lanzar en modo privado)
export const readStorage = <T>(key: string, fallback: () => T, isValid: (value: unknown) => value is T): T => {
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      const parsed: unknown = JSON.parse(raw)
      if (isValid(parsed)) return parsed
    }
  } catch {
    // JSON corrupto o storage no disponible: se usa el valor por defecto
  }
  return fallback()
}

export const writeStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage lleno o no disponible
  }
}
