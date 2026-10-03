import { useContext } from 'react'
import { CharactersContext } from './CharactersContext'

export const useCharacters = () => {
  const context = useContext(CharactersContext)
  if (!context) throw new Error('useCharacters debe usarse dentro de <CharactersProvider>')
  return context
}
