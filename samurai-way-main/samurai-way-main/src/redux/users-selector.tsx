import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";
import {UsersPropsType} from "./users-reducer";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, (users: Array<UsersPropsType>) => {
    return users.filter(u => true)
})

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingIsProgress = (state: AppStateType) => {
    return state.usersPage.followingIsProgress
}
