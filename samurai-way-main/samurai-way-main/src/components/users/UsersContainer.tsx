import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {
    followAC,
    InitialStateType,
    setCurrentPageAC, setTotalUserCountAC,
    setUsersAC, toggleIsFetchingAC,
    unFollowAC,
    UsersPropsType,
} from "../redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";


type ResponseType = {
    items: Array<UsersPropsType>
    totalCount: number
    error: string
}

class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        this.props.toggleIsFetchingAC(true)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.users}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(response.data.items);
                this.props.setTotalUserCountAC(response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetchingAC(true)
        this.props.setCurrentPageAC(pageNumber)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingAC(false)
                return this.props.setUsersAC(response.data.items);

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
                <div>{this.props.usersPage.isFetching ? <Preloader/> :null}</div>
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ( {
        usersPage: state.usersPage
        //totalUsersCount: state.usersPage.totalUsersCount,
        //pageSize: state.usersPage.pageSize,
        //currentPage: state.usersPage.currentPage,
        //isFetching: state.usersPage.isFetching
    }
)

/*const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        followAC: (usersId: number) => {
            dispatch(followAC(usersId))
        },
        unFollowAC: (usersId: number) => {
            dispatch(unFollowAC(usersId))
        },
        setUsersAC: (users: Array<UsersPropsType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPageAC: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUserCountAC: (userCount: number) => {
            dispatch(setTotalUserCountAC(userCount))
        },
        toggleIsFetchingAC: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }

}*/


export default connect(mapStateToProps, {
    followAC,
    unFollowAC,
    setUsersAC,
    setCurrentPageAC,
    setTotalUserCountAC,
    toggleIsFetchingAC
})
(UsersContainer)