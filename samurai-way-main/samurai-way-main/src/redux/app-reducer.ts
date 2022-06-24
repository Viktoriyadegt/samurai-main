import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"
import {getAuthData} from "./auth-reducer";

type AppActionsTypes =
    ReturnType<typeof setInitializeAppAC>


export type InitialStateType = typeof initialState
let initialState = {
    initialize: false


}
export const appReducer = (state: InitialStateType = initialState, action: AppActionsTypes): InitialStateType => {

    switch (action.type) {
        case "SET_INITIALIZE": {
            return {
                ...state,
                initialize: action.value
            }
        }

        default :
            return state;
    }

}
export const setInitializeAppAC = (value: boolean) => ({type: 'SET_INITIALIZE', value} as const)

type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsTypes>

export const initializeAppTC = (): ThunkType => (dispatch) => {
    debugger
    let promise = dispatch(getAuthData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializeAppAC(true))
        })
}


export default appReducer;