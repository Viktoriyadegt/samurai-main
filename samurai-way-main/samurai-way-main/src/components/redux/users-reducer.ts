type ActionsTypes =
    ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUserCountAC>
    | ReturnType<typeof toggleIsFetchingAC>

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
    //location: LocationPropsType
}

/*
export type LocationPropsType = {
    city: string
    country: string
}
*/

//
// export type InitialStateType = {
//     users: Array<UsersPropsType>
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
// }
export type InitialStateType = typeof initialState
const initialState = {
    users: [] as Array<UsersPropsType>,
    totalUsersCount: 47,
    pageSize: 5,
    currentPage: 1,
    isFetching: true
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

export default UsersReducer;