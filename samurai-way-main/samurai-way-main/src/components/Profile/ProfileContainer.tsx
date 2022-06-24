import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, InitialStateType1, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        debugger
        let userId:number| null = Number(this.props.match.params.userId)
        if (!userId) {
            userId = this.props.userId
            if(!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profilePage.profile}
                     status={this.props.profilePage.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}


type PropsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string

}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number |null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void

}
type MapStateToPropsType = {
    profilePage: InitialStateType1
    status: string
    userId: number | null

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profilePage: state.profilePage,
    status: state.profilePage.status,
    userId: state.auth.id
})

export default compose<ComponentType>(
    connect(mapStateToProps, {setUserProfile, getUserProfile, getStatus, updateStatus}),
    withRouter)(ProfileContainer)




