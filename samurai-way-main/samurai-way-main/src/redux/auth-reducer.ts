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
    email: 'blabla@bla.bla',
    login: 'samurai',
    isAuth: false
}
const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_AUTH_DATA": {
            debugger
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
    data: {id, email, login}

} as const)

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getAuthData = (): ThunkType => {
    return (dispatch, getState) => {
        debugger
        authAPI.header().then(data => {
            if (data.resultCode === null) {
                let {id, email, login} = data
                dispatch(setAuthDataAC(id, email, login))
            }

        })
    }
}


export default authReducer;