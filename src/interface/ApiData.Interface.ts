// Respuesta paginada de https://rickandmortyapi.com/api/character
export interface Data {
  info: Info
  results: Result[]
}

export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface Result {
  id: number
  name: string
  status: Status
  species: string
  type: string
  gender: Gender
  origin: Location
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export type Status = 'Alive' | 'Dead' | 'unknown'

export interface Location {
  name: string
  url: string
}
