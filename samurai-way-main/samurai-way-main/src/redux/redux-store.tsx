import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import sideBareReducer from "./sideBare-reducer";
import UsersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'




export type ReduxStoreType = typeof store //типизация всего стора
const rootReducer = combineReducers({
    profilePage:ProfileReducer,
    dialogsPage:DialogsReducer,
    sideBare: sideBareReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    form: formReducer

})

// @ts-ignore

 export type AppStateType =  ReturnType<typeof rootReducer>//типизация стейта


export const store:Store<AppStateType> = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store;



