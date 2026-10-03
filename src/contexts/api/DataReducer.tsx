import type { Data } from "@/interface/ApiData.Interface";

export interface DataState {
    data: Data[];
    isLoading: boolean;
}
type ActionData = {
    type: "getData"
    payload: Data[];
}
export const dataReducer = (state: DataState, action: ActionData): DataState => {
    switch (action.type) {
        case "getData":
            return { ...state, data: action.payload, isLoading: false }
        default:
            return state;
    }
}