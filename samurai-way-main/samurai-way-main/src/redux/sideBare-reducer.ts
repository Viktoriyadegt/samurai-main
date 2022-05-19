import {addPostAC, onChangeNewPostAC} from "./profile-reducer";
import {sendMessageAC, updateNewMessageBodyAC} from "./dialogs-reducer";

type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof onChangeNewPostAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>

type sideBarePageType = {}
let initialState = {}
const sideBareReducer = (state:sideBarePageType = initialState, action:ActionsTypes) => {

    return state;
};

export default sideBareReducer;