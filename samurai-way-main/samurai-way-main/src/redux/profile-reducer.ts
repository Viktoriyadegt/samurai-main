import {sendMessageAC} from "./dialogs-reducer";
import {profileAPI} from "../API/Api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";


type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>


type postPropsType = {
    id: number
    message: string
    likesCount: number
}

export type profilePageType = {
    posts: Array<postPropsType>
    profile: ProfilePropsType
}
export type PostPropsType = {
    id: number
    message: string
    likesCount: number
}
type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
type PhotosType = {
    small: string | null
    large: string | null

}
export type ProfilePropsType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: ContactsType
    photos: PhotosType

}
//export type InitialStateType = typeof initialState
export type InitialStateType1 = {
    posts: Array<postPropsType>
    profile: ProfilePropsType | null
    status: string

}
let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 5},
        {id: 2, message: "It's my first post", likesCount: 65},
        {id: 3, message: "Blablabla", likesCount: 78},
        {id: 4, message: "Hi, my friend!", likesCount: 56},
        {id: 5, message: "YoYoYo", likesCount: 98}
    ],
    profile: null,
    status: ''
}


const ProfileReducer = (state: InitialStateType1 = initialState, action: ActionsTypes): InitialStateType1 => {

    switch (action.type) {
        case "ADD-POST": {
            const newPost: postPropsType = {
                id: 6,
                message: action.addNewPost,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        }
        case "SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SET-USER-STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export type AddPostACType = {
    type: 'ADD-POST'
    addNewPost:string
}

export type SetUserProfileType = {
    type: 'SET-USER-PROFILE'
    profile: ProfilePropsType
}
export type SetUserStatusType = {
    type: 'SET-USER-STATUS'
    status: string
}
export const addPostAC = (addNewPost:string): AddPostACType => ({type: 'ADD-POST', addNewPost}  as const)

export const setUserProfile = (profile: ProfilePropsType): SetUserProfileType => {
    return {
        type: 'SET-USER-PROFILE',
        profile: profile
    } as const
}

export const setUserStatus = (status: string): SetUserStatusType => ({
    type: 'SET-USER-STATUS',
    status: status
} as const)


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => {
    return (dispatch) => {
        profileAPI.profile(userId).then(data => {
            dispatch(setUserProfile(data));
        })
    }
}

export const getStatus = (userId: number): ThunkType => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId).then(data => {
            dispatch(setUserStatus(data));
        })
    }
}

export const updateStatus = (status:string): ThunkType => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status).then(data => {
            if(data.resultCode===0)
            dispatch(setUserStatus(status));
        })
    }
}


export default ProfileReducer