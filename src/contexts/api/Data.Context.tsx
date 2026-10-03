import { createContext, useCallback, useContext, useReducer, type ReactNode } from 'react'
import { isAxiosError } from 'axios'
import { Api } from '@/Api/Api'
import type { Data } from '@/interface/ApiData.Interface'
import { delay } from '@/utils/delay'
import { dataReducer, initialDataState, type DataState } from './DataReducer'

interface ApiDataContextProps extends DataState {
  getData: (page?: number) => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const ApiDataContext = createContext({} as ApiDataContextProps)

// Tiempo mínimo que dura la carga simulada para que el estado `isLoading` sea visible
const SIMULATED_LOADING_MS = 1500

const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error) && !error.response) return 'No fue posible conectar con el servidor. Revisa tu conexión.'
  return 'Ocurrió un error al obtener la información. Intenta de nuevo.'
}

export const ApiDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialDataState)

  // Referencia estable para poder usarla como dependencia de useEffect.
  // `page` se envía como query param: /character?page=2
  const getData = useCallback(async (page = 1) => {
    dispatch({ type: 'fetchStart' })
    // La espera corre en paralelo con la petición: la carga dura lo que tarde la más lenta de las dos
    const minimumDelay = delay(SIMULATED_LOADING_MS)
    try {
      const { data } = await Api.get<Data>('/character', { params: { page } })
      await minimumDelay
      dispatch({ type: 'fetchSuccess', payload: data })
    } catch (error) {
      await minimumDelay
      dispatch({ type: 'fetchError', payload: getErrorMessage(error) })
    }
  }, [])

  return <ApiDataContext value={{ ...state, getData }}>{children}</ApiDataContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApiData = () => useContext(ApiDataContext)
