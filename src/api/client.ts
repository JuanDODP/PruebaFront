import axios from 'axios'

const DEFAULT_API_URL = 'https://rickandmortyapi.com/api'

// Cliente HTTP único de la aplicación
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  timeout: 10_000,
})
