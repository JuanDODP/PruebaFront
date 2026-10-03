import { apiClient } from '@/api'
import type { CharactersResponse } from '@/types'

export const charactersService = {
  // GET /character?page=N
  getPage: async (page: number, signal?: AbortSignal) => {
    const { data } = await apiClient.get<CharactersResponse>('/character', { params: { page }, signal })
    return data
  },
}
