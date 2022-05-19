import {addPostAC, onChangeNewPostAC} from "./profile-reducer";

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


export default authReducer;