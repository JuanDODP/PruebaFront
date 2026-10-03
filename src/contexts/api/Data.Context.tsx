import type { Data } from "@/interface/ApiData.Interface";
import { createContext, useReducer } from "react";
import { dataReducer, type DataState } from "./DataReducer";
import { Api } from "@/Api/Api";
interface ApiDataContextProps {
    data: Data[];
    isLoading: boolean;
    getData: () => Promise<void>;
}
const initialState: DataState = {
    data: [],
    isLoading: false,
}
export const ApiDataContext = createContext({} as ApiDataContextProps)
export const ApiDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
    const getData = async () => {
        const data = await Api.get<Data[]>('/character')
        dispatch({ type: "getData", payload: data.data })
    }
    return (
        <ApiDataContext.Provider value={{ ...state, getData }}>
            {children}
        </ApiDataContext.Provider>
    )
}