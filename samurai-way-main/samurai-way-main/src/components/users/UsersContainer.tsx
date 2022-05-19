import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    followAC,
    InitialStateType,
    setCurrentPageAC, setTotalUserCountAC,
    setUsersAC, toggleIsFetchingAC,
    unFollowAC,
    UsersPropsType,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {userAPI} from "../../API/Api";


class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        this.props.toggleIsFetchingAC(true)
        userAPI.getUser(this.props.usersPage.users, this.props.usersPage.pageSize).then(data => {
            this.props.toggleIsFetchingAC(false)
            this.props.setUsersAC(data.items);
            this.props.setTotalUserCountAC(data.totalCount);
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetchingAC(true)
        this.props.setCurrentPageAC(pageNumber)
        userAPI.getUser(pageNumber, this.props.usersPage.pageSize).then(data => {
            this.props.toggleIsFetchingAC(false)
            return this.props.setUsersAC(data.items);

        })
    }

    render() {
        let pagesCount = Math.ceil(this.props.usersPage.totalUsersCount / this.props.usersPage.pageSize)

        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

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
}

export type UsersType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        usersPage: state.usersPage

    }
)

export default connect(mapStateToProps, {
    followAC,
    unFollowAC,
    setUsersAC,
    setCurrentPageAC,
    setTotalUserCountAC,
    toggleIsFetchingAC
})
(UsersContainer)