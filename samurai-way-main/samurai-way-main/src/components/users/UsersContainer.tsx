import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    follow,
    followAC, followingIsProgressAC, requestUsers,
    setCurrentPageAC, setTotalUserCountAC,
    setUsersAC, toggleIsFetchingAC, unfollow,
    unFollowAC,
    UsersPropsType,
} from "../../redux/users-reducer";
import React, {ComponentType} from "react";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingIsProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selector";


class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        debugger

        return (
            <>
                <div>{this.props.isFetching ? <Preloader/> : null}</div>
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollowAC={this.props.unFollowAC}
                    followAC={this.props.followAC}
                    followingIsProgress={this.props.followingIsProgress}
                    followingIsProgressAC={this.props.followingIsProgressAC}
                    getUsers={this.props.getUsers}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                />
            </>
        )
    }

}

export type MapStatePropsType = {
    users: Array<UsersPropsType>,
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    followingIsProgress:  Array<number>
}

type MapDispatchPropsType = {
    followAC: (usersId: number) => void
    unFollowAC: (usersId: number) => void
    setUsersAC: (users: Array<UsersPropsType>) => void
    setCurrentPageAC: (currentPage: number) => void
    setTotalUserCountAC: (userCount: number) => void
    toggleIsFetchingAC: (isFetching: boolean) => void
    followingIsProgressAC: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void

}

export type UsersType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingIsProgress: getFollowingIsProgress(state)
    })

export default compose<ComponentType>(connect(mapStateToProps, {
        followAC,
        unFollowAC,
        setUsersAC,
        setCurrentPageAC,
        setTotalUserCountAC,
        toggleIsFetchingAC,
        followingIsProgressAC,
        getUsers: requestUsers,
        unfollow,
        follow
    }))(UsersContainer)
