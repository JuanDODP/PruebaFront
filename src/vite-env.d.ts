/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  // Probabilidad (0 a 1) de que falle una petición al servicio simulado de personas
  readonly VITE_PERSONS_ERROR_RATE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
