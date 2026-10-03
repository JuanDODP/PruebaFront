// Respuesta paginada de GET /character
export interface CharactersResponse {
  info: PageInfo
  results: Character[]
}

export interface PageInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export interface CharacterLocation {
  name: string
  url: string
}
