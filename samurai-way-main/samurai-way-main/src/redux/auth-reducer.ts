import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../API/Api";

type ActionsTypes =
    ReturnType<typeof setAuthDataAC>

export type DataType = {
    id: number
    email: string
    login: string
}

export type InitialStateType = typeof initialState
let initialState = {
    id: 2,
    email: 'bla@.com',
    login: 'bls',
    isAuth: false


}
const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "SET_AUTH_DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }

        default :
            return state;
    }

}
export const setAuthDataAC = (id: number, email: string, login: string) => ({
    type: 'SET_AUTH_DATA',
    data: {id, email, login} as const

})

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getAuthData = (): ThunkType => {
    return (dispatch, getState) => {
        authAPI.header().then(data => {
            if (!data.resultCode) {
                dispatch(setAuthDataAC(data.data.id, data.data.email, data.data.login))
            }

        })
    }
}


export default authReducer;