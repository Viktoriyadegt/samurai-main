import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../API/Api";
import {FormAction, stopSubmit} from "redux-form";

type ActionsTypes =
    ReturnType<typeof setAuthDataAC>

export type DataType = {
    id: number
    email: string
    login: string
    isAuth: boolean
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
                ...action.data
            }
        }

        default :
            return state;
    }

}
export const setAuthDataAC = (id: number, email: string, login: string, isAuth:boolean) => ({
    type: 'SET_AUTH_DATA',
    data: {id, email, login, isAuth} as const

})

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes| FormAction>

export const getAuthData = (): ThunkType => {
    return (dispatch) => {
        authAPI.header().then(data => {
            if (!data.resultCode) {
                dispatch(setAuthDataAC(data.data.id, data.data.email, data.data.login, true))
            }


        })
    }
}

export const login = (email:string, password:string,rememberMe:boolean): ThunkType => {
    return (dispatch) => {
        authAPI.login(email, password,rememberMe).then(data => {
            if (!data.resultCode) {
                dispatch(getAuthData())
            }else{
                console.log(data.messages)
                let message = data.messages.length>0? data.messages[0]:'Something error!'

                dispatch(stopSubmit('login', {_error: message}))
            }

        })
    }
}

export const logout = (): ThunkType => {
    return (dispatch) => {
        authAPI.logout().then(data => {
            if (!data.resultCode) {
                dispatch(setAuthDataAC(0,'','null',false))
            }

        })
    }
}


export default authReducer;