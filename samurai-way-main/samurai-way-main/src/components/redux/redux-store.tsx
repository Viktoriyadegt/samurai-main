import {combineReducers, createStore, Store} from "redux";
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import sideBareReducer from "./sideBare-reducer";
import UsersReducer from "./users-reducer";



export type ReduxStoreType = typeof store //типизация всего стора
const rootReducer = combineReducers({
    profilePage:ProfileReducer,
    dialogsPage:DialogsReducer,
    sideBare: sideBareReducer,
    usersPage: UsersReducer
})

// @ts-ignore

 export type AppStateType =  ReturnType<typeof rootReducer>//типизация стейта


export const store:Store<AppStateType> = createStore(rootReducer)

// @ts-ignore
window.store = store;



