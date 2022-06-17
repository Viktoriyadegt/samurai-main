import {addPostAC} from "./profile-reducer";
import {sendMessageAC} from "./dialogs-reducer";

type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageAC>

type sideBarePageType = {}
let initialState = {}
const sideBareReducer = (state:sideBarePageType = initialState, action:ActionsTypes) => {

    return state;
};

export default sideBareReducer;