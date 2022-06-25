import { userAPI} from "../API/Api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

type ActionsTypes =
    ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUserCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof followingIsProgressAC>

type PhotosType = {
    small: string
    large: string
}

export type UsersPropsType = {
    id: number
    name: string
    photos: PhotosType
    followed: boolean
    status: string
}

export type InitialStateType = typeof initialState
const initialState = {
    users: [] as Array<UsersPropsType>,
    totalUsersCount: 47,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    followingIsProgress: [] as Array<number>
}
const UsersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map(m => m.id === action.payload.userId ? {...m, followed: true} : m)
            }
        }
        case "UNFOLLOW": {
            return {
                ...state,
                users: state.users.map(m => m.id === action.payload.userId ? {...m, followed: false} : m)
            }
        }
        case "SET_USERS": {
            return {
                ...state,
                users: action.payload.users

            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.payload.currentPage

            }
        }
        case "SET_TOTAL_USER_COUNT": {
            return {
                ...state,
                totalUsersCount: action.payload.userCount

            }
        }
        case "TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.payload.isFetching

            }
        }
        case "TOGGLE_FOLLOWING_IS_PROGRESS": {
            return {
                ...state,
                followingIsProgress: action.payload.isFetching
                    ? [...state.followingIsProgress, action.payload.userId]
                    : state.followingIsProgress.filter(f => f !== action.payload.userId)

            }
        }

        default :
            return state;
    }

}


export const followAC = (userId: number) => ({
    type: 'FOLLOW',
    payload: {userId}

} as const)

export const unFollowAC = (userId: number) => ({
    type: 'UNFOLLOW',
    payload: {userId}
} as const)

export const setUsersAC = (users: Array<UsersPropsType>) => ({
    type: 'SET_USERS',
    payload: {users}
} as const)
export const setCurrentPageAC = (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    payload: {currentPage}
} as const)

export const setTotalUserCountAC = (userCount: number) => ({
    type: 'SET_TOTAL_USER_COUNT',
    payload: {userCount}
} as const)

export const toggleIsFetchingAC = (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING',
    payload: {isFetching}
} as const)

export const followingIsProgressAC = (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_FOLLOWING_IS_PROGRESS',
    payload: {isFetching, userId}
} as const)

 type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(page))
        userAPI.getUser(page, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUserCountAC(data.totalCount));
        })
    }
}
export const unfollow = (userId: number): ThunkType => {
    return (dispatch,
            getState) => {
        dispatch(followingIsProgressAC(true, userId))
        userAPI.unfollow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unFollowAC(userId))
                dispatch(followingIsProgressAC(false, userId))
            }
        })
    }
}
export const follow = (userId: number): ThunkType => {
    return (dispatch,
            getState) => {
        dispatch(followingIsProgressAC(true, userId))
        userAPI.follow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followAC(userId))
            }
            dispatch(followingIsProgressAC(false, userId))
        })
    }
}


export default UsersReducer;