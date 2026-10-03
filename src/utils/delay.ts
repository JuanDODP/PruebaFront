// Promesa que se resuelve después de `ms` milisegundos; útil para simular latencia de red
export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
