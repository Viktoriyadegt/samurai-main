import {addPostAC, onChangeNewPostAC} from "./profile-reducer";

type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof onChangeNewPostAC>
    | ReturnType<typeof updateNewMessageBodyAC>
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
    ] as Array<messagePropsType>,
    newMessageBody: ''

}
const DialogsReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY": {
           return {
               ...state,
               newMessageBody: action.body
           }
        }
        case "SEND-MESSAGE": {
            const body: messagePropsType = {
                id: 6,
                message: state.newMessageBody,
            }
            return {
                ...state,
                messages:[...state.messages, body],
                newMessageBody: ''
            }
        }
        default :
            return state;
    }

}
export const updateNewMessageBodyAC = (body: string) => ({
    type: 'UPDATE-NEW-MESSAGE-BODY',
    body: body
} as const)

export const sendMessageAC = () => ({
    type: 'SEND-MESSAGE',
} as const)


export default DialogsReducer;