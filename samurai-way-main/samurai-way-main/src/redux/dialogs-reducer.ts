import {addPostAC} from "./profile-reducer";

type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageAC>


export type messagePropsType = {
    id: number
    message: string
}
export type dialogPropsType = {
    id: number
    name: string
}

export type InitialStateType = typeof initialState
let initialState = {
    dialogs: [
        {id: 1, name: "Dasha"},
        {id: 2, name: "Katya"},
        {id: 3, name: "Lena"},
        {id: 4, name: "Galia"},
        {id: 5, name: "Sweta"}
    ] as Array<dialogPropsType>,
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-kamasutra?"},
        {id: 3, message: "Yu"},
        {id: 4, message: "Yu"},
        {id: 5, message: "Yu"},
    ] as Array<messagePropsType>

}
const DialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SEND-MESSAGE": {
            const body: messagePropsType = {
                id: 6,
                message: action.newMessageBody,
            }
            return {
                ...state,
                messages: [...state.messages, body]
            }
        }
        default :
            return state;
    }

}
export const sendMessageAC = (newMessageBody: string) => ({
    type: 'SEND-MESSAGE', newMessageBody
} as const)


export default DialogsReducer;