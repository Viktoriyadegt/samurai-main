import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    follow,
    followAC, followingIsProgressAC, getUsers,
    InitialStateType,
    setCurrentPageAC, setTotalUserCountAC,
    setUsersAC, toggleIsFetchingAC, unfollow,
    unFollowAC,
    UsersPropsType,
} from "../../redux/users-reducer";
import React, {ComponentType} from "react";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";
import {compose} from "redux";


class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        this.props.getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.usersPage.pageSize)
    }

    render() {
        let pagesCount = Math.ceil(this.props.usersPage.totalUsersCount / this.props.usersPage.pageSize)

        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        debugger

        return (
            <>
                <div>{this.props.usersPage.isFetching ? <Preloader/> : null}</div>
                <Users
                    totalUsersCount={this.props.usersPage.totalUsersCount}
                    pageSize={this.props.usersPage.pageSize}
                    currentPage={this.props.usersPage.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.usersPage.users}
                    unfollowAC={this.props.unFollowAC}
                    followAC={this.props.followAC}
                    followingIsProgress={this.props.usersPage.followingIsProgress}
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
    usersPage: InitialStateType
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
        usersPage: state.usersPage

    }
)


export default compose<ComponentType>(connect(mapStateToProps, {
        followAC,
        unFollowAC,
        setUsersAC,
        setCurrentPageAC,
        setTotalUserCountAC,
        toggleIsFetchingAC,
        followingIsProgressAC,
        getUsers,
        unfollow,
        follow
    }))(UsersContainer)
